export function rng(
  minInclusive: number,
  maxInclusive: number,
  odd?: "odd",
): number {
  if (minInclusive > maxInclusive) {
    throw new Error("Minimum value cannot be greater than the maximum value.");
  }

  let randomNum: number;

  if (odd) {
    if (minInclusive % 2 === 0) maxInclusive--;

    randomNum =
      Math.floor((Math.random() * (maxInclusive + 1 - minInclusive)) / 2) * 2 +
      minInclusive +
      1;
  } else {
    randomNum =
      Math.floor(Math.random() * (maxInclusive + 1 - minInclusive)) +
      minInclusive;
  }

  return randomNum;
}
