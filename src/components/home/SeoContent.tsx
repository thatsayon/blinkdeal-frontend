import Link from "next/link";

export default function SeoContent() {
    return (
        <section className="py-4">
            <div className="max-w-5xl">
                <h1 className="text-lg font-bold tracking-tight text-gray-900 mb-3">
                    Find the Best Coupon Codes & Deals
                </h1>
                
                <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
                    <p>
                        BlinkDeal is your ultimate destination for discovering verified, up-to-date coupon codes and exclusive discounts for thousands of your favorite online stores. Whether you're shopping for the latest fashion trends, booking your next vacation, or upgrading your tech gadgets, our platform ensures you never have to pay full price again.
                    </p>
                    <p>
                        We understand the frustration of expired or fake promo codes. That's why our dedicated team and active community work around the clock to test and verify every single offer. From sitewide flash sales to exclusive free shipping codes, we organize deals so you can find exactly what you need in seconds. Start saving today with real-time discounts delivered directly to you.
                    </p>
                </div>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
                <Link href="/stores/nike" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">Best Nike coupons</Link>
                <Link href="/stores/amazon" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">Best Amazon deals</Link>
                <Link href="/categories/fashion" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">Best fashion discounts</Link>
                <Link href="/categories/travel" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">Best travel deals</Link>
                <Link href="/guides/how-coupons-work" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">How coupon codes work</Link>
                <Link href="/guides/verified-coupons" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">How to find verified coupons</Link>
            </div>
        </section>
    );
}
