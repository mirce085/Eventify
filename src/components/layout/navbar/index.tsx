"use client"

import {useState} from "react";
import Link from "next/link";
import {Ticket} from "lucide-react";
import {LanguageSelector} from "@/components/features/shared/language-selector";
import {ProfileButton} from "@/components/features/shared/profile-button";
import { useTranslations } from 'next-intl';

export default function EventifyHeader() {
    const t = useTranslations('navigation');
    const [open, setOpen] = useState(false);
    const primaryBg = "bg-[#2c2a38]";
    const brandYellow = "#f6d44b";

    const NavLink = ({href, children, active = false}: {
        href: string;
        children: React.ReactNode;
        active?: boolean
    }) => (
        <li className="relative">
            <Link href={href} className="px-3 py-2 text-[17px] text-white/90 hover:text-white transition-colors">
                {children}
            </Link>
            {active && (
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[4px] w-8 rounded-sm"
                     style={{background: brandYellow}}/>
            )}
        </li>
    );

    return (
        <header className={`${primaryBg} sticky top-0 z-50 w-full shadow-sm`}
                style={{letterSpacing: ".2px"}}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">

                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
                            <Ticket className="h-5 w-5 text-white"/>
                        </div>
                        <span className="text-2xl font-bold" style={{color: brandYellow}}>Eventify</span>
                    </Link>

                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-6">
                            <NavLink href="/" active>{t('home')}</NavLink>
                            <NavLink href="/events">{t('events')}</NavLink>
                            <NavLink href="/about">{t('about')}</NavLink>
                            <NavLink href="/contact">{t('contact')}</NavLink>
                        </ul>
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/dashboard/events/new"
                            className="text-white/90 hover:text-white transition-colors text-[17px]"
                        >
                            {t('createEvent')}
                        </Link>

                        {/* Replace static buttons with ProfileButton */}
                        <ProfileButton />

                        <LanguageSelector/>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md ring-1 ring-white/10 text-white/90"
                        onClick={() => setOpen((s) => !s)}
                        aria-label="Toggle menu"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden border-t border-white/10" style={{background: "rgba(0,0,0,0.15)"}}>
                    <div className="mx-auto max-w-7xl px-4 py-4 space-y-3">
                        <Link href="/" className="block text-white/90 text-[17px]">{t('home')}</Link>
                        <Link href="/events" className="block text-white/90 text-[17px]">{t('events')}</Link>
                        <Link href="/about" className="block text-white/90 text-[17px]">{t('about')}</Link>
                        <Link href="/contact" className="block text-white/90 text-[17px]">{t('contact')}</Link>
                        <div className="h-px bg-white/10 my-2"/>
                        <Link href="/create" className="block text-white/90 text-[17px]">{t('createEvent')}</Link>

                        {/* Mobile ProfileButton */}
                        <div className="pt-2">
                            <ProfileButton />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}