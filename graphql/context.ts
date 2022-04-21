import type { Context } from "@types";
import { prisma } from "@lib/prisma";

const context: Context = {
    prisma: prisma
};

export default context;