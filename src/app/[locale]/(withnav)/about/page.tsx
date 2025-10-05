import {Link} from "@/i18n/navigation";
import {getTranslations} from "next-intl/server";
import {useTranslations} from "next-intl";
import {CalendarDays, Ticket, Users, ShieldCheck, TrendingUp} from "lucide-react";

export async function generateMetadata() {
    const t = await getTranslations("about.meta");
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function AboutPage() {
    const t = useTranslations("about");
    const brandYellow = "#f6d44b";

    return (
        <main className="min-h-screen bg-[#1f1d2a] text-white">
            <section className="relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{t("title")}</h1>
                        <p className="text-white/80 text-lg">{t("subtitle")}</p>
                    </div>
                </div>
            </section>

            <section className="border-t border-white/10" style={{ background: "rgba(0,0,0,0.15)" }}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-2xl font-semibold mb-6">{t("highlights.title")}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                            <CalendarDays className="h-6 w-6 mb-3 text-white" />
                            <h3 className="font-semibold mb-2">{t("highlights.discover.title")}</h3>
                            <p className="text-sm text-white/80">{t("highlights.discover.desc")}</p>
                        </div>
                        <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                            <Users className="h-6 w-6 mb-3 text-white" />
                            <h3 className="font-semibold mb-2">{t("highlights.host.title")}</h3>
                            <p className="text-sm text-white/80">{t("highlights.host.desc")}</p>
                        </div>
                        <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                            <ShieldCheck className="h-6 w-6 mb-3 text-white" />
                            <h3 className="font-semibold mb-2">{t("highlights.tickets.title")}</h3>
                            <p className="text-sm text-white/80">{t("highlights.tickets.desc")}</p>
                        </div>
                        <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                            <TrendingUp className="h-6 w-6 mb-3 text-white" />
                            <h3 className="font-semibold mb-2">{t("highlights.analytics.title")}</h3>
                            <p className="text-sm text-white/80">{t("highlights.analytics.desc")}</p>
                        </div>
                        <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10 sm:col-span-2 lg:col-span-1">
                            <Ticket className="h-6 w-6 mb-3 text-white" />
                            <h3 className="font-semibold mb-2">{t("highlights.marketplace.title")}</h3>
                            <p className="text-sm text-white/80">{t("highlights.marketplace.desc")}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-2xl font-semibold mb-4">{t("mission.title")}</h2>
                    <p className="text-white/80 max-w-3xl">{t("mission.body")}</p>
                </div>
            </section>

            <section className="border-t border-white/10" style={{ background: "rgba(0,0,0,0.15)" }}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-2xl font-semibold mb-6">{t("stats.title")}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                            <div className="text-3xl font-extrabold" style={{ color: brandYellow }}>{t("stats.tickets.value")}</div>
                            <div className="text-white/70 mt-1">{t("stats.tickets.label")}</div>
                        </div>
                        <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                            <div className="text-3xl font-extrabold" style={{ color: brandYellow }}>{t("stats.organizers.value")}</div>
                            <div className="text-white/70 mt-1">{t("stats.organizers.label")}</div>
                        </div>
                        <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                            <div className="text-3xl font-extrabold" style={{ color: brandYellow }}>{t("stats.countries.value")}</div>
                            <div className="text-white/70 mt-1">{t("stats.countries.label")}</div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link
                            href="/contact"
                            className="inline-flex items-center rounded-xl px-4 py-2 text-[16px] font-semibold text-[#1f1d2a] shadow-sm"
                            style={{ background: brandYellow }}
                        >
                            {t("cta.contact")}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}