import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r bg-slate-700 text-white py-6 font-poppins">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm sm:text-base">
          {/* Project Overview */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-amber-200">
              Smart Tourist Safety System
            </h3>
            <p className="text-slate-200">
              Blockchain-based NFT IDs, AI-driven safety alerts, Geo-fencing, and IoT integration for secure travel. Minted at entry points with KYC, QR access, and real-time monitoring.
            </p>
          </div>
          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-amber-200">
              Quick Links
            </h3>
            <ul className="space-y-1">
              <li>
                <a href="/about" className="hover:text-amber-100 transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/support" className="hover:text-amber-100 transition-colors duration-300">
                  Support
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-amber-100 transition-colors duration-300">
                  Police Dashboard
                </a>
              </li>
            </ul>
          </div>
          {/* Legal & Contact */}
          <div className="text-center sm:text-right">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-amber-200">
              Legal & Contact
            </h3>
            <p className="text-slate-200">
              &copy; {new Date().getFullYear()} xAI | All rights reserved. <br />
              Privacy Policy | Terms of Use <br />
              Email: noreply@github.com | Phone: +91-123-456-7890
            </p>
          </div>
        </div>
        <div className="mt-4 text-center text-xs sm:text-sm text-slate-300">
          <p>
            Powered by xAI. Blockchain on Polygon. Features include multilingual support (10+ Indian languages), end-to-end encryption, and automated E-FIR generation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;