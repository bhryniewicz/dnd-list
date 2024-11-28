import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  link: z.string().url({ message: "Invalid link format" }),
});

export type FormValues = z.infer<typeof schema>;
