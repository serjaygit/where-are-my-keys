import { prisma } from "../../lib/prisma.js";
import type { ContactBody } from "./schema.js";

export const contactRepository = {
  create(data: ContactBody) {
    return prisma.message.create({ data });
  },
};
