import React, { useState, useMemo } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  BookOpen,
  Layers,
  Save,
  X,
  Check,
  Shield,
  RotateCcw,
  ExternalLink,
  Lock,
  Search,
  Eye,
  Star,
  Sparkles,
  Flame,
  Clock,
  FileText,
  User,
  Image as ImageIcon,
  ArrowLeft,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Mail,
  Facebook,
  Instagram,
  Share2,
  Globe,
  AtSign,
  Users,
  UserPlus,
  Calendar,
  Download,
  UserCheck,
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { Story, Chapter, StoryCategory, ContactInfo } from '../types';
import { CATEGORIES } from '../data/initialData';
import { WRITER_IMAGE } from '../constants/assets';
import { CATEGORY_THUMBNAILS, PresetThumbnail } from '../data/categoryThumbnails';
import { USER_AVATARS } from '../data/avatars';
import { WhatsAppIcon, formatWhatsAppUrl } from '../components/WhatsAppIcon';

export const AdminPage: React.FC = () => {
  const {
    stories,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    addStory,
    updateStory,
    deleteStory,
    addChapter,
    updateChapter,
    deleteChapter,
    resetToDefaults,
    navigateTo,
    contactInfo,
    updateContactInfo,
    registeredUsers,
    deleteUserAccount,
    registerUser,
  } = useStory();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard Tab state
  const [activeTab, setActiveTab] = useState<'stories' | 'new-story' | 'users' | 'contact' | 'system'>('stories');
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [userSearchFilter, setUserSearchFilter] = useState('');
  const [confirmDeleteUserId, setConfirmDeleteUserId] = useState<string | null>(null);

  // User Management State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserAvatar, setNewUserAvatar] = useState(USER_AVATARS[0].url);
  const [newUserBio, setNewUserBio] = useState('নভেলাএক্স এনবিএস এর নিয়মিত পাঠক');
  const [newUserEmail, setNewUserEmail] = useState('');

  // Filtered registered users
  const filteredUsers = useMemo(() => {
    if (!userSearchFilter.trim()) return registeredUsers;
    return registeredUsers.filter(
      u =>
        u.name.toLowerCase().includes(userSearchFilter.toLowerCase()) ||
        (u.bio && u.bio.toLowerCase().includes(userSearchFilter.toLowerCase())) ||
        (u.email && u.email.toLowerCase().includes(userSearchFilter.toLowerCase()))
    );
  }, [registeredUsers, userSearchFilter]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;
    registerUser(newUserName, newUserAvatar, newUserEmail, newUserBio);
    showNotification(`পাঠক "${newUserName}" সফলভাবে অ্যাকাউন্টে যুক্ত হয়েছে!`, 'success');
    setIsAddUserModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserBio('নভেলাএক্স এনবিএস এর নিয়মিত পাঠক');
  };

  const handleDeleteUser = (userId: string) => {
    deleteUserAccount(userId);
    setConfirmDeleteUserId(null);
    showNotification('পাঠক অ্যাকাউন্টটি সফলভাবে মুছে ফেলা হয়েছে', 'success');
  };

  const handleExportUsersJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(registeredUsers, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `novellax_readers_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('পাঠক তালিকা JSON হিসেবে ডাউনলোড হয়েছে!', 'success');
  };

  // Contact Form State
  const [contactForm, setContactForm] = useState<ContactInfo>({
    tiktok: contactInfo.tiktok,
    instagram: contactInfo.instagram,
    facebook: contactInfo.facebook,
    email: contactInfo.email,
    whatsapp: contactInfo.whatsapp || '',
  });

  // Keep form in sync if contactInfo changes
  React.useEffect(() => {
    setContactForm(contactInfo);
  }, [contactInfo]);

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo(contactForm);
    showNotification('যোগাযোগের তথ্য (সোশ্যাল মিডিয়া ও ইমেইল) সফলভাবে সংরক্ষণ করা হয়েছে!', 'success');
  };

  // Story Form State
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [storyForm, setStoryForm] = useState<{
    title: string;
    slug: string;
    description: string;
    coverImage: string;
    category: StoryCategory;
    author: string;
    authorImage: string;
    status: 'চলমান' | 'সম্পূর্ণ';
    featured: boolean;
    popular: boolean;
    latest: boolean;
    readersChoice: boolean;
  }>({
    title: '',
    slug: '',
    description: '',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
    category: 'রোমান্টিক',
    author: 'মাহবুব আলম',
    authorImage: 'https://i.postimg.cc/MTx6JQYP/1790390500089.jpg',
    status: 'চলমান',
    featured: false,
    popular: false,
    latest: true,
    readersChoice: false,
  });

  // Chapter Modal State
  const [activeStoryForChapters, setActiveStoryForChapters] = useState<Story | null>(null);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [chapterForm, setChapterForm] = useState({
    title: '',
    content: '',
    chapterNumber: 1,
  });

  const [notification, setNotification] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Preset Thumbnail Gallery Modal state
  const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);
  const [thumbnailCategoryFilter, setThumbnailCategoryFilter] = useState<string>('all');
  const [thumbnailSearchQuery, setThumbnailSearchQuery] = useState('');

  // Thumbnails matching current story form category
  const currentCategoryPresets = useMemo(() => {
    return CATEGORY_THUMBNAILS.filter(t => t.category === storyForm.category);
  }, [storyForm.category]);

  // Thumbnails filtered in modal
  const modalThumbnails = useMemo(() => {
    return CATEGORY_THUMBNAILS.filter(t => {
      const matchCat = thumbnailCategoryFilter === 'all' || t.category === thumbnailCategoryFilter;
      const matchSearch =
        !thumbnailSearchQuery.trim() ||
        t.title.toLowerCase().includes(thumbnailSearchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(thumbnailSearchQuery.toLowerCase()) ||
        t.tags.some(tag => tag.toLowerCase().includes(thumbnailSearchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [thumbnailCategoryFilter, thumbnailSearchQuery]);

  const showNotification = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Metrics
  const totalChapters = useMemo(
    () => stories.reduce((acc, s) => acc + (s.chapters?.length || 0), 0),
    [stories]
  );
  const totalReads = useMemo(
    () => stories.reduce((acc, s) => acc + (s.readsCount || 0), 0),
    [stories]
  );

  // Filtered stories for admin table
  const filteredStories = useMemo(() => {
    return stories.filter(s => {
      const matchCat = categoryFilter === 'all' || s.category === categoryFilter;
      const matchSearch =
        !searchFilter ||
        s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        s.author.toLowerCase().includes(searchFilter.toLowerCase()) ||
        s.category.toLowerCase().includes(searchFilter.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [stories, categoryFilter, searchFilter]);

  // Handle Login submission: strictly checks password === Sahid_Ahmed_009
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setPasswordInput('');
      setLoginError('');
      showNotification('এডমিন প্যানেলে স্বাগতম!', 'success');
    } else {
      setLoginError('ভুল সিকিউরিটি পাসওয়ার্ড! সঠিক পাসওয়ার্ড প্রবেশ করান।');
    }
  };

  // 1. SECRET STEALTH LOGIN SCREEN
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-8">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight font-serif">
              সিস্টেম সিকিউরিটি গেটওয়ে
            </h1>
            <p className="text-xs text-slate-400">
              NovellaX NBS কন্ট্রোল প্যানেল অ্যাক্সেস করতে পাসওয়ার্ড দিন
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                মাস্টার সিকিউরিটি কী (Master Password)
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={e => {
                    setPasswordInput(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  placeholder="সিকিউরিটি পাসওয়ার্ড লিখুন..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden transition-all"
                  autoFocus
                />
              </div>
              {loginError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              আনলক করুন (Authenticate)
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>মূল ওয়েবসাইটে ফিরে যান</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] text-slate-600 mt-8">
          NovellaX NBS • Protected Editorial Studio
        </p>
      </div>
    );
  }

  // Story Form Handlers
  const handleOpenEditStory = (story: Story) => {
    setEditingStoryId(story.id);
    setActiveTab('new-story');
    setStoryForm({
      title: story.title,
      slug: story.slug,
      description: story.description,
      coverImage: story.coverImage,
      category: story.category,
      author: story.author,
      authorImage: story.authorImage || 'https://i.postimg.cc/MTx6JQYP/1790390500089.jpg',
      status: story.status,
      featured: story.featured,
      popular: story.popular,
      latest: story.latest,
      readersChoice: story.readersChoice || false,
    });
  };

  const handleResetStoryForm = () => {
    setEditingStoryId(null);
    setStoryForm({
      title: '',
      slug: '',
      description: '',
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
      category: 'রোমান্টিক',
      author: 'মাহবুব আলম',
      authorImage: 'https://i.postimg.cc/MTx6JQYP/1790390500089.jpg',
      status: 'চলমান',
      featured: false,
      popular: false,
      latest: true,
      readersChoice: false,
    });
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyForm.title.trim() || !storyForm.description.trim()) {
      showNotification('গল্পের শিরোনাম এবং বিবরণ আবশ্যক!', 'error');
      return;
    }

    const generatedSlug =
      storyForm.slug.trim() ||
      storyForm.title
        .toLowerCase()
        .replace(/[\s\W-]+/g, '-')
        .replace(/^-+|-+$/g, '') ||
      `story-${Date.now()}`;

    if (editingStoryId) {
      updateStory(editingStoryId, {
        ...storyForm,
        slug: generatedSlug,
      });
      showNotification('গল্পটি সফলভাবে আপডেট করা হয়েছে!', 'success');
    } else {
      addStory({
        ...storyForm,
        slug: generatedSlug,
        chapters: [
          {
            id: `chap-${Date.now()}`,
            storyId: '',
            chapterNumber: 1,
            title: 'প্রথম অধ্যায়',
            content: 'এখানে আপনার গল্পের প্রথম অধ্যায়ের বিস্তারিত কাহিনী লিখুন...',
            wordCount: 150,
            estimatedReadTime: '২ মিনিট',
            publishedAt: 'আজ',
          },
        ],
      });
      showNotification('নতুন গল্পটি সফলভাবে প্রকাশ করা হয়েছে!', 'success');
    }

    handleResetStoryForm();
    setActiveTab('stories');
  };

  const handleDeleteStoryConfirm = (storyId: string) => {
    deleteStory(storyId);
    setConfirmDeleteId(null);
    showNotification('গল্পটি মুছে ফেলা হয়েছে!', 'success');
  };

  // Chapter Handlers
  const handleOpenChapters = (story: Story) => {
    setActiveStoryForChapters(story);
    setIsChapterModalOpen(true);
    setEditingChapterId(null);
    setChapterForm({
      title: '',
      content: '',
      chapterNumber: (story.chapters?.length || 0) + 1,
    });
  };

  const handleSaveChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStoryForChapters || !chapterForm.title.trim() || !chapterForm.content.trim()) {
      showNotification('অধ্যায়ের শিরোনাম ও বিষয়বস্তু লিখুন!', 'error');
      return;
    }

    const wordCount = chapterForm.content.trim().split(/\s+/).length;
    const estMinutes = Math.max(1, Math.ceil(wordCount / 180));
    const estimatedReadTime = `${estMinutes} মিনিট`;

    if (editingChapterId) {
      updateChapter(activeStoryForChapters.id, editingChapterId, {
        title: chapterForm.title,
        content: chapterForm.content,
        chapterNumber: chapterForm.chapterNumber,
        wordCount,
        estimatedReadTime,
      });
      showNotification('অধ্যায়টি সফলভাবে আপডেট করা হয়েছে!');
    } else {
      addChapter(activeStoryForChapters.id, {
        title: chapterForm.title,
        content: chapterForm.content,
        chapterNumber: activeStoryForChapters.chapters.length + 1,
        wordCount,
        estimatedReadTime,
      });
      showNotification('নতুন অধ্যায় সফলভাবে যুক্ত করা হয়েছে!');
    }

    setEditingChapterId(null);
    setChapterForm({
      title: '',
      content: '',
      chapterNumber: activeStoryForChapters.chapters.length + 2,
    });

    // Refresh active story reference
    const updated = stories.find(s => s.id === activeStoryForChapters.id);
    if (updated) setActiveStoryForChapters(updated);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div
            className={`px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-semibold border ${
              notification.type === 'error'
                ? 'bg-rose-950 text-rose-200 border-rose-800'
                : 'bg-emerald-950 text-emerald-200 border-emerald-800'
            }`}
          >
            {notification.type === 'error' ? (
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>{notification.msg}</span>
          </div>
        </div>
      )}

      {/* 1. STUDIO MASTER TOPBAR */}
      <header className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Studio Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
                <Shield className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-tight font-serif text-base">
                  NovellaX Studio
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono font-bold">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] text-slate-400">গল্প ও অধ্যায় কন্ট্রোল ড্যাশবোর্ড</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>লাইভ সাইট দেখুন</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 text-xs font-semibold border border-rose-500/30 transition-colors cursor-pointer"
              title="এডমিন লগআউট"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">লগআউট</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN DASHBOARD CANVAS */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4.5 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>মোট গল্প</span>
              <BookOpen className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-serif">
              {stories.length}
            </div>
            <p className="text-[10px] text-slate-500">মৌলিক সাহিত্য সংখ্যা</p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4.5 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>মোট অধ্যায়</span>
              <FileText className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-serif">
              {totalChapters}
            </div>
            <p className="text-[10px] text-slate-500">প্রকাশিত পর্ব সমূহ</p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4.5 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>সর্বমোট পঠিত</span>
              <Eye className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-serif">
              {totalReads.toLocaleString('bn-BD')}
            </div>
            <p className="text-[10px] text-slate-500">পাঠকদের দর্শন সংখ্যা</p>
          </div>

          {/* REGISTERED USERS COUNT (USER REQUIREMENT) */}
          <div
            onClick={() => setActiveTab('users')}
            className="bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-4.5 space-y-1.5 cursor-pointer transition-colors group"
            title="পাঠক তালিকা দেখতে ক্লিক করুন"
          >
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span className="group-hover:text-blue-400 transition-colors">নিবন্ধিত পাঠক</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-serif group-hover:text-blue-400 transition-colors">
              {registeredUsers.length} জন
            </div>
            <p className="text-[10px] text-blue-400 font-medium">অ্যাকাউন্ট খোলা পাঠক</p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4.5 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>সক্রিয় ক্যাটাগরি</span>
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-serif">
              {CATEGORIES.length}
            </div>
            <p className="text-[10px] text-slate-500">সাহিত্যিক ঘরানা</p>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                setActiveTab('stories');
                handleResetStoryForm();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'stories'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>গল্প তালিকা ({stories.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('new-story');
                if (!editingStoryId) handleResetStoryForm();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'new-story'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{editingStoryId ? 'গল্প সম্পাদনা' : 'নতুন গল্প প্রকাশ'}</span>
            </button>

            {/* TAB: REGISTERED USERS */}
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'users'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>পাঠক অ্যাকাউন্ট ({registeredUsers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'contact'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>যোগাযোগ তথ্য (Social Links)</span>
            </button>

            <button
              onClick={() => setActiveTab('system')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'system'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>সিস্টেম ও ব্যাকআপ</span>
            </button>
          </div>

          {activeTab === 'stories' && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  placeholder="গল্প বা লেখক খুঁজুন..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-hidden focus:border-blue-500"
              >
                <option value="all">সকল ক্যাটাগরি</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* TAB 1: STORY MANAGEMENT TABLE & CARDS */}
        {activeTab === 'stories' && (
          <div className="space-y-4">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">কভার</th>
                      <th className="py-3 px-4">শিরোনাম ও বিবরণ</th>
                      <th className="py-3 px-4">ক্যাটাগরি</th>
                      <th className="py-3 px-4">লেখক ও ছবি</th>
                      <th className="py-3 px-4 text-center">অধ্যায়</th>
                      <th className="py-3 px-4 text-center">পাঠসংখ্যা</th>
                      <th className="py-3 px-4 text-center">স্ট্যাটাস</th>
                      <th className="py-3 px-4 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredStories.map(story => (
                      <tr key={story.id} className="hover:bg-slate-800/40 transition-colors">
                        {/* Cover thumbnail */}
                        <td className="py-3 px-4 w-16">
                          <img
                            src={story.coverImage}
                            alt={story.title}
                            className="w-12 h-16 rounded-lg object-cover ring-1 ring-slate-700 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        </td>

                        {/* Title & Info */}
                        <td className="py-3 px-4 max-w-xs">
                          <h4 className="font-bold text-white text-sm line-clamp-1 font-serif">
                            {story.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {story.description}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            {story.featured && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                বিশেষ
                              </span>
                            )}
                            {story.popular && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                জনপ্রিয়
                              </span>
                            )}
                            {story.latest && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                নতুন
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium">
                            {story.category}
                          </span>
                        </td>

                        {/* Author & Author Image */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={story.authorImage || WRITER_IMAGE}
                              alt={story.author}
                              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-700 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <p className="font-medium text-white line-clamp-1">{story.author}</p>
                              {story.authorImage && (
                                <span className="text-[9px] text-blue-400 font-mono">Custom pic</span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Chapter count button */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleOpenChapters(story)}
                            className="px-2 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold cursor-pointer"
                            title="অধ্যায় পরিচালনা করুন"
                          >
                            {story.chapters?.length || 0} টি
                          </button>
                        </td>

                        {/* Reads count */}
                        <td className="py-3 px-4 text-center font-mono text-slate-400">
                          {story.readsCount || 0}
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              story.status === 'সম্পূর্ণ'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}
                          >
                            {story.status}
                          </span>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenChapters(story)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                              title="অধ্যায় যুক্ত ও পরিবর্তন"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleOpenEditStory(story)}
                              className="p-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition-colors cursor-pointer"
                              title="গল্প সম্পাদনা করুন"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => setConfirmDeleteId(story.id)}
                              className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition-colors cursor-pointer"
                              title="গল্প মুছে ফেলুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STORY EDITOR / CREATE FORM */}
        {activeTab === 'new-story' && (
          <form
            onSubmit={handleSaveStory}
            className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-serif">
                  {editingStoryId ? 'গল্পের তথ্য পরিবর্তন করুন' : 'নতুন মৌলিক গল্প প্রকাশ করুন'}
                </h3>
                <p className="text-xs text-slate-400">
                  সঠিক তথ্য ও আকর্ষণীয় কভার ছবি সহ গল্পটি যুক্ত করুন
                </p>
              </div>

              {editingStoryId && (
                <button
                  type="button"
                  onClick={handleResetStoryForm}
                  className="px-3 py-1.5 text-xs bg-slate-800 text-slate-300 hover:text-white rounded-xl"
                >
                  নতুন ফর্মে রূপান্তর
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Basic Story Info */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    গল্পের শিরোনাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={storyForm.title}
                    onChange={e => setStoryForm({ ...storyForm, title: e.target.value })}
                    placeholder="যেমন: মেঘবালিকার চিঠি"
                    className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      ক্যাটাগরি
                    </label>
                    <select
                      value={storyForm.category}
                      onChange={e =>
                        setStoryForm({ ...storyForm, category: e.target.value as StoryCategory })
                      }
                      className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-hidden focus:border-blue-500"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      গল্পের অবস্থা
                    </label>
                    <select
                      value={storyForm.status}
                      onChange={e =>
                        setStoryForm({ ...storyForm, status: e.target.value as any })
                      }
                      className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-hidden focus:border-blue-500"
                    >
                      <option value="চলমান">চলমান (Ongoing)</option>
                      <option value="সম্পূর্ণ">সম্পূর্ণ (Completed)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    গল্পের সারসংক্ষেপ / বিবরণ *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={storyForm.description}
                    onChange={e => setStoryForm({ ...storyForm, description: e.target.value })}
                    placeholder="পাঠকদের আকৃষ্ট করার মতো গল্পের মূল ভাবনা ও ভূমিকা লিখুন..."
                    className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    URL স্লাগ (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={storyForm.slug}
                    onChange={e => setStoryForm({ ...storyForm, slug: e.target.value })}
                    placeholder="স্বয়ংক্রিয়ভাবে তৈরি হবে যদি ফাঁকা থাকে"
                    className="w-full px-4 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-slate-300 font-mono focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Right Column: Writer Picture & Media */}
              <div className="lg:col-span-5 space-y-4">
                {/* 1. WRITER NAME & WRITER PICTURE LINK (Requirement 5) */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                    <User className="w-4 h-4" />
                    <span>লেখকের তথ্য ও প্রোফাইল ছবি</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      লেখকের নাম
                    </label>
                    <input
                      type="text"
                      value={storyForm.author}
                      onChange={e => setStoryForm({ ...storyForm, author: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      লেখকের ছবির সরাসরি লিংক (Writer Image URL)
                    </label>
                    <input
                      type="url"
                      value={storyForm.authorImage}
                      onChange={e => setStoryForm({ ...storyForm, authorImage: e.target.value })}
                      placeholder="https://i.postimg.cc/MTx6JQYP/1790390500089.jpg"
                      className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white font-mono"
                    />
                    <div className="flex items-center justify-between mt-1.5">
                      <p className="text-[10px] text-slate-500">
                        ফাঁকা রাখলে প্রধান ডিফল্ট লেখকের ছবি ব্যবহৃত হবে।
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setStoryForm({
                            ...storyForm,
                            authorImage: 'https://i.postimg.cc/MTx6JQYP/1790390500089.jpg',
                          })
                        }
                        className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold cursor-pointer underline"
                      >
                        মাহবুব আলমের ছবি দিন
                      </button>
                    </div>
                  </div>

                  {/* Writer image live preview */}
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                    <img
                      src={storyForm.authorImage || WRITER_IMAGE}
                      alt={storyForm.author}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-xs">
                      <p className="font-semibold text-white">{storyForm.author}</p>
                      <p className="text-[10px] text-slate-400">লাইভ ছবি প্রিভিউ</p>
                    </div>
                  </div>
                </div>

                {/* 2. COVER IMAGE LINK & CATEGORY PRESETS */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3.5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                      <ImageIcon className="w-4 h-4" />
                      <span>গল্পের থাম্বনেইল / কভার ছবি</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailCategoryFilter(storyForm.category);
                        setIsThumbnailModalOpen(true);
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-lg transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>সব ক্যাটাগরির গ্যালারি ({CATEGORY_THUMBNAILS.length}+)</span>
                    </button>
                  </div>

                  <div>
                    <input
                      type="url"
                      value={storyForm.coverImage}
                      onChange={e => setStoryForm({ ...storyForm, coverImage: e.target.value })}
                      placeholder="কভার ছবির সরাসরি URL লিখুন বা নিচের থেকে সিলেক্ট করুন..."
                      className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white font-mono placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                    />
                  </div>

                  {/* Quick Recommended Presets for Selected Category */}
                  {currentCategoryPresets.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1 font-medium">
                          <span>💡</span>
                          <strong className="text-blue-400">"{storyForm.category}"</strong> ক্যাটাগরির প্রস্তাবিত ছবি:
                        </span>
                        <span className="text-[10px] text-slate-500">ক্লিক করে বেছে নিন</span>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {currentCategoryPresets.map(preset => {
                          const isSelected = storyForm.coverImage === preset.url;
                          return (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => {
                                setStoryForm({ ...storyForm, coverImage: preset.url });
                                showNotification(`"${preset.title}" কভার হিসেবে সেট করা হয়েছে!`);
                              }}
                              className={`group relative rounded-lg overflow-hidden border transition-all text-left cursor-pointer aspect-4/3 ${
                                isSelected
                                  ? 'border-blue-500 ring-2 ring-blue-500/40 shadow-md scale-95'
                                  : 'border-slate-700 hover:border-slate-500 hover:scale-102'
                              }`}
                              title={preset.title}
                            >
                              <img
                                src={preset.url}
                                alt={preset.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-1">
                                <span className="text-[9px] text-white font-medium line-clamp-1 leading-tight">
                                  {preset.title}
                                </span>
                              </div>
                              {isSelected && (
                                <div className="absolute top-1 right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xs">
                                  <Check className="w-2.5 h-2.5" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Main Live Preview */}
                  <div className="aspect-16/9 rounded-xl overflow-hidden bg-slate-950 relative border border-slate-800 group">
                    <img
                      src={storyForm.coverImage}
                      alt="কভার প্রিভিউ"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setThumbnailCategoryFilter(storyForm.category);
                          setIsThumbnailModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-lg cursor-pointer flex items-center gap-1.5"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>ছবি পরিবর্তন করুন</span>
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] text-slate-300 border border-white/10">
                      লাইভ কভার প্রিভিউ
                    </div>
                  </div>
                </div>

                {/* 3. STORY TAGS & HIGHLIGHTS */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <p className="text-xs font-bold text-amber-400 mb-2">হাইলাইটস ও ব্যাজ</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={storyForm.latest}
                        onChange={e => setStoryForm({ ...storyForm, latest: e.target.checked })}
                        className="rounded border-slate-700 text-blue-600 focus:ring-0"
                      />
                      <span>নতুন প্রকাশিত</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={storyForm.popular}
                        onChange={e => setStoryForm({ ...storyForm, popular: e.target.checked })}
                        className="rounded border-slate-700 text-blue-600 focus:ring-0"
                      />
                      <span>জনপ্রিয়</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={storyForm.featured}
                        onChange={e => setStoryForm({ ...storyForm, featured: e.target.checked })}
                        className="rounded border-slate-700 text-blue-600 focus:ring-0"
                      />
                      <span>বিশেষ পছন্দ (Hero)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={storyForm.readersChoice}
                        onChange={e =>
                          setStoryForm({ ...storyForm, readersChoice: e.target.checked })
                        }
                        className="rounded border-slate-700 text-blue-600 focus:ring-0"
                      />
                      <span>পাঠকপ্রিয়</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Action Controls */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  handleResetStoryForm();
                  setActiveTab('stories');
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                বাতিল করুন
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{editingStoryId ? 'আপডেট সংরক্ষণ করুন' : 'গল্প প্রকাশ করুন'}</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: CONTACT INFORMATION (TikTok, Instagram, Facebook, Email) */}
        {activeTab === 'contact' && (
          <form
            onSubmit={handleSaveContact}
            className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-3">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>কমিউনিকেশন ও সোশ্যাল মিডিয়া প্রোফাইল</span>
                </div>
                <h3 className="text-lg font-bold text-white font-serif">
                  যোগাযোগের তথ্য ও সোশ্যাল মিডিয়া হ্যান্ডেল
                </h3>
                <p className="text-xs text-slate-400">
                  পাঠকরা সরাসরি আপনার সঙ্গে যোগাযোগ করতে পারবে। এখানে দেওয়া লিংকগুলো ওয়েবসাইট ও যোগাযোগ পেজে সক্রিয় হবে।
                </p>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>পরিবর্তন সংরক্ষণ করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Form Inputs */}
              <div className="lg:col-span-7 space-y-5">
                {/* 1. WhatsApp */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-emerald-500 text-white flex items-center justify-center">
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span>WhatsApp নম্বর বা লিংক (WhatsApp Chat)</span>
                    </label>
                    {contactForm.whatsapp && (
                      <a
                        href={formatWhatsAppUrl(contactForm.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        <span>টেস্ট চ্যাট</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <input
                    type="text"
                    value={contactForm.whatsapp || ''}
                    onChange={e => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                    placeholder="017XXXXXXXX বা +88017XXXXXXXX বা https://wa.me/..."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white font-mono placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                  />
                  <p className="text-[11px] text-slate-500">
                    হোয়াটসঅ্যাপ নম্বর (যেমন: 017XXXXXXXX বা +88017XXXXXXXX) অথবা wa.me লিংক দিলে পাঠকরা সরাসরি চ্যাট শুরু করতে পারবে।
                  </p>
                </div>

                {/* 2. TikTok */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center font-bold text-[10px]">
                        TT
                      </div>
                      <span>TikTok প্রোফাইল লিংক বা ইউজারনেম</span>
                    </label>
                    {contactForm.tiktok && (
                      <a
                        href={contactForm.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
                      >
                        <span>টেস্ট করুন</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <input
                    type="text"
                    value={contactForm.tiktok}
                    onChange={e => setContactForm({ ...contactForm, tiktok: e.target.value })}
                    placeholder="https://www.tiktok.com/@your_username"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white font-mono placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                  />
                  <p className="text-[11px] text-slate-500">
                    উদাহরণ: https://www.tiktok.com/@novellaxnbs
                  </p>
                </div>

                {/* 2. Instagram */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center">
                        <Instagram className="w-3.5 h-3.5" />
                      </div>
                      <span>Instagram প্রোফাইল লিংক</span>
                    </label>
                    {contactForm.instagram && (
                      <a
                        href={contactForm.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
                      >
                        <span>টেস্ট করুন</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <input
                    type="text"
                    value={contactForm.instagram}
                    onChange={e => setContactForm({ ...contactForm, instagram: e.target.value })}
                    placeholder="https://www.instagram.com/your_username"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white font-mono placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                  />
                  <p className="text-[11px] text-slate-500">
                    উদাহরণ: https://www.instagram.com/novellaxnbs
                  </p>
                </div>

                {/* 3. Facebook */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center">
                        <Facebook className="w-3.5 h-3.5" />
                      </div>
                      <span>Facebook পেজ বা প্রোফাইল লিংক</span>
                    </label>
                    {contactForm.facebook && (
                      <a
                        href={contactForm.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
                      >
                        <span>টেস্ট করুন</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <input
                    type="text"
                    value={contactForm.facebook}
                    onChange={e => setContactForm({ ...contactForm, facebook: e.target.value })}
                    placeholder="https://www.facebook.com/your_page_or_profile"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white font-mono placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                  />
                  <p className="text-[11px] text-slate-500">
                    উদাহরণ: https://www.facebook.com/novellaxnbs
                  </p>
                </div>

                {/* 4. Email */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <span>অফিশিয়াল যোগাযোগের ইমেইল (Email Address)</span>
                    </label>
                    {contactForm.email && (
                      <a
                        href={`mailto:${contactForm.email}`}
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        <span>ইমেইল পাঠান</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="contact@novellaxnbs.app"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white font-mono placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                  />
                  <p className="text-[11px] text-slate-500">
                    পাঠকরা এই ইমেইল অ্যাড্রেসে ক্লিক করলে তাদের ইমেইল অ্যাপ ওপেন হবে।
                  </p>
                </div>
              </div>

              {/* Right Column: Live Preview of Contact Channels */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                      <Globe className="w-4 h-4 text-blue-400" />
                      <span>ওয়েবসাইটে লাইভ প্রিভিউ</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">
                      Active
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">
                    ওয়েবসাইটের <strong>"যোগাযোগ" (Contact)</strong> পেজ এবং <strong>ফুটার (Footer)</strong>-এ পাঠকরা নিচের মতো দেখতে পাবে:
                  </p>

                  <div className="space-y-2.5">
                    {/* WhatsApp Preview Card */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                          <WhatsAppIcon className="w-4 h-4 fill-current" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">WhatsApp</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 font-mono">
                            {contactForm.whatsapp || 'সংযুক্ত নেই'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold">চ্যাট</span>
                    </div>

                    {/* TikTok Preview Card */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">
                          TT
                        </div>
                        <div>
                          <p className="font-semibold text-white">TikTok</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 font-mono">
                            {contactForm.tiktok || 'সংযুক্ত নেই'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-blue-400 font-semibold">ভিডিও</span>
                    </div>

                    {/* Instagram Preview Card */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center">
                          <Instagram className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Instagram</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 font-mono">
                            {contactForm.instagram || 'সংযুক্ত নেই'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-rose-400 font-semibold">ফটো</span>
                    </div>

                    {/* Facebook Preview Card */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                          <Facebook className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Facebook</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 font-mono">
                            {contactForm.facebook || 'সংযুক্ত নেই'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-blue-400 font-semibold">পেজ</span>
                    </div>

                    {/* Email Preview Card */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Email</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 font-mono">
                            {contactForm.email || 'সংযুক্ত নেই'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold">ইমেইল</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>সংরক্ষণ করুন (Save)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* TAB: REGISTERED USERS (পাঠক অ্যাকাউন্ট) */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Header & Stats Banner */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20 mb-2">
                    <Users className="w-3.5 h-3.5" />
                    <span>পাঠক ডাটাবেজ ও সক্রিয় সদস্য</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif flex items-center gap-2">
                    <span>নিবন্ধিত পাঠক অ্যাকাউন্ট ({registeredUsers.length} জন)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    ছবি ও নাম দিয়ে ওয়েবসাইটে অ্যাকাউন্ট খোলা সকল পাঠকের সরাসরি হিসাব ও তালিকা।
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setIsAddUserModalOpen(true)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>নতুন পাঠক যোগ করুন</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportUsersJson}
                    className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                    title="পাঠক তালিকা JSON ডাউনলোড করুন"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">ব্যাকআপ</span>
                  </button>
                </div>
              </div>

              {/* Metric Counters & Search Filter Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400">সর্বমোট অ্যাকাউন্ট</p>
                    <p className="text-xl font-bold text-white font-serif">{registeredUsers.length} জন</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400">সক্রিয় পাঠক</p>
                    <p className="text-xl font-bold text-white font-serif">{registeredUsers.length} জন</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400">প্রদর্শিত ফলাফল</p>
                    <p className="text-xl font-bold text-white font-serif">{filteredUsers.length} জন</p>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userSearchFilter}
                    onChange={e => setUserSearchFilter(e.target.value)}
                    placeholder="পাঠকের নাম, বায়ো অথবা আইডি দিয়ে খুঁজুন..."
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition-colors"
                  />
                  {userSearchFilter && (
                    <button
                      onClick={() => setUserSearchFilter('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Readers Grid */}
            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map(user => (
                  <div
                    key={user.id}
                    className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 shadow-xl transition-all duration-200 flex flex-col justify-between group space-y-4"
                  >
                    <div className="space-y-3.5">
                      {/* Top Row: Avatar & Badges */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <div className="relative">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-13 h-13 rounded-full object-cover ring-2 ring-blue-500 shadow-md bg-slate-900"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-slate-950 text-[9px] text-white flex items-center justify-center font-bold">
                              ✓
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold text-white text-sm sm:text-base font-serif group-hover:text-blue-400 transition-colors">
                              {user.name}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                              #{user.id}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold shrink-0">
                          পাঠক
                        </span>
                      </div>

                      {/* Bio / Quote */}
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs text-slate-300 italic leading-relaxed">
                        "{user.bio || 'নভেলাএক্স এনবিএস এর নিয়মিত পাঠক'}"
                      </div>

                      {/* Info details */}
                      <div className="space-y-1.5 text-[11px] text-slate-400 pt-1">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span>নিবন্ধন: {user.createdAt || 'সম্প্রতি'}</span>
                        </div>
                        {user.email && (
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{user.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>সক্রিয় অ্যাকাউন্ট</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => setConfirmDeleteUserId(user.id)}
                        className="px-2.5 py-1.5 text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        title="এই পাঠক অ্যাকাউন্টটি মুছে ফেলুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>মুছুন</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
                <Users className="w-12 h-12 mx-auto text-slate-600" />
                <h4 className="text-base font-bold text-white font-serif">
                  {userSearchFilter ? 'কোনো ফলাফল পাওয়া যায়নি' : 'এখনও কোনো পাঠক অ্যাকাউন্ট তৈরি হয়নি'}
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {userSearchFilter
                    ? 'অন্য কোনো নাম বা শব্দ দিয়ে অনুসন্ধান করুন।'
                    : 'ওয়েবসাইটে পাঠকগণ ছবি ও নাম দিয়ে অ্যাকাউন্ট খুললে এখানে স্বয়ংক্রিয়ভাবে প্রদর্শিত হবে।'}
                </p>
                {userSearchFilter && (
                  <button
                    onClick={() => setUserSearchFilter('')}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    সার্চ ফিল্টার মুছুন
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SYSTEM & RESET BACKUP */}
        {activeTab === 'system' && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white font-serif">সিস্টেম ও ডেটা ব্যাকআপ</h3>
              <p className="text-xs text-slate-400">
                ওয়েবসাইটের ডেটাবেজ ও ডিফল্ট গল্প রিসেট অপশন
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-4 max-w-xl">
              <div className="flex items-center gap-3 text-rose-400">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <h4 className="font-bold text-sm">ডিফল্ট গল্পে রিসেট করুন</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                এটি ওয়েবসাইটের সকল গল্প ও অধ্যায় মুছে দিয়ে মূল সূচনা গল্পসমূহ ফিরিয়ে আনবে। আপনার
                নিজস্ব তৈরি গল্প মুছে যেতে পারে।
              </p>
              <button
                onClick={() => setConfirmResetOpen(true)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                ডিফল্ট গল্পে রিসেট করুন
              </button>
            </div>
          </div>
        )}
      </main>

      {/* CHAPTER MANAGEMENT MODAL */}
      {isChapterModalOpen && activeStoryForChapters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] text-blue-400 font-mono uppercase tracking-wider">
                  অধ্যায় পরিচালক
                </span>
                <h3 className="text-lg font-bold text-white font-serif">
                  {activeStoryForChapters.title}
                </h3>
              </div>
              <button
                onClick={() => setIsChapterModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Existing Chapters List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300">বিদ্যমান অধ্যায় সমূহ:</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {activeStoryForChapters.chapters?.map((ch, idx) => (
                  <div
                    key={ch.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                  >
                    <div>
                      <span className="font-semibold text-white">
                        {ch.chapterNumber}. {ch.title}
                      </span>
                      <p className="text-[11px] text-slate-400">
                        {ch.wordCount} শব্দ · {ch.estimatedReadTime}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingChapterId(ch.id);
                          setChapterForm({
                            title: ch.title,
                            content: ch.content,
                            chapterNumber: ch.chapterNumber,
                          });
                        }}
                        className="p-1 rounded bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                        title="সম্পাদনা"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          deleteChapter(activeStoryForChapters.id, ch.id);
                          const updated = stories.find(s => s.id === activeStoryForChapters.id);
                          if (updated) setActiveStoryForChapters(updated);
                          showNotification('অধ্যায়টি মুছে ফেলা হয়েছে!');
                        }}
                        className="p-1 rounded bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add or Edit Chapter Form */}
            <form
              onSubmit={handleSaveChapter}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4"
            >
              <h4 className="text-xs font-bold text-blue-400">
                {editingChapterId ? 'অধ্যায় সম্পাদনা করুন' : 'নতুন অধ্যায় যুক্ত করুন'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8">
                  <input
                    type="text"
                    required
                    value={chapterForm.title}
                    onChange={e => setChapterForm({ ...chapterForm, title: e.target.value })}
                    placeholder="অধ্যায়ের শিরোনাম (যেমন: দ্বিতীয় অধ্যায়: শেষ চিঠি)"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div className="sm:col-span-4">
                  <input
                    type="number"
                    min={1}
                    value={chapterForm.chapterNumber}
                    onChange={e =>
                      setChapterForm({ ...chapterForm, chapterNumber: parseInt(e.target.value) || 1 })
                    }
                    placeholder="পর্ব নম্বর"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <textarea
                  required
                  rows={6}
                  value={chapterForm.content}
                  onChange={e => setChapterForm({ ...chapterForm, content: e.target.value })}
                  placeholder="এখানে সম্পূর্ণ অধ্যায়ের কাহিনী ও বক্তব্য লিখুন..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-serif leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  শব্দসংখ্যা: {chapterForm.content.trim() ? chapterForm.content.trim().split(/\s+/).length : 0}
                </span>

                <div className="flex items-center gap-2">
                  {editingChapterId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingChapterId(null);
                        setChapterForm({ title: '', content: '', chapterNumber: 1 });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs"
                    >
                      বাতিল
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                  >
                    {editingChapterId ? 'অধ্যায় আপডেট করুন' : 'অধ্যায় যোগ করুন'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE STORY CONFIRMATION MODAL */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">গল্পটি মুছে ফেলতে চান?</h3>
            <p className="text-xs text-slate-400">
              এই গল্প এবং এর সকল অধ্যায় স্থায়ীভাবে মুছে যাবে। এই কাজ পূর্বাবস্থায় ফেরানো যাবে না।
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                বাতিল
              </button>
              <button
                onClick={() => handleDeleteStoryConfirm(confirmDeleteId)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESET TO DEFAULT CONFIRMATION MODAL */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">ডিফল্ট ডেটায় রিসেট করবেন?</h3>
            <p className="text-xs text-slate-400">
              বর্তমান সব গল্প মুছে প্রারম্ভিক গল্পগুলো প্রতিস্থাপিত হবে।
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setConfirmResetOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
              >
                বাতিল
              </button>
              <button
                onClick={() => {
                  resetToDefaults();
                  setConfirmResetOpen(false);
                  showNotification('ডিফল্ট গল্পসমূহ সফলভাবে লোড করা হয়েছে!');
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                রিসেট নিশ্চিত করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. PRESET THUMBNAIL GALLERY MODAL (ALL CATEGORIES) */}
      {isThumbnailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full p-5 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                    <span>ডিফল্ট থাম্বনেইল গ্যালারি</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                      {CATEGORY_THUMBNAILS.length} টি ছবি
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    প্রতিটি ক্যাটাগরির জন্য বাছাইকৃত আকর্ষণীয় গল্প কভার ছবি
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsThumbnailModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                title="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="space-y-3 shrink-0">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search in thumbnails */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={thumbnailSearchQuery}
                    onChange={e => setThumbnailSearchQuery(e.target.value)}
                    placeholder="ছবির নাম বা ট্যাগ লিখে খুঁজুন (যেমন: বৃষ্টি, বই, প্রেম, শহর)..."
                    className="w-full pl-10 pr-4 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                  />
                  {thumbnailSearchQuery && (
                    <button
                      onClick={() => setThumbnailSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
                    >
                      মুছুন
                    </button>
                  )}
                </div>

                <div className="text-xs text-slate-400 text-right shrink-0">
                  পাওয়া গেছে: <strong className="text-white">{modalThumbnails.length}</strong> টি ছবি
                </div>
              </div>

              {/* Category Pills Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                <button
                  onClick={() => setThumbnailCategoryFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
                    thumbnailCategoryFilter === 'all'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  সব ({CATEGORY_THUMBNAILS.length})
                </button>

                {CATEGORIES.map(cat => {
                  const count = CATEGORY_THUMBNAILS.filter(t => t.category === cat.name).length;
                  const isSelected = thumbnailCategoryFilter === cat.name;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setThumbnailCategoryFilter(cat.name)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Thumbnails Scrollable Grid */}
            <div className="flex-1 overflow-y-auto pr-1">
              {modalThumbnails.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                  {modalThumbnails.map(thumb => {
                    const isSelected = storyForm.coverImage === thumb.url;
                    return (
                      <div
                        key={thumb.id}
                        className={`group relative rounded-2xl overflow-hidden border bg-slate-950 flex flex-col transition-all duration-200 ${
                          isSelected
                            ? 'border-blue-500 ring-2 ring-blue-500/50 shadow-xl shadow-blue-500/10'
                            : 'border-slate-800 hover:border-slate-600 hover:shadow-lg'
                        }`}
                      >
                        {/* Image Preview */}
                        <div className="aspect-16/10 w-full overflow-hidden relative">
                          <img
                            src={thumb.url}
                            alt={thumb.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />

                          {/* Category Badge */}
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-medium text-slate-200 border border-white/10">
                              {thumb.category}
                            </span>
                          </div>

                          {/* Selected Active Checkmark */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-md">
                              <Check className="w-3 h-3" />
                              <span>বর্তমান কভার</span>
                            </div>
                          )}
                        </div>

                        {/* Card Info & Select Button */}
                        <div className="p-3 flex flex-col justify-between flex-1 gap-2">
                          <div>
                            <h5 className="font-semibold text-white text-xs line-clamp-1">
                              {thumb.title}
                            </h5>
                            <div className="flex items-center gap-1 mt-1 flex-wrap">
                              {thumb.tags.slice(0, 2).map((t, idx) => (
                                <span
                                  key={idx}
                                  className="text-[9px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded"
                                >
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setStoryForm({ ...storyForm, coverImage: thumb.url });
                              setIsThumbnailModalOpen(false);
                              showNotification(`"${thumb.title}" থাম্বনেইল হিসেবে নির্বাচিত হয়েছে!`);
                            }}
                            className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isSelected ? 'পুনরায় নিশ্চিত' : 'কভার হিসেবে ব্যবহার করুন'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 text-slate-500 space-y-2">
                  <ImageIcon className="w-10 h-10 mx-auto text-slate-600" />
                  <p className="text-sm font-semibold">কোনো থাম্বনেইল পাওয়া যায়নি</p>
                  <p className="text-xs">অন্য ক্যাটাগরি বা শব্দ দিয়ে চেষ্টা করুন</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>টিপস: যেকোনো ছবির লিংকে ক্লিক করলে তাৎক্ষণিক ফর্মের কভার সেট হবে।</span>
              <button
                onClick={() => setIsThumbnailModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
      {/* DELETE USER CONFIRMATION MODAL */}
      {confirmDeleteUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-2">
              <h4 className="text-base font-bold text-white font-serif">
                পাঠক অ্যাকাউন্টটি মুছে ফেলতে চান?
              </h4>
              <p className="text-xs text-slate-400">
                এই পাঠক অ্যাকাউন্টটি ওয়েবসাইট ও ডাটাবেজ থেকে স্থায়ীভাবে মুছে যাবে।
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteUserId(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                বাতিল করুন
              </button>
              <button
                type="button"
                onClick={() => handleDeleteUser(confirmDeleteUserId)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-rose-600/30"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD USER MODAL */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-serif">নতুন পাঠক অ্যাকাউন্ট যোগ করুন</h4>
                  <p className="text-[11px] text-slate-400">নাম ও প্রোফাইল ছবি দিয়ে পাঠক তৈরি করুন</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              {/* Live Preview */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <img
                  src={newUserAvatar}
                  alt="Preview"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-bold text-white text-xs font-serif">{newUserName || 'পাঠকের নাম'}</p>
                  <p className="text-[10px] text-slate-400">{newUserBio}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">পাঠকের নাম *</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  placeholder="যেমন: সাকিব আল হাসান / সুমাইয়া জান্নাত"
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                  autoFocus
                />
              </div>

              {/* Avatar Selector from 18 options */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  প্রোফাইল ছবি বাছুন ({USER_AVATARS.length} টি ছবি)
                </label>
                <div className="grid grid-cols-6 gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 max-h-36 overflow-y-auto">
                  {USER_AVATARS.map(av => {
                    const isSelected = newUserAvatar === av.url;
                    return (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setNewUserAvatar(av.url)}
                        className={`group relative rounded-full p-0.5 transition-all aspect-square cursor-pointer ${
                          isSelected
                            ? 'ring-2 ring-blue-500 scale-105'
                            : 'opacity-70 hover:opacity-100 hover:ring-1 hover:ring-slate-500'
                        }`}
                        title={av.name}
                      >
                        <img
                          src={av.url}
                          alt={av.name}
                          className="w-full h-full rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-blue-600/30 rounded-full flex items-center justify-center text-white">
                            <Check className="w-3 h-3 drop-shadow" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  অথবা কাস্টম ছবির লিংক দিন
                </label>
                <input
                  type="url"
                  value={newUserAvatar}
                  onChange={e => setNewUserAvatar(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">পাঠকের পরিচিতি (বায়ো)</label>
                <input
                  type="text"
                  value={newUserBio}
                  onChange={e => setNewUserBio(e.target.value)}
                  placeholder="যেমন: রোমান্টিক গল্পের একনিষ্ঠ পাঠক"
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30"
                >
                  অ্যাকাউন্ট যুক্ত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
