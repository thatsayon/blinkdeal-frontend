import type { Metadata } from "next";
import Link from "next/link";
import { Users, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "About BlinkDeal — Our Mission & Story",
    description: "Learn about BlinkDeal's mission to help shoppers find the best verified coupon codes and deals. Trusted by millions of savvy shoppers worldwide.",
    alternates: { canonical: "https://blinkdeal.cc/about" },
};


export default function About() {
    return (
        <main className="pb-12">
            {/* Hero Section */}
            <section className="bg-gray-900 py-20 sm:py-32 text-center px-4 rounded-b-[3rem] mx-2 sm:mx-4 mt-2 sm:mt-4 shadow-2xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
                    Saving you money is our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">obsession.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 font-medium">
                    BlinkDeal was built with a single purpose: to make sure you never pay full price on the internet again. 
                </p>
            </section>

            {/* Editorial Narrative */}
            <section className="mx-auto max-w-4xl px-4 py-24 sm:py-32">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-16 leading-tight">
                    The internet is full of fake coupons.<br className="hidden sm:block" /> We built the antidote.
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                    <div className="md:col-span-4">
                        <p className="text-sm font-bold uppercase tracking-widest text-gray-400 md:pt-2">Our Story</p>
                    </div>
                    <div className="md:col-span-8 space-y-8 text-lg leading-relaxed text-gray-600">
                        <p>
                            It usually happens right at checkout. You see the promo code box, open a new tab, and search for a discount. What follows is 15 minutes of frustration—copying and pasting expired codes, clicking through aggressive pop-ups, and ultimately paying full price anyway.
                        </p>
                        <p>
                            The coupon industry is broken. It's flooded with sites that prioritize ad revenue over actually helping you save money. They leave expired codes active just to rank on search engines. 
                        </p>
                        <p className="text-gray-900 font-medium text-xl">
                            We decided to fix it.
                        </p>
                        <p>
                            BlinkDeal isn't just another coupon site. It's a highly curated, actively managed database of discounts. We leverage advanced verification systems and a dedicated internal team to ensure that when you copy a code from BlinkDeal, it actually works.
                        </p>
                    </div>
                </div>

                <hr className="my-24 border-gray-100" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                    <div className="md:col-span-4">
                        <p className="text-sm font-bold uppercase tracking-widest text-gray-400 md:pt-2">Our Promise</p>
                    </div>
                    <div className="md:col-span-8 space-y-8 text-lg leading-relaxed text-gray-600">
                        <p>
                            We promise to respect your time. That means no hidden codes that require you to click before revealing them. No intrusive pop-ups. No expired codes left up just to generate clicks.
                        </p>
                        <p>
                            Just a clean, fast, and beautiful interface designed to do exactly one thing: save you money instantly.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
