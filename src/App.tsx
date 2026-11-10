import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomMobileNav } from './components/BottomMobileNav';
import { HeroBanner } from './components/HeroBanner';
import { PrizesSection } from './components/PrizesSection';
import { HowToParticipate } from './components/HowToParticipate';
import { ContestRules } from './components/ContestRules';
import { PreviousWinners } from './components/PreviousWinners';
import { NoticeSection } from './components/NoticeSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { FreeEntryModal } from './components/FreeEntryModal';
import { DepositModal } from './components/DepositModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalView } from './components/LegalModals';
import { ToastContainer } from './components/ToastContainer';
import { WheelOfFortuneModal } from './components/WheelOfFortuneModal';
import { LegalCertificationsSection } from './components/LegalCertificationsSection';
import { AnimationVideoSection } from './components/AnimationVideoSection';

const AdminRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, currentUser, setView, setAdminLoginModalOpen, showToast } = useApp();
  const isAuthorizedAdmin = Boolean(isAdmin && currentUser && currentUser.role === 'admin');

  React.useEffect(() => {
    if (!isAuthorizedAdmin) {
      showToast('অ্যাক্সেস অস্বীকৃত! অ্যাডমিন প্যানেলে প্রবেশের অনুমতি কেবল "admin" রোলধারীদের জন্য সংরক্ষিত।', 'error');
      setView('home');
      setAdminLoginModalOpen(true);
    }
  }, [isAuthorizedAdmin, setView, setAdminLoginModalOpen, showToast]);

  if (!isAuthorizedAdmin) {
    return null;
  }

  return <>{children}</>;
};

const MainContent: React.FC = () => {
  const { view } = useApp();

  return (
    <main className="min-h-screen">
      {view === 'home' && (
        <>
          <HeroBanner />
          <AnimationVideoSection />
          <PrizesSection />
          <LegalCertificationsSection />
          <HowToParticipate />
          <ContestRules />
          <PreviousWinners />
          <NoticeSection />
          <FaqSection />
          <ContactSection />
        </>
      )}

      {view === 'certifications' && (
        <div className="pt-4">
          <LegalCertificationsSection />
          <ContestRules />
        </div>
      )}

      {view === 'contests' && (
        <div className="pt-4">
          <PrizesSection />
          <ContestRules />
        </div>
      )}

      {view === 'how-to' && (
        <div className="pt-4">
          <HowToParticipate />
          <FaqSection />
        </div>
      )}

      {view === 'winners' && (
        <div className="pt-4">
          <PreviousWinners />
        </div>
      )}

      {view === 'rules' && (
        <div className="pt-4">
          <ContestRules />
        </div>
      )}

      {view === 'notices' && (
        <div className="pt-4">
          <NoticeSection />
        </div>
      )}

      {view === 'faq' && (
        <div className="pt-4">
          <FaqSection />
        </div>
      )}

      {view === 'contact' && (
        <div className="pt-4">
          <ContactSection />
        </div>
      )}

      {view === 'user-dashboard' && <UserDashboard />}

      {view === 'admin-dashboard' && (
        <AdminRouteGuard>
          <AdminDashboard />
        </AdminRouteGuard>
      )}

      {view === 'privacy' && <LegalView type="privacy" />}

      {view === 'terms' && <LegalView type="terms" />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-['Hind_Siliguri',sans-serif] selection:bg-amber-500 selection:text-slate-950">
        <ToastContainer />
        <Navbar />
        <div className="flex-1">
          <MainContent />
        </div>
        <Footer />
        <BottomMobileNav />
        
        {/* Global Modals */}
        <AuthModal />
        <FreeEntryModal />
        <DepositModal />
        <AdminLoginModal />
        <WheelOfFortuneModal />
      </div>
    </AppProvider>
  );
}
