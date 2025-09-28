'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

type EventFormData = {
    title: string;
    description: string;
    startAt: string;
    endAt: string;
    city: string;
    countryCode: string;
    address?: string;
    coverImage?: string;
    price?: string;
    currency: string;
    status: 'PUBLISHED' | 'DRAFT';
};

export default function CreateEvent() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<EventFormData>({
        defaultValues: {
            currency: 'USD',
            status: 'PUBLISHED',
        }
    });

    const onSubmit = async (data: EventFormData) => {
        setIsSubmitting(true);

        try {
            const eventData = {
                ...data,
                price: data.price ? parseFloat(data.price) : null,
            };

            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                throw new Error('Failed to create event');
            }

            router.push('/dashboard');
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create event. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link href="/dashboard" className="text-blue-500 hover:text-blue-700">
                    &larr; Back to Dashboard
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6">Create New Event</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Title */}
                        <div>
                            <label className="block text-gray-700 mb-1">Event Title *</label>
                            <input
                                {...register('title', { required: 'Title is required' })}
                                className="w-full p-2 border rounded"
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>

                        {/* Cover Image */}
                        <div>
                            <label className="block text-gray-700 mb-1">Cover Image URL</label>
                            <input
                                {...register('coverImage')}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="block text-gray-700 mb-1">Start Date and Time *</label>
                            <input
                                type="datetime-local"
                                {...register('startAt', { required: 'Start date is required' })}
                                className="w-full p-2 border rounded"
                            />
                            {errors.startAt && <p className="text-red-500 text-sm">{errors.startAt.message}</p>}
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-gray-700 mb-1">End Date and Time *</label>
                            <input
                                type="datetime-local"
                                {...register('endAt', { required: 'End date is required' })}
                                className="w-full p-2 border rounded"
                            />
                            {errors.endAt && <p className="text-red-500 text-sm">{errors.endAt.message}</p>}
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-gray-700 mb-1">City *</label>
                            <input
                                {...register('city', { required: 'City is required' })}
                                className="w-full p-2 border rounded"
                            />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                        </div>

                        {/* Country Code */}
                        <div>
                            <label className="block text-gray-700 mb-1">Country Code *</label>
                            <input
                                {...register('countryCode', {
                                    required: 'Country code is required',
                                    maxLength: { value: 2, message: 'Use 2-letter code (US, GB, etc.)' }
                                })}
                                className="w-full p-2 border rounded"
                                placeholder="US, GB, DE, etc."
                            />
                            {errors.countryCode && <p className="text-red-500 text-sm">{errors.countryCode.message}</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-gray-700 mb-1">Address</label>
                            <input
                                {...register('address')}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* Price and Currency */}
                        <div>
                            <label className="block text-gray-700 mb-1">Price</label>
                            <div className="flex">
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    {...register('price')}
                                    className="w-2/3 p-2 border rounded-l"
                                />
                                <select
                                    {...register('currency')}
                                    className="w-1/3 p-2 border rounded-r"
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="AZN">AZN</option>
                                </select>
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-gray-700 mb-1">Status</label>
                            <select
                                {...register('status')}
                                className="w-full p-2 border rounded"
                            >
                                <option value="PUBLISHED">Published</option>
                                <option value="DRAFT">Draft</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 mb-1">Description</label>
                        <textarea
                            {...register('description')}
                            className="w-full p-2 border rounded"
                            rows={4}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded disabled:bg-blue-300"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}