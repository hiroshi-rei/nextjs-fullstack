import Credentials from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

import bcrypt from "bcrypt";
import { prisma } from "./db"

export const authOption: NextAuthOptions = {
    providers:[
        Credentials({
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials?.password){
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email},
                });

                if (!user) return null;
                
                const isValid = await bcrypt.compare(
                    credentials?.password,
                    user.password
                );

                if (!isValid) return null;

                return {id: user.id, email: user.email};
            },
        }),
    ],

    session:{
        strategy: "jwt",
    },
    pages:{
        signIn: "/login",
    },
};