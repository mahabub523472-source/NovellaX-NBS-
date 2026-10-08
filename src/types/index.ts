export interface Chapter {
  id: string;
  storyId: string;
  chapterNumber: number;
  title: string;
  content: string;
  wordCount: number;
  estimatedReadTime: string;
  publishedAt: string;
}

export type StoryCategory =
  | 'রোমান্টিক'
  | 'ভালোবাসার গল্প'
  | 'আবেগ'
  | 'রহস্য'
  | 'থ্রিলার'
  | 'অ্যাডভেঞ্চার'
  | 'ইসলামিক'
  | 'পারিবারিক'
  | 'বন্ধুত্ব'
  | 'জীবনধর্মী'
  | 'কিশোর গল্প'
  | 'ছোট গল্প'
  | 'উপন্যাস';

export interface Story {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  category: StoryCategory;
  author: string;
  authorImage?: string;
  status: 'চলমান' | 'সম্পূর্ণ';
  featured: boolean;
  popular: boolean;
  latest: boolean;
  readersChoice?: boolean;
  readsCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  chapters: Chapter[];
}

export interface ReadingProgress {
  storyId: string;
  lastChapterNumber: number;
  progressPercent: number;
  updatedAt: string;
}

export interface ReaderSettings {
  fontSize: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  theme: 'light' | 'sepia' | 'dark';
  fontFamily: 'hind' | 'noto' | 'serif';
  lineHeight: 'normal' | 'relaxed' | 'loose';
}

export interface ContactInfo {
  tiktok: string;
  instagram: string;
  facebook: string;
  email: string;
  whatsapp?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
  email?: string;
  bio?: string;
}

export type NavigationPage =
  | 'home'
  | 'categories'
  | 'latest'
  | 'popular'
  | 'writer'
  | 'rules'
  | 'contact'
  | 'bookmarks'
  | 'admin'
  | 'story-detail'
  | 'reading'
  | 'not-found';
