import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, { message: "To pole nie moze być puste" }),
  link: z
    .string()
    .regex(
      /^(https?:\/\/)([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/[^\s]*)?$/,
      "Podany format linka jest niepoprwany"
    ),
});

export type FormValues = z.infer<typeof schema>;
