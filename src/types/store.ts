export interface Store {
  id: string;
  name: string;
  slug: string;
  description?: string;
  url: string;
  logo_color: string;
  is_featured: boolean;
  coupon_count: number;
  total_clicks?: number;
  
  // For PopularRightNow api
  clicks?: string;
  trend?: "up" | "down" | "neutral";
}
