import React from 'react';
import {
  CheckCircle2,
  Clock,
  Copy,
  Download,
  Loader2,
  Lock,
  RotateCcw,
  UserPlus,
  XCircle,
} from 'lucide-react';
import {
  DownloadStatus,
  OFFICIAL_CHANNEL_NAME,
  OFFICIAL_PROMO_CODE,
  PlayerRecord,
  SITE_REGISTRATION_URL,
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
              ? 'هذا الحساب غير مسجل حاليًا ضمن قائمة الأعضاء المؤهلين'
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
        /* Not a Member: Show Download Requirements & Site Registration Button */
        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-8 space-y-6">
          <div className="space-y-1.5 border-b border-slate-800 pb-4">
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              الحساب غير مسجل ضمن الأعضاء المؤهلين حاليًا
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              تأكد من اختيار المنصة الصحيحة (1xBet أو Linebet) وكتابة رقم الحساب بدون
              مسافات. وللحصول على سكربت التفاحة مجانًا يجب استيفاء متطلبات التحميل التالية:
            </p>
          </div>

          {/* Download Requirements */}
          <div className="rounded-xl border border-slate-800 bg-[#0b1120] p-5 space-y-3">
            <h4 className="text-sm font-bold text-amber-300">
              متطلبات التحميل المجاني:
            </h4>
            <ol className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>
                  إنشاء حساب جديد باستخدام بروموكود{' '}
                  <strong className="font-mono text-amber-300" dir="ltr">
                    {OFFICIAL_PROMO_CODE}
                  </strong>
                  .
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>إتمام الإيداع على الحساب وتوثيقه بالكامل.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>
                  أن يتم الإعلان عن رقم حسابك على{' '}
                  <strong className="text-white">{OFFICIAL_CHANNEL_NAME}</strong>.
                </span>
              </li>
            </ol>
          </div>

          {/* Bottom Registration Icon & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={SITE_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-emerald-500 whitespace-nowrap"
              >
                <UserPlus className="h-4 w-4 shrink-0" />
                <span>التسجيل والاشتراك عبر الموقع</span>
              </a>

              <button
                type="button"
                onClick={() => onCopy(OFFICIAL_PROMO_CODE, 'البروموكود')}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 text-xs sm:text-sm font-bold text-amber-300 transition-colors hover:bg-amber-500/20 whitespace-nowrap cursor-pointer"
              >
                <Copy className="h-4 w-4 shrink-0" />
                <span>
                  نسخ البروموكود:{' '}
                  <span className="font-mono" dir="ltr">
                    {OFFICIAL_PROMO_CODE}
                  </span>
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-700 bg-[#0b1120] px-4 text-xs sm:text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>إعادة الفحص</span>
            </button>
          </div>
        </div>
      ) : (
        /* Populated Verification Cards Grid + Details */
        <div className="space-y-5">
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

                    {/* Full Account Details */}
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
                        <dt className="text-slate-400">قيمة الإيداع</dt>
                        <dd className="font-mono font-semibold text-slate-100" dir="ltr">
                          {player.amount}
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

                      <div className="flex items-center justify-between py-2.5">
                        <dt className="text-slate-400">تاريخ التحقق</dt>
                        <dd className="font-mono text-xs text-slate-300" dir="ltr">
                          {player.verified_at}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Download Action or Requirements CTA */}
                  <div className="mt-5 pt-3 border-t border-slate-800/80 space-y-2.5">
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
                      <>
                        <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-[#0b1120] px-4 py-2.5 text-xs font-semibold text-slate-400">
                          <Lock className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                          <span>التحميل غير متاح قبل استيفاء متطلبات التحميل</span>
                        </div>
                        <a
                          href={SITE_REGISTRATION_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-xs font-bold text-sky-300 transition-colors hover:bg-sky-500/20 hover:text-white"
                        >
                          <UserPlus className="h-3.5 w-3.5 shrink-0" />
                          <span>التسجيل واستكمال الشروط عبر الموقع</span>
                        </a>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom Requirements & Site Registration Bar below Results */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-[#111827] px-5 py-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <p className="font-bold text-white">
                متطلبات التحميل المجاني: التسجيل ببروموكود{' '}
                <span className="font-mono text-amber-300" dir="ltr">
                  {OFFICIAL_PROMO_CODE}
                </span>{' '}
                · الإيداع والتوثيق · الإعلان على {OFFICIAL_CHANNEL_NAME}
              </p>
              <p className="text-xs text-slate-400">
                لم تسجل بعد؟ يمكنك فتح حساب جديد والاشتراك مباشرة عبر بوابة الموقع.
              </p>
            </div>
            <a
              href={SITE_REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-emerald-500 whitespace-nowrap shrink-0"
            >
              <UserPlus className="h-4 w-4 shrink-0" />
              <span>التسجيل عبر الموقع</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
