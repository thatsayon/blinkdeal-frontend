import { Category } from "@/types/category";
import { Coupon } from "@/types/coupon";
import { Post } from "@/types/post";
import { Store } from "@/types/store";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    // For Next.js App Router, we can add cache rules if needed. 
    // Defaulting to revalidate every 60s for most data to keep it fresh.
    next: { revalidate: 60, ...options.next },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  
  // Unwrap Django REST Framework paginated responses
  if (data && typeof data === 'object' && 'results' in data && Array.isArray(data.results)) {
    return data.results as T;
  }

  return data as T;
}

// ─────────────────────────────────────────────────────────────────────────────
// Coupons API
// ─────────────────────────────────────────────────────────────────────────────

export const getCoupons = async (params?: Record<string, string>): Promise<Coupon[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";
  return fetchAPI<Coupon[]>(`/coupons/${query}`);
};

export const getTrendingCoupons = async (): Promise<Coupon[]> => {
  return fetchAPI<Coupon[]>("/coupons/trending/");
};

export const getTodayDeals = async (): Promise<Coupon[]> => {
  return fetchAPI<Coupon[]>("/coupons/today/");
};

export const getCouponDetail = async (storeSlug: string, couponSlug: string): Promise<Coupon> => {
  return fetchAPI<Coupon>(`/coupons/${storeSlug}/${couponSlug}/`);
};

export const recordCouponClick = async (couponSlug: string): Promise<void> => {
  return fetchAPI<void>(`/coupons/${couponSlug}/click/`, { 
    method: "POST",
    cache: "no-store", 
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Stores API
// ─────────────────────────────────────────────────────────────────────────────

export const getStores = async (featuredOnly = false): Promise<Store[]> => {
  const query = featuredOnly ? "?featured=true" : "";
  return fetchAPI<Store[]>(`/stores/${query}`);
};

export const getPopularStores = async (limit = 8): Promise<Store[]> => {
  return fetchAPI<Store[]>(`/popular/?limit=${limit}`);
};

export const getStoreDetail = async (slug: string): Promise<Store> => {
  return fetchAPI<Store>(`/stores/${slug}/`);
};

// ─────────────────────────────────────────────────────────────────────────────
// Categories API
// ─────────────────────────────────────────────────────────────────────────────

export const getCategories = async (): Promise<Category[]> => {
  return fetchAPI<Category[]>("/categories/");
};

// ─────────────────────────────────────────────────────────────────────────────
// Posts API
// ─────────────────────────────────────────────────────────────────────────────

export const getPosts = async (params?: Record<string, string>): Promise<Post[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";
  return fetchAPI<Post[]>(`/posts/${query}`);
};

export const getPostDetail = async (slug: string): Promise<Post> => {
  return fetchAPI<Post>(`/posts/${slug}/`);
};

// ─────────────────────────────────────────────────────────────────────────────
// Newsletter API
// ─────────────────────────────────────────────────────────────────────────────

export const subscribeNewsletter = async (email: string): Promise<{ detail: string }> => {
  return fetchAPI<{ detail: string }>("/newsletter/subscribe/", {
    method: "POST",
    body: JSON.stringify({ email }),
    cache: "no-store",
  });
};
