import type { Metadata } from "next";
import Link from "next/link";
import { 
    Shirt, 
    Laptop, 
    Home, 
    Sparkles, 
    Plane, 
    Coffee, 
    Dumbbell, 
    Car, 
    Gamepad2, 
    Heart, 
    BookOpen, 
    Briefcase,
    ArrowRight,
    Grid,
    Tag
} from "lucide-react";
import { getCategories } from "@/lib/api";

export const metadata: Metadata = {
    title: "Coupon Categories — Shop by Category",
    description: "Explore verified coupon codes and deals organized by category. Find discounts on Fashion, Electronics, Beauty, Home, Travel, Sports, and more.",
    alternates: { canonical: "https://blinkdeal.cc/categories" },
};

const categoryStyles: Record<string, any> = {
    fashion: { icon: Shirt, color: "text-rose-600", bg: "bg-rose-50" },
    electronics: { icon: Laptop, color: "text-blue-600", bg: "bg-blue-50" },
    home: { icon: Home, color: "text-emerald-600", bg: "bg-emerald-50" },
    beauty: { icon: Sparkles, color: "text-pink-600", bg: "bg-pink-50" },
    travel: { icon: Plane, color: "text-sky-600", bg: "bg-sky-50" },
    food: { icon: Coffee, color: "text-orange-600", bg: "bg-orange-50" },
    sports: { icon: Dumbbell, color: "text-indigo-600", bg: "bg-indigo-50" },
    automotive: { icon: Car, color: "text-gray-600", bg: "bg-gray-100" },
    toys: { icon: Gamepad2, color: "text-purple-600", bg: "bg-purple-50" },
    health: { icon: Heart, color: "text-red-600", bg: "bg-red-50" },
    books: { icon: BookOpen, color: "text-yellow-600", bg: "bg-yellow-50" },
    business: { icon: Briefcase, color: "text-teal-600", bg: "bg-teal-50" },
};

export default async function CategoriesPage() {
    const apiCategories = await getCategories();

    return (
        <main className="min-h-screen bg-white pb-24">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                
                {/* Minimalist Editorial Header */}
                <div className="mb-16 border-b-2 border-gray-900 pb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-900">
                            <Grid size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Directory</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900">
                        Shop by Category.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-gray-500 font-medium leading-relaxed">
                        Explore thousands of verified promo codes organized by category. From the latest tech to daily essentials, find exactly what you're looking for.
                    </p>
                </div>

                {/* Ledger-style Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                    {apiCategories.map((category) => {
                        const style = categoryStyles[category.slug] || { icon: Tag, color: "text-gray-900", bg: "bg-gray-100" };
                        const Icon = style.icon;
                        
                        return (
                            <Link 
                                key={category.slug}
                                href={`/categories/${category.slug}`} 
                                className="group block border-t-2 border-gray-100 pt-6 transition-all hover:border-gray-900"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-5">
                                        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${style.bg} ${style.color} transition-transform group-hover:scale-110`}>
                                            <Icon size={22} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm font-medium text-gray-500 mt-1">
                                                {category.coupon_count} active deals
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowRight className="text-gray-300 transition-all group-hover:text-gray-900 group-hover:-translate-x-1" size={20} />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom CTA / Promo block */}
                <div className="mt-24 rounded-3xl bg-gray-900 p-8 sm:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[80px]" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-purple-500/20 blur-[80px]" />
                    
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Don't see your category?</h2>
                            <p className="mt-2 text-gray-400 max-w-md leading-relaxed">Search across all our stores and deals to find exactly what you need.</p>
                        </div>
                        <div className="w-full sm:w-auto shrink-0 relative">
                            <input 
                                type="text" 
                                placeholder="Search deals..." 
                                className="w-full sm:w-72 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 rounded bg-white/20 text-white text-[10px] font-bold">
                                ↵
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </main>
    );
}
