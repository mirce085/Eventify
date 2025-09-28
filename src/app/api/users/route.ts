import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                favoriteEventIds: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, image, password } = body;

        let passwordHash;
        if (password) {
            passwordHash = await bcrypt.hash(password, 12);
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                image,
                passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                favoriteEventIds: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Unique constraint')) {
            return NextResponse.json(
                { error: 'Email already exists' },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}

