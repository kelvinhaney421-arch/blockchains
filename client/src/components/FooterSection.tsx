import { Github, Twitter, MessageCircle, Mail, Globe, Shield, Lock, FileText } from "lucide-react";

export default function FooterSection() {
  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: MessageCircle, href: "#", label: "Discord" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" }
  ];

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Web3 Merger", href: "#web3-merger" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Analytics", href: "#analytics" },
        { name: "Platform", href: "#platform" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "API Reference", href: "#" },
        { name: "Community", href: "#" },
        { name: "Support", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "Security", href: "#" }
      ]
    }
  ];

  return (
    <footer id="footer" className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-metamask-orange rounded-xl flex items-center justify-center">
                <Globe size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">MetaMask Platform</h3>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
              The ultimate Web3 platform for managing your crypto assets across multiple blockchain networks. 
              Secure, fast, and user-friendly.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 hover:bg-metamask-orange rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <IconComponent size={18} className="sm:w-5 sm:h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-metamask-orange transition-colors duration-200 text-sm sm:text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Security & Trust Section */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center gap-3 text-gray-300">
              <Shield size={20} className="sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
              <div>
                <div className="font-semibold text-sm sm:text-base">Bank-Level Security</div>
                <div className="text-xs sm:text-sm text-gray-400">Your assets are protected</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Lock size={20} className="sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
              <div>
                <div className="font-semibold text-sm sm:text-base">End-to-End Encryption</div>
                <div className="text-xs sm:text-sm text-gray-400">Privacy guaranteed</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <FileText size={20} className="sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
              <div>
                <div className="font-semibold text-sm sm:text-base">Audited Smart Contracts</div>
                <div className="text-xs sm:text-sm text-gray-400">Verified and secure</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2025 MetaMask Platform. All rights reserved.
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs sm:text-sm">
              <span className="text-gray-400 text-center">
                Built with ❤️ for the Web3 community
              </span>
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}