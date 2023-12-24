import threeLetterWords from "./3-letter-words.json";
import fourLetterWords from "./4-letter-words.json";
import fiveLetterWords from "./5-letter-words.json";
import sixLetterWords from "./6-letter-words.json";
import sevenLetterWords from "./7-letter-words.json";
import eightLetterWords from "./8-letter-words.json";
import nineLetterWords from "./9-letter-words.json";
import tenLetterWords from "./10-letter-words.json";
import elevenLetterWords from "./11-letter-words.json";
import twelveLetterWords from "./12-letter-words.json";
import thirteenLetterWords from "./13-letter-words.json";
import fourteenLetterWords from "./14-letter-words.json";
import fifteenLetterWords from "./15-letter-words.json";

/**
  @description This dataset contains words used in NYT crossword puzzles. The words in this dataset are from the following source:
  @url https://huggingface.co/datasets/NavidTerraNova/NYT-Crossword
  - Words > 15 letters and < 3 letters were removed.
 */
const dictionary = new Map([
  [3, threeLetterWords],
  [4, fourLetterWords],
  [5, fiveLetterWords],
  [6, sixLetterWords],
  [7, sevenLetterWords],
  [8, eightLetterWords],
  [9, nineLetterWords],
  [10, tenLetterWords],
  [11, elevenLetterWords],
  [12, twelveLetterWords],
  [13, thirteenLetterWords],
  [14, fourteenLetterWords],
  [15, fifteenLetterWords],
]);

export default dictionary;
