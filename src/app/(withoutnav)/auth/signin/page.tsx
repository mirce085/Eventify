"use client";
import {useState} from "react";
import Link from "next/link";
import {Eye, EyeOff, Ticket, X} from "lucide-react";
import { signIn } from "next-auth/react";



export default function EventifySignIn() {
    const [showPwd, setShowPwd] = useState(false);
    const brandYellow = "#f6d44b";

    return (
        <main className="min-h-screen bg-[#f4f3f2] flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-6xl">
                <div className="grid md:grid-cols-[44%_56%] bg-white shadow-sm overflow-hidden rounded-[28px] md:rounded-[40px]">
                    <aside className="relative order-1 md:order-none bg-[#2c2a38] text-white p-8 md:p-12">
                        <div className="flex items-center gap-2 select-none">
                            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
                                <Ticket className="h-5 w-5 text-white"/>
                            </div>
                            <span className="text-2xl font-bold" style={{color: brandYellow}}>Eventify</span>
                        </div>

                        <div className="mt-12 md:mt-16">
                            <h2 className="text-3xl md:text-4xl font-extrabold leading-snug tracking-tight">
                                Discover tailored
                                <br/> events.
                                <br/>
                                <span className="inline-block mt-2">Sign in for personalized</span>
                                <br/> recommendations
                                <br/> today!
                            </h2>
                        </div>
                    </aside>

                    <section className="relative p-6 sm:p-10 md:p-12 lg:p-16">
                        <Link
                            href="/"
                            aria-label="Back to home"
                            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center"
                        >
                            <X className="h-5 w-5" />
                        </Link>
                        <div className="mx-auto w-full max-w-xl">
                            <h1 className="text-center text-3xl md:text-4xl font-extrabold text-[#2c2a38]">Create
                                Account</h1>

                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={() => signIn("google", { callbackUrl: "/" })}
                                    className="w-full inline-flex items-center justify-center rounded-md border border-black/10 bg-white px-4 py-2.5 text-[15px] font-medium text-gray-800 hover:bg-gray-50 transition">
                                    <GoogleIcon className="h-5 w-5"/>
                                    Login with Google
                                </button>
                            </div>

                            <div className="mt-8 flex items-center gap-4 text-gray-400">
                                <span className="h-px flex-1 bg-gray-200"/>
                                <span className="text-xs font-semibold tracking-widest">OR</span>
                                <span className="h-px flex-1 bg-gray-200"/>
                            </div>

                            <form className="mt-8 space-y-5">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail
                                        Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your e-mail"
                                        className="w-full rounded-md border border-gray-200 bg-white px-3.5 py-3 text-[15px] outline-none ring-0 focus:border-gray-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password"
                                           className="text-sm font-medium text-gray-700">Password</label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPwd ? "text" : "password"}
                                            placeholder="Enter password"
                                            className="w-full rounded-md border border-gray-200 bg-white px-3.5 py-3 pr-11 text-[15px] outline-none ring-0 focus:border-gray-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPwd((s) => !s)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                            aria-label={showPwd ? "Hide password" : "Show password"}
                                        >
                                            {showPwd ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                                        </button>
                                    </div>
                                </div>

                                <button

                                    type="submit"
                                    className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-[#2c2a38] px-4 py-3 text-[15px] font-semibold text-white shadow-sm hover:opacity-95 transition"
                                >
                                    Login
                                </button>
                            </form>

                            <p className="mt-4 text-sm text-gray-600">
                                Do not have an account?{" "}
                                <Link href="/auth/signup" className="font-medium text-gray-700 hover:underline">Sign Up</Link>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

function GoogleIcon({className = "h-5 w-5"}: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#EA4335"
                  d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.7-2.6-5.7-5.8s2.6-5.8 5.7-5.8c1.8 0 3 0.8 3.7 1.5l2.5-2.4C16.9 3.1 14.7 2 12 2 6.9 2 2.8 6.1 2.8 11.2S6.9 20.4 12 20.4c6.1 0 8.4-4.2 8.4-6.3 0-.4 0-.7-.1-1H12z"/>
        </svg>
    );
}
