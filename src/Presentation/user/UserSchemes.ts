import z from "zod";

export const getUserScheme = z.object({
  id: z.string().uuid()
});

export const createUserScheme = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email format")
});

export const updateUserScheme = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.email("Invalid email format").optional()
}).refine(data => data.name || data.email, {
  message: "At least one field must be provided"
});
