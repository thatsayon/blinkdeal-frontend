import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { getProductDetail, getStoreDetail } from "@/lib/api";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ slug: string; productSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { productSlug } = await params;
        const product = await getProductDetail(productSlug);
        
        return {
            title: `${product.title} | BlinkDeal`,
            description: product.description || `Get the best deal for ${product.title} at BlinkDeal.`,
        };
    } catch (e) {
        return { title: "Product Not Found — BlinkDeal" };
    }
}

export default async function ProductDetailPage({ params }: Props) {
    try {
        const { slug, productSlug } = await params;
        
        // Fetch product and store info in parallel
        const [product, store] = await Promise.all([
            getProductDetail(productSlug),
            getStoreDetail(slug)
        ]);

        return <ProductDetailClient product={product} store={store} />;
    } catch (e) {
        console.error("Product detail page error:", e);
        notFound();
    }
}
