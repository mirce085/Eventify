import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/prisma/client";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.passwordHash) {
                    return null;
                }

                const isPasswordValid = await compare(
                    credentials.password,
                    user.passwordHash
                );

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        // You can define custom error, verification pages too
    },
    session: {
        strategy: "jwt" as const,
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };