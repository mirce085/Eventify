'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Event } from '@prisma/client';

export default function Dashboard() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch('/api/events');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Events Dashboard</h1>
                <Link
                    href="/dashboard/events/new"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Create New Event
                </Link>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search events by title or city..."
                    className="w-full p-2 border border-gray-300 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <p>Loading events...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <p>No events found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

function EventCard({ event }: { event: Event }) {
    // Format date for display
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
        <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
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
                    {event.city}, {event.countryCode}
                </p>
                <p className="text-gray-700 mb-3">
                    {formatDate(event.startAt)}
                </p>
                {event.price && (
                    <p className="font-medium">
                        {Number(event.price).toFixed(2)} {event.currency}
                    </p>
                )}
                <div className="mt-4 flex justify-between">
                    <Link
                        href={`/dashboard/events/${event.id}`}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        View Details
                    </Link>
                    <Link
                        href={`/dashboard/events/${event.id}/edit`}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
}