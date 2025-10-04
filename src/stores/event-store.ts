import { create } from 'zustand'
import { Event } from '@prisma/client'

interface EventState {
    events: Event[]
    loading: boolean
    searchTerm: string
    filteredEvents: Event[]

    setEvents: (events: Event[]) => void
    setLoading: (loading: boolean) => void
    setSearchTerm: (term: string) => void
    fetchEvents: () => Promise<void>
}

function pickRandom<T>(arr: T[], n: number): T[] {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, n);
}

function filterEvents(term: string, events: Event[]): Event[] {
    const t = term.trim().toLowerCase();

    if (!t) return pickRandom(events, 9);

    const filtered = events.filter(e =>
        e.title.toLowerCase().includes(t) ||
        (e.location ?? '').toLowerCase().includes(t)
    );

    return pickRandom(filtered, 9);
}

export const useEventStore = create<EventState>((set, get) => ({
    events: [],
    loading: false,
    searchTerm: '',
    filteredEvents: [],

    setEvents: (events) => {
        set({ events });
        const { searchTerm } = get();
        set({ filteredEvents: filterEvents(searchTerm, events) });
    },

    setLoading: (loading) => set({ loading }),

    setSearchTerm: (searchTerm) => {
        set({ searchTerm });
        const { events } = get();
        set({ filteredEvents: filterEvents(searchTerm, events) });
    },

    fetchEvents: async () => {
        const { setLoading, setEvents } = get();
        setLoading(true);
        try {
            const response = await fetch("/api/events", { cache: "no-store" });
            const data: Event[] = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    },
}));
