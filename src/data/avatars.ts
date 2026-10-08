export interface AvatarOption {
  id: string;
  name: string;
  url: string;
  category: 'ছেলে' | 'মেয়ে' | 'ফান';
  fileName: string;
}

export const USER_AVATARS: AvatarOption[] = [
  {
    id: 'avatar-1',
    name: 'পার্পল বয় (Anime Boy)',
    url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=80',
    category: 'ছেলে',
    fileName: 'IMG-20260929-WA0017.jpg',
  },
  {
    id: 'avatar-2',
    name: 'রেড ভাইব লেডি (Cartoon Lady)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    category: 'মেয়ে',
    fileName: 'IMG-20260929-WA0016.jpg',
  },
  {
    id: 'avatar-3',
    name: 'মাইনক্রাফট কুল বয় (Pixel Suit)',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80',
    category: 'ছেলে',
    fileName: 'IMG-20260929-WA0015.jpg',
  },
  {
    id: 'avatar-4',
    name: 'ফ্লোর্ক ক্যাপ বয় (Meme Cap)',
    url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
    category: 'ফান',
    fileName: 'IMG-20260929-WA0010.jpg',
  },
  {
    id: 'avatar-5',
    name: 'হিরোশি স্যুট বস (Suit Boss)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    category: 'ছেলে',
    fileName: 'IMG-20260929-WA0014.jpg',
  },
  {
    id: 'avatar-6',
    name: 'পিক্সেল হ্যালো কিটি (Pixel Girl)',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    category: 'মেয়ে',
    fileName: 'IMG-20260929-WA0011.jpg',
  },
  {
    id: 'avatar-7',
    name: 'ইন্ডিগো কুল বয় (Aesthetic Boy)',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    category: 'ছেলে',
    fileName: 'IMG-20260929-WA0012.jpg',
  },
  {
    id: 'avatar-8',
    name: 'ফ্লাওয়ার হেয়ার গার্ল (Blossom Girl)',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    category: 'মেয়ে',
    fileName: 'IMG-20260929-WA0013.jpg',
  },
  {
    id: 'avatar-9',
    name: 'ম্যাঙ্গা ফ্রেকেলস গার্ল (Ribbon Girl)',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80',
    category: 'মেয়ে',
    fileName: 'IMG-20260929-WA0009.jpg',
  },
  {
    id: 'avatar-10',
    name: 'দোপাট্টা হিজাবি গার্ল (Hijabi Grace)',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    category: 'মেয়ে',
    fileName: 'IMG-20260929-WA0000.jpg',
  },
  {
    id: 'avatar-11',
    name: 'শিবা কিউব জেন্টলম্যান (Shiba Suit)',
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&auto=format&fit=crop&q=80',
    category: 'ফান',
    fileName: 'IMG-20260929-WA0001.jpg',
  },
  {
    id: 'avatar-12',
    name: 'বেণি বাঁধা কিউট চিবি (Cute Chibi)',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    category: 'মেয়ে',
    fileName: 'IMG-20260929-WA0003.jpg',
  },
  {
    id: 'avatar-13',
    name: 'গোলাপ হাতে ভিন্টেজ গার্ল (Rose Girl)',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&auto=format&fit=crop&q=80',
    category: 'মেয়ে',
    fileName: 'IMG-20260929-WA0004.jpg',
  },
  {
    id: 'avatar-14',
    name: 'হাসিমুখ ব্লু বয় (Happy Boy)',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    category: 'ছেলে',
    fileName: 'IMG-20260929-WA0006.jpg',
  },
  {
    id: 'avatar-15',
    name: 'সানগ্লাস ক্যাট বয় (Cat Lover Boy)',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    category: 'ছেলে',
    fileName: 'IMG-20260929-WA0007.jpg',
  },
  {
    id: 'avatar-16',
    name: 'ফ্লাফি হেয়ার বয় (Fluffy Boy)',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    category: 'ছেলে',
    fileName: 'IMG-20260929-WA0008.jpg',
  },
  {
    id: 'avatar-17',
    name: 'ফিশ হেয়ারক্লিপ চাইল্ড (Fish Clip Chibi)',
    url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&auto=format&fit=crop&q=80',
    category: 'মেয়ে',
    fileName: 'IMG-20260929-WA0005.jpg',
  },
  {
    id: 'avatar-18',
    name: 'ব্লন্ড ক্যাট গার্ল (Blonde Cat Girl)',
    url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&auto=format&fit=crop&q=80',
    category: 'মেয়ে',
    fileName: 'IMG-20260929-WA0002.jpg',
  },
];

export const DEFAULT_USER_AVATAR = USER_AVATARS[0].url;

export const INITIAL_USERS: import('../types').UserAccount[] = [
  {
    id: 'user-1',
    name: 'তানভীর আহমেদ',
    avatar: USER_AVATARS[0].url,
    createdAt: '২৫ সেপ্টেম্বর, ২০২৬',
    bio: 'বই ও রোমান্টিক উপন্যাস পড়তে ভালোবাসি।',
  },
  {
    id: 'user-2',
    name: 'মেঘলা জাহান',
    avatar: USER_AVATARS[7].url,
    createdAt: '২৬ সেপ্টেম্বর, ২০২৬',
    bio: 'গল্পের পাতায় হারিয়ে যেতে ভালো লাগে।',
  },
  {
    id: 'user-3',
    name: 'রাকিবুল হাসান',
    avatar: USER_AVATARS[2].url,
    createdAt: '২৭ সেপ্টেম্বর, ২০২৬',
    bio: 'রহস্য ও রোমাঞ্চ গল্পের একনিষ্ঠ পাঠক।',
  },
  {
    id: 'user-4',
    name: 'নুসরাত ফারিয়া',
    avatar: USER_AVATARS[9].url,
    createdAt: '২৮ সেপ্টেম্বর, ২০২৬',
    bio: 'ইসলামিক ও পারিবারিক সাহিত্যের অনুরাগী।',
  },
  {
    id: 'user-5',
    name: 'সোহানুর রহমান',
    avatar: USER_AVATARS[3].url,
    createdAt: '২৯ সেপ্টেম্বর, ২০২৬',
    bio: 'নভেলাএক্স এনবিএস এর নিয়মিত পাঠক।',
  },
];
