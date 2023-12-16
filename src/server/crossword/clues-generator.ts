import { openai } from "./openai";
import { getWords } from "./helpers/get-words-from-grid";
import type {
  Grid,
  Words,
  AcrossWordWithMetadata,
  DownWordWithMetadata,
  Clues,
  AcrossClue,
  DownClue,
} from "@/lib/types";

async function generateClues(words: Words) {
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
function deriveClues<T extends AcrossWordWithMetadata | DownWordWithMetadata>(
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
  return clues as T extends AcrossWordWithMetadata ? AcrossClue[] : DownClue[];
}

export async function getClues(grid: Grid): Promise<Clues> {
  const { across, down } = getWords(grid);
  const acrossWords = across.map((word) => word.word);
  const downWords = down.map((word) => word.word);

  const res = await generateClues({ across: acrossWords, down: downWords });

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

    const acrossClues: AcrossClue[] = deriveClues(across, bareClues.across);
    const downClues: DownClue[] = deriveClues(down, bareClues.down);
    return { across: acrossClues, down: downClues };
  }
  throw new Error("Can't generate clues. Unknown server error.");
}
