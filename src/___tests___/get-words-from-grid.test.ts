import { describe, expect, test } from "@jest/globals";
import { americanSample120923 } from "../dataset/sample-puzzles";
import { getWords } from "@/server/crossword/helpers/get-words-from-grid";

describe("getWords", () => {
  test('returns an object with "across" and "down" properties', () => {
    const words = getWords(americanSample120923.grid);

    expect(words).toHaveProperty("across");
    expect(words).toHaveProperty("down");
  });
});
