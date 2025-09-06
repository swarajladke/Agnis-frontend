import React from 'react';
import Header from '../../components/ui/Header';
import RegistrationForm from './components/RegistrationForm';

const UserRegistration = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} />
      {/* Main Content */}
      <main className="pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="w-full max-w-md">
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
              
              {/* Registration Card */}
              <div className="relative bg-card border border-border rounded-xl p-8 glow-effect">
                <RegistrationForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Agnis AI. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary smooth-transition"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary smooth-transition"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary smooth-transition"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserRegistration;