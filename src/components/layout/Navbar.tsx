"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { searchAll, type SearchResults } from "@/lib/api";
import {
  Search,
  Menu,
  X,
  Flame,
  Zap,
  Tag,
  LayoutGrid,
  Store as StoreIcon,
  BookOpen,
  ArrowRight,
  Sparkles,
  Command,
  TrendingUp,
  Percent,
  Loader2,
  Ticket,
  ExternalLink,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Zap },
  {
    label: "Trending",
    href: "/trending",
    icon: Flame,
    badge: "HOT",
    badgeColor: "bg-rose-500 text-white",
  },
  { label: "Deals", href: "/deals", icon: Tag },
  { label: "Categories", href: "/categories", icon: LayoutGrid },
  { label: "Stores", href: "/stores", icon: StoreIcon },
  { label: "Blog", href: "/posts", icon: BookOpen },
];

const popularSearches = [
  { label: "Nike", href: "/deals?q=Nike" },
  { label: "Amazon", href: "/deals?q=Amazon" },
  { label: "Sephora", href: "/deals?q=Sephora" },
  { label: "Electronics", href: "/deals?q=Electronics" },
  { label: "50% Off", href: "/deals?q=50%" },
  { label: "Free Shipping", href: "/deals?q=shipping" },
];

const quickStores = [
  { name: "Nike", slug: "nike", color: "from-orange-500 to-amber-500" },
  { name: "Amazon", slug: "amazon", color: "from-amber-500 to-yellow-500" },
  { name: "Apple", slug: "apple", color: "from-zinc-700 to-zinc-900" },
  { name: "Sephora", slug: "sephora", color: "from-rose-500 to-pink-600" },
  { name: "Target", slug: "target", color: "from-red-600 to-rose-700" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [liveResults, setLiveResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Scroll detection for dynamic styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchModalOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Debounced live search
  useEffect(() => {
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      setLiveResults(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const results = await searchAll(cleanQuery, 6);
        setLiveResults(results);
      } catch (err) {
        console.error("Live search failed:", err);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Focus input when search modal opens
  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else if (!mobileMenuOpen) {
      document.body.style.overflow = "unset";
    }
  }, [searchModalOpen, mobileMenuOpen]);

  // Lock body scroll on mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else if (!searchModalOpen) {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen, searchModalOpen]);

  // Close mobile menu & modal on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchModalOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanQuery = query.trim();
    if (!cleanQuery) return;
    setSearchModalOpen(false);
    setMobileMenuOpen(false);
    router.push(`/deals?q=${encodeURIComponent(cleanQuery)}`);
  };

  const hasLiveResults =
    liveResults &&
    (liveResults.stores.length > 0 ||
      liveResults.coupons.length > 0 ||
      liveResults.categories.length > 0);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* ── Main Sticky Header ────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]"
            : "bg-white/80 backdrop-blur-md border-b border-gray-100"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="group flex items-center outline-none transition-opacity hover:opacity-90"
              aria-label="BlinkDeal Home"
            >
              <Image
                src="/blink-deal-logo.svg"
                alt="BlinkDeal"
                width={150}
                height={38}
                className="h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation Bar */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50/90 text-blue-600 font-semibold shadow-xs"
                      : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-950"
                  }`}
                >
                  <Icon
                    size={15}
                    className={`transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  />
                  <span>{item.label}</span>

                  {/* Hot / Special Badge */}
                  {item.badge && (
                    <span
                      className={`inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-black tracking-wider uppercase animate-pulse shadow-xs ${
                        item.badgeColor || "bg-rose-500 text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search & Actions */}
          <div className="flex items-center gap-2.5">
            {/* Desktop Search Trigger Button (Spotlight Style) */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="group hidden items-center gap-2.5 rounded-full border border-gray-200/80 bg-gray-50/70 py-1.5 pr-2.5 pl-3.5 text-xs text-gray-500 shadow-2xs transition-all duration-200 hover:border-blue-300 hover:bg-white hover:text-gray-900 hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:flex w-52 lg:w-60"
            >
              <Search
                size={14}
                className="shrink-0 text-gray-400 transition-transform duration-200 group-hover:scale-110 group-hover:text-blue-600"
              />
              <span className="flex-1 text-left font-normal text-gray-500 group-hover:text-gray-700 truncate">
                Search deals, stores...
              </span>
              <kbd className="inline-flex items-center gap-0.5 rounded-md border border-gray-200/90 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-gray-400 shadow-2xs group-hover:border-gray-300 group-hover:text-gray-600">
                <Command size={10} />K
              </kbd>
            </button>

            {/* Mobile Search Icon Trigger */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200/80 bg-gray-50 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 md:hidden"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200/80 bg-gray-50 text-gray-700 transition-all hover:bg-gray-100 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Global Spotlight Search Modal (⌘K) ─────────────────────────── */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
            onClick={() => setSearchModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xl ring-1 ring-black/5 animate-in zoom-in-95 duration-200 z-10">
            {/* Search Input Header */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-3 border-b border-gray-100 px-4 py-3.5 sm:px-5"
            >
              {isSearching ? (
                <Loader2 size={20} className="shrink-0 text-blue-600 animate-spin" />
              ) : (
                <Search size={20} className="shrink-0 text-blue-600" />
              )}
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search deals, promo codes, stores, categories..."
                className="flex-1 bg-transparent text-base font-medium text-gray-900 placeholder:text-gray-400 outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  aria-label="Clear search input"
                >
                  <X size={16} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-semibold text-gray-400">
                ESC
              </kbd>
            </form>

            {/* Modal Body */}
            <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* ── CASE A: Live Search Results When Typing ──────────────── */}
              {query.trim().length > 0 ? (
                hasLiveResults ? (
                  <div className="space-y-5">
                    {/* Matching Stores */}
                    {liveResults?.stores && liveResults.stores.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                          <StoreIcon size={13} className="text-blue-500" />
                          <span>Stores</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {liveResults.stores.map((store) => (
                            <Link
                              key={store.id || store.slug}
                              href={`/stores/${store.slug}`}
                              onClick={() => setSearchModalOpen(false)}
                              className="group flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/60 p-2.5 hover:border-blue-200 hover:bg-blue-50/50 transition-all"
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`flex h-8 w-8 items-center justify-center rounded-lg font-black text-xs ${
                                    store.logo_color || "bg-blue-600 text-white"
                                  }`}
                                >
                                  {store.name.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 line-clamp-1">
                                    {store.name}
                                  </h4>
                                  <p className="text-[11px] text-gray-400">
                                    {store.coupon_count} coupons available
                                  </p>
                                </div>
                              </div>
                              <ArrowRight
                                size={14}
                                className="text-gray-300 group-hover:translate-x-0.5 group-hover:text-blue-600 transition-transform"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Matching Deals & Coupons */}
                    {liveResults?.coupons && liveResults.coupons.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                          <Tag size={13} className="text-emerald-500" />
                          <span>Coupons & Deals</span>
                        </div>
                        <div className="space-y-2">
                          {liveResults.coupons.map((coupon) => (
                            <Link
                              key={coupon.id}
                              href={`/coupons/${coupon.store_slug}/${coupon.slug}`}
                              onClick={() => setSearchModalOpen(false)}
                              className="group flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/60 p-3 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 font-black text-xs">
                                  {coupon.discount || "%"}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 truncate">
                                    {coupon.title}
                                  </h4>
                                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                                    <span className="font-semibold text-gray-600">
                                      {coupon.store || coupon.store_name}
                                    </span>
                                    {coupon.code && (
                                      <span className="rounded bg-gray-200/80 px-1.5 py-0.2 font-mono text-[10px] text-gray-700">
                                        {coupon.code}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <ArrowRight
                                size={14}
                                className="text-gray-300 group-hover:translate-x-0.5 group-hover:text-emerald-600 transition-transform shrink-0 ml-2"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Matching Categories */}
                    {liveResults?.categories && liveResults.categories.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                          <LayoutGrid size={13} className="text-violet-500" />
                          <span>Categories</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {liveResults.categories.map((cat) => (
                            <Link
                              key={cat.id || cat.slug}
                              href={`/categories/${cat.slug}`}
                              onClick={() => setSearchModalOpen(false)}
                              className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-bold text-gray-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition-all"
                            >
                              <span>{cat.name}</span>
                              <span className="text-[10px] font-normal text-gray-400">
                                ({cat.coupon_count})
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : !isSearching ? (
                  /* No live results found */
                  <div className="py-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 mb-3">
                      <Search size={20} />
                    </div>
                    <p className="text-sm font-bold text-gray-800">
                      No direct matches for "{query}"
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Press <kbd className="font-semibold text-gray-700">Enter</kbd> to search all deals catalog.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSearchSubmit()}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-xs"
                    >
                      <span>Search All Deals for "{query}"</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                ) : null
              ) : (
                /* ── CASE B: Default Popular Searches & Quick Stores ─────── */
                <>
                  {/* Popular Searches */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                      <TrendingUp size={14} className="text-blue-500" />
                      <span>Popular Searches</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setSearchModalOpen(false)}
                          className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/70 px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all"
                        >
                          <Sparkles size={12} className="text-amber-500" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stores */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                      <StoreIcon size={14} className="text-indigo-500" />
                      <span>Top Stores</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {quickStores.map((store) => (
                        <Link
                          key={store.slug}
                          href={`/stores/${store.slug}`}
                          onClick={() => setSearchModalOpen(false)}
                          className="group flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/60 p-3 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-xs transition-all"
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr ${store.color} text-xs font-black text-white shadow-2xs`}
                            >
                              {store.name[0]}
                            </div>
                            <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600">
                              {store.name}
                            </span>
                          </div>
                          <ArrowRight
                            size={14}
                            className="text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-600"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/80 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>Press <kbd className="font-semibold text-gray-700">Enter</kbd> to search all</span>
              </div>
              <button
                type="button"
                onClick={() => handleSearchSubmit()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-xs"
              >
                <span>Search Deals</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Navigation Drawer ───────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 flex w-[85vw] max-w-sm flex-col bg-white shadow-2xl border-l border-gray-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center outline-none"
                aria-label="BlinkDeal Home"
              >
                <Image
                  src="/blink-deal-logo.svg"
                  alt="BlinkDeal"
                  width={130}
                  height={32}
                  className="h-6 sm:h-7 w-auto object-contain"
                  priority
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit}>
                <div className="relative flex items-center">
                  <Search
                    size={17}
                    className="absolute left-3.5 text-gray-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search coupons & stores..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </form>

              {/* Navigation Links */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2 px-1">
                  Menu
                </span>
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/");

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-600 shadow-2xs"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-950"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                              isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            <Icon size={16} />
                          </div>
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                              item.badgeColor || "bg-rose-500 text-white"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Categories Bar in Mobile */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2 px-1">
                  Quick Links
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/deals?q=fashion"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <span>👗 Fashion</span>
                  </Link>
                  <Link
                    href="/deals?q=electronics"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <span>💻 Electronics</span>
                  </Link>
                  <Link
                    href="/deals?q=beauty"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <span>💄 Beauty</span>
                  </Link>
                  <Link
                    href="/deals?q=food"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <span>🍕 Food & Dining</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Footer CTA */}
            <div className="border-t border-gray-100 p-5 bg-gray-50/60">
              <Link
                href="/deals"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
              >
                <Percent size={16} />
                <span>Explore Today's Deals</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}