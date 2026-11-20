import React, { useMemo, useState } from 'react';
import { Code2, Copy, Download, Eye, EyeOff, FolderDown } from 'lucide-react';
import {
  DEFAULT_GITHUB_REPO_URL,
  ExportPart,
  buildRepoPlayersJson,
  buildSearchEmbedJsOnly,
  buildSearchEmbedOneLineTag,
  buildSearchEmbedScriptTag,
  getExportBundle,
} from '../utils/exportHtml';

interface ShareHtmlSectionProps {
  activePart: ExportPart;
  onActivePartChange: (part: ExportPart) => void;
  onNotify: (msg: string) => void;
}

type EmbedSubMode = 'oneline' | 'inline' | 'js' | 'json';

const EXPORT_TABS: { id: ExportPart; label: string; hint: string }[] = [
  {
    id: 'embed',
    label: 'تضمين البحث والنتيجة (GitHub)',
    hint: `سكربت صغير لنظام البحث والنتيجة فقط يجلب البيانات تلقائيًا من مستودع GitHub (${DEFAULT_GITHUB_REPO_URL}) عبر مفتاح الاتصال (GitHub Token).`,
  },
  {
    id: 'article',
    label: '1. المقال لوحده (HTML)',
    hint: 'كود HTML صافي للمقال وخانة البحث بدون CSS أو JS — للصقه داخل محرر المقال مباشرة.',
  },
  {
    id: 'css',
    label: '2. التصميم لوحده (CSS)',
    hint: 'كود CSS مستقل ومحصور داخل #spiderbet-article — للصقه في تنسيق القالب أو داخل <style>.',
  },
  {
    id: 'js',
    label: '3. السكربت لوحده (JS)',
    hint: 'كود JavaScript صافي يحتوي على دالة searchAccount(accountId, platform) — للصقه داخل <script> قبل إغلاق </body>.',
  },
];

