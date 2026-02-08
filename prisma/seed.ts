import 'dotenv/config'
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })

export const prisma = new PrismaClient({ adapter });


import bcrypt from "bcrypt"

async function main() {
    // Init data (Dev env)+
    
    const adminRole = await prisma.role.upsert({
        where: { name: "ADMIN" },
        update: {},
        create: { name: "ADMIN" },
    });

    const userRole = await prisma.role.upsert({
        where: { name: "USER" },
        update: {},
        create: { name: "USER" },
    });

    const guestRole = await prisma.role.upsert({
        where: { name: "GUEST" },
        update: {},
        create: { name: "GUEST" },
    });

    const password = await bcrypt.hash("123456", 10);

    const tester = await prisma.user.upsert({
        where: { email: "test@example.com" },
        update: {},
        create: {
            email: "test@example.com",
            password,
            roleId: userRole.id,
        },
    });

    const admin = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            email: "admin@example.com",
            password,
            roleId: adminRole.id,
        },
    });
}

main().catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
}).finally( async ()=> {
    await prisma.$disconnect();
});