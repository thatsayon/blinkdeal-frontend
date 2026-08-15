export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string; // Detail only
  cover_image: string | null;
  author: Author | null;
  tags: string[];
  published_at: string;
  created_at?: string;
  updated_at?: string;
}
