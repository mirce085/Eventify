"use client";

import * as React from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { EventCard } from "@/components/features/shared/event-card";
import { useEffect } from "react";
import { useEventStore } from "@/stores/event-store";

export default function EventifyHero() {
    const {
        filteredEvents,
        loading,
        searchTerm,
        setSearchTerm,
        fetchEvents
    } = useEventStore();

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);


    return (
        <>
            <section className="relative isolate h-[70vh] min-h-[520px] w-full overflow-hidden">
                <img
                    src="https://picsum.photos/1600/900"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40"/>

                <div
                    className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center text-white">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                        Do not miss out!
                    </h1>

                    <p className="mx-auto mb-10 max-w-5xl text-balance text-xl font-semibold leading-relaxed sm:text-2xl md:text-3xl">
                        Explore the{" "}
                        <span className="text-yellow-400">vibrant events</span>{" "}
                        happening locally and globally.
                    </p>

                    <div
                        className="w-full mx-auto grid h-16 grid-cols-[1fr_auto] overflow-hidden rounded-full border border-white/15 bg-white/95 shadow-xl backdrop-blur">

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

                        <div className="flex items-center gap-3 border-l border-neutral-200/70 bg-white px-6">
                            <MapPin className="size-6 shrink-0 text-neutral-700" aria-hidden/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 mt-[10px]">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Interested Events</h2>

                {loading ? (
                    <div className="text-center py-8">
                        <p>Loading events...</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => (
                                <EventCard key={event.id} event={event} showEditButton={false}/>
                            ))
                        ) : (
                            <p>No events found.</p>
                        )}
                    </div>
                )}
            </section>
        </>
    );
}