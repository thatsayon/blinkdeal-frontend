"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { subscribeNewsletter } from "@/lib/api";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const res = await subscribeNewsletter(email);
            setStatus("success");
            setMessage("Thanks for subscribing!");
            setEmail("");
        } catch (error: any) {
            setStatus("error");
            setMessage(error.message || "Something went wrong.");
        }
    };

    return (
        <section>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 rounded-3xl bg-gray-50 px-6 py-8 sm:px-10 lg:px-12 border border-gray-100">
                
                {/* Left: Text */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center text-center sm:text-left gap-5 w-full lg:w-auto">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100">
                        <Mail size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                            Never miss a deal.
                        </h3>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                            Get the best coupons and offers straight to your inbox.
                        </p>
                    </div>
                </div>
                
                {/* Right: Form */}
                <div className="w-full lg:w-auto shrink-0">
                    {status === "success" ? (
                        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-6 py-3.5 text-emerald-700 font-bold text-sm w-full lg:w-[420px] justify-center">
                            <CheckCircle2 size={18} />
                            {message}
                        </div>
                    ) : (
                        <form 
                            className="flex flex-col sm:flex-row gap-3 w-full lg:w-[420px]" 
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === "loading"}
                                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 disabled:opacity-50"
                            >
                                {status === "loading" ? "Subscribing..." : "Subscribe"}
                            </button>
                        </form>
                    )}
                    
                    {status === "error" && (
                        <p className="mt-2 text-center sm:text-left text-xs font-bold text-rose-500 sm:ml-1">
                            {message}
                        </p>
                    )}
                    {status !== "error" && status !== "success" && (
                        <p className="mt-3 text-center sm:text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 sm:ml-1">
                            No spam. Unsubscribe anytime.
                        </p>
                    )}
                </div>
                
            </div>
        </section>
    );
}
