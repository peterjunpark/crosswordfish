import { z } from "zod";

export const cellValueSchema = z.string().max(1).toUpperCase().regex(/[A-Z]/);
export type CellValue = z.infer<typeof cellValueSchema>;
