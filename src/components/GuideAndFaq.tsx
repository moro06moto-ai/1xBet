import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown, Copy, PlayCircle } from 'lucide-react';
import {
  FAQ_ITEMS,
  OFFICIAL_CHANNEL_NAME,
  OFFICIAL_PROMO_CODE,
} from '../data/players';

interface GuideAndFaqProps {
  onCopy: (value: string, label: string) => void;
  onFocusSearch: () => void;
}

export const GuideAndFaq: React.FC<GuideAndFaqProps> = ({
  onCopy,
  onFocusSearch,
}) => {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const handleToggleFaq = (id: number) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-12">
      {/* Section 1: About the Apple Script Tool */}
      <section className="rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-10 space-y-6">
        <div className="border-b border-slate-800 pb-5 space-y-2">
          <p className="text-xs font-semibold text-sky-400">
            مقالات موقع العنكبوت للمعلومات · أداة التفعيل المجانية
          </p>
          <h2 className="text-balance text-2xl sm:text-3xl font-extrabold text-white">
            ما هي أداة تفعيل سكربت التفاحة لموقعي 1xBet وLinebet؟
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="space-y-4">
            <p>
              أصبح <strong className="text-white">سكربت التفاحة</strong> من أكثر السكربتات
              المطلوبة عبر الإنترنت، وخصوصًا لمحبي ألعاب الكازينو وتطبيقات المراهنات{' '}
              <span className="font-mono text-sky-400" dir="ltr">
                1xBet
              </span>{' '}
              و{' '}
              <span className="font-mono text-sky-400" dir="ltr">
                Linebet
              </span>
              . وقد تم تطوير وإنشاء السكربت من قِبل{' '}
              <strong className="text-white">العنكبوت للمعلومات</strong> ليكون متاحًا
              بشكل مجاني وبدون شراء للأعضاء المسجلين على بروموكود{' '}
              <strong className="font-mono text-amber-300" dir="ltr">
                {OFFICIAL_PROMO_CODE}
              </strong>{' '}
              فقط.
            </p>
            <p>
              وتُعد <strong className="text-white">أداة تفعيل سكربت التفاحة</strong> أداة
              مجانية تم تطويرها وتقديمها كوسيلة منظمة لتسهيل عملية فحص الحسابات وتحميل
              سكريبت التفاحة لمواقع الكازينو{' '}
              <span className="font-mono text-sky-400" dir="ltr">
                1xBet
              </span>{' '}
              و{' '}
              <span className="font-mono text-sky-400" dir="ltr">
                Linebet
              </span>{' '}
              بخطوات واضحة للأعضاء المؤهلين.
            </p>
          </div>

          <div className="space-y-4 border-t lg:border-t-0 lg:border-r border-slate-800 pt-6 lg:pt-0 lg:pr-8">
            <h3 className="text-base font-bold text-white">
              فحص رقم الحساب الخاص ID
            </h3>
            <p>
              تتضمن الصفحة أداة مخصصة لفحص رقم الحساب الخاص بك (
              <span className="font-mono text-sky-400" dir="ltr">
                Account ID
              </span>
              )، تحتوي على خانة لإدخال رقم الحساب واختيار المنصة وزر للبحث الفوري، وذلك
              للتحقق من ارتباط الحساب بالبروموكود المعتمد وتوجيهك مباشرة إلى رابط التحميل
              المرتبط بحسابك عند استيفاء الشروط.
            </p>
            <div>
              <button
                type="button"
                onClick={onFocusSearch}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0b1120] px-4 py-2 text-xs font-bold text-sky-400 transition-colors hover:border-sky-500 hover:text-white cursor-pointer"
              >
                <span>الانتقال إلى أداة فحص رقم الحساب ID</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 4-Step Usage Guide */}
      <section
        id="how-to-use"
        className="rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-8 space-y-6 scroll-mt-24"
      >
        <div className="max-w-2xl space-y-1.5">
          <p className="text-xs font-semibold text-sky-400">خطوات العمل</p>
          <h2 className="text-2xl font-extrabold text-white">
            كيفية استخدام أداة تفعيل سكربت التفاحة؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            اتبع الخطوات الأربع التالية لفحص حسابك والوصول إلى رابط التحميل المرتبط به
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-800 border-t border-slate-800 pt-6 gap-y-6 lg:gap-y-0">
          <div className="pb-4 sm:pb-0 lg:pl-6 space-y-2">
            <span className="font-mono text-sm font-bold text-sky-400">01.</span>
            <h3 className="text-base font-bold text-white">إكمال معلومات الحساب</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              إكمال الخانات المطلوبة بمعلومات الحساب المسجل على{' '}
              <span className="font-mono text-slate-200" dir="ltr">
                Linebet
              </span>{' '}
              أو{' '}
              <span className="font-mono text-slate-200" dir="ltr">
                1xBet
              </span>
              .
            </p>
          </div>

          <div className="pt-4 sm:pt-0 lg:px-6 space-y-2">
            <span className="font-mono text-sm font-bold text-amber-400">02.</span>
            <h3 className="text-base font-bold text-white">إدخال الرقم والبحث</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              إدخال رقم الحساب الخاص{' '}
              <span className="font-mono text-slate-200" dir="ltr">
                ID
              </span>{' '}
              والضغط على أيقونة البحث الموجودة في واجهة الأداة.
            </p>
          </div>

          <div className="pt-4 lg:pt-0 lg:px-6 space-y-2">
            <span className="font-mono text-sm font-bold text-sky-400">03.</span>
            <h3 className="text-base font-bold text-white">فحص والتحقق من البيانات</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              تقوم الأداة بفحص المعلومات والتحقق من بروموكود{' '}
              <span className="font-mono text-amber-300" dir="ltr">
                {OFFICIAL_PROMO_CODE}
              </span>{' '}
              وحالة التوثيق والإيداع.
            </p>
          </div>

          <div className="pt-4 lg:pt-0 lg:pr-6 space-y-2">
            <span className="font-mono text-sm font-bold text-emerald-400">04.</span>
            <h3 className="text-base font-bold text-white">رابط التحميل المباشر</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              بعد انتهاء الفحص وتأكيد الأهلية، يتم توجيه المستخدم إلى رابط التحميل
              المرتبط بحسابه مباشرة.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Conditions & How to Subscribe */}
      <section
        id="conditions-section"
        className="rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-10 space-y-8 scroll-mt-24"
      >
        <div className="border-b border-slate-800 pb-5 space-y-2">
          <p className="text-xs font-semibold text-amber-400">
            متطلبات التفعيل المجاني · العنكبوت للمعلومات
          </p>
          <h2 className="text-balance text-2xl sm:text-3xl font-extrabold text-white">
            شروط تحميل سكربت التفاحة 1xBet وكيفية الاشتراك
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* Left Column: 3 Required Conditions */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white">
              شروط تحميل سكربت التفاحة 1xBet وLinebet
            </h3>
            <p className="text-slate-400">
              لضمان ظهور رابط التحميل المرتبط بحسابك مجانًا وبدون شراء، يجب استيفاء الشروط
              الثلاثة التالية:
            </p>

            <ol className="space-y-3 pt-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>
                  أن تكون عضوًا مسجلاً على بروموكود{' '}
                  <strong className="font-mono text-amber-300" dir="ltr">
                    {OFFICIAL_PROMO_CODE}
                  </strong>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>أن يكون حسابك قد تم الإيداع عليه وتم توثيقه بالكامل.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>
                  أن يكون حسابك قد تم الإعلان عنه على{' '}
                  <strong className="text-white">{OFFICIAL_CHANNEL_NAME}</strong>.
                </span>
              </li>
            </ol>
          </div>

          {/* Right Column: How to Subscribe */}
          <div className="space-y-4 border-t lg:border-t-0 lg:border-r border-slate-800 pt-6 lg:pt-0 lg:pr-8">
            <h3 className="text-base sm:text-lg font-bold text-white">
              كيفية الاشتراك في سكربت التفاحة
            </h3>
            <p>
              للاشتراك في سكربت التفاحة بشكل صحيح، احرص على مشاهدة الفيديو التوضيحي بالكامل
              لفهم جميع خطوات التسجيل، ثم اتبع التالي:
            </p>

            <ul className="space-y-2.5 text-slate-300">
              <li className="flex items-start gap-2.5">
                <PlayCircle className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                <span>مشاهدة الفيديو التوضيحي بالكامل قبل البدء بإنشاء الحساب.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                <span>
                  فتح حساب جديد على{' '}
                  <span className="font-mono text-white" dir="ltr">
                    1xBet
                  </span>{' '}
                  أو{' '}
                  <span className="font-mono text-white" dir="ltr">
                    Linebet
                  </span>{' '}
                  باستخدام البروموكود{' '}
                  <strong className="font-mono text-amber-300" dir="ltr">
                    {OFFICIAL_PROMO_CODE}
                  </strong>
                  .
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                <span>
                  إجراء إيداع وتوثيق الحساب ثم متابعة إعلان الحسابات المقبولة على{' '}
                  <strong className="text-white">{OFFICIAL_CHANNEL_NAME}</strong>.
                </span>
              </li>
            </ul>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onCopy(OFFICIAL_PROMO_CODE, 'البروموكود')}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500/15 border border-amber-500/40 px-4 py-2 text-xs font-bold text-amber-300 transition-colors hover:bg-amber-500/25 cursor-pointer"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>
                  نسخ البروموكود:{' '}
                  <span className="font-mono" dir="ltr">
                    {OFFICIAL_PROMO_CODE}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Responsible Use & Transparency Notice */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
            <span>تنويه هام وإخلاء مسؤولية</span>
          </div>
          <p className="text-xs text-amber-100/85 leading-relaxed">
            المعلومات وأداة الفحص المعروضة في هذه الصفحة مخصصة للتوضيح التقني والتحقق من
            سجلات العضوية فقط. تعتمد ألعاب الكازينو على خوارزميات عشوائية محمية على
            السيرفرات، ولا توجد أي أداة تضمن الربح المؤكد؛ يرجى التعامل بمسؤولية وتجنب
            المخاطر المالية غير المحسوبة.
          </p>
        </div>
      </section>

      {/* Section 4: Interactive FAQ Accordion */}
      <section id="faq-section" className="space-y-6 scroll-mt-24">
        <div className="mx-auto max-w-2xl text-center space-y-1.5">
          <p className="text-xs font-semibold text-sky-400">الأسئلة الشائعة</p>
          <h2 className="text-2xl font-extrabold text-white">
            أسئلة متكررة حول أداة سكربت التفاحة وفحص ID
          </h2>
        </div>

        <div className="mx-auto max-w-4xl divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-[#111827] overflow-hidden">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => handleToggleFaq(item.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right text-sm sm:text-base font-bold text-white transition-colors hover:bg-slate-800/50 cursor-pointer focus-visible:outline-none focus-visible:bg-slate-800/70"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-sky-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    id={`faq-panel-${item.id}`}
                    className="bg-[#0b1120]/50 px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed"
                  >
                    {item.answer}{' '}
                    {item.highlightCode && (
                      <strong className="font-mono text-amber-300" dir="ltr">
                        {item.highlightCode}
                      </strong>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
