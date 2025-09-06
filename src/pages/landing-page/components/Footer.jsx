import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'GitHub', icon: 'Github', url: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#' },
    { name: 'Discord', icon: 'MessageCircle', url: '#' }
  ];

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', url: '#' },
        { name: 'Pricing', url: '#' },
        { name: 'API', url: '#' },
        { name: 'Documentation', url: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', url: '#' },
        { name: 'Blog', url: '#' },
        { name: 'Careers', url: '#' },
        { name: 'Contact', url: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', url: '#' },
        { name: 'Community', url: '#' },
        { name: 'Status', url: '#' },
        { name: 'Updates', url: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', url: '#' },
        { name: 'Terms', url: '#' },
        { name: 'Security', url: '#' },
        { name: 'Cookies', url: '#' }
      ]
    }
  ];

  return (
    <footer className="relative mt-24 bg-card/30 backdrop-blur-sm border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-effect">
                <Icon name="Zap" size={24} color="var(--color-primary-foreground)" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Agnis AI</h3>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              Your self-adaptive AI assistant for research, coding, and creative work. 
              Empowering productivity through intelligent conversation.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks?.map((social) => (
                <Button
                  key={social?.name}
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 hover:bg-muted glow-effect micro-interaction"
                  title={social?.name}
                >
                  <Icon name={social?.icon} size={20} />
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks?.map((section) => (
            <div key={section?.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                {section?.title}
              </h4>
              <ul className="space-y-3">
                {section?.links?.map((link) => (
                  <li key={link?.name}>
                    <a
                      href={link?.url}
                      className="text-sm text-muted-foreground hover:text-primary smooth-transition"
                    >
                      {link?.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Stay Updated
              </h4>
              <p className="text-sm text-muted-foreground">
                Get the latest AI insights and product updates delivered to your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition min-w-[250px]"
              />
              <Button
                variant="default"
                className="glow-effect hover:shadow-glow-lg"
                iconName="Send"
                iconPosition="right"
                iconSize={16}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-border bg-background/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Agnis AI. All rights reserved.
              </p>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-xs text-muted-foreground">SSL Secured</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-xs text-muted-foreground">
              <span>Made with ❤️ for AI enthusiasts</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-primary/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;