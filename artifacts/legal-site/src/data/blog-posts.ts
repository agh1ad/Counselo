export interface BlogSection {
  heading?: string;
  body: string;
}

export interface BlogPost {
  slug: string;
  date: string;
  category: { en: string; ar: string };
  readTime: number;
  en: {
    title: string;
    excerpt: string;
    seoTitle: string;
    seoDescription: string;
    content: BlogSection[];
  };
  ar: {
    title: string;
    excerpt: string;
    seoTitle: string;
    seoDescription: string;
    content: BlogSection[];
  };
}

export const blogPosts: BlogPost[] = [];

export const staticBlogPosts: BlogPost[] = [];
