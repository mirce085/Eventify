'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton()
{
    const callbackUrl = '/';
    const handleClick = () => {
        signOut({callbackUrl});
    };

    return (
        <button type="button" onClick={handleClick} className="inline-flex items-center rounded-xl px-4 py-2 text-[16px] font-semibold text-[#1f1d2a] shadow-sm bg-[#f6d44b] cursor-pointer">
            Sign Out
        </button>
    );
}