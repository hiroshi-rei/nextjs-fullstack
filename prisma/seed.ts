import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })

export const prisma = new PrismaClient({ adapter });


import bcrypt from "bcrypt"
import { clear } from "console";


async function main() {

    const password = await bcrypt.hash("123456", 10);

    await prisma.user.upsert({
        where: { email: "test@example.com" },
        update: {},
        create: {
        
            email: "test@example.com",
            password,
        },
    });
}

main().catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
}).finally( async ()=> {
    await prisma.$disconnect();
});