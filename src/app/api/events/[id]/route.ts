import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/prisma/client";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const event = await prisma.event.findUnique({
            where: {
                id: id,
            },
            include: {
                organizer: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
            },
        });

        if (!event) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        return NextResponse.json(
            { error: 'Failed to fetch event' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // In a real app, add auth check here

        const deletedEvent = await prisma.event.delete({
            where: {
                id: params.id,
            },
        });

        return NextResponse.json(deletedEvent);
    } catch (error) {
        console.error('Error deleting event:', error);
        return NextResponse.json(
            { error: 'Failed to delete event' },
            { status: 500 }
        );
    }
}

// Add this to the existing route.ts file for [id]

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json();

        // In a real app, add auth check here

        const updatedEvent = await prisma.event.update({
            where: {
                id: params.id,
            },
            data: {
                title: data.title,
                description: data.description,
                startAt: new Date(data.startAt),
                endAt: new Date(data.endAt),
                location: data.location,
                coverImage: data.coverImage,
                price: data.price ? parseFloat(data.price) : null,
                currency: data.currency,
            },
        });

        return NextResponse.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        return NextResponse.json(
            { error: 'Failed to update event' },
            { status: 500 }
        );
    }
}