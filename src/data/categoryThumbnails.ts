import { StoryCategory } from '../types';

export interface PresetThumbnail {
  id: string;
  title: string;
  url: string;
  category: StoryCategory;
  tags: string[];
}

export const CATEGORY_THUMBNAILS: PresetThumbnail[] = [
  // 1. রোমান্টিক (Romantic)
  {
    id: 'thumb-rom-1',
    title: 'বৃষ্টিভেজা পাতা ও প্রেমপত্র',
    category: 'রোমান্টিক',
    url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80',
    tags: ['বই', 'বৃষ্টি', 'প্রেম', 'রোমান্টিক'],
  },
  {
    id: 'thumb-rom-2',
    title: 'গোধূলি আলোয় যুগল ছায়া',
    category: 'রোমান্টিক',
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80',
    tags: ['সূর্যাস্ত', 'প্রেম', 'রোমান্স', 'হৃদয়'],
  },
  {
    id: 'thumb-rom-3',
    title: 'গোলাপ ও পুরাতন চিঠি',
    category: 'রোমান্টিক',
    url: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800&auto=format&fit=crop&q=80',
    tags: ['গোলাপ', 'চিঠি', 'চিঠিপত্র', 'ভালোবাসা'],
  },
  {
    id: 'thumb-rom-4',
    title: 'ক্যাফের টেবিলে দুটি কফি মগ',
    category: 'রোমান্টিক',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
    tags: ['কফি', 'স্মৃতি', 'অনুভূতি', 'রোমান্টিক'],
  },

  // 2. ভালোবাসার গল্প (Love Story)
  {
    id: 'thumb-love-1',
    title: 'হাতে হাত রেখে পথচলা',
    category: 'ভালোবাসার গল্প',
    url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80',
    tags: ['হাত', 'ভালোবাসা', 'আস্থা', 'সম্পর্ক'],
  },
  {
    id: 'thumb-love-2',
    title: 'সমুদ্রতীরে ভালোবাসার ক্ষণ',
    category: 'ভালোবাসার গল্প',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    tags: ['সমুদ্র', 'বাতাস', 'ভালোবাসা', 'বিকেল'],
  },
  {
    id: 'thumb-love-3',
    title: 'সূর্যাস্তের মায়াবী লাল আভা',
    category: 'ভালোবাসার গল্প',
    url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&auto=format&fit=crop&q=80',
    tags: ['সূর্য', 'আকাশ', 'ভালোবাসা', 'মায়া'],
  },

  // 3. আবেগ (Emotion)
  {
    id: 'thumb-emo-1',
    title: 'মেঘলা দিনে জানালার কাঁচে বৃষ্টির ফোঁটা',
    category: 'আবেগ',
    url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80',
    tags: ['বৃষ্টি', 'জানলা', 'আবেগ', 'বিরহ'],
  },
  {
    id: 'thumb-emo-2',
    title: 'বটবৃক্ষের ছায়ায় রোদের আলো',
    category: 'আবেগ',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    tags: ['গাছ', 'প্রকৃতি', 'মনখারাপ', 'স্মৃতি'],
  },
  {
    id: 'thumb-emo-3',
    title: 'একাকী রেললাইনের শূন্যতা',
    category: 'আবেগ',
    url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=80',
    tags: ['রেললাইন', 'একাকীত্ব', 'দূরত্ব', 'অপেক্ষা'],
  },

  // 4. রহস্য (Mystery)
  {
    id: 'thumb-mys-1',
    title: 'কুয়াশাচ্ছন্ন গভীর নিঝুম অরণ্য',
    category: 'রহস্য',
    url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80',
    tags: ['কুয়াশা', 'বন', 'অন্ধকার', 'রহস্য'],
  },
  {
    id: 'thumb-mys-2',
    title: 'অন্ধকার রাতে একাকী রহস্যময় ল্যাম্পপোস্ট',
    category: 'রহস্য',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    tags: ['রাত', 'আলো', 'গোয়েন্দা', 'রহস্য'],
  },
  {
    id: 'thumb-mys-3',
    title: 'পুরনো দরজার তালা ও গোপন চাবি',
    category: 'রহস্য',
    url: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=800&auto=format&fit=crop&q=80',
    tags: ['দরজা', 'চাবি', 'গোপনীয়', 'রহস্য'],
  },

  // 5. থ্রিলার (Thriller)
  {
    id: 'thumb-thr-1',
    title: 'অন্ধকার শহরের নিস্তব্ধ ছায়ামূর্তি',
    category: 'থ্রিলার',
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80',
    tags: ['শহর', 'থ্রিলার', 'ছায়া', 'রাত'],
  },
  {
    id: 'thumb-thr-2',
    title: 'রক্তিম মেঘ ও ঘন আঁধার',
    category: 'থ্রিলার',
    url: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800&auto=format&fit=crop&q=80',
    tags: ['রক্তিম', 'ঝড়', 'ভয়', 'রোমাঞ্চ'],
  },
  {
    id: 'thumb-thr-3',
    title: 'অচেনা পদচিহ্ন ও নিশীথ রাত',
    category: 'থ্রিলার',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    tags: ['পদচিহ্ন', 'অন্ধকার', 'থ্রিলার'],
  },

  // 6. অ্যাডভেঞ্চার (Adventure)
  {
    id: 'thumb-adv-1',
    title: 'মেঘের ওপর সুউচ্চ পাহাড় চূড়া',
    category: 'অ্যাডভেঞ্চার',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    tags: ['পাহাড়', 'মেঘ', 'ভ্রমণ', 'রোমাঞ্চ'],
  },
  {
    id: 'thumb-adv-2',
    title: 'কম্পাস ও প্রাচীন মানচিত্র',
    category: 'অ্যাডভেঞ্চার',
    url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80',
    tags: ['কম্পাস', 'মানচিত্র', 'অভিযান', 'পথ'],
  },
  {
    id: 'thumb-adv-3',
    title: 'গহীন নদীতে তাঁবু ও ক্যাম্পিং',
    category: 'অ্যাডভেঞ্চার',
    url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80',
    tags: ['ক্যাম্পিং', 'তাঁবু', 'নদী', 'বন'],
  },

  // 7. ইসলামিক (Islamic)
  {
    id: 'thumb-isl-1',
    title: 'পবিত্র কুরআন ও তসবিহ',
    category: 'ইসলামিক',
    url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&auto=format&fit=crop&q=80',
    tags: ['কুরআন', 'তসবিহ', 'ইসলামিক', 'ইবাদত'],
  },
  {
    id: 'thumb-isl-2',
    title: 'মসজিদের মিনার ও গোধূলির আকাশ',
    category: 'ইসলামিক',
    url: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&auto=format&fit=crop&q=80',
    tags: ['মসজিদ', 'মিনার', 'নামাজ', 'শান্তি'],
  },
  {
    id: 'thumb-isl-3',
    title: 'ঐতিহাসিক গম্বুজ ও ইসলামিক স্থাপত্য',
    category: 'ইসলামিক',
    url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&auto=format&fit=crop&q=80',
    tags: ['গম্বুজ', 'স্থাপত্য', 'দ্বীন', 'ঈমান'],
  },

  // 8. পারিবারিক (Family)
  {
    id: 'thumb-fam-1',
    title: 'গ্রামের শান্ত উঠোন ও স্নিগ্ধ সকাল',
    category: 'পারিবারিক',
    url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80',
    tags: ['বাড়ি', 'পরিবার', 'স্নেহ', 'মায়া'],
  },
  {
    id: 'thumb-fam-2',
    title: 'বাবার হাতের স্নেহের পরশ',
    category: 'পারিবারিক',
    url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80',
    tags: ['বাবা', 'সন্তান', 'স্নেহ', 'মমতা'],
  },
  {
    id: 'thumb-fam-3',
    title: 'চায়ের আড্ডা ও পারিবারিক বন্ধন',
    category: 'পারিবারিক',
    url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
    tags: ['চা', 'আড্ডা', 'পরিবার', 'সুখ'],
  },

  // 9. বন্ধুত্ব (Friendship)
  {
    id: 'thumb-fri-1',
    title: 'পাহাড়ের চূড়ায় বন্ধুদের উল্লাস',
    category: 'বন্ধুত্ব',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
    tags: ['বন্ধু', 'হাসি', 'বন্ধুত্ব', 'আড্ডা'],
  },
  {
    id: 'thumb-fri-2',
    title: 'বিকেলের আলোয় বন্ধুদের দল',
    category: 'বন্ধুত্ব',
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80',
    tags: ['দল', 'ক্যাম্পাস', 'স্মৃতি', 'বন্ধুত্ব'],
  },
  {
    id: 'thumb-fri-3',
    title: 'একসাথে পথচলার চিরন্তন শপথ',
    category: 'বন্ধুত্ব',
    url: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&auto=format&fit=crop&q=80',
    tags: ['বন্ধু', 'আস্থা', 'ভালোবাসা', 'সাথী'],
  },

  // 10. জীবনধর্মী (Life)
  {
    id: 'thumb-lif-1',
    title: 'গ্রামীণ মেঠোপথ ও সাইকেল চালক',
    category: 'জীবনধর্মী',
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=800&auto=format&fit=crop&q=80',
    tags: ['জীবন', 'গ্রাম', 'বাস্তবতা', 'পথ'],
  },
  {
    id: 'thumb-lif-2',
    title: 'শহরের ব্যস্ত ট্রাফিক ও আলোর মিছিল',
    category: 'জীবনধর্মী',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80',
    tags: ['শহর', 'জীবনযুদ্ধ', 'রাত', 'আলো'],
  },
  {
    id: 'thumb-lif-3',
    title: 'পায়ের ছাপ ও জীবনের লড়াই',
    category: 'জীবনধর্মী',
    url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop&q=80',
    tags: ['লড়াই', 'সংগ্রাম', 'বাস্তব', 'জীবন'],
  },

  // 11. কিশোর গল্প (Teen)
  {
    id: 'thumb-tee-1',
    title: 'খেলার মাঠ ও রঙিন ফুটবল',
    category: 'কিশোর গল্প',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    tags: ['খেলা', 'কৈশোর', 'মাঠ', 'আনন্দ'],
  },
  {
    id: 'thumb-tee-2',
    title: 'রঙিন স্কুলের ব্যাকপ্যাক ও খাতা',
    category: 'কিশোর গল্প',
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
    tags: ['স্কুল', 'পড়াশোনা', 'কৈশোর', 'বন্ধু'],
  },
  {
    id: 'thumb-tee-3',
    title: 'তারাভরা রাতের রহস্যময় টেলিস্কোপ',
    category: 'কিশোর গল্প',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80',
    tags: ['তারা', 'আকাশ', 'বিজ্ঞান', 'কল্পনা'],
  },

  // 12. ছোট গল্প (Short Story)
  {
    id: 'thumb-sho-1',
    title: 'ডায়েরির পাতা ও পুরোনো কলম',
    category: 'ছোট গল্প',
    url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80',
    tags: ['ডায়েরি', 'কলম', 'সাহিত্য', 'ছোটগল্প'],
  },
  {
    id: 'thumb-sho-2',
    title: 'ফাউন্টেন পেন ও সাদা কাগজের ক্যানভাস',
    category: 'ছোট গল্প',
    url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80',
    tags: ['কলম', 'কালি', 'গল্প', 'লেখা'],
  },
  {
    id: 'thumb-sho-3',
    title: 'খোলা বই ও নরম বিকেলের রোদ',
    category: 'ছোট গল্প',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
    tags: ['বই', 'পাঠক', 'রোদ', 'ছোটগল্প'],
  },

  // 13. উপন্যাস (Novel)
  {
    id: 'thumb-nov-1',
    title: 'বইয়ের স্তূপ ও ক্লাসিক প্রকাশনা',
    category: 'উপন্যাস',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    tags: ['উপন্যাস', 'বই', 'লাইব্রেরি', 'সাহিত্য'],
  },
  {
    id: 'thumb-nov-2',
    title: 'প্রাচীন লাইব্রেরির দীর্ঘ শেলফ',
    category: 'উপন্যাস',
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80',
    tags: ['লাইব্রেরি', 'জ্ঞান', 'উপন্যাস', 'মহাকাব্য'],
  },
  {
    id: 'thumb-nov-3',
    title: 'টাইপরাইটার ও পাণ্ডুলিপির পাতা',
    category: 'উপন্যাস',
    url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=80',
    tags: ['টাইপরাইটার', 'লেখক', 'পাণ্ডুলিপি', 'উপন্যাস'],
  },
];
