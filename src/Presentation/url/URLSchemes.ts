import z from "zod";

export const getURLScheme = z.object({
  id: z.string()
})
export const createURLScheme = z.object({
  originalURL: z.url(),
  alias: z.string().optional()
});