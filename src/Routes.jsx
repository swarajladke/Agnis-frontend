import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ChatInterface from './pages/chat-interface';
import Login from './pages/login';
import LandingPage from './pages/landing-page';
import EmailVerification from './pages/email-verification';
import UserProfileSettings from './pages/user-profile-settings';
import UserRegistration from './pages/user-registration';
import ChatHistory from './pages/chat-history';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat-interface" element={<ChatInterface />} />
        <Route path="/chat-history" element={<ChatHistory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;