"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <footer className="bg-gray-50 border-t border-gray-100 py-12 sm:py-16 mt-auto">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8">
                    
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link href="/" className="text-2xl font-black tracking-tight text-gray-900">
                            BlinkDeal
                        </Link>
                        <p className="mt-4 text-sm font-medium text-gray-500 max-w-xs">
                            Find better deals. Save more. Your ultimate destination for verified coupons and exclusive discounts.
                        </p>
                    </div>
                    
                    {/* Deals */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6">Deals</h4>
                        <ul className="space-y-4">
                            <li><Link href="/stores" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Stores</Link></li>
                            <li><Link href="/categories" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Categories</Link></li>
                            <li><Link href="/trending" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Trending Coupons</Link></li>
                        </ul>
                    </div>
                    
                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">About</Link></li>
                            <li><Link href="/contact" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Contact</Link></li>
                            <li><Link href="/advertise" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Advertise</Link></li>
                        </ul>
                    </div>
                    
                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link href="/privacy" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Terms</Link></li>
                            <li><Link href="/cookies" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                    
                </div>
                
                <div className="mt-16 pt-8 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-400 text-center sm:text-left">
                        &copy; 2026 BlinkDeal. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
