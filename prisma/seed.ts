import { PrismaClient, Prisma, EventStatus } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Create a demo user first
    const user = await prisma.user.upsert({
        where: { email: 'demo@example.com' },
        update: {},
        create: {
            email: 'demo@example.com',
            name: 'Demo User',
            passwordHash: await hash('password123', 10),
        },
    });

    console.log(`Created user: ${user.email}`);

    // Sample events
    const events = [
        {
            title: 'Tech Conference 2023',
            description: 'Annual technology conference featuring the latest innovations.',
            startAt: new Date('2023-11-15T09:00:00Z'),
            endAt: new Date('2023-11-17T18:00:00Z'),
            city: 'San Francisco',
            countryCode: 'US',
            address: '123 Tech Blvd',
            coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
            price: new Prisma.Decimal(299.99),
            currency: 'USD',
            status: EventStatus.PUBLISHED, // Use the enum value
            organizerId: user.id,
        },
        {
            title: 'Music Festival',
            description: 'Three days of amazing music performances.',
            startAt: new Date('2023-10-20T16:00:00Z'),
            endAt: new Date('2023-10-22T23:00:00Z'),
            city: 'Austin',
            countryCode: 'US',
            address: '456 Festival Park',
            coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
            price: new Prisma.Decimal(149.99),
            currency: 'USD',
            status: EventStatus.PUBLISHED, // Use the enum value
            organizerId: user.id,
        },
        {
            title: 'Business Workshop',
            description: 'Learn essential business skills from industry experts.',
            startAt: new Date('2023-09-25T10:00:00Z'),
            endAt: new Date('2023-09-25T16:00:00Z'),
            city: 'New York',
            countryCode: 'US',
            address: '789 Business Center',
            coverImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72',
            price: new Prisma.Decimal(79.99),
            currency: 'USD',
            status: EventStatus.PUBLISHED, // Use the enum value
            organizerId: user.id,
        },
    ];

    for (const eventData of events) {
        const event = await prisma.event.create({
            data: eventData,
        });
        console.log(`Created event: ${event.title}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });