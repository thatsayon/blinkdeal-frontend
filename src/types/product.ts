export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  original_price: string;
  discounted_price: string;
  affiliate_url: string;
  is_featured: boolean;
  store: string;
  store_slug: string;
  store_name: string;
  store_description?: string;
  store_logo?: string;
  color?: string;
  category: string;
  category_name?: string;
  category_slug?: string;
  click_count: number;
}
