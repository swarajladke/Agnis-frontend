import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AnimatedBackground from './components/AnimatedBackground';
import AnimatedLogo from './components/AnimatedLogo';
import FeatureCards from './components/FeatureCards';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Agnis AI - Your Self-Adaptive AI Assistant</title>
        <meta name="description" content="Experience the future of AI assistance with specialized modes for research, coding, and creative work. Start chatting with Agnis AI today." />
        <meta name="keywords" content="AI assistant, artificial intelligence, research AI, coding assistant, creative AI, chat interface" />
        <meta property="og:title" content="Agnis AI - Your Self-Adaptive AI Assistant" />
        <meta property="og:description" content="Empowering creativity, research, and development with intelligent AI assistance" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/landing-page" />
      </Helmet>

      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground />
        
        {/* Header */}
        <Header isAuthenticated={false} />
        
        {/* Main Content */}
        <main className="relative z-10 pt-20">
          {/* Hero Section */}
          <section className={`min-h-screen flex items-center justify-center px-6 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-7xl mx-auto text-center">
              <div className="mb-16">
                <AnimatedLogo />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className={`py-24 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FeatureCards />
          </section>

          {/* CTA Section */}
          <section className={`py-24 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <CTASection />
          </section>
        </main>

        {/* Footer */}
        <Footer />

        {/* Scroll Indicator */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;