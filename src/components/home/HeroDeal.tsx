import { getTodayDeals } from "@/lib/api";
import HeroDealsClient from "./HeroDealsClient";

export default async function HeroDeals() {
    const deals = await getTodayDeals();
    const heroDeals = deals.slice(0, 8); // Fetch 8 deals for the hero slider (creates 4 slides)

    return <HeroDealsClient initialDeals={heroDeals} />;
}
