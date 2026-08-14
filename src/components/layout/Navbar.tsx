"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Trending", href: "/trending" },
  { label: "Deals", href: "/deals" },
  { label: "Categories", href: "/categories" },
  { label: "Stores", href: "/stores" },
  { label: "Blog", href: "/posts" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log("searching for:", query);
    // navigate to /deals?q=... or wherever search results live
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/85 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative">
          {/* Left: Logo */}
          <div className="flex z-10 items-center">
            <Link
              href="/"
              className="shrink-0 text-xl font-bold tracking-tight text-gray-950 sm:text-2xl transition-opacity hover:opacity-80"
              aria-label="BlinkDeal home"
            >
              Blink<span className="text-blue-600">Deal</span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden items-center gap-8 transition-all duration-300 md:flex z-10 ${
              searchOpen ? "pointer-events-none opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-950"
                  }`}
                >
                  {item.label}
                  <span 
                    className={`absolute inset-x-0 -bottom-px h-0.5 bg-blue-600 transition-transform duration-300 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`} 
                  />
                </Link>
              )
            })}
          </nav>

          {/* Right: Spacer pushes search to the right */}
          <div className="flex items-center justify-end z-10">
            {/* Desktop Search */}
            <form
              onSubmit={handleSubmit}
              className={`hidden items-center md:flex ${
                searchOpen ? "w-[400px]" : "w-auto"
              } transition-all duration-300 ease-out`}
            >
              {searchOpen ? (
                <div className="flex w-full items-center gap-2 rounded-full border border-blue-500 bg-white px-4 py-2 shadow-sm ring-2 ring-blue-500/20">
                  <Search size={16} className="shrink-0 text-blue-500" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && closeSearch()}
                    onBlur={() => !query && closeSearch()}
                    placeholder="Search deals, stores, categories..."
                    className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={closeSearch}
                    className="shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                    aria-label="Close search"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="group flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50/50 px-4 py-2 text-sm text-gray-500 transition-all hover:border-gray-300 hover:bg-white hover:shadow-sm hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:w-56"
                >
                  <Search size={16} className="shrink-0 transition-transform group-hover:scale-110 group-hover:text-blue-500" />
                  <span className="flex-1 text-left">Search deals...</span>
                  <kbd className="hidden sm:inline-flex rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[11px] font-medium text-gray-400 shadow-sm transition-colors group-hover:border-gray-300 group-hover:text-gray-500">
                    <span className="mr-0.5">⌘</span>K
                  </kbd>
                </button>
              )}
            </form>

            {/* Mobile Search Icon */}
            {!mobileMenuOpen && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="mr-2 rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Panel - Right Side Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 flex w-[85vw] max-w-sm flex-col border-l border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6">
          <span className="text-lg font-bold text-gray-900">Menu</span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:shadow-sm">
              <Search size={18} className="shrink-0 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search deals, stores..."
                className="flex-1 bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
                autoFocus={mobileMenuOpen}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="shrink-0 p-1 text-gray-400 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </form>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    isActive 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-950"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  );
}