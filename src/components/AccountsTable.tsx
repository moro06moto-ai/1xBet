import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  FileDown,
  RotateCcw,
} from 'lucide-react';
import {
  ARABIC_COUNTRIES,
  DOWNLOAD_STATUSES,
  PlayerRecord,
} from '../data/players';
import { getStatusVisuals } from './ResultsSection';

interface AccountsTableProps {
  players: PlayerRecord[];
  countryFilter: string;
  onCountryFilterChange: (country: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  onCopy: (value: string, label: string) => void;
  onExportCsv: () => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const AccountsTable: React.FC<AccountsTableProps> = ({
  players,
  countryFilter,
  onCountryFilterChange,
  statusFilter,
  onStatusFilterChange,
  pageSize,
  onPageSizeChange,
  currentPage,
  onPageChange,
  onCopy,
  onExportCsv,
  onResetFilters,
  hasActiveFilters,
}) => {
  const totalPages = Math.max(1, Math.ceil(players.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const pageRows = players.slice(startIdx, endIdx);

  const startDisplay = players.length === 0 ? 0 : startIdx + 1;
  const endDisplay = Math.min(endIdx, players.length);

  return (
    <section
      id="accounts-table"
      className="rounded-2xl border border-slate-800 bg-[#111827] p-5 sm:p-6 space-y-5 scroll-mt-24"
    >
      {/* Header & Filter Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-xl font-extrabold text-white">
            سجل الحسابات والتحقق المباشر
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            تصفح وتصفية كامل قاعدة البيانات المقيدة بالوثائق الرسمية لعام 2026
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <label className="flex items-center gap-2 text-slate-400">
            <span className="whitespace-nowrap">الدولة:</span>
            <select
              value={countryFilter}
              onChange={(e) => onCountryFilterChange(e.target.value)}
              className="h-9 rounded-lg border border-slate-700 bg-[#0b1120] px-3 text-slate-200 focus:border-sky-500 focus:outline-none cursor-pointer"
            >
              <option value="ALL">جميع الدول ({ARABIC_COUNTRIES.length})</option>
              {ARABIC_COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-slate-400">
            <span className="whitespace-nowrap">حالة التنزيل:</span>
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="h-9 rounded-lg border border-slate-700 bg-[#0b1120] px-3 text-slate-200 focus:border-sky-500 focus:outline-none cursor-pointer"
            >
              <option value="ALL">جميع الحالات</option>
              {DOWNLOAD_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status === 'مكتمل' ? 'مكتمل (تحميل موثق)' : status}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-slate-400">
            <span className="whitespace-nowrap">عدد الصفوف:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-9 rounded-lg border border-slate-700 bg-[#0b1120] px-3 font-mono text-slate-200 focus:border-sky-500 focus:outline-none cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>

          <button
            type="button"
            onClick={onExportCsv}
            disabled={players.length === 0}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-700 bg-[#0b1120] px-3 font-semibold text-slate-200 transition-colors hover:border-sky-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FileDown className="h-3.5 w-3.5 text-sky-400" />
            <span>تصدير CSV</span>
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/70 px-3 font-semibold text-slate-200 transition-colors hover:bg-slate-700 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>إعادة الضبط</span>
            </button>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[880px] text-right text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-[#0b1120]/70 text-slate-400 font-semibold">
              <th className="py-3 px-4">اسم اللاعب</th>
              <th className="py-3 px-4">ID الحساب</th>
              <th className="py-3 px-4">الشركة</th>
              <th className="py-3 px-4">البرومو كود</th>
              <th className="py-3 px-4">الرصيد / الفئة</th>
              <th className="py-3 px-4">الدولة</th>
              <th className="py-3 px-4">حالة التنزيل</th>
              <th className="py-3 px-4">تاريخ التوثيق</th>
              <th className="py-3 px-4 text-center">الإجراء المتاح</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-slate-400">
                  لا توجد سجلات مطابقة للفلاتر المحددة حالياً.
                </td>
              </tr>
            ) : (
              pageRows.map((p) => {
                const isCompleted = p.download_status === 'مكتمل' && Boolean(p.download_url);
                const { textClass, Icon, spin } = getStatusVisuals(p.download_status);

                return (
                  <tr
                    key={p.account_id}
                    className="transition-colors hover:bg-slate-800/40"
                  >
                    <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                      {p.player_name}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onCopy(p.account_id, 'رقم الحساب')}
                        title="انقر للنسخ"
                        className="group inline-flex items-center gap-1.5 font-mono text-sky-400 tabular-nums hover:text-sky-300 cursor-pointer"
                        dir="ltr"
                      >
                        <span>{p.account_id}</span>
                        <Copy className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                      {p.company}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onCopy(p.promo_code, 'كود البرومو')}
                        title="انقر للنسخ"
                        className="group inline-flex items-center gap-1.5 font-mono text-amber-300 tabular-nums hover:text-amber-200 cursor-pointer"
                        dir="ltr"
                      >
                        <span>{p.promo_code}</span>
                        <Copy className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    </td>
                    <td
                      className="py-3 px-4 font-mono text-emerald-400 tabular-nums whitespace-nowrap"
                      dir="ltr"
                    >
                      {p.amount}
                    </td>
                    <td className="py-3 px-4 text-slate-200 whitespace-nowrap">
                      {p.country}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold ${textClass}`}
                      >
                        <Icon className={`h-3.5 w-3.5 ${spin ? 'animate-spin' : ''}`} />
                        <span>{p.download_status}</span>
                      </span>
                    </td>
                    <td
                      className="py-3 px-4 font-mono text-xs text-slate-400 tabular-nums whitespace-nowrap"
                      dir="ltr"
                    >
                      {p.verified_at}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {isCompleted ? (
                        <a
                          href={p.download_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-sky-500"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>تحميل</span>
                        </a>
                      ) : (
                        <span className="text-xs font-medium text-slate-500">
                          غير متاح
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800 pt-4 text-xs text-slate-400">
        <div className="tabular-nums">
          عرض{' '}
          <span className="font-mono font-bold text-white">
            {startDisplay} - {endDisplay}
          </span>{' '}
          من إجمالي{' '}
          <span className="font-mono font-bold text-white">{players.length}</span> سجل
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => onPageChange(safePage - 1)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-[#0b1120] px-3 py-1.5 font-semibold text-slate-200 transition-colors hover:border-sky-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
          >
            <ChevronRight className="h-3.5 w-3.5" />
            <span>السابق</span>
          </button>

          <span className="px-2 font-mono font-semibold text-sky-400 tabular-nums">
            صفحة {safePage} من {totalPages}
          </span>

          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => onPageChange(safePage + 1)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-[#0b1120] px-3 py-1.5 font-semibold text-slate-200 transition-colors hover:border-sky-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
          >
            <span>التالي</span>
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
