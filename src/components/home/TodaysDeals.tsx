import { getTodayDeals } from "@/lib/api";
import TodaysDealCard from "./TodaysDealCard";

export default async function TodaysDeals() {
    const todaysDeals = await getTodayDeals();
    const deals = todaysDeals.slice(0, 4);

    return (
        <section>
            <div className="text-center">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">Today's Best Deals</h3>
            </div>

            <div className="mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {deals.map((deal) => (
                    <TodaysDealCard key={deal.id} deal={deal} />
                ))}
            </div>
        </section>
    );
}
