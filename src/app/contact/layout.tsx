import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact BlinkDeal \u2014 Get in Touch",
    description: "Have a question, suggestion, or partnership inquiry? Reach out to the BlinkDeal team. We'd love to hear from you.",
    alternates: { canonical: "https://blinkdeal.cc/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
