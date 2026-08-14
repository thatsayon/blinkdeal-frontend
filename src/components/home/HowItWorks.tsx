import { Search, Copy, ShoppingBag } from "lucide-react";

const steps = [
    {
        num: "01",
        title: "Find a deal",
        desc: "Search your favorite store.",
        icon: Search
    },
    {
        num: "02",
        title: "Copy the code",
        desc: "Get the coupon instantly.",
        icon: Copy
    },
    {
        num: "03",
        title: "Shop & save",
        desc: "Use the code at checkout.",
        icon: ShoppingBag
    }
];

export default function HowItWorks() {
    return (
        <section className="py-4">
            <div className="mb-10 text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">How BlinkDeal Works</h3>
                <p className="mt-2 text-sm sm:text-base font-medium text-gray-500">Save money on your favorite brands in three simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((step) => (
                    <div 
                        key={step.num} 
                        className="group relative flex flex-col items-start text-left p-8 rounded-3xl bg-gray-50/50 border border-gray-100 transition-all duration-300 hover:bg-white hover:border-gray-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 overflow-hidden"
                    >
                        {/* Large Background Number Accent */}
                        <span className="absolute -right-2 -top-6 text-[120px] font-black text-gray-900/[0.03] transition-colors duration-500 group-hover:text-blue-600/[0.03] select-none pointer-events-none">
                            {step.num}
                        </span>
                        
                        {/* Floating Icon */}
                        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-600 transition-colors duration-300 group-hover:text-blue-600 group-hover:border-blue-100 group-hover:bg-blue-50/50">
                            <step.icon size={24} strokeWidth={2.5} />
                        </div>
                        
                        {/* Text Content */}
                        <div className="relative z-10 mt-10">
                            <h4 className="text-xl font-bold text-gray-900">{step.title}</h4>
                            <p className="mt-2 text-sm font-medium text-gray-500">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
