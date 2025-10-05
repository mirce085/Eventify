"use client";

import {Event} from "@prisma/client";
import {Link} from "@/i18n/navigation";
import {useTranslations, useFormatter} from "next-intl";

export function EventCard({ event, showEditButton = true }: { event: Event; showEditButton?: boolean }) {
    const t = useTranslations("card");
    const format = useFormatter();

    const formatDate = (date: Date | string) => {
        return format.dateTime(new Date(date), {
            dateStyle: "long",
            timeStyle: "short"
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
                <p className="text-gray-600 mb-2">{event.location}</p>
                <p className="text-gray-700 mb-3">{formatDate(event.startAt)}</p>

                {event.price != null && (
                    <p className="font-medium">
                        {format.number(Number(event.price), {
                            style: "currency",
                            currency: event.currency || "USD"
                        })}
                    </p>
                )}

                <div className={`mt-4 flex ${showEditButton ? "justify-between" : "justify-start"}`}>
                    <Link
                        href={showEditButton ? `/dashboard/events/${event.id}` : `/events/${event.id}`}
                        className="inline-flex items-center rounded-xl px-4 py-2 text-[16px] font-semibold text-[#1f1d2a] shadow-sm bg-[#f6d44b]"
                    >
                        {t("viewDetails")}
                    </Link>

                    {showEditButton && (
                        <Link
                            href={`/dashboard/events/${event.id}/edit`}
                            className="inline-flex items-center rounded-xl px-4 py-2 text-[16px] font-semibold text-[#1f1d2a] shadow-sm bg-[#f6d44b]"
                        >
                            {t("edit")}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}