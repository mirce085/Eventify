import React from 'react';
import { Star, MapPin, Calendar, Clock, DollarSign } from 'lucide-react';

interface TicketTier {
    name: string;
    price: number;
    currency: string;
    quantity?: number;
}

interface Event {
    id: string;
    title: string;
    description?: string | null;
    startAt: Date | string;
    endAt: Date | string;
    city: string;
    countryCode: string;
    venue?: string | null;
    address?: string | null;
    coverImage?: string | null;
    price?: number | string | null;
    currency?: string | null;
    tickets?: TicketTier[] | null;
    capacity?: number | null;
    remaining?: number | null;
    status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED';
    organizerId: string;
    category?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
}

interface EventCardProps {
    event: Event;
    interested?: number;
    isFavorited?: boolean;
    onToggleFavorite?: (eventId: string) => void;
    onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
                                                 event,
                                                 interested = 0,
                                                 isFavorited = false,
                                                 onToggleFavorite,
                                                 onClick
                                             }) => {
    // Format date and time
    const formatDate = (date: Date | string) => {
        const d = new Date(date);
        return {
            month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
            day: d.getDate(),
            time: d.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }),
            fullTime: `${d.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })}`
        };
    };

    const startDate = formatDate(event.startAt);
    const endDate = formatDate(event.endAt);

    // Format price display
    const formatPrice = () => {
        if (event.price && event.currency) {
            const currencySymbols: { [key: string]: string } = {
                'USD': '$',
                'EUR': '€',
                'GBP': '£',
                'INR': '₹',
                'AZN': '₼'
            };
            const symbol = currencySymbols[event.currency] || event.currency;
            return `${symbol} ${parseFloat(event.price.toString()).toFixed(0)}`;
        }
        return 'Free';
    };

    // Determine if event is online or has a physical location
    const isOnline = !event.venue && !event.address;
    const location = isOnline ? 'Online' : event.venue || `${event.city}, ${event.countryCode}`;

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onToggleFavorite) {
            onToggleFavorite(event.id);
        }
    };

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] max-w-sm"
            onClick={onClick}
        >
            {/* Image Container with Category Badge */}
            <div className="relative h-48 bg-gray-200">
                {event.coverImage ? (
                    <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white opacity-50" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}

                {/* Favorite Button */}
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                    aria-label="Toggle favorite"
                >
                    <Star
                        className={`w-5 h-5 ${isFavorited ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                    />
                </button>

                {/* Category Badge */}
                {event.category && (
                    <div className="absolute bottom-3 left-3">
            <span className="bg-yellow-400 text-black text-sm font-medium px-3 py-1 rounded">
              {event.category}
            </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Date */}
                <div className="flex items-start gap-4 mb-3">
                    <div className="text-center">
                        <div className="text-indigo-600 font-bold text-lg">{startDate.month}</div>
                        <div className="text-2xl font-bold text-gray-900">{startDate.day}</div>
                    </div>

                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2 line-clamp-2">
                            {event.title}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{location}</span>
                        </div>

                        {/* Time */}
                        <div className="flex items-center text-gray-600 text-sm mb-3">
                            <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span>{startDate.time} - {endDate.time}</span>
                        </div>

                        {/* Price and Interested */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-900 font-semibold">
                                {formatPrice() !== 'Free' && <DollarSign className="w-4 h-4 mr-1" />}
                                <span>{formatPrice()}</span>
                            </div>

                            {interested > 0 && (
                                <div className="flex items-center text-gray-600 text-sm">
                                    <Star className="w-4 h-4 mr-1 text-indigo-600" />
                                    <span>{interested} interested</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status Badge (if not published) */}
                {event.status !== 'PUBLISHED' && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
            <span className={`text-xs font-medium px-2 py-1 rounded ${
                event.status === 'DRAFT'
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-red-100 text-red-600'
            }`}>
              {event.status}
            </span>
                    </div>
                )}
            </div>
        </div>
    );
};

// Example usage with demo data
const EventCardDemo = () => {
    const [favorited, setFavorited] = React.useState(false);

    const demoEvent: Event = {
        id: 'clxyz123',
        title: 'Event title that can go up to two lines',
        description: 'Join us for an exciting technology and innovation conference',
        startAt: new Date('2024-11-22T00:00:00'),
        endAt: new Date('2024-11-22T00:00:00'),
        city: 'Baku',
        countryCode: 'AZ',
        venue: null,
        address: null,
        coverImage: null,
        price: 499,
        currency: 'INR',
        tickets: null,
        capacity: 500,
        remaining: 490,
        status: 'PUBLISHED',
        organizerId: 'user123',
        category: 'Technology & Innovation',
        createdAt: new Date(),
        updatedAt: new Date()
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
            <EventCard
                event={demoEvent}
                interested={10}
                isFavorited={favorited}
                onToggleFavorite={() => setFavorited(!favorited)}
                onClick={() => console.log('Card clicked')}
            />
        </div>
    );
};

export default EventCardDemo;