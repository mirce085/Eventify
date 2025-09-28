'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Event, User } from '@prisma/client';

type EventWithOrganizer = Event & {
    organizer: Pick<User, 'id' | 'name'>;
};

export default function EventDetails({ params }: { params: { id: string } }) {
    const [event, setEvent] = useState<EventWithOrganizer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchEvent() {
            try {
                const response = await fetch(`/api/events/${params.id}`);
                if (!response.ok) {
                    throw new Error('Event not found');
                }
                const data = await response.json();
                setEvent(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchEvent();
    }, [params.id]);

    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this event?')) {
            return;
        }

        try {
            const response = await fetch(`/api/events/${params.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
            }

            router.push('/dashboard');
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to delete event');
        }
    }

    if (loading) return <div className="container mx-auto p-4">Loading...</div>;
    if (error) return <div className="container mx-auto p-4">Error: {error}</div>;
    if (!event) return <div className="container mx-auto p-4">Event not found</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <Link href="/dashboard" className="text-blue-500 hover:text-blue-700">
                    &larr; Back to Dashboard
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {event.coverImage && (
                    <div className="h-64 overflow-hidden">
                        <img
                            src={event.coverImage}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
                        <div className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">
                            {event.status}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Event Details</h2>
                            <p className="text-gray-700 mb-2">
                                <strong>When:</strong>{' '}
                                {new Date(event.startAt).toLocaleString()} to{' '}
                                {new Date(event.endAt).toLocaleString()}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>Where:</strong> {event.address}, {event.city}, {event.countryCode}
                            </p>
                            {event.price && (
                                <p className="text-gray-700 mb-2">
                                    <strong>Price:</strong> {Number(event.price).toFixed(2)} {event.currency}
                                </p>
                            )}
                            <p className="text-gray-700 mb-2">
                                <strong>Organizer:</strong> {event.organizer.name || 'Unknown'}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">Description</h2>
                            <p className="text-gray-700">{event.description || 'No description provided.'}</p>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Link
                            href={`/dashboard/events/${event.id}/edit`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Edit Event
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Delete Event
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}