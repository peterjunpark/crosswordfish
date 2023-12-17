import dictionary, { MAX_WORD_LENGTH, MIN_WORD_LENGTH } from "@/dataset";

function searchWord(word: string) {
  if (word.length < MIN_WORD_LENGTH || word.length > MAX_WORD_LENGTH) {
    throw new Error("Can't find word in dataset. Invalid word length.");
  }

  const words = dictionary.get(word.length);

  if (!words)
    throw new Error("Can't find word in dataset. Invalid word length.");

  let min = 0;
  let max = words.length - 1;

  while (min <= max) {
    const mid = Math.floor((min + max) / 2);

    if (words[mid] === word) {
      return mid;
    } else if (words[mid] < word) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }
}
