
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-4 mt-8 bg-black/20 text-center">
      <div className="container mx-auto text-sm text-stone-400">
        <p>&copy; {new Date().getFullYear()} Khmer Rewriter. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="hover:text-amber-400 transition-colors">Contact</a>
          <span className="mx-2">|</span>
          <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
