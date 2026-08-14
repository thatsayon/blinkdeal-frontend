import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | BlinkDeal",
    description: "Learn how BlinkDeal collects, uses, and protects your personal information in our privacy policy.",
    alternates: { canonical: "https://blinkdeal.cc/privacy" },
};

export default function PrivacyPolicy() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Privacy Policy</h1>
            <p className="mb-12 text-sm text-gray-500">Last updated: August 2026</p>
            
            <div className="space-y-10 text-base leading-relaxed text-gray-600">
                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">1. Information We Collect</h2>
                    <p className="mb-4">
                        We collect information you provide directly to us when you use BlinkDeal. This includes when you create an account, subscribe to our newsletter, or communicate with us. The types of information we may collect include your name, email address, and any other information you choose to provide.
                    </p>
                    <p>
                        We also automatically collect certain information about your device and how you interact with our platform, such as your IP address, browser type, and pages visited.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">2. How We Use Your Information</h2>
                    <p className="mb-4">
                        We use the information we collect to provide, maintain, and improve our services, including providing you with the best coupon codes and deals. We may also use the information to:
                    </p>
                    <ul className="ml-6 list-disc space-y-2">
                        <li>Send you technical notices, updates, and support messages.</li>
                        <li>Communicate with you about products, services, offers, and events.</li>
                        <li>Monitor and analyze trends, usage, and activities on our platform.</li>
                        <li>Personalize your experience and deliver relevant content.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">3. Sharing of Information</h2>
                    <p>
                        We do not sell or rent your personal information to third parties. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf. We may also share information if required by law or to protect the rights and safety of BlinkDeal, our users, or others.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">4. Third-Party Links</h2>
                    <p>
                        Our platform contains links to third-party websites (such as the stores we provide coupons for). If you click on a third-party link, you will be directed to that site. We are not responsible for the privacy practices or the content of third-party websites.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">5. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at privacy@blinkdeal.cc.
                    </p>
                </section>
            </div>
        </main>
    );
}
