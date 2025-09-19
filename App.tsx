import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Lazy load all page components
const HomePage = lazy(() => import('./pages/HomePage'));
const DoctorsPage = lazy(() => import('./pages/DoctorsPage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ChatbotPage = lazy(() => import('./pages/ChatbotPage'));
const DoctorProfilePage = lazy(() => import('./pages/DoctorProfilePage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const PatientDashboardPage = lazy(() => import('./pages/PatientDashboardPage'));
const DoctorDashboardPage = lazy(() => import('./pages/DoctorDashboardPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const ForumsPage = lazy(() => import('./pages/ForumsPage'));
const ForumCategoryPage = lazy(() => import('./pages/ForumCategoryPage'));
const ForumThreadPage = lazy(() => import('./pages/ForumThreadPage'));


// A simple loader for Suspense fallback
const FullPageLoader = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>
);


// A helper component to conditionally render Header and Footer
const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const location = useLocation();
  const noLayoutRoutes = ['/login', '/register', '/chatbot', '/admin-dashboard'];
  const isNoLayoutRoute = noLayoutRoutes.some(path => location.pathname.startsWith(path));

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {!isNoLayoutRoute && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!isNoLayoutRoute && <Footer />}
    </div>
  );
}


const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Suspense fallback={<FullPageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path="/doctors/:doctorId" element={<DoctorProfilePage />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/articles/:articleId" element={<ArticlePage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/booking/:doctorId" element={<BookingPage />} />
              <Route path="/dashboard" element={<PatientDashboardPage />} />
              <Route path="/doctor-dashboard" element={<DoctorDashboardPage />} />
              <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
              {/* Forum Routes */}
              <Route path="/forums" element={<ForumsPage />} />
              <Route path="/forums/:categoryId" element={<ForumCategoryPage />} />
              <Route path="/forums/:categoryId/:threadId" element={<ForumThreadPage />} />
            </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  );
};

export default App;