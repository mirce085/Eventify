"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { defaultLocale, Locale } from "@/i18n/locales";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { useCallback } from "react";

export function LanguageSelector() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale() as Locale;

    const handleLanguageChange = useCallback(
        (value: Locale) => {
            router.push(pathname, { locale: value });
        },
        [pathname, router]
    );

    return (
        <Select
            value={currentLocale}
            onValueChange={handleLanguageChange}
            defaultValue={defaultLocale}
        >
            <SelectTrigger className="bg-black text-white">
                <SelectValue placeholder="Select a language" />
                <Globe />
            </SelectTrigger>
            <SelectContent className="bg-black text-white">
                <SelectItem value="en" className="text-white">
                    English
                </SelectItem>
                <SelectItem value="ru" className="text-white">
                    Русский
                </SelectItem>
            </SelectContent>
        </Select>
    );
}
