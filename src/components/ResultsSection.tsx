import React from 'react';
import {
  CheckCircle2,
  Clock,
  Copy,
  Download,
  FolderOpen,
  Loader2,
  Lock,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import {
  DownloadStatus,
  OFFICIAL_CHANNEL_NAME,
  PlayerRecord,
} from '../data/players';

interface ResultsSectionProps {
  results: PlayerRecord[];
  isLoading: boolean;
  hasActiveSearch: boolean;
  totalCount: number;
  onReset: () => void;
  onCopy: (value: string, label: string) => void;
}

export function getStatusVisuals(status: DownloadStatus) {
  switch (status) {
    case 'مكتمل':
      return {
        textClass: 'text-emerald-400',
        Icon: CheckCircle2,
        spin: false,
      };
    case 'جارٍ التحميل':
      return {
        textClass: 'text-amber-400',
        Icon: Loader2,
        spin: true,
      };
    case 'فشل':
      return {
        textClass: 'text-rose-400',
        Icon: XCircle,
        spin: false,
      };
    default:
      return {
        textClass: 'text-slate-400',
        Icon: Clock,
        spin: false,
      };
  }
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  results,
  isLoading,
  hasActiveSearch,
  onReset,
  onCopy,
}) => {
  return (
    <section id="results-section" className="space-y-5 scroll-mt-24">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            نتائج فحص رقم الحساب ID
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 tabular-nums">
            {results.length === 0
              ? 'لم يتم العثور على حساب مطابق للبيانات المدخلة'
              : `تم العثور على ${results.length} حساب مطابق`}
          </p>
        </div>

        {hasActiveSearch && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-[#111827] px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>مسح النتائج</span>
          </button>
        )}
      </div>

      {/* Loading Skeleton State */}
      {isLoading ? (
        <div
          aria-busy="true"
          aria-label="جاري فحص رقم الحساب ومطابقة الشروط"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {[0, 1, 2].map((skeletonIdx) => (
            <div
              key={skeletonIdx}
              className="rounded-2xl border border-slate-800 bg-[#111827] p-6 space-y-4 animate-pulse"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-slate-800" />
                  <div className="h-3 w-24 rounded bg-slate-800/80" />
                </div>
                <div className="h-4 w-16 rounded bg-slate-800" />
              </div>
              <div className="space-y-2.5">
                <div className="h-3.5 w-full rounded bg-slate-800/70" />
                <div className="h-3.5 w-5/6 rounded bg-slate-800/70" />
                <div className="h-3.5 w-4/6 rounded bg-slate-800/70" />
              </div>
              <div className="h-10 w-full rounded-xl bg-slate-800" />
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        /* Empty / No Results State */
        <div className="rounded-2xl border border-slate-800 bg-[#111827] px-6 py-12 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-[#0b1120] text-slate-400">
            <FolderOpen className="h-6 w-6" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-white">لم يتم العثور على الحساب</h3>
            <p className="mx-auto max-w-md text-xs sm:text-sm text-slate-400 leading-relaxed">
              تأكد من اختيار المنصة الصحيحة (1xBet أو Linebet) وكتابة رقم الحساب الخاص ID
              بدون مسافات، وأن الحساب مسجل عبر بروموكود{' '}
              <span className="font-mono text-amber-300" dir="ltr">
                Spiderbet
              </span>
              .
            </p>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-sky-500 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>إعادة الفحص</span>
          </button>
        </div>
      ) : (
        /* Populated Verification Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((player) => {
            const isCompleted =
              player.download_status === 'مكتمل' && Boolean(player.download_url);
            const { textClass, Icon, spin } = getStatusVisuals(player.download_status);

            return (
              <article
                key={player.account_id}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#111827] p-6 transition-colors hover:border-slate-700"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 border-b border-slate-800/90 pb-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-bold text-white">
                        {player.player_name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-mono tabular-nums text-sky-400" dir="ltr">
                          {player.account_id}
                        </span>
                        <button
                          type="button"
                          onClick={() => onCopy(player.account_id, 'رقم الحساب')}
                          aria-label={`نسخ رقم الحساب ${player.account_id}`}
                          className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-bold whitespace-nowrap shrink-0 ${textClass}`}
                    >
                      <Icon className={`h-4 w-4 ${spin ? 'animate-spin' : ''}`} />
                      <span>{player.download_status}</span>
                    </span>
                  </div>

                  {/* Clean Hairline Verification Details */}
                  <dl className="divide-y divide-slate-800/60 py-2 text-xs sm:text-sm">
                    <div className="flex items-center justify-between py-2.5">
                      <dt className="text-slate-400">المنصة والدولة</dt>
                      <dd className="font-semibold text-slate-100">
                        <span className="font-mono" dir="ltr">
                          {player.company}
                        </span>
                        <span className="mx-1.5 text-slate-600" aria-hidden="true">
                          ·
                        </span>
                        {player.country}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between py-2.5">
                      <dt className="text-slate-400">البروموكود</dt>
                      <dd className="flex items-center gap-1.5">
                        <span
                          className="font-mono font-semibold text-amber-300"
                          dir="ltr"
                        >
                          {player.promo_code}
                        </span>
                        <button
                          type="button"
                          onClick={() => onCopy(player.promo_code, 'البروموكود')}
                          aria-label={`نسخ البروموكود ${player.promo_code}`}
                          className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </dd>
                    </div>

                    <div className="flex items-center justify-between py-2.5">
                      <dt className="text-slate-400">الإيداع وتوثيق الحساب</dt>
                      <dd
                        className={`font-semibold ${
                          player.deposit_verified ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      >
                        {player.deposit_verified ? 'تم الإيداع والتوثيق' : 'بانتظار الإيداع'}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between py-2.5">
                      <dt className="text-slate-400">الإعلان ({OFFICIAL_CHANNEL_NAME})</dt>
                      <dd
                        className={`font-semibold ${
                          player.announced_on_channel
                            ? 'text-emerald-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {player.announced_on_channel ? 'تم الإعلان' : 'لم يُعلن بعد'}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Download Action Button */}
                <div className="mt-5 pt-3 border-t border-slate-800/80">
                  {isCompleted ? (
                    <a
                      href={player.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      <Download className="h-4 w-4 shrink-0" />
                      <span>تحميل سكربت التفاحة مجانًا</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-[#0b1120] px-4 py-2.5 text-xs font-semibold text-slate-500 cursor-not-allowed"
                    >
                      <Lock className="h-3.5 w-3.5 shrink-0" />
                      <span>التحميل غير متاح قبل استيفاء الشروط</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
