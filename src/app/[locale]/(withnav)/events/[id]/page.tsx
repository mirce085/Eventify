import {PrismaClient} from "@prisma/client";
import {notFound} from "next/navigation";
import Link from "next/link";

const prisma = new PrismaClient();

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default async function EventReadOnlyPage({ params, }: {
    params: { id: string };
}) {
    const {id} = params;

    const event = await prisma.event.findUnique({
        where: {id},
    });

    if (!event) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="mb-4">
                <Link
                    href="/"
                    className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    ← Return to home
                </Link>
            </div>

            {event.coverImage && (
                <div className="h-64 md:h-80 overflow-hidden rounded-xl mb-6">
                    <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>

            <div className="text-gray-600 mb-4">
                <div>{event.location}</div>
                <div>{formatDate(event.startAt)}</div>
            </div>

            {event.price !== null && event.price !== undefined && (
                <div className="text-lg font-semibold mb-6">
                    {Number(event.price).toFixed(2)} {event.currency}
                </div>
            )}

            {event.description && (
                <div className="prose max-w-none">
                    <p>{event.description}</p>
                </div>
            )}
        </div>
    );
}