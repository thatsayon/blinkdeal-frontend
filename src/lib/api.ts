import { Category } from "@/types/category";
import { Coupon } from "@/types/coupon";
import { Post } from "@/types/post";
import { Store } from "@/types/store";

let API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
if (API_URL.endsWith('/')) API_URL = API_URL.slice(0, -1);
if (!API_URL.endsWith('/api')) API_URL = `${API_URL}/api`;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      next: { revalidate: 60, ...options.next },
    });

    if (!response.ok) {
      console.warn(`[Build Warning] API Error: ${response.status} - ${response.statusText} for URL: ${url}`);
      return [] as T; // Return empty data on non-200 to prevent build crash
    }

    const data = await response.json();
    
    if (data && typeof data === 'object' && 'results' in data && Array.isArray(data.results)) {
      return data.results as T;
    }
    return data as T;
  } catch (error) {
    console.warn(`[Build Warning] Network error fetching ${url}:`, error);
    return [] as T; // Return empty data on network failure (e.g., ECONNREFUSED)
  }
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

export const getStoreCoupons = async (slug: string): Promise<Coupon[]> => {
  return fetchAPI<Coupon[]>(`/stores/${slug}/coupons/`);
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
