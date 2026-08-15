"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/api";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            company: formData.get("company") as string,
            message: formData.get("message") as string,
        };

        try {
            await submitContactForm(data);
            setStatus("success");
            form.reset();
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center shadow-lg relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4 text-3xl font-bold">✓</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-600 mb-6">Thank you for reaching out. Our partnerships team will get back to you shortly.</p>
                <button 
                    onClick={() => setStatus("idle")} 
                    className="inline-flex items-center justify-center bg-gray-900 px-6 py-3 text-sm font-bold text-white rounded-xl hover:bg-black transition-colors"
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 text-left shadow-2xl relative z-10 border border-white/10">
            <h3 className="text-3xl font-black text-white mb-8">Get in Touch</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Name</label>
                    <input type="text" id="name" name="name" required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="John Doe" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Work Email</label>
                    <input type="email" id="email" name="email" required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="john@company.com" />
                </div>
            </div>

            <div className="mb-6">
                <label htmlFor="company" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Company / Brand (Optional)</label>
                <input type="text" id="company" name="company" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Acme Corp" />
            </div>

            <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Message</label>
                <textarea id="message" name="message" required rows={4} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder="How can we help you scale?"></textarea>
            </div>

            {status === "error" && (
                <div className="mb-6 text-red-400 text-sm font-bold bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                    There was an error sending your message. Please try again or use the email link below.
                </div>
            )}

            <button 
                type="submit" 
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center bg-white px-8 py-4 text-sm font-bold text-gray-900 transition-all hover:scale-[1.02] active:scale-95 rounded-xl shadow-[0_0_40px_rgb(255,255,255,0.1)] disabled:opacity-70 disabled:hover:scale-100"
            >
                {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm font-medium">
                    Or email us directly at <a href="mailto:hello@thatsayon.com" className="text-white hover:text-blue-300 transition-colors font-bold border-b border-white/30 hover:border-blue-300">hello@thatsayon.com</a>
                </p>
            </div>
        </form>
    );
}
