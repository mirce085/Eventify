import {Link} from "@/i18n/navigation";
import {getTranslations} from "next-intl/server";
import {useTranslations} from "next-intl";

export async function generateMetadata() {
    const t = await getTranslations("legal.privacy.meta");
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function PrivacyPolicyPage() {
    const t = useTranslations("legal.privacy");
    const brandYellow = "#f6d44b";

    return (
        <main className="min-h-screen bg-[#1f1d2a] text-white">
            <section className="relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{t("title")}</h1>
                    <p className="text-white/80 text-lg max-w-3xl">{t("intro")}</p>
                    <p className="text-white/60 text-sm mt-2">{t("updated")}</p>
                </div>
            </section>

            <section className="border-t border-white/10" style={{ background: "rgba(0,0,0,0.15)" }}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                    {/* Collection */}
                    <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                        <h2 className="text-2xl font-semibold mb-2">{t("sections.collection.title")}</h2>
                        <p className="text-white/80">{t("sections.collection.body")}</p>
                    </div>
                    {/* Use */}
                    <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                        <h2 className="text-2xl font-semibold mb-2">{t("sections.use.title")}</h2>
                        <p className="text-white/80">{t("sections.use.body")}</p>
                    </div>
                    {/* Sharing */}
                    <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                        <h2 className="text-2xl font-semibold mb-2">{t("sections.sharing.title")}</h2>
                        <p className="text-white/80">{t("sections.sharing.body")}</p>
                    </div>
                    {/* Security */}
                    <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                        <h2 className="text-2xl font-semibold mb-2">{t("sections.security.title")}</h2>
                        <p className="text-white/80">{t("sections.security.body")}</p>
                    </div>
                    {/* Rights */}
                    <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                        <h2 className="text-2xl font-semibold mb-2">{t("sections.rights.title")}</h2>
                        <p className="text-white/80">{t("sections.rights.body")}</p>
                    </div>
                    {/* Contact */}
                    <div className="rounded-xl bg-[#2c2a38] p-6 ring-1 ring-white/10">
                        <h2 className="text-2xl font-semibold mb-2">{t("sections.contact.title")}</h2>
                        <p className="text-white/80 mb-4">{t("sections.contact.body")}</p>
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