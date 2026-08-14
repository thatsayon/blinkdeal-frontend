import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | BlinkDeal",
    description: "Read the terms of service and conditions for using BlinkDeal to find the best coupon codes and deals.",
    alternates: { canonical: "https://blinkdeal.cc/terms" },
};

export default function TermsOfService() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Terms of Service</h1>
            <p className="mb-12 text-sm text-gray-500">Last updated: August 2026</p>
            
            <div className="space-y-10 text-base leading-relaxed text-gray-600">
                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using BlinkDeal, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our service. We reserve the right to update or change our Terms of Service at any time.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">2. Use of Service</h2>
                    <p className="mb-4">
                        BlinkDeal provides a platform for discovering coupon codes and deals. You agree to use the service only for lawful purposes and in accordance with these Terms. You agree not to:
                    </p>
                    <ul className="ml-6 list-disc space-y-2">
                        <li>Use the service in any way that violates any applicable local or international law.</li>
                        <li>Attempt to interfere with or disrupt the integrity or performance of our platform.</li>
                        <li>Use automated scripts or scrapers to collect data from BlinkDeal without our express written permission.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">3. Third-Party Content and Deals</h2>
                    <p>
                        BlinkDeal acts as an aggregator of coupons and discounts. We do not guarantee the validity, accuracy, or availability of any deal or coupon found on our site. Merchants reserve the right to alter or cancel their promotions at any time. Any transaction you make with a third-party merchant is solely between you and that merchant.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">4. Intellectual Property</h2>
                    <p>
                        The service and its original content, features, and functionality are owned by BlinkDeal and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">5. Limitation of Liability</h2>
                    <p>
                        In no event shall BlinkDeal, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                    </p>
                </section>
            </div>
        </main>
    );
}
