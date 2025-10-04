import {getTranslations} from "next-intl/server";
import {useTranslations} from "next-intl";
import {Mail, MessageSquare, Phone, Megaphone, Handshake} from "lucide-react";

export async function generateMetadata() {
    const t = await getTranslations("contact.meta");
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function ContactPage() {
    const t = useTranslations("contact");
    const brandYellow = "#f6d44b";

    return (
        <main className="min-h-screen bg-[#1f1d2a] text-white">
            {/* Hero */}
            <section className="relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{t("title")}</h1>
                    <p className="text-white/80 text-lg max-w-3xl">{t("subtitle")}</p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="border-t border-white/10" style={{ background: "rgba(0,0,0,0.15)" }}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                        <Mail className="h-6 w-6 mb-3 text-white" />
                        <h3 className="font-semibold mb-2">{t("support.title")}</h3>
                        <p className="text-sm text-white/80 mb-3">{t("support.desc")}</p>
                        <a
                            href="mailto:support@eventify.app"
                            className="inline-flex items-center rounded-xl px-4 py-2 text-[16px] font-semibold text-[#1f1d2a] shadow-sm"
                            style={{ background: brandYellow }}
                        >
                            {t("support.cta")}
                        </a>
                    </div>

                    <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                        <Handshake className="h-6 w-6 mb-3 text-white" />
                        <h3 className="font-semibold mb-2">{t("business.title")}</h3>
                        <p className="text-sm text-white/80 mb-3">{t("business.desc")}</p>
                        <a
                            href="mailto:partners@eventify.app"
                            className="inline-flex items-center rounded-xl px-4 py-2 text-[16px] font-semibold text-[#1f1d2a] shadow-sm"
                            style={{ background: brandYellow }}
                        >
                            {t("business.cta")}
                        </a>
                    </div>

                    <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                        <Megaphone className="h-6 w-6 mb-3 text-white" />
                        <h3 className="font-semibold mb-2">{t("press.title")}</h3>
                        <p className="text-sm text-white/80 mb-3">{t("press.desc")}</p>
                        <a
                            href="mailto:press@eventify.app"
                            className="inline-flex items-center rounded-xl px-4 py-2 text-[16px] font-semibold text-[#1f1d2a] shadow-sm"
                            style={{ background: brandYellow }}
                        >
                            {t("press.cta")}
                        </a>
                    </div>
                </div>
            </section>

            <section>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                        <Phone className="h-6 w-6 mb-3 text-white" />
                        <h3 className="font-semibold mb-2">{t("sales.title")}</h3>
                        <p className="text-sm text-white/80 mb-3">{t("sales.desc")}</p>
                        <p className="text-sm">
                            <a className="text-white underline underline-offset-4" href="tel:+1234567890">
                                +1 (234) 567-890
                            </a>
                        </p>
                    </div>

                    <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                        <MessageSquare className="h-6 w-6 mb-3 text-white" />
                        <h3 className="font-semibold mb-2">{t("feedback.title")}</h3>
                        <p className="text-sm text-white/80 mb-3">{t("feedback.desc")}</p>
                        <p className="text-sm">
                            <a className="text-white underline underline-offset-4" href="mailto:feedback@eventify.app">
                                feedback@eventify.app
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}