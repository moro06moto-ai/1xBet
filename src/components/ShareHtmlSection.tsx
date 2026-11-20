import React, { useMemo, useState } from 'react';
import { Code2, Copy, Download, Eye, EyeOff, FolderDown } from 'lucide-react';
import {
  ExportPart,
  buildSearchEmbedJsOnly,
  buildSearchEmbedScriptTag,
  getExportBundle,
} from '../utils/exportHtml';

interface ShareHtmlSectionProps {
  activePart: ExportPart;
  onActivePartChange: (part: ExportPart) => void;
  onNotify: (msg: string) => void;
}

const EXPORT_TABS: { id: ExportPart; label: string; hint: string }[] = [
  {
    id: 'embed',
    label: 'تضمين محرك البحث فقط (سكربت)',
    hint: 'سكربت واحد مستقل لمحرك البحث فقط (بدون المقال أو أي CSS إضافي) — انسخه وأرسله لأي موقع بعيد، وسيعمل فورًا في نفس موضع اللصق بتصميم معزول تمامًا عبر Shadow DOM.',
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
  const [embedFormat, setEmbedFormat] = useState<'tag' | 'raw'>('tag');

  const bundle = useMemo(() => getExportBundle(activePart), [activePart]);
  const activeTabMeta = EXPORT_TABS.find((t) => t.id === activePart) ?? EXPORT_TABS[0];

  const displayedCode = useMemo(() => {
    if (activePart === 'embed') {
      return embedFormat === 'tag'
        ? buildSearchEmbedScriptTag()
        : buildSearchEmbedJsOnly();
    }
    return bundle.code;
  }, [activePart, embedFormat, bundle.code]);

  const triggerDownload = (part: ExportPart) => {
    const item = getExportBundle(part);
    const blob = new Blob([item.downloadContent], { type: item.mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = item.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadActive = () => {
    triggerDownload(activePart);
    onNotify(`تم تحميل ${bundle.label} (${bundle.fileName})`);
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
      const suffix =
        activePart === 'embed'
          ? embedFormat === 'tag'
            ? ' (<script> جاهز للصق)'
            : ' (ملف JS صافي)'
          : '';
      onNotify(`تم نسخ ${bundle.label}${suffix} إلى الحافظة`);
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
            تصدير وتضمين مرن · سكربت محرك البحث المستقل للمواقع البعيدة
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {activePart === 'embed'
              ? 'سكربت تضمين محرك البحث فقط لأي موقع بعيد'
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
                ? embedFormat === 'tag'
                  ? 'نسخ السكربت (<script>)'
                  : 'نسخ كود JS الصافي'
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
              {activePart === 'embed' ? 'تحميل ملف .js' : 'تحميل الملف'}
            </span>
          </button>

          {activePart !== 'embed' && (
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

      {/* Tabs: Standalone Search Embed + Separated Article / CSS / JS */}
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
            <span>{bundle.fileName}</span>
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

      {/* Embed-specific format selector & remote-site usage guide */}
      {activePart === 'embed' && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[#0b1120] px-4 py-3 text-xs">
          <div className="space-y-1 text-slate-300">
            <p className="font-bold text-white">
              طريقة التضمين في الموقع البعيد (سكربت فقط بدون HTML أو CSS):
            </p>
            <p className="text-slate-400 leading-relaxed">
              الصق كود <code className="font-mono text-sky-400" dir="ltr">&lt;script&gt;...&lt;/script&gt;</code> مباشرة في الموضع المطلوب (بلوجر، ووردبريس، أو أي صفحة HTML)، أو ارفع ملف{' '}
              <code className="font-mono text-sky-400" dir="ltr">spiderbet-search-embed.js</code> واستدعه بـ{' '}
              <code className="font-mono text-amber-300" dir="ltr">
                &lt;script src="spiderbet-search-embed.js"&gt;&lt;/script&gt;
              </code>
              .
            </p>
          </div>

          <div
            role="group"
            aria-label="صيغة سكربت التضمين"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-[#111827] p-1 shrink-0 self-start sm:self-center"
          >
            <button
              type="button"
              onClick={() => setEmbedFormat('tag')}
              className={`rounded-md px-3 py-1.5 font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                embedFormat === 'tag'
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              كود &lt;script&gt; جاهز
            </button>
            <button
              type="button"
              onClick={() => setEmbedFormat('raw')}
              className={`rounded-md px-3 py-1.5 font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                embedFormat === 'raw'
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              ملف JS صافي
            </button>
          </div>
        </div>
      )}

      {showCode && (
        <textarea
          readOnly
          value={displayedCode}
          dir="ltr"
          aria-label={bundle.label}
          onFocus={(e) => e.currentTarget.select()}
          className="h-80 w-full rounded-xl border border-slate-800 bg-[#0b1120] p-4 font-mono text-xs text-slate-300 leading-relaxed focus:border-sky-500 focus:outline-none custom-scrollbar"
        />
      )}
    </section>
  );
};
