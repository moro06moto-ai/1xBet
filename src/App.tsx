import React, { useMemo, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  AUTHORIZED_URL,
  OFFICIAL_PROMO_CODE,
  PLAYERS_DB,
  PlatformName,
  PlayerRecord,
} from './data/players';
import { Header } from './components/Header';
import { SearchHero } from './components/SearchHero';
import { ResultsSection } from './components/ResultsSection';
import { GuideAndFaq } from './components/GuideAndFaq';
import { ShareHtmlSection } from './components/ShareHtmlSection';
import { ExportPart } from './utils/exportHtml';

export default function App() {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState<PlatformName>('1xBet');
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [hasActiveSearch, setHasActiveSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<PlayerRecord[]>([]);
  const [activeExportPart, setActiveExportPart] = useState<ExportPart>('embed');

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const completedCount = useMemo(
    () => PLAYERS_DB.filter((p) => p.download_status === 'مكتمل').length,
    []
  );

  const handleFocusSearch = () => {
    const el = searchInputRef.current;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => el.focus(), 250);
    }
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (validationError && val.trim().length > 0) {
      setValidationError(null);
    }
  };

  const handleExecuteSearch = (
    overrideQuery?: string,
    overridePlatform?: PlatformName
  ) => {
    const rawVal = typeof overrideQuery === 'string' ? overrideQuery : query;
    const trimmed = rawVal.trim();
    const activePlatform = overridePlatform ?? platform;

    if (typeof overrideQuery === 'string') {
      setQuery(overrideQuery);
    }
    if (overridePlatform) {
      setPlatform(overridePlatform);
    }

    if (!trimmed) {
      setValidationError('يرجى إدخال رقم الحساب الخاص ID للبدء بالفحص.');
      return;
    }

    setValidationError(null);
    setIsLoading(true);
    setHasActiveSearch(true);

    const normalized = trimmed.toLowerCase();

    window.setTimeout(() => {
      const matches = PLAYERS_DB.filter((p) => {
        if (p.company !== activePlatform) return false;

        return (
          p.account_id.includes(trimmed) ||
          p.promo_code.toLowerCase().includes(normalized) ||
          p.player_name.toLowerCase().includes(normalized) ||
          p.country.includes(trimmed)
        );
      });

      setSearchResults(matches);
      setIsLoading(false);

      const resultsEl = document.getElementById('results-section');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 280);
  };

  const handleClearAndReset = () => {
    setQuery('');
    setValidationError(null);
    setHasActiveSearch(false);
    setSearchResults([]);
  };

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      showToast(`تم نسخ ${label}: ${value}`);
    } catch {
      showToast(`تعذر النسخ التلقائي — القيمة: ${value}`);
    }
  };

  const handleQuickExportPart = (part: ExportPart) => {
    setActiveExportPart(part);
    const section = document.getElementById('share-html-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1120] text-slate-100">
      <Header onFocusSearch={handleFocusSearch} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <SearchHero
          searchInputRef={searchInputRef}
          query={query}
          onQueryChange={handleQueryChange}
          platform={platform}
          onPlatformChange={setPlatform}
          validationError={validationError}
          totalPlayers={PLAYERS_DB.length}
          completedCount={completedCount}
          onExecuteSearch={handleExecuteSearch}
          onClearSearch={handleClearAndReset}
          onCopy={handleCopy}
          onQuickExportPart={handleQuickExportPart}
        />

        {hasActiveSearch && (
          <ResultsSection
            results={searchResults}
            isLoading={isLoading}
            hasActiveSearch={hasActiveSearch}
            totalCount={PLAYERS_DB.length}
            onReset={handleClearAndReset}
            onCopy={handleCopy}
          />
        )}

        <GuideAndFaq onCopy={handleCopy} onFocusSearch={handleFocusSearch} />

        <ShareHtmlSection
          activePart={activeExportPart}
          onActivePartChange={setActiveExportPart}
          onNotify={showToast}
        />
      </main>

      {/* Clean Footer */}
      <footer className="mt-16 border-t border-slate-800 bg-[#0e1526] py-10 text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div className="text-center md:text-right">
              <span className="block text-sm font-extrabold text-white">
                العنكبوت للمعلومات
              </span>
              <span className="block font-mono text-slate-500" dir="ltr">
                information-net.com · Promo: {OFFICIAL_PROMO_CODE}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 font-semibold text-slate-300">
              <a
                href={AUTHORIZED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors"
              >
                رابط سكربت التفاحة
              </a>
              <a
                href="https://www.information-net.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors"
              >
                مقالات العنكبوت للمعلومات
              </a>
              <a
                href="#conditions-section"
                className="hover:text-sky-400 transition-colors"
              >
                شروط التفعيل
              </a>
            </div>
          </div>

          <p className="text-center md:text-right text-slate-400">
            © 2026 جميع الحقوق محفوظة لـ{' '}
            <strong className="text-slate-200">
              العنكبوت للمعلومات (information-net.com)
            </strong>{' '}
            — أداة فحص رقم الحساب وتفعيل سكربت التفاحة لـ 1xBet وLinebet.
          </p>
        </div>
      </footer>

      {/* Notification Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 rounded-xl border border-slate-700 bg-[#111827] px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-xl"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
