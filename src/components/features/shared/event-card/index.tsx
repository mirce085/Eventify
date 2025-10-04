import {Event} from "@prisma/client";
import Link from "next/link";

export function EventCard({ event, showEditButton = true }: { event: Event; showEditButton?: boolean }) {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-[]">
            {event.coverImage && (
                <div className="h-48 overflow-hidden">
                    <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-2">
                    {event.location}
                </p>
                <p className="text-gray-700 mb-3">
                    {formatDate(event.startAt)}
                </p>
                {event.price && (
                    <p className="font-medium">
                        {Number(event.price).toFixed(2)} {event.currency}
                    </p>
                )}
                <div className={`mt-4 flex ${showEditButton ? 'justify-between' : 'justify-start'}`}>
                    <Link
                        href={`/events/${event.id}`}
                        className="inline-flex items-center rounded-xl px-4 py-2 text-[16px] font-semibold text-[#1f1d2a] shadow-sm bg-[#f6d44b]"
                    >
                        View Details
                    </Link>
                    {showEditButton && (
                        <Link
                            href={`/dashboard/events/${event.id}/edit`}
                            className="inline-flex items-center rounded-xl px-4 py-2 text-[16px] font-semibold text-[#1f1d2a] shadow-sm bg-[#f6d44b]"
                        >
                            Edit
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}