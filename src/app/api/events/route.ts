import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            orderBy: {
                startAt: 'asc',
            },
            include: {
                organizer: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        });

        // Make sure you're returning the array directly
        return NextResponse.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}


export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // In a real application, you would get the user ID from an authenticated session
        // For now, we'll get the first user or create one if none exists
        let organizer = await prisma.user.findFirst();

        if (!organizer) {
            organizer = await prisma.user.create({
                data: {
                    name: 'Demo User',
                    email: 'demo@example.com',
                },
            });
        }

        const event = await prisma.event.create({
            data: {
                title: data.title,
                description: data.description,
                startAt: new Date(data.startAt),
                location: data.location,
                endAt: new Date(data.endAt),
                coverImage: data.coverImage,
                price: data.price ? parseFloat(data.price) : null,
                currency: data.currency,
                organizerId: organizer.id,
            },
        });

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { error: 'Failed to create event' },
            { status: 500 }
        );
    }
}