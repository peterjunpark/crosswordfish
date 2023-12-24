import { freeformSampleCanon } from "@/dataset/sample-puzzles";
import dictionary from "@/dataset";
import type { Cell, Grid, Rules } from "@/lib/types";

const MIN_WORD_LENGTH = 3;
const MAX_WORD_LENGTH = 15;
const MIN_DATAMUSE_WORD_SCORE = 80;

export class CrosswordGrid {
  protected _grid: Grid;

  constructor(
    private _rows: number,
    private _cols: number,
    private _rules: Rules,
  ) {
    this._grid = Array.from({ length: this._rows }, () =>
      Array<Cell>(this._cols).fill(null),
    );
  }

  get grid() {
    return this._grid;
  }

  get rules() {
    return this._rules;
  }

  async writeGrid() {
    this.fillInDownWords();
    console.table(this._grid);
    await this.fillInAcrossWords();
    console.table(this._grid);
  }

  /**
   * This fills in every other row with a word that fits.
   * Down words should be populated before calling this method.
   */
  private async fillInAcrossWords() {
    let side: "left" | "right" = "left";

    // Loop through every other row and insert a random word,
    // alternating between the left side of the grid and the right.
    for (let i = 0; i < this._rows; i += 2) {
      const row = this._grid[i];

      if (!row) {
        throw new Error("Can't find row.");
      }

      const tempRow = [...row];

      let word: string | undefined;

      // Loop until a word is found that fits. Minimum word length is 3.
      while (tempRow.length >= 3) {
        word = await this.generateWordThatFits(tempRow);
        console.log({ word });

        if (word) break;

        if (side === "right") {
          if (tempRow[0]) {
            tempRow.splice(0, 2);
          } else {
            tempRow.splice(0, 1);
          }
        } else if (side === "left") {
          if (tempRow.at(-1)) {
            tempRow.splice(tempRow.length - 2);
          } else {
            tempRow.splice(tempRow.length - 1);
          }
        }
      }

      if (!word) continue;

      if (side === "left") {
        this.insertWord(word, "across", i, 0);
        side = "right";
      } else if (side === "right") {
        this.insertWord(
          word,
          "across",
          i,
          this.getLastCellWhereWordFits(word, "across"),
        );
        side = "left";
      }
    }
  }

  /**
   * This fills in every other column with random words.
   * Admittedly a very simplistic approach. It's a start.
   * As a result, there is a lack of diversity in grid layout.
   */
  private fillInDownWords() {
    let side: "top" | "bottom" = "bottom";

    // Loop through every other column and insert a random word,
    // alternating between the top of the grid and the bottom.
    for (let i = 0; i < this._cols; i += 2) {
      const word = this.getRandomWord();

      if (side === "top") {
        this.insertWord(word, "down", 0, i);
      } else {
        this.insertWord(
          word,
          "down",
          this.getLastCellWhereWordFits(word, "down"),
          i,
        );
      }
      side = side === "top" ? "bottom" : "top";
    }
  }

  /**
   * Given an array representing a row or column,
   * that may contain letters and enpty cells,
   * this method returns a word that fits into the array.
   */
  private async generateWordThatFits(arr: Cell[]) {
    const query = arr.map((cell) => cell ?? "?").join("");
    console.log(query);

    try {
      const results = await fetch(`https://api.datamuse.com/words?sp=${query}`);
      const words = (await results.json()) as { word: string; score: number }[];
      let word: string | undefined;

      for (const entry of words) {
        // Break if words are becoming too obscure.
        if (entry.score < MIN_DATAMUSE_WORD_SCORE) {
          break;
        }

        // Remove non-alphabetical characters.
        // Handle inconsistencies in Datamuse API re: counting spaces and dashes in search queries.
        const temp = entry.word.replace(/[^a-z]/g, "");
        if (temp.length === arr.length) {
          word = temp.toUpperCase();
          break;
        }
      }

      return word;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Since a word is filled into the grid from its first letter,
   * this method helps find the last cell where the word can be inserted
   * without going out of bounds.
   */
  private getLastCellWhereWordFits(word: string, direction: "across" | "down") {
    return direction === "across"
      ? this._cols - word.length
      : this._rows - word.length;
  }

  private getRandomWord(): string {
    // Getting odd-length down words makes it easier to fit across words afterwards.
    const wordLength = this.rng(MIN_WORD_LENGTH, MAX_WORD_LENGTH, "odd");
    const wordList = dictionary.get(wordLength);

    if (!wordList) {
      throw new Error("Can't find word list from random word length.");
    }

    const randomWordIdx = this.rng(0, wordList.length);

    return wordList[randomWordIdx]!;
  }

  private rng(min: number, max: number, oddOrEven?: "odd" | "even") {
    if (!oddOrEven) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if (oddOrEven === "odd") {
      min = min % 2 === 0 ? min + 1 : min;
      max = max % 2 === 0 ? max - 1 : max;
    } else if (oddOrEven === "even") {
      min = min % 2 === 0 ? min : min + 1;
      max = max % 2 === 0 ? max : max - 1;
    }

    return Math.floor((Math.random() * (max - min + 1)) / 2) * 2 + min;
  }

  private insertWord(
    word: string,
    direction: "across" | "down",
    startRow: number,
    startCol: number,
  ) {
    // Check if the word fits in the row.
    if (direction === "across" && startCol + word.length <= this._rows) {
      let col = startCol;
      for (const letter of word) {
        this.insertLetter(letter, startRow, col);
        col++;
      }
    } else if (direction === "down" && startRow + word.length <= this._cols) {
      let row = startRow;
      for (const letter of word) {
        this.insertLetter(letter, row, startCol);
        row++;
      }
    } else {
      throw new Error(
        "Can't insert word into grid. Word would be out of bounds.",
      );
    }
  }

  private insertLetter(letter: string, row: number, col: number) {
    const cell = this._grid[row]?.[col];
    // The letter can be inserted if the cell is empty
    // or if the cell contains the same letter.
    if (cell === null || cell === letter) {
      this._grid[row]![col] = letter;
    } else if (typeof cell === "string") {
      throw new Error("Can't insert letter into grid. Cell is already filled.");
    } else {
      throw new Error("Can't insert letter into grid. Cell does not exist.");
    }
  }

  /**
   * Spits out an array of all numbers between start and end, inclusive.
   */
  protected getNumbersInRange(start: number, end: number): number[] {
    return Array.from({ length: end - start }, (_, index) => start + index);
  }
}

const crossword = new CrosswordGrid(15, 15, "freeform");
crossword.writeGrid().catch((err) => console.error(err));
