import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy | BlinkDeal",
    description: "Understand how BlinkDeal uses cookies and similar technologies to improve your experience on our platform.",
    alternates: { canonical: "https://blinkdeal.cc/cookies" },
};

export default function CookiePolicy() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Cookie Policy</h1>
            <p className="mb-12 text-sm text-gray-500">Last updated: August 2026</p>
            
            <div className="space-y-10 text-base leading-relaxed text-gray-600">
                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">1. What are Cookies?</h2>
                    <p>
                        Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site. Cookies help us remember your preferences, understand how you use our site, and improve your overall experience.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">2. How We Use Cookies</h2>
                    <p className="mb-4">
                        BlinkDeal uses cookies for several reasons:
                    </p>
                    <ul className="ml-6 list-disc space-y-2">
                        <li><strong className="text-gray-900">Essential Cookies:</strong> These are required for the operation of our website, allowing you to access secure areas or save your preferences.</li>
                        <li><strong className="text-gray-900">Analytics Cookies:</strong> These allow us to recognize and count the number of visitors and see how visitors move around our website. This helps us improve the way our website works.</li>
                        <li><strong className="text-gray-900">Affiliate Tracking Cookies:</strong> As a coupon site, we may use cookies to track when you click on a deal and make a purchase on a merchant's site, allowing us to earn a small commission at no extra cost to you.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">3. Third-Party Cookies</h2>
                    <p>
                        In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on. These third parties include analytics providers and affiliate networks.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">4. Your Choices Regarding Cookies</h2>
                    <p>
                        If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, and some of our pages might not display properly.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">5. Contact Information</h2>
                    <p>
                        If you have any questions about our use of cookies, please contact us at privacy@blinkdeal.cc.
                    </p>
                </section>
            </div>
        </main>
    );
}
