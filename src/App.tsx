import React, { useEffect } from 'react';
import { StoryProvider, useStory } from './context/StoryContext';
import { Header } from './components/Header';
import { SideDrawer } from './components/SideDrawer';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';

// Pages
import { HomePage } from './pages/HomePage';
import { StoriesCatalogPage } from './pages/StoriesCatalogPage';
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
    setIsSearchOpen,
    setIsAuthModalOpen,
  } = useStory();

  // Handle URL path on initial load & popstate
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      // Secret Admin URL route: /adminsahid09
      if (path === '/adminsahid09' || hash === '#/adminsahid09' || hash === '#adminsahid09') {
        navigateTo('admin');
        return;
      }

      if (path === '/stories' || hash === '#stories' || hash === '#/stories') {
        navigateTo('latest');
        return;
      }

      if (path === '/search' || hash === '#search' || hash === '#/search') {
        setIsSearchOpen(true);
        return;
      }

      if (path === '/library' || hash === '#library' || hash === '#/library') {
        navigateTo('bookmarks');
        return;
      }

      if (path === '/profile' || hash === '#profile' || hash === '#/profile') {
        setIsAuthModalOpen(true);
        return;
      }

      if (path === '/latest' || hash === '#latest' || hash === '#/latest') {
        navigateTo('latest');
        return;
      }

      if (path === '/popular' || hash === '#popular' || hash === '#/popular') {
        navigateTo('popular');
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

      if (path === '/categories' || hash === '#categories' || hash === '#/categories') {
        navigateTo('categories');
        return;
      }

      if (path === '/bookmarks' || hash === '#bookmarks' || hash === '#/bookmarks') {
        navigateTo('bookmarks');
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
  }, [navigateTo]);

  // Handle scroll to top on every navigation state transition
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentPage, currentStorySlug, currentChapterNumber]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'categories':
        return <CategoriesPage />;
      case 'latest':
        return <StoriesCatalogPage mode="latest" />;
      case 'popular':
        return <StoriesCatalogPage mode="popular" />;
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
  const isAdminView = currentPage === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#111827] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Hide standard public header on reading view and on secret admin panel */}
      {!isReadingView && !isAdminView && <Header />}

      {/* Side Drawer and Search Modals (Hidden on admin) */}
      {!isAdminView && <SideDrawer />}
      {!isAdminView && <SearchModal />}
      {!isAdminView && <AuthModal />}

      {/* Main Page Canvas */}
      <main className={`flex-1 ${!isReadingView && !isAdminView ? 'pb-24 md:pb-0' : ''}`}>
        {renderCurrentPage()}
      </main>

      {/* Footer (Hidden on reading view and on admin panel) */}
      {!isReadingView && !isAdminView && <Footer />}

      {/* Premium Animated Mobile Bottom Navigation (Hidden on reading view & admin) */}
      {!isReadingView && !isAdminView && <MobileBottomNav />}
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
