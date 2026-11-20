import React from 'react';

interface HeaderProps {
  onFocusSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onFocusSearch }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/90 bg-[#0b1120]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="https://www.information-net.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-extrabold tracking-tight text-white transition-colors hover:text-sky-400 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-md"
        >
          العنكبوت للمعلومات
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-300"
        >
          <a
            href="#search-section"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
          >
            فحص رقم ID
          </a>
          <a
            href="#how-to-use"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
          >
            كيفية الاستخدام
          </a>
          <a
            href="#conditions-section"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
          >
            الشروط والاشتراك
          </a>
          <a
            href="#faq-section"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
          >
            الأسئلة الشائعة
          </a>
          <a
            href="#share-html-section"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
          >
            تصدير HTML
          </a>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onFocusSearch}
            className="rounded-lg bg-sky-600 px-4 py-2 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-sky-500 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1120] cursor-pointer"
          >
            افحص حسابك
          </button>
        </div>
      </div>
    </header>
  );
};
