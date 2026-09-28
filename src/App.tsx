import React, { useEffect } from 'react';
import { StoryProvider, useStory } from './context/StoryContext';
import { Header } from './components/Header';
import { SideDrawer } from './components/SideDrawer';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { StoryDetailsPage } from './pages/StoryDetailsPage';
import { ReaderPage } from './pages/ReaderPage';
import { WriterPage } from './pages/WriterPage';
import { RulesPage } from './pages/RulesPage';
import { ContactPage } from './pages/ContactPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const {
    currentPage,
    currentStorySlug,
    currentChapterNumber,
    navigateTo,
    getStoryBySlug,
  } = useStory();

  // Handle URL path on initial load & popstate
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path === '/adminsahid09' || hash === '#/adminsahid09' || hash === '#adminsahid09') {
        navigateTo('admin');
        return;
      }

      if (path === '/writer' || hash === '#writer' || hash === '#/writer') {
        navigateTo('writer');
        return;
      }

      if (path === '/rules' || hash === '#rules' || hash === '#/rules') {
        navigateTo('rules');
        return;
      }

      if (path === '/contact' || hash === '#contact' || hash === '#/contact') {
        navigateTo('contact');
        return;
      }

      if (path === '/categories' || hash === '#categories') {
        navigateTo('categories');
        return;
      }

      // Check /story/:slug or /story/:slug/chapter-:num
      const storyMatch = path.match(/^\/story\/([a-zA-Z0-9_-]+)(?:\/chapter-(\d+))?/);
      if (storyMatch) {
        const slug = storyMatch[1];
        const chapterNum = storyMatch[2] ? parseInt(storyMatch[2], 10) : undefined;
        if (chapterNum) {
          navigateTo('reading', slug, chapterNum);
        } else {
          navigateTo('story-detail', slug);
        }
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, []);

  // Handle scroll to top on state transitions
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, currentStorySlug, currentChapterNumber]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'categories':
        return <CategoriesPage />;
      case 'latest':
      case 'popular':
        return <HomePage />;
      case 'writer':
        return <WriterPage />;
      case 'rules':
        return <RulesPage />;
      case 'contact':
        return <ContactPage />;
      case 'bookmarks':
        return <BookmarksPage />;
      case 'admin':
        return <AdminPage />;
      case 'story-detail':
        return currentStorySlug ? (
          <StoryDetailsPage slug={currentStorySlug} />
        ) : (
          <NotFoundPage />
        );
      case 'reading':
        return currentStorySlug ? (
          <ReaderPage
            slug={currentStorySlug}
            chapterNumber={currentChapterNumber || 1}
          />
        ) : (
          <NotFoundPage />
        );
      case 'not-found':
      default:
        return <NotFoundPage />;
    }
  };

  const isReadingView = currentPage === 'reading';

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#111827] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Hide standard header on distraction-free reader page */}
      {!isReadingView && <Header />}

      {/* Side Drawer and Search Modals */}
      <SideDrawer />
      <SearchModal />

      {/* Main Page Canvas */}
      <main className="flex-1">{renderCurrentPage()}</main>

      {/* Footer (Hidden on reading view for optimal focus) */}
      {!isReadingView && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <StoryProvider>
      <AppContent />
    </StoryProvider>
  );
}
