import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  Code2,
  Copy,
  FileCode2,
  Palette,
  Play,
  Search,
  X,
} from 'lucide-react';
import {
  DEMO_ACCOUNT,
  OFFICIAL_PROMO_CODE,
  PlatformName,
} from '../data/players';
import { ExportPart } from '../utils/exportHtml';

interface SearchHeroProps {
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  query: string;
  onQueryChange: (val: string) => void;
  platform: PlatformName;
  onPlatformChange: (platform: PlatformName) => void;
  validationError: string | null;
  totalPlayers: number;
  completedCount: number;
  onExecuteSearch: (overrideQuery?: string, overridePlatform?: PlatformName) => void;
  onClearSearch: () => void;
  onCopy: (value: string, label: string) => void;
  onQuickExportPart: (part: ExportPart) => void;
}

export const SearchHero: React.FC<SearchHeroProps> = ({
  searchInputRef,
  query,
  onQueryChange,
  platform,
  onPlatformChange,
  validationError,
  totalPlayers,
  completedCount,
  onExecuteSearch,
  onClearSearch,
  onCopy,
  onQuickExportPart,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExecuteSearch();
  };

  return (
    <div className="space-y-8">
      {/* Contextual Breadcrumb */}
      <nav aria-label="مسار التنقل" className="text-xs sm:text-sm text-slate-400">
        <ol className="flex flex-wrap items-center gap-2 font-medium">
          <li>
            <a
              href="https://www.information-net.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors"
            >
              الرئيسية
            </a>
          </li>
          <li aria-hidden="true">
            <ChevronLeft className="h-3.5 w-3.5 text-slate-600" />
          </li>
          <li>
            <a href="#how-to-use" className="hover:text-sky-400 transition-colors">
              مقالات وأدوات الكازينو
            </a>
          </li>
          <li aria-hidden="true">
            <ChevronLeft className="h-3.5 w-3.5 text-slate-600" />
          </li>
          <li className="text-slate-200 font-semibold" aria-current="page">
            أداة سكربت التفاحة 1xBet وLinebet مجانًا
          </li>
        </ol>
      </nav>

      {/* Main Search Hero Surface */}
      <section
        id="search-section"
        className="rounded-2xl border border-slate-800 bg-[#111827] px-6 py-8 sm:px-10 sm:py-12 scroll-mt-24"
      >
        <div className="mx-auto max-w-3xl text-center space-y-5">
          {/* Clean unboxed editorial kicker */}
          <p className="text-xs sm:text-sm font-semibold text-sky-400">
            أداة فحص رقم الحساب الخاص ID
            <span className="mx-2 text-slate-600" aria-hidden="true">
              ·
            </span>
            <span className="text-slate-400">
              مجانًا لأعضاء بروموكود{' '}
              <span className="font-mono text-amber-300" dir="ltr">
                {OFFICIAL_PROMO_CODE}
              </span>
            </span>
          </p>

          {/* Single Main H1 */}
          <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            أداة سكربت التفاحة 1xBet وLinebet مجانًا
          </h1>

          {/* Concise Intro Subtitle */}
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            مرحبًا بك في موقع{' '}
            <strong className="font-bold text-white">العنكبوت للمعلومات</strong>. سكربت
            التفاحة من أكثر السكربتات المطلوبة لمحبي ألعاب الكازينو ومنصتي{' '}
            <span className="font-mono text-sky-400" dir="ltr">
              1xBet
            </span>{' '}
            و{' '}
            <span className="font-mono text-sky-400" dir="ltr">
              Linebet
            </span>
            . افحص رقم حسابك أدناه للتحقق من تفعيل بروموكود{' '}
            <span className="font-mono font-semibold text-amber-300" dir="ltr">
              {OFFICIAL_PROMO_CODE}
            </span>{' '}
            والوصول إلى رابط التحميل المجاني وبدون شراء.
          </p>

          {/* Demo Account Guide Above Search */}
          <div className="rounded-xl border border-sky-500/30 bg-[#0b1120] p-4 sm:p-5 text-right space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold text-white flex flex-wrap items-center gap-2">
                  <span>حساب تجريبي للتجربة الفورية:</span>
                  <span
                    className="font-mono text-sm sm:text-base font-extrabold text-sky-400"
                    dir="ltr"
                  >
                    {DEMO_ACCOUNT.account_id}
                  </span>
                </p>
                <p className="text-xs text-slate-400">
                  اكتب الرقم{' '}
                  <strong className="font-mono text-sky-300" dir="ltr">
                    {DEMO_ACCOUNT.account_id}
                  </strong>{' '}
                  في خانة البحث بالأسفل أو اضغط على زر التجربة لمعرفة شكل النتيجة والتفاصيل.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    onExecuteSearch(DEMO_ACCOUNT.account_id, DEMO_ACCOUNT.company)
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-500 cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>جرّب هذا الحساب</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onCopy(DEMO_ACCOUNT.account_id, 'رقم الحساب التجريبي')
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>نسخ الرقم</span>
                </button>
              </div>
            </div>

            {/* Demo Account Details Preview */}
            <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
              <div className="rounded-lg border border-slate-800/80 bg-[#111827] px-3 py-2">
                <dt className="text-[11px] text-slate-400">اسم اللاعب</dt>
                <dd className="mt-0.5 font-bold text-white truncate">
                  {DEMO_ACCOUNT.player_name}
                </dd>
              </div>
              <div className="rounded-lg border border-slate-800/80 bg-[#111827] px-3 py-2">
                <dt className="text-[11px] text-slate-400">رقم الحساب ID</dt>
                <dd className="mt-0.5 font-mono font-bold text-sky-400" dir="ltr">
                  {DEMO_ACCOUNT.account_id}
                </dd>
              </div>
              <div className="rounded-lg border border-slate-800/80 bg-[#111827] px-3 py-2">
                <dt className="text-[11px] text-slate-400">المنصة والدولة</dt>
                <dd className="mt-0.5 font-semibold text-slate-200">
                  <span className="font-mono" dir="ltr">
                    {DEMO_ACCOUNT.company}
                  </span>{' '}
                  · {DEMO_ACCOUNT.country}
                </dd>
              </div>
              <div className="rounded-lg border border-slate-800/80 bg-[#111827] px-3 py-2">
                <dt className="text-[11px] text-slate-400">البروموكود</dt>
                <dd className="mt-0.5 font-mono font-bold text-amber-300" dir="ltr">
                  {DEMO_ACCOUNT.promo_code}
                </dd>
              </div>
              <div className="rounded-lg border border-slate-800/80 bg-[#111827] px-3 py-2">
                <dt className="text-[11px] text-slate-400">قيمة الإيداع</dt>
                <dd className="mt-0.5 font-mono font-bold text-slate-100" dir="ltr">
                  {DEMO_ACCOUNT.amount}
                </dd>
              </div>
              <div className="rounded-lg border border-slate-800/80 bg-[#111827] px-3 py-2">
                <dt className="text-[11px] text-slate-400">الحالة</dt>
                <dd className="mt-0.5 inline-flex items-center gap-1 font-bold text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span>{DEMO_ACCOUNT.download_status}</span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Primary Account ID Verification Form */}
          <form onSubmit={handleSubmit} className="pt-1 space-y-4 text-right">
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              {/* Platform Select (1xBet or Linebet exclusively) */}
              <select
                value={platform}
                onChange={(e) => onPlatformChange(e.target.value as PlatformName)}
                aria-label="اختر المنصة"
                className="h-12 rounded-xl border border-slate-700 bg-[#0b1120] px-4 text-sm font-semibold text-slate-200 transition-colors focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 sm:w-40 shrink-0 cursor-pointer"
              >
                <option value="1xBet">1xBet</option>
                <option value="Linebet">Linebet</option>
              </select>

              {/* Account ID Input */}
              <div className="relative flex-1">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder={`أدخل رقم الحساب الخاص ID (مثل ${DEMO_ACCOUNT.account_id})`}
                  aria-label="رقم الحساب الخاص ID"
                  className="h-12 w-full rounded-xl border border-slate-700 bg-[#0b1120] pr-12 pl-10 font-mono text-sm sm:text-base text-white placeholder:font-sans placeholder:text-slate-500 transition-colors focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
                {query.trim().length > 0 && (
                  <button
                    type="button"
                    onClick={onClearSearch}
                    aria-label="مسح البحث"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Search Submit Button */}
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-sky-600 px-7 text-sm sm:text-base font-bold text-white transition-colors hover:bg-sky-500 active:scale-[0.99] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
              >
                <Search className="h-4 w-4" />
                <span>فحص الحساب</span>
              </button>
            </div>

            {/* Validation Error Alert */}
            {validationError && (
              <div
                role="alert"
                className="flex items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-rose-300"
              >
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Quick Export Links: Embed Widget · Article (HTML) · Design (CSS) · Script (JS) */}
            <div className="flex flex-wrap items-center justify-center gap-4 border-t border-slate-800/80 pt-4 text-xs text-slate-400">
              <button
                type="button"
                onClick={() => onQuickExportPart('embed')}
                className="inline-flex items-center gap-1.5 font-bold text-sky-400 transition-colors hover:text-sky-300 whitespace-nowrap cursor-pointer"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>سكربت تضمين محرك البحث فقط</span>
              </button>
              <span className="text-slate-700" aria-hidden="true">
                ·
              </span>
              <button
                type="button"
                onClick={() => onQuickExportPart('article')}
                className="inline-flex items-center gap-1.5 font-semibold text-slate-300 transition-colors hover:text-white whitespace-nowrap cursor-pointer"
              >
                <FileCode2 className="h-3.5 w-3.5" />
                <span>المقال لوحده (HTML)</span>
              </button>
              <span className="text-slate-700" aria-hidden="true">
                ·
              </span>
              <button
                type="button"
                onClick={() => onQuickExportPart('css')}
                className="inline-flex items-center gap-1.5 font-semibold text-slate-300 transition-colors hover:text-white whitespace-nowrap cursor-pointer"
              >
                <Palette className="h-3.5 w-3.5" />
                <span>التصميم لوحده (CSS)</span>
              </button>
              <span className="text-slate-700" aria-hidden="true">
                ·
              </span>
              <button
                type="button"
                onClick={() => onQuickExportPart('js')}
                className="inline-flex items-center gap-1.5 font-semibold text-slate-300 transition-colors hover:text-white whitespace-nowrap cursor-pointer"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>السكربت لوحده (JS)</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Structured 4-Column Summary Metric Strip */}
      <section
        aria-label="ملخص أداة سكربت التفاحة"
        className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-800 rounded-2xl border border-slate-800 bg-[#111827]"
      >
        <div className="p-5 sm:p-6">
          <p className="text-xs font-semibold text-slate-400">المنصات المدعومة</p>
          <p className="mt-1.5 font-mono text-xl sm:text-2xl font-bold text-white" dir="ltr">
            1xBet · Linebet
          </p>
          <p className="mt-1 text-xs text-slate-500">تفعيل وتحميل مجاني بدون شراء</p>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-xs font-semibold text-slate-400">البروموكود المطلوب</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span
              className="font-mono text-xl sm:text-2xl font-bold text-amber-300"
              dir="ltr"
            >
              {OFFICIAL_PROMO_CODE}
            </span>
            <button
              type="button"
              onClick={() => onCopy(OFFICIAL_PROMO_CODE, 'البروموكود')}
              aria-label="نسخ بروموكود Spiderbet"
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1 text-xs text-slate-500">حصري للأعضاء المسجلين بالكود</p>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-xs font-semibold text-slate-400">الحسابات المسجلة بالفحص</p>
          <p className="mt-1.5 font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">
            {totalPlayers}
          </p>
          <p className="mt-1 text-xs text-slate-500">سجل عضو مفهرس على المنصتين</p>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-xs font-semibold text-slate-400">الحسابات المؤهلة للتحميل</p>
          <p className="mt-1.5 font-mono text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums">
            {completedCount}{' '}
            <span className="text-xs sm:text-sm font-semibold text-slate-400">
              حساب موثق
            </span>
          </p>
          <p className="mt-1 text-xs text-slate-500">تم الإيداع والإعلان على قناة كازينو العرب</p>
        </div>
      </section>
    </div>
  );
};
