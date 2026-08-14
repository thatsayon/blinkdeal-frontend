"use client";

export default function Contact() {
    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 sm:py-32">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left: Typography & Info */}
                    <div className="lg:col-span-5">
                        <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-gray-900 mb-6">
                            Let's talk.
                        </h1>
                        <p className="text-lg text-gray-500 mb-16 max-w-md">
                            Whether you're looking to partner with us, report a bug, or just say hello, we'd love to hear from you.
                        </p>

                        <div className="space-y-12">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Email</h3>
                                <a href="mailto:hello@blinkdeal.cc" className="text-xl font-medium text-gray-900 hover:text-blue-600 transition-colors">hello@blinkdeal.cc</a>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Partnerships</h3>
                                <a href="mailto:partners@blinkdeal.cc" className="text-xl font-medium text-gray-900 hover:text-blue-600 transition-colors">partners@blinkdeal.cc</a>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Social</h3>
                                <a href="#" className="text-xl font-medium text-gray-900 hover:text-blue-600 transition-colors">@BlinkDeal on X</a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Minimalist Form */}
                    <div className="lg:col-span-7">
                        <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-bold text-gray-900">First Name</label>
                                    <input type="text" id="firstName" required className="w-full border-0 border-b-2 border-gray-100 bg-transparent px-0 py-3 text-base text-gray-900 placeholder:text-gray-300 focus:border-gray-900 focus:ring-0 outline-none transition-colors" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-bold text-gray-900">Last Name</label>
                                    <input type="text" id="lastName" required className="w-full border-0 border-b-2 border-gray-100 bg-transparent px-0 py-3 text-base text-gray-900 placeholder:text-gray-300 focus:border-gray-900 focus:ring-0 outline-none transition-colors" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold text-gray-900">Email Address</label>
                                <input type="email" id="email" required className="w-full border-0 border-b-2 border-gray-100 bg-transparent px-0 py-3 text-base text-gray-900 placeholder:text-gray-300 focus:border-gray-900 focus:ring-0 outline-none transition-colors" placeholder="john@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-bold text-gray-900">Subject</label>
                                <div className="relative">
                                    <select id="subject" className="w-full border-0 border-b-2 border-gray-100 bg-transparent px-0 py-3 text-base text-gray-900 focus:border-gray-900 focus:ring-0 outline-none transition-colors appearance-none cursor-pointer">
                                        <option>General Inquiry</option>
                                        <option>Report a Fake Coupon</option>
                                        <option>Merchant Partnership</option>
                                        <option>Press / Media</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-400">
                                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-gray-900">Message</label>
                                <textarea id="message" required rows={4} className="w-full border-0 border-b-2 border-gray-100 bg-transparent px-0 py-3 text-base text-gray-900 placeholder:text-gray-300 focus:border-gray-900 focus:ring-0 outline-none transition-colors resize-none" placeholder="How can we help you?"></textarea>
                            </div>

                            <div className="cursor-pointer">
                                <button type="submit" className="inline-flex cursor-pointer items-center justify-center bg-gray-900 px-12 py-4 text-sm font-bold text-white transition-all hover:bg-black w-full sm:w-auto">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    );
}
