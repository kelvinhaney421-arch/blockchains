import { Github, Twitter, MessageCircle, Mail, Globe, Shield, Lock, FileText, ExternalLink, ShieldCheck } from "lucide-react";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Web3 Dashboard", href: "#web3-merger" },
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
        { name: "Security Audit", href: "#" }
      ]
    },
    {
      title: "Connect",
      links: [
        { name: "Twitter", href: "#", icon: Twitter },
        { name: "Discord", href: "#", icon: MessageCircle },
        { name: "GitHub", href: "#", icon: Github },
        { name: "Email", href: "#", icon: Mail }
      ]
    }
  ];

  return (
    <footer id="footer" className="bg-card border-t border-border py-20 mt-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter">METAMASK <span className="text-primary">PRO</span></span>
            </div>
            <p className="text-muted-foreground font-black leading-relaxed">
              The premier institutional-grade cross-chain management interface for modern Web3 assets.
            </p>
          </div>

          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-primary">{section.title}</h4>
              <ul className="space-y-4 font-black">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                      {link.icon && <link.icon size={16} />}
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-black text-muted-foreground">
            © {currentYear} METAMASK PRO PROTOCOL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-sm font-black text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <div className="flex items-center gap-2 text-green-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs uppercase tracking-widest">Network Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
