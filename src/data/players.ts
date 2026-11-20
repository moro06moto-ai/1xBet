import { RAW_PLAYERS_DATA } from './playersRaw';

export type DownloadStatus = 'مكتمل' | 'جارٍ التحميل' | 'لم يبدأ' | 'فشل';
export type PlatformName = '1xBet' | 'Linebet';

export interface PlayerRecord {
  player_name: string;
  account_id: string;
  company: PlatformName;
  promo_code: string;
  amount: string;
  keyword: string;
  download_status: DownloadStatus;
  deposit_verified: boolean;
  announced_on_channel: boolean;
  country: string;
  download_url: string;
  verified_at: string;
  source: string;
  public: boolean;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  highlightCode?: string;
}

export const OFFICIAL_PROMO_CODE = 'Spiderbet';
export const OFFICIAL_CHANNEL_NAME = 'قناة كازينو العرب';

export const ARABIC_NAMES = [
  'أحمد',
  'محمد',
  'عمر',
  'كريم',
  'يوسف',
  'علي',
  'حسن',
  'زياد',
  'طارق',
  'مصطفى',
  'خالد',
  'محمود',
  'إبراهيم',
  'حمزة',
  'عبدالله',
  'سعد',
  'بلال',
  'ياسين',
  'فارس',
  'أمير',
] as const;

export const ARABIC_COUNTRIES = [
  'مصر',
  'السعودية',
  'الإمارات',
  'المغرب',
  'الجزائر',
  'تونس',
  'الكويت',
  'قطر',
  'الأردن',
  'العراق',
  'لبنان',
  'البحرين',
  'سوريا',
  'فلسطين',
  'ليبيا',
  'عُمان',
  'اليمن',
  'السودان',
  'موريتانيا',
  'جيبوتي',
] as const;

export const DOWNLOAD_STATUSES: readonly DownloadStatus[] = [
  'مكتمل',
  'جارٍ التحميل',
  'لم يبدأ',
  'فشل',
];

export const PLATFORMS: readonly PlatformName[] = ['1xBet', 'Linebet'];

export const KEYWORDS = [
  'سكربت التفاحة 1xbet مجاناً',
  'سكربت التفاحة Linebet مجاناً',
  'أداة تفعيل سكربت التفاحة',
  'فحص رقم الحساب ID بروموكود Spiderbet',
  'تحميل سكربت التفاحة للأعضاء',
  'تفعيل سكربت التفاحة بدون شراء',
] as const;

export const AUTHORIZED_URL =
  'https://www.information-net.com/1xbet-aviator-script-download/#authorized-resources';

export function generatePlayersDataset(): PlayerRecord[] {
  return RAW_PLAYERS_DATA.map((raw) => {
    const isCompleted = raw.download_status === 'مكتمل';
    return {
      ...raw,
      deposit_verified: isCompleted || raw.download_status === 'جارٍ التحميل',
      announced_on_channel: isCompleted,
    };
  });
}

export const PLAYERS_DB: PlayerRecord[] = generatePlayersDataset();

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: '1. ما هي أداة تفعيل سكربت التفاحة 1xBet وLinebet؟',
    answer:
      'هي أداة فحص وتفعيل مجانية يقدمها موقع العنكبوت للمعلومات، وتهدف إلى تسهيل التحقق من أهلية الحسابات وتوجيه الأعضاء المؤهلين إلى رابط تحميل سكربت التفاحة المخصص لمنصتي 1xBet وLinebet بدون شراء.',
  },
  {
    id: 2,
    question: '2. ما هي شروط تحميل سكربت التفاحة مجاناً؟',
    answer:
      'يشترط للاستفادة من السكربت مجاناً تحقيق ثلاثة شروط أساسية: أن تكون عضواً مسجلاً باستخدام بروموكود Spiderbet، وأن يكون قد تم الإيداع على الحساب وتوثيقه بالكامل، وأن يكون حسابك قد تم الإعلان عنه على قناة كازينو العرب.',
  },
  {
    id: 3,
    question: '3. ما هو البروموكود المعتمد للاشتراك في سكربت التفاحة؟',
    answer:
      'السكربت مجاني حصرياً للأعضاء المسجلين على حساب جديد في 1xBet أو Linebet باستخدام البروموكود المعتمد:',
    highlightCode: 'Spiderbet',
  },
  {
    id: 4,
    question: '4. كيف أستخدم أداة فحص رقم الحساب الخاص ID؟',
    answer:
      'اختر المنصة المسجل عليها (1xBet أو Linebet)، ثم أدخل رقم الحساب الخاص بك (Account ID) واضغط على زر البحث. تقوم الأداة بفحص حالة التوثيق والإيداع والإعلان على القناة، وعند استيفاء الشروط يظهر رابط التحميل المباشر.',
  },
  {
    id: 5,
    question: '5. لماذا لا يظهر رابط التحميل رغم ظهور بيانات حسابي؟',
    answer:
      'إذا كانت حالة الحساب «جارٍ التحميل» أو «لم يبدأ» فهذا يعني أن أحد شروط التوثيق (الإيداع أو الإعلان على قناة كازينو العرب) لا يزال قيد المراجعة. فور اكتمال التوثيق تتحول الحالة إلى «مكتمل» ويُفتح زر التحميل تلقائياً.',
  },
  {
    id: 6,
    question: '6. كيف أشترك وأفعّل حسابي للمرة الأولى؟',
    answer:
      'للاشتراك في سكربت التفاحة يُنصح بمشاهدة الفيديو التوضيحي بالكامل، ثم فتح حساب جديد عبر بروموكود Spiderbet وإجراء إيداع وتوثيق الحساب، وبعد الإعلان عنه على قناة كازينو العرب يمكنك فحص رقم ID هنا للحصول على الرابط.',
  },
];
