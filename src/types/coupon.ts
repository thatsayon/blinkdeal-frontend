export interface Coupon {
  id: string;
  slug: string;
  store_name: string; // Detail API returns store_name, List API returns store
  store?: string;
  store_slug: string;
  store_url: string;
  store_logo: string;
  store_description: string;
  color: string;
  category_name?: string | null;
  category_slug?: string | null;
  category?: string | null;
  title: string;
  description: string;
  cover_image: string;
  code: string;
  discount: string;
  expiry: string;
  verified: boolean;
  is_trending: boolean;
  is_today_deal: boolean;
  click_count: number;
  trend: "up" | "down" | "neutral";
  created_at?: string;
  updated_at?: string;
}
