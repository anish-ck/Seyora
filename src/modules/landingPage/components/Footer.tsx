import { Separator } from "@radix-ui/react-select";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-950/80 backdrop-blur-xl border-t border-purple-500/20 mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Smart Tourist Safety System</h3>
            <p className="text-purple-200/80 leading-relaxed">
              Blockchain-based NFT IDs, AI-driven safety alerts, Geo-fencing, and IoT integration for secure travel. 
              Minted at entry points with KYC, QR access, and real-time monitoring.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-purple-100 mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['About Us', 'Support', 'Police Dashboard'].map((link) => (
                <div key={link} className="text-purple-200/70 hover:text-purple-300 transition-colors cursor-pointer">
                  {link}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-purple-100 mb-4">Legal & Contact</h4>
            <div className="space-y-2 text-sm text-purple-200/70">
              <p>© 2025 xAI | All rights reserved.</p>
              <p>Privacy Policy | Terms of Use</p>
              <p>Email: noreply@github.com</p>
              <p>Phone: +91-123-456-7890</p>
            </div>
          </div>
        </div>
        
        <Separator className="bg-purple-500/20 mb-6" />
        
        <div className="text-center">
          <p className="text-purple-200/60 text-sm">
            Powered by xAI. Blockchain on Polygon. Features include multilingual support (10+ Indian languages), 
            end-to-end encryption, and automated E-FIR generation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;