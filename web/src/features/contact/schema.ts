import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name field cannot be empty"),
  email: z.email("Invalid email address"),
  subject: z.enum([
    "GENERAL",
    "FESTIVAL_SCREENING",
    "PRESS_INTERVIEW",
    "CREATIVE_COLLABORATION",
    "OTHER",
  ]),
  content: z.string().trim().min(1, "Message field cannot be empty"),
});

export type ContactBody = z.infer<typeof contactSchema>;
