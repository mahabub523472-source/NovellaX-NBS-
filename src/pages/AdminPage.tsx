import React, { useState } from 'react';
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
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { Story, Chapter, StoryCategory } from '../types';
import { CATEGORIES } from '../data/initialData';

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
  } = useStory();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Story Form State
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [isCreatingStory, setIsCreatingStory] = useState(false);
  const [storyForm, setStoryForm] = useState<{
    title: string;
    slug: string;
    description: string;
    coverImage: string;
    category: StoryCategory;
    author: string;
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

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto py-20 px-4">
        <div className="bg-white rounded-3xl border border-gray-200/80 p-8 shadow-xl space-y-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-serif">এডমিন ড্যাশবোর্ড</h1>
            <p className="text-xs text-blue-600 font-mono mt-1">/adminsahid09</p>
            <p className="text-xs text-gray-500 mt-1">
              গল্প প্রকাশনা ও সম্পাদনার জন্য পাসওয়ার্ড দিন
            </p>
          </div>

          <form
            onSubmit={e => {
              e.preventDefault();
              if (loginAdmin(passwordInput)) {
                setPasswordInput('');
                setLoginError('');
              } else {
                setLoginError('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড লিখুন (যেমন: adminsahid09 বা admin123)');
              }
            }}
            className="space-y-4 text-left"
          >
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                এডমিন পাসওয়ার্ড
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="পাসওয়ার্ড লিখুন..."
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                autoFocus
              />
              {loginError && <p className="text-xs text-red-600 mt-1">{loginError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-md"
            >
              প্রবেশ করুন
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleOpenEditStory = (story: Story) => {
    setEditingStoryId(story.id);
    setIsCreatingStory(true);
    setStoryForm({
      title: story.title,
      slug: story.slug,
      description: story.description,
      coverImage: story.coverImage,
      category: story.category,
      author: story.author,
      status: story.status,
      featured: story.featured,
      popular: story.popular,
      latest: story.latest,
      readersChoice: story.readersChoice || false,
    });
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyForm.title || !storyForm.description) return;

    const generatedSlug =
      storyForm.slug ||
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
      showNotification('গল্পটি সফলভাবে আপডেট করা হয়েছে!');
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
      showNotification('নতুন গল্পটি সফলভাবে প্রকাশ করা হয়েছে!');
    }

    setIsCreatingStory(false);
    setEditingStoryId(null);
  };

  const handleOpenChapters = (story: Story) => {
    setActiveStoryForChapters(story);
    setIsChapterModalOpen(true);
  };

  const handleSaveChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStoryForChapters || !chapterForm.title || !chapterForm.content) return;

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
    setChapterForm({ title: '', content: '', chapterNumber: 1 });
    
    // Refresh active story chapters reference
    const updated = stories.find(s => s.id === activeStoryForChapters.id);
    if (updated) setActiveStoryForChapters(updated);
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Admin Header Bar */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif">
              NovellaX NBS — Admin Panel
            </h1>
            <p className="text-xs text-gray-500">গল্প ও অধ্যায় প্রকাশনা কন্ট্রোল প্যানেল</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsCreatingStory(true);
              setEditingStoryId(null);
              setStoryForm({
                title: '',
                slug: '',
                description: '',
                coverImage:
                  'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
                category: 'রোমান্টিক',
                author: 'মাহবুব আলম',
                status: 'চলমান',
                featured: false,
                popular: false,
                latest: true,
                readersChoice: false,
              });
            }}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন গল্প যুক্ত করুন</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Story Creator / Editor Modal */}
      {isCreatingStory && (
        <div className="bg-white rounded-3xl border-2 border-blue-200 p-6 sm:p-8 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 font-serif">
              {editingStoryId ? 'গল্প সম্পাদনা করুন' : 'নতুন গল্প প্রকাশ করুন'}
            </h2>
            <button
              onClick={() => {
                setIsCreatingStory(false);
                setEditingStoryId(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveStory} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  গল্পের শিরোনাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={storyForm.title}
                  onChange={e => setStoryForm({ ...storyForm, title: e.target.value })}
                  placeholder="যেমন: শেষ বিকেলের গল্প"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ক্যাটাগরি <span className="text-red-500">*</span>
                </label>
                <select
                  value={storyForm.category}
                  onChange={e =>
                    setStoryForm({ ...storyForm, category: e.target.value as StoryCategory })
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">লেখক</label>
                <input
                  type="text"
                  value={storyForm.author}
                  onChange={e => setStoryForm({ ...storyForm, author: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">স্ট্যাটাস</label>
                <select
                  value={storyForm.status}
                  onChange={e =>
                    setStoryForm({ ...storyForm, status: e.target.value as 'চলমান' | 'সম্পূর্ণ' })
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  <option value="চলমান">চলমান (Ongoing)</option>
                  <option value="সম্পূর্ণ">সম্পূর্ণ (Completed)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  কভার ইমেজ URL
                </label>
                <input
                  type="text"
                  value={storyForm.coverImage}
                  onChange={e => setStoryForm({ ...storyForm, coverImage: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                সংক্ষিপ্ত বিবরণ বা সারসংক্ষেপ <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={storyForm.description}
                onChange={e => setStoryForm({ ...storyForm, description: e.target.value })}
                placeholder="গল্পের আকর্ষণীয় এক বা দুই লাইনের বিবরণ..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden resize-none"
              />
            </div>

            {/* Homepage Section Placements */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/70">
              <p className="text-xs font-semibold text-gray-700 mb-2">হোমপেজ প্লেসমেন্ট ও ট্যাগ</p>
              <div className="flex flex-wrap gap-4 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={storyForm.featured}
                    onChange={e => setStoryForm({ ...storyForm, featured: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>Featured Spotlight (বিশেষ পছন্দ)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={storyForm.popular}
                    onChange={e => setStoryForm({ ...storyForm, popular: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>Popular (জনপ্রিয় গল্প)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={storyForm.latest}
                    onChange={e => setStoryForm({ ...storyForm, latest: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>Latest (নতুন প্রকাশিত)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={storyForm.readersChoice}
                    onChange={e => setStoryForm({ ...storyForm, readersChoice: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>Readers' Choice (পাঠকদের পছন্দ)</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCreatingStory(false);
                  setEditingStoryId(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>সংরক্ষণ করুন</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stories Management List */}
      <section className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900 font-serif">
              প্রকাশিত গল্পসমূহের তালিকা ({stories.length})
            </h2>
            <p className="text-xs text-gray-500">গল্প ও অধ্যায় সম্পাদনা এবং ব্যবস্থাপনা করুন</p>
          </div>
          <button
            onClick={() => {
              if (window.confirm('আপনি কি পূর্বনির্ধারিত ডেমো গল্পগুলো পুনরায় লোড করতে চান?')) {
                resetToDefaults();
                showNotification('ডিফল্ট গল্পগুলো সফলভাবে রিস্টোর করা হয়েছে!');
              }
            }}
            className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {stories.map(story => (
            <div
              key={story.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-14 h-20 object-cover rounded-lg shrink-0 shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-0.5">
                    <span className="text-blue-600 font-semibold">{story.category}</span>
                    <span>·</span>
                    <span>{story.chapters.length} টি অধ্যায়</span>
                    <span>·</span>
                    <span>{story.status}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 font-serif">{story.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5 max-w-md">
                    {story.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenChapters(story)}
                  className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>অধ্যায়সমূহ ({story.chapters.length})</span>
                </button>

                <button
                  onClick={() => handleOpenEditStory(story)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  title="সম্পাদনা করুন"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    navigateTo('story-detail', story.slug);
                  }}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  title="পাঠক ভিউ"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`"${story.title}" গল্পটি মুছে ফেলতে চান?`)) {
                      deleteStory(story.id);
                      showNotification('গল্পটি মুছে ফেলা হয়েছে');
                    }
                  }}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chapters Management Modal */}
      {isChapterModalOpen && activeStoryForChapters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900 font-serif">
                  অধ্যায় ব্যবস্থাপনা — {activeStoryForChapters.title}
                </h3>
                <p className="text-xs text-gray-500">
                  মোট {activeStoryForChapters.chapters.length} টি অধ্যায়
                </p>
              </div>
              <button
                onClick={() => {
                  setIsChapterModalOpen(false);
                  setActiveStoryForChapters(null);
                  setEditingChapterId(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chapter Add / Edit Form */}
            <form onSubmit={handleSaveChapter} className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-3">
              <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                {editingChapterId ? 'অধ্যায় সম্পাদন' : 'নতুন অধ্যায় যুক্তকরণ'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">অধ্যায় নং</label>
                  <input
                    type="number"
                    min="1"
                    value={chapterForm.chapterNumber}
                    onChange={e =>
                      setChapterForm({ ...chapterForm, chapterNumber: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">অধ্যায়ের নাম</label>
                  <input
                    type="text"
                    required
                    value={chapterForm.title}
                    onChange={e => setChapterForm({ ...chapterForm, title: e.target.value })}
                    placeholder="যেমন: প্রথম দেখা ও এক পশলা বৃষ্টি"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">গল্পের টেক্সট / অধ্যায় কন্টেন্ট</label>
                <textarea
                  required
                  rows={6}
                  value={chapterForm.content}
                  onChange={e => setChapterForm({ ...chapterForm, content: e.target.value })}
                  placeholder="এখানে সুন্দরভাবে প্যারাগ্রাফ আকারে গল্পের টেক্সট লিখুন..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg bg-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                {editingChapterId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingChapterId(null);
                      setChapterForm({ title: '', content: '', chapterNumber: 1 });
                    }}
                    className="px-3 py-1.5 text-xs text-gray-600 bg-gray-100 rounded-lg"
                  >
                    বাতিল
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  {editingChapterId ? 'আপডেট করুন' : 'অধ্যায় যোগ করুন'}
                </button>
              </div>
            </form>

            {/* List of existing chapters */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-500">বর্তমান অধ্যায়সমূহ</p>
              {activeStoryForChapters.chapters.map(c => (
                <div
                  key={c.id}
                  className="p-3 bg-white border border-gray-200 rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-gray-900">
                      অধ্যায় {c.chapterNumber}: {c.title}
                    </span>
                    <span className="text-gray-400 ml-2 font-mono">({c.wordCount} শব্দ)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingChapterId(c.id);
                        setChapterForm({
                          title: c.title,
                          content: c.content,
                          chapterNumber: c.chapterNumber,
                        });
                      }}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('এই অধ্যায়টি মুছে ফেলতে চান?')) {
                          deleteChapter(activeStoryForChapters.id, c.id);
                        }
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
