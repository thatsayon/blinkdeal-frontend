import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Founder & Creator",
  description: "Learn more about Ashiqul Islam Ayon, the founder and creator of BlinkDeal.",
};

export default function FounderPage() {
  return (
    <div className="bg-[#FAFAFA] relative overflow-hidden pt-12 pb-24 sm:pt-20 sm:pb-32">
      {/* Background gradients (made very subtle) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 mt-16 sm:mt-24">

        {/* Main Card with Floating Image */}
        <div className="bg-white rounded-[2rem] border border-gray-200 pt-20 px-8 pb-12 sm:px-12 sm:pb-16 relative text-center">

          {/* Floating Overlapping Image */}
          <div className="absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-sm bg-white">
              <Image
                src="/thatsayon.jpg"
                alt="Ashiqul Islam Ayon"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="mt-4 sm:mt-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-widest uppercase mb-5">
              Founder & Creator
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-10">
              Ashiqul Islam Ayon
            </h1>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light max-w-2xl mx-auto text-left">
              <p>
                Ashiqul Islam Ayon is the visionary founder and creator behind BlinkDeal. With a deep-rooted passion for web development, design aesthetics, and enhancing user experiences, Ashiqul built BlinkDeal to solve a common problem: helping shoppers find the best deals and verified promo codes without the usual hassle.
              </p>
              <p>
                His mission is simple but impactful to make online shopping more affordable and accessible for everyone by curating the web&apos;s top deals in one beautiful, reliable, and easy-to-use platform. Whether you are looking for discounts on everyday essentials or luxury items, Ashiqul&apos;s work ensures that savings are always just a click away.
              </p>
              <p>
                Beyond BlinkDeal, Ashiqul is dedicated to exploring innovative technologies, building scalable web applications, and continuously pushing the boundaries of what&apos;s possible on the modern web.
              </p>
            </div>

            <div className="mt-12 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://thatsayon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors gap-2"
              >
                Visit Portfolio
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <a
                href="mailto:hello@thatsayon.com"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-slate-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all gap-2"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@thatsayon.com
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
