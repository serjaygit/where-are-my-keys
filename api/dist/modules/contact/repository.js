import { prisma } from "../../lib/prisma.js";
export const contactRepository = {
    create(data) {
        return prisma.message.create({ data });
    },
};
