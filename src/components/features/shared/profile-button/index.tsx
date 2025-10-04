"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {useTranslations} from "next-intl";
import SignOutButton from "@/components/features/shared/sign-out-button";

export function ProfileButton() {
    const { data: session, status } = useSession();
    const t = useTranslations('navigation');

    if (status === "authenticated") {
        return (
            <div className="flex items-center gap-2">
                <Link
                    href="/dashboard/events/new"
                    className="text-white/90 hover:text-white transition-colors text-[17px]"
                >
                    {t('createEvent')}
                </Link>

                <Link href="/">
                    {session.user?.image ? (
                        <img
                            src={session.user?.image || ""}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="w-[38px] h-[38px] rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="">{session.user?.name?.charAt(0).toUpperCase()}</span>
                        </div>
                    )}
                </Link>

                <SignOutButton/>
            </div>
        );
    } else {
        return (
            <>
                <Link
                    href="auth/signin"
                    className="text-white/90 hover:text-white transition-colors text-[17px]"
                >
                    {t('login')}
                </Link>
                <Link
                    href="auth/signup"
                    className="inline-flex items-center rounded-xl px-4 py-2 text-[16px] font-semibold text-[#1f1d2a] shadow-sm bg-[#f6d44b]"
                >
                    {t('signUp')}
                </Link>
            </>
        );
    }
}