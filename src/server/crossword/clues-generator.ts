import { openai } from "./openai";
import { CrosswordGrid } from "./grid-generator";
import type {
  Words,
  AcrossWordWithMetadata,
  DownWordWithMetadata,
  Clues,
  AcrossClue,
  DownClue,
  Rules,
} from "@/lib/types";
import type { GameProps } from "@/app/state/store";

/**
 * Don't forget to call writeClues() after instantiating a Crossword.
 */
export class Crossword extends CrosswordGrid implements GameProps {
  _clues: Clues = { across: [], down: [] };

  constructor(
    public _rows: number,
    public _cols: number,
    public _rules: Rules,
  ) {
    super(_rows, _cols, _rules);
  }

  get clues() {
    return this._clues;
  }

  private async generateClues(words: Words) {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      temperature: 1,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a crossword clue generator.
        Provided a JSON object containing two arrays of words, you will return a crossword clue for each word in each array.
        Note that a provided word may be an idiomatic phrase (with spaces and punctuation removed).
        The clues you write should be in the style of a New York Times crossword puzzle and may make reference to pop culture or common knowledge.
        Don't indicate the number of letters the words contain in your response.
        Respond in an format analogous to the input, for example:
        {
          across: [
            /*your list of clues*/
          ],
          down: [
            /*your list of clues*/
          ]
        }`,
        },
        {
          role: "user",
          content:
            "Generate a crossword clue in the style of the New York Times for each of the following words. Your response should be in JSON format.",
        },
        {
          role: "user",
          content: JSON.stringify(words),
        },
      ],
    });
    return completion;
  }

  /**
   * Derives proper clue structure by combining word metadata (i.g., number, row/rows, col/cols) with generated clues.
   */
  private deriveClues<T extends AcrossWordWithMetadata | DownWordWithMetadata>(
    words: T[],
    bareClues: string[],
  ): T extends AcrossWordWithMetadata ? AcrossClue[] : DownClue[] {
    const clues = words.map((word, idx) => {
      const clue = bareClues[idx];

      if (word.hasOwnProperty("row") && word.hasOwnProperty("cols")) {
        return {
          number: word.number,
          row: (word as AcrossWordWithMetadata).row,
          cols: (word as AcrossWordWithMetadata).cols,
          text: clue,
        };
      } else if (word.hasOwnProperty("col") && word.hasOwnProperty("rows")) {
        return {
          number: word.number,
          col: (word as DownWordWithMetadata).col,
          rows: (word as DownWordWithMetadata).rows,
          text: clue,
        };
      } else {
        throw new Error(
          "Can't derive clues by combining OpenAI completion with words.",
        );
      }
    });
    return clues as T extends AcrossWordWithMetadata
      ? AcrossClue[]
      : DownClue[];
  }

  async writeClues() {
    const { across, down } = this.getWords();
    const acrossWords = across.map((word) => word.word);
    const downWords = down.map((word) => word.word);

    const res = await this.generateClues({
      across: acrossWords,
      down: downWords,
    });

    console.log("hi");
    console.dir(res.choices[0]?.message.content, { depth: Infinity });

    if (res.choices[0]?.finish_reason === "length") {
      throw new Error("Can't generate clues. Tokens exceeded.");
    }

    if (res.choices[0]?.message?.content) {
      const bareClues = JSON.parse(res.choices[0].message.content) as {
        across: string[];
        down: string[];
      };

      if (
        bareClues.across.length !== acrossWords.length ||
        bareClues.down.length !== downWords.length
      ) {
        throw new Error(
          "Can't generate clues. OpenAI response not compatible with words.",
        );
      }

      this._clues.across = this.deriveClues(across, bareClues.across);
      this._clues.down = this.deriveClues(down, bareClues.down);
      return;
    }
    throw new Error("Can't generate clues. Unknown server error.");
  }
}
