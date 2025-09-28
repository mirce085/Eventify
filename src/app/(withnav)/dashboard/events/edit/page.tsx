'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Event } from '@prisma/client';

export default function EditEvent({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startAt: '',
        endAt: '',
        city: '',
        countryCode: '',
        address: '',
        coverImage: '',
        price: '',
        currency: 'USD',
        status: 'PUBLISHED',
    });

    useEffect(() => {
        async function fetchEvent() {
            try {
                const response = await fetch(`/api/events/${params.id}`);
                if (!response.ok) {
                    throw new Error('Event not found');
                }
                const event: Event = await response.json();

                // Format dates for datetime-local input
                const formatDateForInput = (date: Date) => {
                    return new Date(date).toISOString().slice(0, 16);
                };

                setFormData({
                    title: event.title,
                    description: event.description || '',
                    startAt: formatDateForInput(event.startAt),
                    endAt: formatDateForInput(event.endAt),
                    city: event.city,
                    countryCode: event.countryCode,
                    address: event.address || '',
                    coverImage: event.coverImage || '',
                    price: event.price ? String(event.price) : '',
                    currency: event.currency || 'USD',
                    status: event.status,
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }

        fetchEvent();
    }, [params.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Convert string values to appropriate types
            const eventData = {
                ...formData,
                price: formData.price ? parseFloat(formData.price) : null,
                startAt: new Date(formData.startAt).toISOString(),
                endAt: new Date(formData.endAt).toISOString(),
            };

            const response = await fetch(`/api/events/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                throw new Error('Failed to update event');
            }

            router.push(`/dashboard/events/${params.id}`);
        } catch (error) {
            console.error('Error updating event:', error);
            alert('Failed to update event. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div className="container mx-auto p-4">Loading...</div>;
    if (error) return <div className="container mx-auto p-4">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <Link href={`/dashboard/events/${params.id}`} className="text-blue-500 hover:text-blue-700">
                    &larr; Back to Event
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6">Edit Event</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form fields are identical to the create form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="title">
                                Event Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="coverImage">
                                Cover Image URL
                            </label>
                            <input
                                type="text"
                                id="coverImage"
                                name="coverImage"
                                value={formData.coverImage}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="startAt">
                                Start Date and Time *
                            </label>
                            <input
                                type="datetime-local"
                                id="startAt"
                                name="startAt"
                                value={formData.startAt}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="endAt">
                                End Date and Time *
                            </label>
                            <input
                                type="datetime-local"
                                id="endAt"
                                name="endAt"
                                value={formData.endAt}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="city">
                                City *
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="countryCode">
                                Country Code *
                            </label>
                            <input
                                type="text"
                                id="countryCode"
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                                maxLength={2}
                                placeholder="US, GB, DE, etc."
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="address">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="price">
                                Price
                            </label>
                            <div className="flex">
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-2/3 p-2 border border-gray-300 rounded-l"
                                    step="0.01"
                                    min="0"
                                />
                                <select
                                    id="currency"
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleChange}
                                    className="w-1/3 p-2 border border-gray-300 rounded-r"
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="AZN">AZN</option>
                                    {/* Add more currencies as needed */}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="status">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="PUBLISHED">Published</option>
                                <option value="DRAFT">Draft</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows={4}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded disabled:bg-blue-300"
                        >
                            {isSubmitting ? 'Updating...' : 'Update Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}