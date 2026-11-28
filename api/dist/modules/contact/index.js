import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { contactSchema } from "./schema.js";
import { contactRepository } from "./repository.js";
export const contactModule = new Hono();
contactModule.post("/", zValidator("json", contactSchema), async (c) => {
    try {
        const data = c.req.valid("json");
        const message = await contactRepository.create(data);
        return c.json(message, 201);
    }
    catch (error) {
        console.error("Contact creation error:", error);
        return c.json({ message: "Internal server error" }, 500);
    }
});
