import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Coupon Detail Design Preview",
    robots: { index: false, follow: false },
};

export default function CouponPreviewLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
