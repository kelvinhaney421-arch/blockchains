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
        { name: "Web3 dashbord", href: "#web3-merger" },
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
    <footer id="footer" className="bg-card border-t border-border/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 py-20 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Globe size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Blockchain</h3>
            </div>
            <p className="text-muted-foreground mb-8 text-lg font-medium leading-relaxed">
              The premier platform for professional multi-chain asset governance. Secure. Sophisticated. Seamless.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 rounded-2xl border border-border bg-card hover:bg-primary/10 hover:border-primary/50 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    <IconComponent size={20} className="text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h4 className="text-sm font-bold mb-6 text-foreground uppercase tracking-widest">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
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
        <div className="border-y border-border/50 py-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                <Shield size={24} />
              </div>
              <div>
                <div className="font-bold">Institutional Security</div>
                <div className="text-sm text-muted-foreground font-medium">Bank-grade asset protection</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Lock size={24} />
              </div>
              <div>
                <div className="font-bold">Total Encryption</div>
                <div className="text-sm text-muted-foreground font-medium">Privacy-first architecture</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <FileText size={24} />
              </div>
              <div>
                <div className="font-bold">Audited Protocols</div>
                <div className="text-sm text-muted-foreground font-medium">Verified smart contract logic</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-medium text-sm text-muted-foreground">
          <div>
            © 2026 Blockchain Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-8">
            <span>Build v4.0.2 Stable</span>
            <div className="flex items-center gap-2 text-green-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Network Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}