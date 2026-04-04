import z from "zod";

export const getURLScheme = z.object({
  id: z.string()
})
export const createURLScheme = z.object({
  originalURL: z.url(),
  alias: z.string().optional(),
});
export const getAllURLsByUserScheme = z.object({
  userId: z.string()
})
export const getURLbyShortURLScheme = z.object({
  shortURL: z.string(),
  viewCount: z.preprocess((value) => {
    if (typeof value === "string") {
      const normalized = value.toLowerCase();
      if (normalized === "true") return true;
      if (normalized === "false") return false;
    }
    return value;
  }, z.boolean()).optional()
})