import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Advertise with BlinkDeal \u2014 Reach Millions of Shoppers",
    description: "Partner with BlinkDeal to reach millions of deal-seeking shoppers. Explore our advertising and affiliate partnership opportunities.",
    alternates: { canonical: "https://blinkdeal.cc/advertise" },
};


export default function Advertise() {
    return (
        <main className="min-h-screen bg-white relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[120px]"></div>

            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 sm:py-32 relative z-10">
                
                {/* Hero & Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
                    {/* Left: Typography */}
                    <div className="lg:col-span-8">
                        <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-gray-900 mb-10 leading-[0.95]">
                            Drive <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-emerald-400">revenue</span>.<br />
                            Not just clicks.
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-500 max-w-2xl leading-relaxed font-medium">
                            BlinkDeal connects premium brands with high-intent shoppers exactly at the moment of purchase. Partner with us to acquire new customers and drive measurable GMV.
                        </p>
                    </div>

                    {/* Right: Stats */}
                    <div className="lg:col-span-4 flex flex-col justify-end pt-8 lg:pt-0">
                        <div className="border-t-2 border-gray-900 py-6">
                            <div className="text-5xl font-black text-gray-900 tracking-tighter mb-1">2.5M+</div>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Monthly Shoppers</p>
                        </div>
                        <div className="border-t border-gray-200 py-6">
                            <div className="text-5xl font-black text-gray-900 tracking-tighter mb-1">$150M</div>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">GMV Driven Annually</p>
                        </div>
                        <div className="border-y border-gray-200 py-6">
                            <div className="text-5xl font-black text-gray-900 tracking-tighter mb-1">8.5%</div>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Average Conversion</p>
                        </div>
                    </div>
                </div>

                <div className="my-32 w-full h-px bg-gray-200"></div>

                {/* Opportunities Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
                    <div className="lg:col-span-4">
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 leading-tight">Partnership<br />Opportunities</h2>
                        <p className="mt-6 text-gray-500 font-medium">We offer multiple high-impact placements tailored to your KPIs.</p>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                        
                        <div className="group">
                            <span className="text-sm font-black text-gray-300 mb-4 block group-hover:text-blue-600 transition-colors">01</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Homepage Placements</h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                Feature your brand in our "Trending Coupons" or "Popular Stores" sections for absolute maximum visibility to all incoming traffic.
                            </p>
                        </div>
                        
                        <div className="group">
                            <span className="text-sm font-black text-gray-300 mb-4 block group-hover:text-blue-600 transition-colors">02</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Exclusive Codes</h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                Work with us to provide a BlinkDeal exclusive vanity code. These consistently drive the highest conversion rates and brand trust.
                            </p>
                        </div>
                        
                        <div className="group">
                            <span className="text-sm font-black text-gray-300 mb-4 block group-hover:text-blue-600 transition-colors">03</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Category Sponsorships</h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                Own an entire vertical (e.g., Fashion, Travel) for a set duration to capture extremely high-intent shoppers browsing those specific niches.
                            </p>
                        </div>
                        
                        <div className="group">
                            <span className="text-sm font-black text-gray-300 mb-4 block group-hover:text-blue-600 transition-colors">04</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Newsletter Inclusion</h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                Reach hundreds of thousands of opted-in deal hunters directly in their inbox with our weekly curated savings roundups.
                            </p>
                        </div>
                        
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gray-900 rounded-[3rem] p-12 sm:p-24 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6">Ready to scale your sales?</h2>
                        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
                            We work with brands of all sizes, from direct-to-consumer startups to Fortune 500 retailers. Let's build a custom strategy.
                        </p>
                        <a href="mailto:partners@blinkdeal.cc" className="inline-flex items-center justify-center bg-white px-10 py-5 text-sm font-bold text-gray-900 transition-transform hover:scale-105 rounded-2xl shadow-[0_0_40px_rgb(255,255,255,0.2)]">
                            Request Media Kit
                        </a>
                    </div>
                </div>

            </div>
        </main>
    );
}
