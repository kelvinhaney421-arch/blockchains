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
    <footer id="footer" className="bg-background border-t border-primary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/[0.01] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 mb-8 sm:mb-12 font-mono">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.3)]" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                <Globe size={20} className="sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-primary tracking-tighter neon-text uppercase">BLOCKCHAIN_OS</h3>
            </div>
            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm uppercase tracking-widest leading-relaxed">
              The ultimate decentralized operating system for multi-chain asset management. Secure. Immutable. Distributed.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 sm:w-12 sm:h-12 border border-primary/20 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                    aria-label={social.label}
                    style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)" }}
                  >
                    <IconComponent size={18} className="sm:w-5 sm:h-5 text-primary" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h4 className="text-xs font-black mb-3 sm:mb-4 text-primary uppercase tracking-[0.2em]">{section.title}</h4>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-xs uppercase tracking-widest font-bold"
                    >
                      {link.name.replace(' ', '_')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Security & Trust Section */}
        <div className="border-y border-primary/10 py-6 sm:py-8 mb-6 sm:mb-8 bg-primary/[0.02]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 font-mono">
            <div className="flex items-center gap-3 text-primary/60">
              <Shield size={20} className="sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <div>
                <div className="font-black text-xs uppercase tracking-widest">Protocol_Shield_v2</div>
                <div className="text-[10px] text-muted-foreground uppercase">Real-time threat mitigation</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-primary/60">
              <Lock size={20} className="sm:w-6 sm:h-6 text-secondary flex-shrink-0" />
              <div>
                <div className="font-black text-xs uppercase tracking-widest">RSA_4096_Vault</div>
                <div className="text-[10px] text-muted-foreground uppercase">Zero-knowledge proofs</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-primary/60">
              <FileText size={20} className="sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <div>
                <div className="font-black text-xs uppercase tracking-widest">Smart_Audit_Sync</div>
                <div className="text-[10px] text-muted-foreground uppercase">Continuous verification</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 sm:pt-8 font-mono text-[10px] uppercase tracking-[0.3em]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-muted-foreground text-center md:text-left">
              © 2026_BLOCKCHAIN_CORP // ALL_RIGHTS_RESERVED
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <span className="text-muted-foreground text-center">
                V4.0.2_STABLE_BUILD
              </span>
              <div className="flex items-center gap-2 text-primary animate-pulse">
                <div className="w-1.5 h-1.5 bg-primary rounded-none shadow-[0_0_8px_rgba(0,255,255,0.8)]"></div>
                <span>UPLINK_STABLE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}