export const ShareHtmlSection: React.FC<ShareHtmlSectionProps> = ({
  activePart,
  onActivePartChange,
  onNotify,
}) => {
  const [showCode, setShowCode] = useState(true);
  const [embedMode, setEmbedMode] = useState<EmbedSubMode>('oneline');

  const bundle = useMemo(() => getExportBundle(activePart), [activePart]);
  const activeTabMeta = EXPORT_TABS.find((t) => t.id === activePart) ?? EXPORT_TABS[0];

  const activeEmbedMeta = useMemo(() => {
    switch (embedMode) {
      case 'oneline':
        return {
          code: buildSearchEmbedOneLineTag(),
          fileName: 'embed-snippet.html',
          mimeType: 'text/html;charset=utf-8',
          copyLabel: 'نسخ كود التضمين الصغير',
          downloadLabel: 'تحميل كود التضمين',
        };
      case 'inline':
        return {
          code: buildSearchEmbedScriptTag(),
          fileName: 'spiderbet-search-inline.html',
          mimeType: 'text/html;charset=utf-8',
          copyLabel: 'نسخ السكربت المباشر (<script>)',
          downloadLabel: 'تحميل السكربت المباشر',
        };
      case 'js':
        return {
          code: buildSearchEmbedJsOnly(),
          fileName: 'spiderbet-search-embed.js',
          mimeType: 'application/javascript;charset=utf-8',
          copyLabel: 'نسخ ملف السكربت (.js)',
          downloadLabel: 'تحميل spiderbet-search-embed.js',
        };
      case 'json':
        return {
          code: buildRepoPlayersJson(),
          fileName: 'players.json',
          mimeType: 'application/json;charset=utf-8',
          copyLabel: 'نسخ ملف البيانات (players.json)',
          downloadLabel: 'تحميل players.json',
        };
    }
  }, [embedMode]);

  const displayedCode = activePart === 'embed' ? activeEmbedMeta.code : bundle.code;
  const displayedFileName =
    activePart === 'embed' ? activeEmbedMeta.fileName : bundle.fileName;

  const downloadBlob = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const triggerDownload = (part: ExportPart) => {
    const item = getExportBundle(part);
    downloadBlob(item.downloadContent, item.fileName, item.mimeType);
  };

  const handleDownloadActive = () => {
    if (activePart === 'embed') {
      downloadBlob(
        activeEmbedMeta.code,
        activeEmbedMeta.fileName,
        activeEmbedMeta.mimeType
      );
      onNotify(`تم تحميل الملف (${activeEmbedMeta.fileName})`);
      return;
    }
    triggerDownload(activePart);
    onNotify(`تم تحميل ${bundle.label} (${bundle.fileName})`);
  };

  const handleDownloadRepoFiles = () => {
    downloadBlob(
      buildSearchEmbedJsOnly(),
      'spiderbet-search-embed.js',
      'application/javascript;charset=utf-8'
    );
    window.setTimeout(() => {
      downloadBlob(
        buildRepoPlayersJson(),
        'players.json',
        'application/json;charset=utf-8'
      );
    }, 200);
    onNotify('تم تحميل ملفي المستودع: spiderbet-search-embed.js و players.json');
  };

  const handleDownloadAllThree = () => {
    triggerDownload('article');
    window.setTimeout(() => triggerDownload('css'), 180);
    window.setTimeout(() => triggerDownload('js'), 360);
    onNotify('تم تحميل الـ 3 ملفات منفصلة (HTML + CSS + JS)');
  };

  const handleCopyActive = async () => {
    try {
      await navigator.clipboard.writeText(displayedCode);
      onNotify(
        activePart === 'embed'
          ? `تم ${activeEmbedMeta.copyLabel} إلى الحافظة`
          : `تم نسخ ${bundle.label} إلى الحافظة`
      );
    } catch {
      setShowCode(true);
      onNotify('تعذر النسخ التلقائي — يمكنك تحديد الكود أدناه ونسخه');
    }
  };

  return (
    <section
      id="share-html-section"
      className="rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-8 space-y-5 scroll-mt-24"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-2xl">
          <p className="text-xs font-semibold text-sky-400">
            تضمين خارجي خفيف · متصل بمستودع GitHub عبر مفتاح الاتصال
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {activePart === 'embed'
              ? 'سكربت تضمين نظام البحث والنتيجة من مستودع GitHub'
              : 'المقال والتصميم والسكربت منفصلين بالكامل'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {activeTabMeta.hint}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleCopyActive}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-sky-500 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Copy className="h-4 w-4" />
            <span>
              {activePart === 'embed'
                ? activeEmbedMeta.copyLabel
                : `نسخ ${bundle.label}`}
            </span>
          </button>

          <button
            type="button"
            onClick={handleDownloadActive}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-[#0b1120] px-4 text-xs sm:text-sm font-bold text-slate-200 transition-colors hover:border-sky-500 hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="h-4 w-4 text-sky-400" />
            <span>
              {activePart === 'embed'
                ? activeEmbedMeta.downloadLabel
                : 'تحميل الملف'}
            </span>
          </button>

          {activePart === 'embed' ? (
            <button
              type="button"
              onClick={handleDownloadRepoFiles}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-[#0b1120] px-4 text-xs sm:text-sm font-semibold text-slate-300 transition-colors hover:border-emerald-500 hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FolderDown className="h-4 w-4 text-emerald-400" />
              <span>تحميل ملفات المستودع (JS + JSON)</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleDownloadAllThree}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-[#0b1120] px-4 text-xs sm:text-sm font-semibold text-slate-300 transition-colors hover:border-emerald-500 hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FolderDown className="h-4 w-4 text-emerald-400" />
              <span>تحميل الـ 3 ملفات</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Export Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4 text-xs">
        <div
          role="tablist"
          aria-label="خيارات التصدير والتضمين"
          className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-800 bg-[#0b1120] p-1"
        >
          {EXPORT_TABS.map((tab) => {
            const isActive = activePart === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onActivePartChange(tab.id)}
                className={`rounded-md px-3.5 py-2 font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 font-mono text-slate-400"
            dir="ltr"
          >
            <Code2 className="h-3.5 w-3.5 text-sky-400" />
            <span>{displayedFileName}</span>
            <span className="text-slate-600">·</span>
            <span className="tabular-nums">
              {Math.max(1, Math.ceil(displayedCode.length / 1024))} KB
            </span>
          </span>

          <button
            type="button"
            onClick={() => setShowCode((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-[#0b1120] px-3 py-1.5 font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white whitespace-nowrap cursor-pointer"
          >
            {showCode ? (
              <>
                <EyeOff className="h-3.5 w-3.5" />
                <span>إخفاء</span>
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5" />
                <span>عرض</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* GitHub Repo Embed Controls & Instructions */}
      {activePart === 'embed' && (
        <div className="space-y-3 rounded-xl border border-slate-800 bg-[#0b1120] p-4 text-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="font-bold text-white">
                المستودع المرتبط:{' '}
                <a
                  href={DEFAULT_GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="font-mono text-sky-400 hover:underline"
                >
                  {DEFAULT_GITHUB_REPO_URL}
                </a>
              </p>
              <p className="text-slate-400 leading-relaxed">
                1) ارفع ملفي{' '}
                <code className="font-mono text-sky-300" dir="ltr">
                  spiderbet-search-embed.js
                </code>{' '}
                و{' '}
                <code className="font-mono text-sky-300" dir="ltr">
                  players.json
                </code>{' '}
                إلى المستودع. 2) الصق كود التضمين في الموقع الخارجي واستبدل{' '}
                <code className="font-mono text-amber-300" dir="ltr">
                  YOUR_GITHUB_TOKEN
                </code>{' '}
                بمفتاح GitHub (للمستودع الخاص، أو اتركه فارغًا{' '}
                <code className="font-mono text-slate-300" dir="ltr">
                  ""
                </code>{' '}
                إذا كان المستودع عامًا).
              </p>
            </div>

            <div
              role="group"
              aria-label="ملفات وكود التضمين"
              className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-800 bg-[#111827] p-1 shrink-0 self-start lg:self-center"
            >
              {(
                [
                  { id: 'oneline', label: 'كود التضمين الصغير (خاص/عام)' },
                  { id: 'inline', label: 'سكربت مباشر (<script>)' },
                  { id: 'js', label: 'spiderbet-search-embed.js' },
                  { id: 'json', label: 'players.json' },
                ] as { id: EmbedSubMode; label: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setEmbedMode(item.id)}
                  className={`rounded-md px-3 py-1.5 font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    embedMode === item.id
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showCode && (
        <textarea
          readOnly
          value={displayedCode}
          dir="ltr"
          aria-label={activePart === 'embed' ? activeEmbedMeta.copyLabel : bundle.label}
          onFocus={(e) => e.currentTarget.select()}
          className="h-80 w-full rounded-xl border border-slate-800 bg-[#0b1120] p-4 font-mono text-xs text-slate-300 leading-relaxed focus:border-sky-500 focus:outline-none custom-scrollbar"
        />
      )}
    </section>
  );
};
