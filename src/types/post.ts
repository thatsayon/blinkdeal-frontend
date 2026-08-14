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
  cover_image: string;
  author: Author;
  tags: string[];
  published_at: string;
  created_at?: string;
  updated_at?: string;
}
