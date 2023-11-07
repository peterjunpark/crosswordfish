import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringifyRowCol(
  row: number | number[],
  col: number | number[],
) {
  if (typeof row === "number" && typeof col === "number") {
    return `${row}::${col}`;
  } else if (typeof row === "number" && Array.isArray(col)) {
    return `ACR_@_${row}::${col[0]}-${col[col.length - 1]}`;
  } else if (Array.isArray(row) && typeof col === "number") {
    return `DN_@_${col}::${row[0]}-${row[row.length - 1]}`;
  } else {
    throw new Error("Invalid row/col combination.");
  }
}
