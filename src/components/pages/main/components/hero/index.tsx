"use client";

import * as React from "react";
import {Search, MapPin, ChevronDown} from "lucide-react";
import {EventCard} from "@/components/features/shared/event-card";
import {useEffect, useState} from "react";
import {Event} from "@prisma/client";


function pickRandom<T>(arr: T[], n: number): T[] {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, n);
}

export default function EventifyHero() {
    const [country, setCountry] = React.useState<string>("Azerbaijan");
    const [events, setEvents] = useState<Event[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch("/api/events", {cache: "no-store"});
                const data: Event[] = await response.json();
                setEvents(pickRandom(data, 9));
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }

        fetchEvents();
    }, []);

    const countries = React.useMemo(
        () =>
            [
                "Azerbaijan",
                "India",
                "United States",
                "United Kingdom",
                "Germany",
                "France",
                "Turkey",
                "United Arab Emirates",
                "Russia",
                "Spain",
                "Italy",
                "Canada",
                "Australia",
                "Japan",
                "Singapore",
            ],
        []
    );

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <section className="relative isolate h-[70vh] min-h-[520px] w-full overflow-hidden">
                {/* Background */}
                <img
                    src="/hero.jpg"
                    alt=""
                    className="object-cover"
                    sizes="100vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40"/>

                {/* Content */}
                <div
                    className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center text-white">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                        Don’t miss out!
                    </h1>

                    <p className="mx-auto mb-10 max-w-5xl text-balance text-xl font-semibold leading-relaxed sm:text-2xl md:text-3xl">
                        Explore the{" "}
                        <span className="text-yellow-400">vibrant events</span>{" "}
                        happening locally and globally.
                    </p>

                    {/* Search Bar */}
                    <div
                        className="w-full mx-auto grid h-16 grid-cols-[1fr_auto] overflow-hidden rounded-full border border-white/15 bg-white/95 shadow-xl backdrop-blur">
                        {/* Query input */}
                        <label htmlFor="query" className="sr-only">
                            Search Events, Categories, Location
                        </label>
                        <div className="flex items-center gap-3 px-6">
                            <Search className="size-5 shrink-0 text-neutral-400" aria-hidden/>
                            <input
                                id="query"
                                name="query"
                                type="text"
                                placeholder="Search Events, Categories, Location,..."
                                className="w-full border-0 bg-transparent text-base text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-0"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Location selector */}
                        <div className="flex items-center gap-3 border-l border-neutral-200/70 bg-white px-6">
                            <MapPin className="size-6 shrink-0 text-neutral-700" aria-hidden/>
                            <button
                                type="button"
                                aria-haspopup="listbox"
                                aria-expanded="false"
                                className="flex items-center gap-2 text-base font-medium text-neutral-900"
                            >
                                Mumbai
                                <ChevronDown className="size-4" aria-hidden/>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 mt-[10px]">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Interested Events</h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <EventCard key={event.id} event={event}/>
                        ))
                    ) : (
                        <p>No events found.</p>
                    )}
                </div>
            </section>
        </>
    );
}
