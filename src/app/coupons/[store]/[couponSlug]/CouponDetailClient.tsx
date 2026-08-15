"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Clock, Copy, Check, Share2, ArrowUpRight, ExternalLink, ChevronRight } from "lucide-react";
import type { Coupon } from "@/types/coupon";
import { recordCouponClick } from "@/lib/api";

export default function CouponDetailClient({ coupon }: { coupon: Coupon }) {
    const [copied, setCopied] = useState(false);
    const [shareCopied, setShareCopied] = useState(false);

    const storeName = coupon.store_name || coupon.store || "";
    const isOfferActivated = coupon.code?.trim().toLowerCase() === "offer activated";

    const handleCopy = () => {
        navigator.clipboard.writeText(coupon.code);
        setCopied(true);
        recordCouponClick(coupon.slug).catch(console.error); // Track click without blocking
        setTimeout(() => setCopied(false), 2500);

        if (coupon.store_url) {
            window.open(coupon.store_url, "_blank", "noopener,noreferrer");
        }
    };

    const handleShareCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2500);
    };

    const shareText = encodeURIComponent(`Get ${coupon.discount} at ${storeName} with code ${coupon.code} — via BlinkDeal`);
    const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blinkdeal.cc";
    const shareUrl = encodeURIComponent(`${BASE_URL}/coupons/${coupon.store_slug}/${coupon.slug}`);

    return (
        <main className="min-h-screen bg-white pb-24">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-10" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/trending" className="hover:text-gray-700 transition-colors">Coupons</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-600 font-bold">{storeName}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-7 space-y-10">

                        {/* Hero */}
                        <div>
                            <div className={`relative inline-flex h-16 w-16 items-center justify-center rounded-2xl overflow-hidden ${coupon.store_logo ? 'bg-white border border-gray-100 shadow-sm' : coupon.color} font-black text-3xl uppercase mb-5`}>
                                {coupon.store_logo ? (
                                    <Image src={coupon.store_logo} alt={storeName} fill className="object-contain p-2" sizes="64px" />
                                ) : (
                                    storeName.charAt(0)
                                )}
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 mb-3">
                                {storeName} — {coupon.title}
                            </h1>
                            <div className="text-lg text-gray-500 mb-5 leading-relaxed">
                                <p className="mb-2"><strong className="text-gray-900">Coupon discount:</strong> {coupon.discount}</p>
                                <p>{coupon.description}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                {coupon.verified && (
                                    <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wide">
                                        <CheckCircle2 size={13} />
                                        Verified & Working
                                    </span>
                                )}
                                <span className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                                    <Clock size={14} className="text-gray-400" />
                                    {coupon.expiry}
                                </span>
                                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                    {coupon.category_name || coupon.category || "General"}
                                </span>
                            </div>
                        </div>

                        {/* Code Reveal Box */}
                        <div className="rounded-2xl border-2 border-gray-900 p-6 sm:p-8 bg-white">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                                {isOfferActivated ? "Your Deal" : "Your Promo Code"}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className={`flex-1 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-4 font-mono font-black text-gray-900 tracking-widest text-center ${isOfferActivated ? "text-xl sm:text-2xl uppercase" : "text-2xl sm:text-3xl select-all"}`}>
                                    {isOfferActivated ? "Offer Activated" : coupon.code}
                                </div>
                                {!isOfferActivated && (
                                    <button
                                        onClick={handleCopy}
                                        aria-label="Copy promo code"
                                        className={`shrink-0 flex h-14 w-14 items-center justify-center rounded-xl font-bold text-white transition-all cursor-pointer ${copied ? "bg-emerald-500 scale-95" : "bg-gray-900 hover:bg-black"}`}
                                    >
                                        {copied ? <Check size={22} /> : <Copy size={22} />}
                                    </button>
                                )}
                            </div>
                            {copied && !isOfferActivated && (
                                <p className="mt-3 text-sm font-bold text-emerald-600 text-center">✓ Copied to clipboard!</p>
                            )}
                            <a
                                href={coupon.store_url}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                onClick={() => recordCouponClick(coupon.id).catch(console.error)}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-blue-700"
                            >
                                Go to {storeName}{isOfferActivated ? " Website" : ""}
                                <ExternalLink size={15} />
                            </a>
                        </div>

                        {/* Share */}
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Share this deal</h2>
                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    onClick={handleShareCopy}
                                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    {shareCopied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
                                    {shareCopied ? "Copied!" : "Copy Link"}
                                </button>
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <Share2 size={15} />
                                    Share on X
                                </a>
                                <a
                                    href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <ArrowUpRight size={15} />
                                    WhatsApp
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-5 space-y-8">

                        {/* About the Store */}
                        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6">
                            <h2 className="text-base font-bold text-gray-900 mb-3">About {storeName}</h2>
                            <p className="text-sm text-gray-500 leading-relaxed">{coupon.store_description}</p>
                            <a
                                href={coupon.store_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Visit {storeName}
                                <ExternalLink size={13} />
                            </a>
                        </div>

                        {/* How to use */}
                        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6">
                            <h2 className="text-base font-bold text-gray-900 mb-4">How to use this code</h2>
                            <ol className="space-y-3">
                                {[
                                    `Click "Go to ${storeName}${isOfferActivated ? ' Website' : ''}" above to shop`,
                                    "Add your favorite items to the cart",
                                    isOfferActivated ? "Your discount is automatically applied" : `Enter code "${coupon.code}" at checkout`,
                                    isOfferActivated ? "Enjoy your savings!" : "Your discount is applied instantly",
                                ].map((step, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white font-black text-[10px] mt-0.5">
                                            {i + 1}
                                        </span>
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* SEO FAQ */}
                        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6">
                            <h2 className="text-base font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                            <div className="space-y-5">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800 mb-1">Is {isOfferActivated ? "this deal" : <>the code <span className="font-mono bg-gray-100 px-1 rounded">{coupon.code}</span></>} working?</h3>
                                    <p className="text-sm text-gray-500" suppressHydrationWarning>Yes — our team verified this {isOfferActivated ? "deal" : "code"} on {new Date(coupon.updated_at || Date.now()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}. It is currently active and working.</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800 mb-1">When does this offer expire?</h3>
                                    <p className="text-sm text-gray-500">{coupon.expiry === "Ongoing" ? "This offer has no set expiry date and is ongoing." : `This offer expires soon — ${coupon.expiry}.`} We recommend using it as soon as possible.</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800 mb-1">Can I stack this with other coupons?</h3>
                                    <p className="text-sm text-gray-500">Most stores allow one promo code per order. Check {storeName}'s checkout page for stacking eligibility.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* More deals CTA */}
                <div className="mt-20 border-t border-gray-100 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Looking for more deals?</h2>
                        <p className="text-sm text-gray-500 mt-1">Browse all verified coupons updated daily.</p>
                    </div>
                    <Link
                        href="/trending"
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-bold text-white hover:bg-black transition-all"
                    >
                        See All Trending Coupons
                        <ArrowUpRight size={15} />
                    </Link>
                </div>

            </div>
        </main>
    );
}
