import {Link} from "@/i18n/navigation";
import {getTranslations} from "next-intl/server";

export default async function EventifyFooter() {
    const t = await getTranslations("footer");
    const year = new Date().getFullYear();
    const brandYellow = "#f6d44b";

    return (
        <footer
            className="bg-[#2c2a38] text-white border-t border-white/10"
            style={{ letterSpacing: ".2px" }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <p className="text-white/80">{t("tagline")}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase mb-3">{t("links.title")}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-white/90 hover:text-white transition-colors">
                                    {t("links.home")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-white/90 hover:text-white transition-colors">
                                    {t("links.about")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-white/90 hover:text-white transition-colors">
                                    {t("links.contact")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/events/new" className="text-white/90 hover:text-white transition-colors">
                                    {t("links.createEvent")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase mb-3">{t("legal.title")}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/legal/privacy" className="text-white/90 hover:text-white transition-colors">
                                    {t("legal.privacy")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/terms" className="text-white/90 hover:text-white transition-colors">
                                    {t("legal.terms")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase mb-3">{t("contact.title")}</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="mailto:support@eventify.app" className="text-white/90 hover:text-white transition-colors">
                                    support@eventify.app
                                </a>
                            </li>
                            <li>
                                <a href="tel:+1234567890" className="text-white/90 hover:text-white transition-colors">
                                    +1 (234) 567-890
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }} />

                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <p className="text-white/70 text-sm">
                        © {year} Eventify. {t("rights")}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                        <Link href="/legal/privacy" className="text-white/70 hover:text-white transition-colors">
                            {t("legal.privacy")}
                        </Link>
                        <span className="text-white/20">|</span>
                        <Link href="/legal/terms" className="text-white/70 hover:text-white transition-colors">
                            {t("legal.terms")}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}