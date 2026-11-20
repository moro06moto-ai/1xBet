import {
  AUTHORIZED_URL,
  DEMO_ACCOUNT,
  FAQ_ITEMS,
  OFFICIAL_CHANNEL_NAME,
  OFFICIAL_PROMO_CODE,
  PLAYERS_DB,
  SITE_REGISTRATION_URL,
} from '../data/players';

export type ExportPart = 'embed' | 'article' | 'css' | 'js';

export const DEFAULT_GITHUB_REPO_URL = 'https://github.com/moro06moto-ai/1xBet';
export const DEFAULT_GITHUB_REPO_SLUG = 'moro06moto-ai/1xBet';
export const DEFAULT_GITHUB_BRANCH = 'main';
export const DEFAULT_GITHUB_DATA_FILE = 'players.json';

/**
 * ملف قاعدة البيانات players.json الحقيقي (250 لاعب) للرفع على مستودع GitHub
 */
export function buildRepoPlayersJson(): string {
  return JSON.stringify(
    {
      repo: DEFAULT_GITHUB_REPO_URL,
      promo_code: OFFICIAL_PROMO_CODE,
      channel: OFFICIAL_CHANNEL_NAME,
      updated_at: '2026-11-20',
      players: PLAYERS_DB,
    },
    null,
    2
  );
}

/**
 * كود التضمين الصغير للمواقع الخارجية (يدعم المستودع الخاص عبر GitHub API + Token والمستودع العام بدون Token)
 */
export function buildSearchEmbedOneLineTag(): string {
  const demoJson = JSON.stringify({
    player_name: DEMO_ACCOUNT.player_name,
    account_id: DEMO_ACCOUNT.account_id,
    company: DEMO_ACCOUNT.company,
    promo_code: DEMO_ACCOUNT.promo_code,
    amount: DEMO_ACCOUNT.amount,
    country: DEMO_ACCOUNT.country,
    download_status: DEMO_ACCOUNT.download_status,
    download_url: DEMO_ACCOUNT.download_url,
    verified_at: DEMO_ACCOUNT.verified_at,
    deposit_verified: DEMO_ACCOUNT.deposit_verified,
    announced_on_channel: DEMO_ACCOUNT.announced_on_channel,
  });

  return `<div id="spiderbet-search-widget"></div>
<script>
(function () {
  var cur = document.currentScript;
  var box = document.getElementById("spiderbet-search-widget");
  if (!box) {
    box = document.createElement("div");
    box.id = "spiderbet-search-widget";
    if (cur && cur.parentNode) { cur.parentNode.insertBefore(box, cur); }
    else if (document.body) { document.body.appendChild(box); }
  }
  if (box.getAttribute("data-sb-init") === "1") { return; }
  box.setAttribute("data-sb-init", "1");

  var cfg = {
    repo: "${DEFAULT_GITHUB_REPO_SLUG}",
    branch: "${DEFAULT_GITHUB_BRANCH}",
    file: "${DEFAULT_GITHUB_DATA_FILE}",
    token: "YOUR_GITHUB_TOKEN"
  };

  var PROMO = ${JSON.stringify(OFFICIAL_PROMO_CODE)};
  var CHANNEL = ${JSON.stringify(OFFICIAL_CHANNEL_NAME)};
  var SITE_URL = ${JSON.stringify(SITE_REGISTRATION_URL)};
  var DEFAULT_DL = ${JSON.stringify(AUTHORIZED_URL)};
  var DEMO = ${demoJson};
  var REG_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>';

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function maskName(s) {
    var parts = String(s || "").trim().split(/\\s+/).filter(Boolean);
    if (!parts.length) { return "******"; }
    return parts.map(function (w) { return Array.from(w)[0] + "****"; }).join(" ");
  }

  function copyStr(val, onDone) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(val).then(onDone).catch(function () { onDone(); });
    } else {
      var ta = document.createElement("textarea");
      ta.value = val;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      onDone();
    }
  }

  var root = box.attachShadow ? box.attachShadow({ mode: "open" }) : box;
  root.innerHTML =
    '<style>' +
      '.sb{font-family:Cairo,system-ui,-apple-system,sans-serif;direction:rtl;text-align:right;background:#111827;color:#f1f5f9;border:1px solid #1e293b;border-radius:16px;padding:22px 18px;max-width:820px;margin:16px auto;box-sizing:border-box;line-height:1.7}' +
      '.sb *{box-sizing:border-box}.sbm{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}' +
      '.sbh{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;padding-bottom:14px;margin-bottom:14px;border-bottom:1px solid #1e293b}' +
      '.sbh h3{margin:0;font-size:18px;font-weight:800;color:#fff}.sbh p{margin:3px 0 0;font-size:13px;color:#94a3b8}' +
      '.sbp{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border-radius:8px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.1);color:#fcd34d;font:700 12px inherit;cursor:pointer}' +
      '.sbd{background:#0b1120;border:1px solid rgba(14,165,233,.35);border-radius:12px;padding:14px;margin-bottom:14px}' +
      '.sbd-t{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #1e293b}' +
      '.sbd-h{margin:0;font-size:13.5px;font-weight:800;color:#fff}.sbd-p{margin:3px 0 0;font-size:12px;color:#94a3b8}' +
      '.sbd-a{display:flex;flex-wrap:wrap;gap:6px}.sbd-try{padding:7px 13px;border:none;border-radius:8px;background:#059669;color:#fff;font:700 12px inherit;cursor:pointer}' +
      '.sbd-try:hover{background:#10b981}.sbd-cp{padding:7px 11px;border:1px solid #334155;border-radius:8px;background:#111827;color:#cbd5e1;font:600 12px inherit;cursor:pointer}' +
      '.sbd-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(115px,1fr));gap:8px}' +
      '.sbd-c{background:#111827;border:1px solid #1e293b;border-radius:8px;padding:7px 9px}' +
      '.sbd-k{display:block;font-size:10.5px;color:#94a3b8}.sbd-v{display:block;margin-top:2px;font-size:12px;font-weight:700;color:#f8fafc}' +
      '.sbf{display:flex;flex-wrap:wrap;gap:10px}.sbs,.sbi{height:46px;border-radius:10px;border:1px solid #334155;background:#0b1120;color:#fff;font:600 14px inherit;outline:none}' +
      '.sbs{min-width:125px;padding:0 12px;cursor:pointer}.sbi{flex:1 1 220px;padding:0 14px}.sbi:focus,.sbs:focus{border-color:#0ea5e9}' +
      '.sbb{height:46px;padding:0 22px;border:none;border-radius:10px;background:#0284c7;color:#fff;font:700 14px inherit;cursor:pointer}.sbb:hover{background:#0ea5e9}' +
      '.sbe{margin-top:10px;padding:10px 14px;border-radius:10px;background:rgba(244,63,94,.12);border:1px solid rgba(244,63,94,.35);color:#fda4af;font-size:13px;display:none}' +
      '.sbr{margin-top:16px}.sbg{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}' +
      '.sbc{background:#0b1120;border:1px solid #1e293b;border-radius:12px;padding:16px}' +
      '.sbct{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;padding-bottom:10px;border-bottom:1px solid #1e293b}' +
      '.sbct h4{margin:0;font-size:15px;color:#fff}.sbid{font-size:12px;color:#38bdf8;margin-top:4px;display:flex;align-items:center;gap:6px}' +
      '.sbmc{padding:2px 7px;border-radius:6px;border:1px solid #1e293b;background:#111827;color:#94a3b8;font:600 11px inherit;cursor:pointer}' +
      '.sbl{list-style:none;margin:10px 0 0;padding:0;font-size:12.5px}.sbl li{display:flex;justify-content:space-between;gap:8px;padding:6px 0;border-bottom:1px solid rgba(30,41,59,.65);color:#94a3b8}' +
      '.sbl li:last-child{border-bottom:none}.sbl strong{color:#f1f5f9}.ok{color:#34d399!important}.amb{color:#fcd34d!important}' +
      '.sbdl{display:block;margin-top:12px;padding:10px 14px;border-radius:10px;background:#059669;color:#fff;text-align:center;text-decoration:none;font:700 13px inherit}' +
      '.sblk{margin-top:12px;padding:9px;border-radius:10px;background:#111827;border:1px solid #1e293b;color:#94a3b8;font-size:12px;text-align:center}' +
      '.sbem{background:#0b1120;border:1px solid #1e293b;border-radius:12px;padding:18px}.sbem h4{margin:0 0 6px;font-size:15px;color:#fff}.sbem p{margin:0 0 12px;font-size:13px;color:#94a3b8}' +
      '.sbrq{background:#111827;border:1px solid #1e293b;border-radius:10px;padding:14px}.sbrq-t{font-size:13px;font-weight:700;color:#fcd34d;margin-bottom:8px}' +
      '.sbrq ol{margin:0;padding:0 18px 0 0;font-size:12.5px;color:#cbd5e1;line-height:1.9}' +
      '.sbrg{margin-top:14px;padding-top:12px;border-top:1px solid #1e293b;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px}' +
      '.sbrgb{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 18px;border-radius:10px;background:#059669;color:#fff;text-decoration:none;font:700 13px inherit}' +
      '.sbrgb:hover{background:#10b981}' +
      '@media(max-width:560px){.sbs,.sbb,.sbrgb{width:100%}}' +
    '</style>' +
    '<div class="sb">' +
      '<div class="sbh">' +
        '<div><h3>فحص رقم الحساب الخاص ID — سكربت التفاحة</h3><p>تحقق من أهليتك للتحميل المجاني على منصتي 1xBet وLinebet</p></div>' +
        '<button type="button" class="sbp" data-copy-promo="1">البروموكود: <span class="sbm" dir="ltr">' + esc(PROMO) + '</span></button>' +
      '</div>' +
      '<div class="sbd">' +
        '<div class="sbd-t">' +
          '<div><p class="sbd-h">حساب تجريبي للتجربة الفورية: <span class="sbm" dir="ltr" style="color:#38bdf8">' + esc(DEMO.account_id) + '</span></p><p class="sbd-p">اكتب الرقم <strong class="sbm" dir="ltr" style="color:#7dd3fc">' + esc(DEMO.account_id) + '</strong> في خانة البحث أو اضغط «جرّب هذا الحساب» لمشاهدة النتيجة بالتفصيل.</p></div>' +
          '<div class="sbd-a"><button type="button" class="sbd-try" data-try-demo="1">▶ جرّب هذا الحساب</button><button type="button" class="sbd-cp" data-copy-demo="1">نسخ الرقم</button></div>' +
        '</div>' +
        '<div class="sbd-g">' +
          '<div class="sbd-c"><span class="sbd-k">اسم اللاعب</span><span class="sbd-v">' + esc(maskName(DEMO.player_name)) + '</span></div>' +
          '<div class="sbd-c"><span class="sbd-k">رقم الحساب ID</span><span class="sbd-v sbm" dir="ltr" style="color:#38bdf8">' + esc(DEMO.account_id) + '</span></div>' +
          '<div class="sbd-c"><span class="sbd-k">المنصة والدولة</span><span class="sbd-v">' + esc(DEMO.company) + ' · ' + esc(DEMO.country) + '</span></div>' +
          '<div class="sbd-c"><span class="sbd-k">البروموكود</span><span class="sbd-v sbm amb" dir="ltr">' + esc(DEMO.promo_code) + '</span></div>' +
          '<div class="sbd-c"><span class="sbd-k">قيمة الإيداع</span><span class="sbd-v sbm" dir="ltr">' + esc(DEMO.amount) + '</span></div>' +
          '<div class="sbd-c"><span class="sbd-k">الحالة</span><span class="sbd-v ok">' + esc(DEMO.download_status) + '</span></div>' +
        '</div>' +
      '</div>' +
      '<form class="sbf" novalidate>' +
        '<select class="sbs" aria-label="اختر المنصة"><option value="1xBet">1xBet</option><option value="Linebet">Linebet</option></select>' +
        '<input class="sbi sbm" type="text" placeholder="أدخل رقم الحساب الخاص ID (مثل ' + esc(DEMO.account_id) + ')" aria-label="رقم الحساب الخاص ID" />' +
        '<button class="sbb" type="submit">فحص الحساب</button>' +
      '</form>' +
      '<div class="sbe" role="alert"></div>' +
      '<div class="sbr" aria-live="polite"></div>' +
    '</div>';

  var form = root.querySelector(".sbf");
  var sel = root.querySelector(".sbs");
  var inp = root.querySelector(".sbi");
  var err = root.querySelector(".sbe");
  var res = root.querySelector(".sbr");
  var cachedList = null;

  function parseGitHubJson(txt) {
    if (!txt) { return []; }
    var parsed = JSON.parse(txt);
    if (parsed && parsed.content && parsed.encoding === "base64") {
      var bin = atob(parsed.content.replace(/\\s/g, ""));
      var bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) { bytes[i] = bin.charCodeAt(i); }
      parsed = JSON.parse(new TextDecoder("utf-8").decode(bytes));
    }
    if (Array.isArray(parsed)) { return parsed; }
    if (parsed && Array.isArray(parsed.players)) { return parsed.players; }
    return [];
  }

  function loadPlayers() {
    if (cachedList) { return Promise.resolve(cachedList); }
    var hasToken = cfg.token && cfg.token !== "YOUR_GITHUB_TOKEN";
    var url = hasToken
      ? "https://api.github.com/repos/" + cfg.repo + "/contents/" + cfg.file + "?ref=" + cfg.branch
      : "https://raw.githubusercontent.com/" + cfg.repo + "/" + cfg.branch + "/" + cfg.file;
    var headers = hasToken
      ? { "Accept": "application/vnd.github.raw+json", "Authorization": "Bearer " + cfg.token }
      : {};
    return fetch(url, { headers: headers })
      .then(function (r) { if (!r.ok) { return ""; } return r.text(); })
      .then(function (txt) {
        var list = txt ? parseGitHubJson(txt) : [];
        var hasDemo = list.some(function (p) { return String(p.account_id) === DEMO.account_id; });
        if (!hasDemo) { list = list.concat([DEMO]); }
        cachedList = list;
        return list;
      })
      .catch(function () { return [DEMO]; });
  }

  root.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.closest) { return; }
    var cpPromo = t.closest("[data-copy-promo]");
    if (cpPromo) {
      var old = cpPromo.innerHTML;
      copyStr(PROMO, function () {
        cpPromo.textContent = "تم نسخ الكود: " + PROMO + " ✓";
        setTimeout(function () { cpPromo.innerHTML = old; }, 1600);
      });
      return;
    }
    var cpDemo = t.closest("[data-copy-demo]");
    if (cpDemo) {
      var oldD = cpDemo.textContent;
      copyStr(DEMO.account_id, function () {
        cpDemo.textContent = "تم النسخ ✓";
        setTimeout(function () { cpDemo.textContent = oldD; }, 1500);
      });
      return;
    }
    var tryBtn = t.closest("[data-try-demo]");
    if (tryBtn) {
      sel.value = DEMO.company;
      inp.value = DEMO.account_id;
      runSearch();
      return;
    }
    var cpId = t.closest("[data-copy-id]");
    if (cpId) {
      var idVal = cpId.getAttribute("data-copy-id") || "";
      copyStr(idVal, function () {
        cpId.textContent = "تم ✓";
        setTimeout(function () { cpId.textContent = "نسخ"; }, 1400);
      });
    }
  });

  function runSearch() {
    var q = inp.value.trim();
    var platform = sel.value;
    if (!q) {
      err.textContent = "يرجى إدخال رقم الحساب الخاص ID للبدء بالفحص.";
      err.style.display = "block";
      return;
    }
    err.style.display = "none";
    res.innerHTML = '<div style="font-size:13px;color:#94a3b8;padding:10px 0">جارٍ فحص رقم الحساب...</div>';

    loadPlayers().then(function (list) {
      var nq = q.toLowerCase();
      var matches = list.filter(function (p) {
        if ((p.company || "1xBet") !== platform) { return false; }
        return (
          String(p.account_id || "").indexOf(q) !== -1 ||
          String(p.promo_code || "").toLowerCase().indexOf(nq) !== -1 ||
          String(p.country || "").indexOf(q) !== -1
        );
      });

      if (matches.length === 0) {
        res.innerHTML =
          '<div class="sbem">' +
            '<h4>الحساب غير مسجل حاليًا على منصة ' + esc(platform) + '</h4>' +
            '<p>لم يتم العثور على هذا الحساب ضمن قائمة الأعضاء المؤهلين، لاستكمال التسجيل وتحميل السكربت مجانًا يرجى استيفاء متطلبات التحميل التالية:</p>' +
            '<div class="sbrq">' +
              '<div class="sbrq-t">متطلبات التحميل المجاني:</div>' +
              '<ol>' +
                '<li>إنشاء حساب جديد عبر بروموكود <strong class="sbm amb" dir="ltr">' + esc(PROMO) + '</strong>.</li>' +
                '<li>إتمام الإيداع على الحساب وتوثيقه بالكامل.</li>' +
                '<li>الإعلان عن رقم الحساب على <strong>' + esc(CHANNEL) + '</strong>.</li>' +
              '</ol>' +
            '</div>' +
            '<div class="sbrg">' +
              '<a class="sbrgb" href="' + esc(SITE_URL) + '" target="_blank" rel="noopener noreferrer">' + REG_ICON + '<span>التسجيل والاشتراك عبر الموقع</span></a>' +
              '<button type="button" class="sbp" data-copy-promo="1">نسخ البروموكود: <span class="sbm" dir="ltr">' + esc(PROMO) + '</span></button>' +
            '</div>' +
          '</div>';
        return;
      }

      var cards = matches.map(function (p) {
        var st = p.download_status || "";
        var ready = st === "مكتمل";
        var dlUrl = p.download_url || DEFAULT_DL;
        var verified = p.deposit_verified !== undefined ? p.deposit_verified : (ready || st === "جارٍ التحميل");
        var announced = p.announced_on_channel !== undefined ? p.announced_on_channel : ready;
        return (
          '<div class="sbc">' +
            '<div class="sbct">' +
              '<div><h4>' + esc(maskName(p.player_name)) + '</h4><div class="sbid"><span class="sbm" dir="ltr">' + esc(p.account_id) + '</span><button type="button" class="sbmc" data-copy-id="' + esc(p.account_id) + '">نسخ</button></div></div>' +
              '<span class="' + (ready ? "ok" : "amb") + '" style="font-size:12px;font-weight:700">' + esc(st) + '</span>' +
            '</div>' +
            '<ul class="sbl">' +
              '<li><span>المنصة والدولة</span><strong>' + esc(p.company || platform) + ' · ' + esc(p.country || "—") + '</strong></li>' +
              '<li><span>البروموكود</span><strong class="sbm amb" dir="ltr">' + esc(p.promo_code) + '</strong></li>' +
              (p.amount ? '<li><span>قيمة الإيداع</span><strong class="sbm" dir="ltr">' + esc(p.amount) + '</strong></li>' : '') +
              '<li><span>الإيداع والتوثيق</span><strong class="' + (verified ? "ok" : "") + '">' + (verified ? "تم الإيداع والتوثيق" : "بانتظار الإيداع") + '</strong></li>' +
              '<li><span>الإعلان (' + esc(CHANNEL) + ')</span><strong class="' + (announced ? "ok" : "") + '">' + (announced ? "تم الإعلان" : "لم يُعلن بعد") + '</strong></li>' +
              (p.verified_at ? '<li><span>تاريخ التحقق</span><strong class="sbm" dir="ltr">' + esc(p.verified_at) + '</strong></li>' : '') +
            '</ul>' +
            (ready
              ? '<a class="sbdl" href="' + esc(dlUrl) + '" target="_blank" rel="noopener noreferrer">تحميل سكربت التفاحة مجانًا</a>'
              : '<div class="sblk">التحميل غير متاح قبل استيفاء متطلبات التحميل</div>') +
          '</div>'
        );
      }).join("");

      res.innerHTML =
        '<div class="sbg">' + cards + '</div>' +
        '<div class="sbrg">' +
          '<span style="font-size:12px;color:#94a3b8">متطلبات التحميل: بروموكود <strong class="sbm amb" dir="ltr">' + esc(PROMO) + '</strong> · الإيداع والتوثيق · الإعلان على ' + esc(CHANNEL) + '</span>' +
          '<a class="sbrgb" href="' + esc(SITE_URL) + '" target="_blank" rel="noopener noreferrer">' + REG_ICON + '<span>التسجيل عبر الموقع</span></a>' +
        '</div>';
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    runSearch();
  });
})();
</script>`;
}

/**
 * تحويل سجل اللاعبين الحقيقي إلى صيغة مضغوطة للسكربتات المصدّرة (250 لاعب)
 */
function serializeCompactPlayersTuples(): string {
  const tuples = PLAYERS_DB.map((p) => [
    p.player_name,
    p.account_id,
    p.company,
    p.promo_code,
    p.country,
    p.download_status,
    p.amount,
    p.download_url === AUTHORIZED_URL ? 1 : p.download_url || 0,
    p.verified_at || '2026-11-20',
  ]);
  return JSON.stringify(tuples);
}

/**
 * 0. سكربت تضمين محرك البحث فقط (Standalone Self-Contained Widget — Pure JS)
 * يعمل على أي موقع بعيد بمجرد لصق السكربت فقط بدون الحاجة لأي HTML أو CSS إضافي.
 */
export function buildSearchEmbedJsOnly(): string {
  const compactData = serializeCompactPlayersTuples();
  return `/*!
 * سكربت تضمين محرك بحث سكربت التفاحة 1xBet وLinebet — العنكبوت للمعلومات
 * طريقة الاستخدام المباشر: الصق السكربت في أي مكان بالموقع وسيظهر محرك البحث تلقائياً.
 * أو ضع <div id="spiderbet-search-widget"></div> لتحديد مكان الظهور يدوياً.
 */
(function () {
  'use strict';

  var PROMO = ${JSON.stringify(OFFICIAL_PROMO_CODE)};
  var CHANNEL = ${JSON.stringify(OFFICIAL_CHANNEL_NAME)};
  var DOWNLOAD_URL = ${JSON.stringify(AUTHORIZED_URL)};
  var SITE_URL = ${JSON.stringify(SITE_REGISTRATION_URL)};
  var DEMO_ACC = ${JSON.stringify({
    player_name: DEMO_ACCOUNT.player_name,
    account_id: DEMO_ACCOUNT.account_id,
    company: DEMO_ACCOUNT.company,
    promo_code: DEMO_ACCOUNT.promo_code,
    amount: DEMO_ACCOUNT.amount,
    country: DEMO_ACCOUNT.country,
    download_status: DEMO_ACCOUNT.download_status,
  })};
  var REG_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>';

  /* قاعدة بيانات اللاعبين الحقيقية (${PLAYERS_DB.length} سجل — أسماء مشفرة) */
  var RAW_ROWS = ${compactData};
  var ACCOUNTS_DB = RAW_ROWS.map(function (r) {
    var st = r[5];
    var done = st === 'مكتمل';
    return {
      player_name: r[0],
      account_id: r[1],
      company: r[2],
      promo_code: r[3],
      country: r[4],
      download_status: st,
      amount: r[6],
      deposit_verified: done || st === 'جارٍ التحميل',
      announced_on_channel: done,
      download_url: r[7] === 1 ? DOWNLOAD_URL : (r[7] || ''),
      verified_at: r[8] || '2026-11-20'
    };
  });

  /* مزامنة صامتة اختيارية مع players.json على GitHub عند استخدام كود التحميل الصغير */
  (function syncRemoteIfConfigured() {
    var cfg = window.__SPIDERBET_CONFIG__;
    if (!cfg || !cfg.repo || !cfg.file) return;
    var branch = cfg.branch || 'main';
    var hasToken = cfg.token && cfg.token !== 'YOUR_GITHUB_TOKEN';
    var url = hasToken
      ? 'https://api.github.com/repos/' + cfg.repo + '/contents/' + cfg.file + '?ref=' + branch
      : 'https://raw.githubusercontent.com/' + cfg.repo + '/' + branch + '/' + cfg.file;
    var headers = hasToken
      ? { Accept: 'application/vnd.github.raw+json', Authorization: 'Bearer ' + cfg.token }
      : {};
    fetch(url, { headers: headers })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        var list = Array.isArray(data) ? data : (data && Array.isArray(data.players) ? data.players : null);
        if (!list || !list.length) return;
        ACCOUNTS_DB = list.map(function (p) {
          var st = p.download_status || '';
          var done = st === 'مكتمل';
          return {
            player_name: maskName(p.player_name),
            account_id: String(p.account_id || ''),
            company: p.company === 'Linebet' ? 'Linebet' : '1xBet',
            promo_code: String(p.promo_code || PROMO),
            country: String(p.country || '—'),
            download_status: st,
            amount: String(p.amount || '—'),
            deposit_verified: p.deposit_verified !== undefined ? Boolean(p.deposit_verified) : (done || st === 'جارٍ التحميل'),
            announced_on_channel: p.announced_on_channel !== undefined ? Boolean(p.announced_on_channel) : done,
            download_url: p.download_url || '',
            verified_at: String(p.verified_at || '2026-11-20')
          };
        });
      })
      .catch(function () { /* الاعتماد بصمت على البيانات المدمجة بدون أي خطأ للزائر */ });
  })();

  function searchAccount(accountId, platform) {
    var query = String(accountId || '').trim();
    var targetPlatform = platform === 'Linebet' ? 'Linebet' : '1xBet';
    if (!query) return [];
    var normalized = query.toLowerCase();
    return ACCOUNTS_DB.filter(function (acc) {
      if (acc.company !== targetPlatform) return false;
      return (
        acc.account_id.indexOf(query) !== -1 ||
        acc.promo_code.toLowerCase().indexOf(normalized) !== -1 ||
        acc.player_name.toLowerCase().indexOf(normalized) !== -1 ||
        acc.country.indexOf(query) !== -1
      );
    });
  }

  window.searchAccount = searchAccount;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function maskName(str) {
    var parts = String(str || '').trim().split(/\\s+/).filter(Boolean);
    if (!parts.length) return '******';
    return parts.map(function (w) {
      return Array.from(w)[0] + '****';
    }).join(' ');
  }

  function copyText(text, onDone) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onDone).catch(function () {
        fallbackCopy(text, onDone);
      });
    } else {
      fallbackCopy(text, onDone);
    }
  }

  function fallbackCopy(text, onDone) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    if (onDone) onDone();
  }

  function ensureFontLoaded() {
    if (document.getElementById('sbw-cairo-font')) return;
    var link = document.createElement('link');
    link.id = 'sbw-cairo-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap';
    if (document.head) document.head.appendChild(link);
  }

  var WIDGET_CSS = [
    ':host, .spiderbet-search-embed-host, #spiderbet-search-widget { display: block; width: 100%; max-width: 820px; margin: 18px auto; }',
    '.sbw-wrap { font-family: "Cairo", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; direction: rtl; text-align: right; background: #111827; color: #f1f5f9; border: 1px solid #1e293b; border-radius: 16px; padding: 24px 20px; box-sizing: border-box; line-height: 1.7; }',
    '.sbw-wrap *, .sbw-wrap *::before, .sbw-wrap *::after { box-sizing: border-box; }',
    '.sbw-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid #1e293b; }',
    '.sbw-title { margin: 0; font-size: 19px; font-weight: 800; color: #ffffff; line-height: 1.35; }',
    '.sbw-sub { margin: 4px 0 0; font-size: 13px; color: #94a3b8; }',
    '.sbw-promo-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(245,158,11,0.4); background: rgba(245,158,11,0.1); color: #fcd34d; font-family: inherit; font-size: 12px; font-weight: 700; cursor: pointer; transition: background 0.15s; }',
    '.sbw-promo-btn:hover { background: rgba(245,158,11,0.2); }',
    '.sbw-demo { background: #0b1120; border: 1px solid rgba(14,165,233,0.35); border-radius: 12px; padding: 14px; margin-bottom: 14px; }',
    '.sbw-demo-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px solid #1e293b; }',
    '.sbw-demo-title { margin: 0; font-size: 13.5px; font-weight: 800; color: #ffffff; }',
    '.sbw-demo-id { color: #38bdf8; margin-right: 6px; }',
    '.sbw-demo-hint { margin: 3px 0 0; font-size: 12px; color: #94a3b8; }',
    '.sbw-demo-actions { display: flex; flex-wrap: wrap; gap: 6px; }',
    '.sbw-demo-try { padding: 7px 13px; border: none; border-radius: 8px; background: #059669; color: #ffffff; font-family: inherit; font-size: 12px; font-weight: 700; cursor: pointer; }',
    '.sbw-demo-try:hover { background: #10b981; }',
    '.sbw-demo-copy { padding: 7px 11px; border: 1px solid #334155; border-radius: 8px; background: #111827; color: #cbd5e1; font-family: inherit; font-size: 12px; font-weight: 600; cursor: pointer; }',
    '.sbw-demo-copy:hover { border-color: #64748b; color: #ffffff; }',
    '.sbw-demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(115px, 1fr)); gap: 8px; }',
    '.sbw-demo-cell { background: #111827; border: 1px solid #1e293b; border-radius: 8px; padding: 7px 9px; }',
    '.sbw-demo-k { display: block; font-size: 10.5px; color: #94a3b8; }',
    '.sbw-demo-v { display: block; margin-top: 2px; font-size: 12px; font-weight: 700; color: #f8fafc; }',
    '.sbw-mono { font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, monospace; }',
    '.sbw-form { display: flex; flex-wrap: wrap; gap: 10px; align-items: stretch; }',
    '.sbw-select, .sbw-input { height: 46px; border-radius: 10px; border: 1px solid #334155; background: #0b1120; color: #ffffff; font-family: inherit; font-size: 14px; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }',
    '.sbw-select { min-width: 132px; padding: 0 12px; font-weight: 700; cursor: pointer; }',
    '.sbw-input-box { position: relative; flex: 1 1 240px; display: flex; }',
    '.sbw-input { width: 100%; padding: 0 14px 0 36px; font-family: "IBM Plex Mono", ui-monospace, monospace; }',
    '.sbw-input::placeholder { font-family: "Cairo", system-ui, sans-serif; color: #64748b; }',
    '.sbw-select:focus, .sbw-input:focus { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14,165,233,0.22); }',
    '.sbw-clear-x { position: absolute; left: 8px; top: 50%; transform: translateY(-50%); width: 26px; height: 26px; border: none; border-radius: 6px; background: transparent; color: #94a3b8; font-size: 16px; line-height: 1; cursor: pointer; display: none; align-items: center; justify-content: center; }',
    '.sbw-clear-x.is-visible { display: inline-flex; }',
    '.sbw-clear-x:hover { background: #1e293b; color: #ffffff; }',
    '.sbw-submit { height: 46px; padding: 0 24px; border: none; border-radius: 10px; background: #0284c7; color: #ffffff; font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: background 0.15s; }',
    '.sbw-submit:hover { background: #0ea5e9; }',
    '.sbw-error { margin-top: 12px; padding: 10px 14px; border-radius: 10px; border: 1px solid rgba(244,63,94,0.4); background: rgba(244,63,94,0.1); color: #fda4af; font-size: 13px; font-weight: 600; display: none; }',
    '.sbw-error.is-visible { display: block; }',
    '.sbw-results { margin-top: 18px; }',
    '.sbw-res-bar { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #1e293b; font-size: 13px; color: #cbd5e1; }',
    '.sbw-reset-btn { padding: 5px 12px; border-radius: 8px; border: 1px solid #334155; background: #0b1120; color: #cbd5e1; font-family: inherit; font-size: 12px; font-weight: 600; cursor: pointer; }',
    '.sbw-reset-btn:hover { border-color: #64748b; color: #ffffff; }',
    '.sbw-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }',
    '.sbw-card { background: #0b1120; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; }',
    '.sbw-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; padding-bottom: 10px; border-bottom: 1px solid #1e293b; }',
    '.sbw-name { margin: 0; font-size: 15px; font-weight: 700; color: #ffffff; }',
    '.sbw-id-row { margin-top: 4px; display: flex; align-items: center; gap: 6px; font-size: 12px; color: #38bdf8; }',
    '.sbw-mini-copy { padding: 2px 7px; border-radius: 6px; border: 1px solid #1e293b; background: #111827; color: #94a3b8; font-family: inherit; font-size: 11px; cursor: pointer; }',
    '.sbw-mini-copy:hover { color: #ffffff; border-color: #475569; }',
    '.sbw-status { font-size: 12px; font-weight: 700; white-space: nowrap; }',
    '.sbw-st-done { color: #34d399; }',
    '.sbw-st-wait { color: #fbbf24; }',
    '.sbw-st-fail { color: #fb7185; }',
    '.sbw-st-idle { color: #94a3b8; }',
    '.sbw-meta { margin: 10px 0 0; padding: 0; list-style: none; font-size: 12px; }',
    '.sbw-meta li { display: flex; justify-content: space-between; gap: 8px; padding: 6px 0; border-bottom: 1px solid rgba(30,41,59,0.65); color: #94a3b8; }',
    '.sbw-meta li:last-child { border-bottom: none; }',
    '.sbw-meta strong { color: #f1f5f9; font-weight: 600; }',
    '.sbw-ok { color: #34d399 !important; }',
    '.sbw-amber { color: #fcd34d !important; }',
    '.sbw-dl { display: block; margin-top: 12px; padding: 10px 14px; border-radius: 10px; background: #059669; color: #ffffff; text-align: center; text-decoration: none; font-size: 13px; font-weight: 700; transition: background 0.15s; }',
    '.sbw-dl:hover { background: #10b981; }',
    '.sbw-locked { margin-top: 12px; padding: 9px 12px; border-radius: 10px; border: 1px solid #1e293b; background: #111827; color: #64748b; font-size: 12px; font-weight: 600; text-align: center; }',
    '.sbw-empty { padding: 20px 18px; border-radius: 12px; border: 1px solid #1e293b; background: #0b1120; text-align: right; }',
    '.sbw-empty h4 { margin: 0 0 6px; font-size: 15px; font-weight: 800; color: #ffffff; }',
    '.sbw-empty p { margin: 0 0 12px; font-size: 13px; color: #94a3b8; }',
    '.sbw-req-box { background: #111827; border: 1px solid #1e293b; border-radius: 10px; padding: 14px; margin-top: 10px; }',
    '.sbw-req-title { margin: 0 0 8px; font-size: 13px; font-weight: 700; color: #fcd34d; }',
    '.sbw-req-list { margin: 0; padding: 0 18px 0 0; font-size: 12.5px; color: #cbd5e1; line-height: 1.85; }',
    '.sbw-reg-bar { margin-top: 14px; padding-top: 12px; border-top: 1px solid #1e293b; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; }',
    '.sbw-reg-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 18px; border-radius: 10px; background: #059669; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 700; transition: background 0.15s; }',
    '.sbw-reg-btn:hover { background: #10b981; }',
    '.sbw-reg-sub { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 8px; padding: 8px 12px; border-radius: 9px; border: 1px solid rgba(14,165,233,0.4); background: rgba(14,165,233,0.1); color: #7dd3fc; text-decoration: none; font-size: 12px; font-weight: 700; }',
    '.sbw-reg-sub:hover { background: rgba(14,165,233,0.2); color: #ffffff; }',
    '.sbw-foot { margin-top: 14px; padding-top: 10px; border-top: 1px solid #1e293b; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; font-size: 11px; color: #64748b; }',
    '@media (max-width: 560px) { .sbw-wrap { padding: 18px 14px; } .sbw-select, .sbw-submit, .sbw-reg-btn { width: 100%; } }'
  ].join('\\n');

  function getStatusClass(status) {
    if (status === 'مكتمل') return 'sbw-st-done';
    if (status === 'جارٍ التحميل') return 'sbw-st-wait';
    if (status === 'فشل') return 'sbw-st-fail';
    return 'sbw-st-idle';
  }

  function mountWidget(hostEl) {
    if (!hostEl || hostEl.getAttribute('data-sbw-mounted') === '1') return;
    hostEl.setAttribute('data-sbw-mounted', '1');
    ensureFontLoaded();

    var root = hostEl.attachShadow ? hostEl.attachShadow({ mode: 'open' }) : hostEl;
    root.innerHTML =
      '<style>' + WIDGET_CSS + '</style>' +
      '<div class="sbw-wrap" dir="rtl">' +
        '<div class="sbw-head">' +
          '<div>' +
            '<h3 class="sbw-title">فحص رقم الحساب الخاص ID — سكربت التفاحة</h3>' +
            '<p class="sbw-sub">أداة التحقق المجانية لمنصتي <span class="sbw-mono" dir="ltr">1xBet</span> و<span class="sbw-mono" dir="ltr">Linebet</span></p>' +
          '</div>' +
          '<button type="button" class="sbw-promo-btn" data-action="copy-promo">' +
            '<span>البروموكود:</span>' +
            '<span class="sbw-mono" dir="ltr">' + escapeHtml(PROMO) + '</span>' +
          '</button>' +
        '</div>' +
        '<div class="sbw-demo">' +
          '<div class="sbw-demo-top">' +
            '<div>' +
              '<p class="sbw-demo-title">حساب تجريبي للتجربة الفورية:<span class="sbw-mono sbw-demo-id" dir="ltr">' + escapeHtml(DEMO_ACC.account_id) + '</span></p>' +
              '<p class="sbw-demo-hint">اكتب الرقم <strong class="sbw-mono" dir="ltr" style="color:#7dd3fc">' + escapeHtml(DEMO_ACC.account_id) + '</strong> في خانة البحث أو اضغط «جرّب هذا الحساب» لمشاهدة النتيجة بالتفصيل.</p>' +
            '</div>' +
            '<div class="sbw-demo-actions">' +
              '<button type="button" class="sbw-demo-try" data-action="try-demo">▶ جرّب هذا الحساب</button>' +
              '<button type="button" class="sbw-demo-copy" data-action="copy-demo">نسخ الرقم</button>' +
            '</div>' +
          '</div>' +
          '<div class="sbw-demo-grid">' +
            '<div class="sbw-demo-cell"><span class="sbw-demo-k">اسم اللاعب</span><span class="sbw-demo-v">' + escapeHtml(DEMO_ACC.player_name) + '</span></div>' +
            '<div class="sbw-demo-cell"><span class="sbw-demo-k">رقم الحساب ID</span><span class="sbw-demo-v sbw-mono" dir="ltr" style="color:#38bdf8">' + escapeHtml(DEMO_ACC.account_id) + '</span></div>' +
            '<div class="sbw-demo-cell"><span class="sbw-demo-k">المنصة والدولة</span><span class="sbw-demo-v">' + escapeHtml(DEMO_ACC.company) + ' · ' + escapeHtml(DEMO_ACC.country) + '</span></div>' +
            '<div class="sbw-demo-cell"><span class="sbw-demo-k">البروموكود</span><span class="sbw-demo-v sbw-mono sbw-amber" dir="ltr">' + escapeHtml(DEMO_ACC.promo_code) + '</span></div>' +
            '<div class="sbw-demo-cell"><span class="sbw-demo-k">قيمة الإيداع</span><span class="sbw-demo-v sbw-mono" dir="ltr">' + escapeHtml(DEMO_ACC.amount) + '</span></div>' +
            '<div class="sbw-demo-cell"><span class="sbw-demo-k">الحالة</span><span class="sbw-demo-v sbw-ok">' + escapeHtml(DEMO_ACC.download_status) + '</span></div>' +
          '</div>' +
        '</div>' +
        '<form class="sbw-form" novalidate>' +
          '<select class="sbw-select" aria-label="اختر المنصة">' +
            '<option value="1xBet">1xBet</option>' +
            '<option value="Linebet">Linebet</option>' +
          '</select>' +
          '<div class="sbw-input-box">' +
            '<input type="text" class="sbw-input" placeholder="أدخل رقم الحساب الخاص ID (مثل ' + escapeHtml(DEMO_ACC.account_id) + ')" aria-label="رقم الحساب الخاص ID" />' +
            '<button type="button" class="sbw-clear-x" aria-label="مسح">×</button>' +
          '</div>' +
          '<button type="submit" class="sbw-submit">فحص الحساب</button>' +
        '</form>' +
        '<div class="sbw-error" role="alert"></div>' +
        '<div class="sbw-results" aria-live="polite"></div>' +
        '<div class="sbw-foot">' +
          '<span>العنكبوت للمعلومات · فحص أهلية التحميل المجاني</span>' +
          '<span class="sbw-mono" dir="ltr">1xBet · Linebet · ' + escapeHtml(PROMO) + '</span>' +
        '</div>' +
      '</div>';

    var form = root.querySelector('.sbw-form');
    var platformEl = root.querySelector('.sbw-select');
    var inputEl = root.querySelector('.sbw-input');
    var clearBtn = root.querySelector('.sbw-clear-x');
    var errorEl = root.querySelector('.sbw-error');
    var resultsEl = root.querySelector('.sbw-results');
    var promoBtn = root.querySelector('[data-action="copy-promo"]');
    var tryDemoBtn = root.querySelector('[data-action="try-demo"]');
    var copyDemoBtn = root.querySelector('[data-action="copy-demo"]');

    function clearResults() {
      inputEl.value = '';
      clearBtn.classList.remove('is-visible');
      errorEl.textContent = '';
      errorEl.classList.remove('is-visible');
      resultsEl.innerHTML = '';
      inputEl.focus();
    }

    inputEl.addEventListener('input', function () {
      if (inputEl.value.trim().length > 0) {
        clearBtn.classList.add('is-visible');
        errorEl.classList.remove('is-visible');
      } else {
        clearBtn.classList.remove('is-visible');
      }
    });

    clearBtn.addEventListener('click', clearResults);

    promoBtn.addEventListener('click', function () {
      copyText(PROMO, function () {
        var prev = promoBtn.innerHTML;
        promoBtn.textContent = 'تم نسخ الكود: ' + PROMO + ' ✓';
        setTimeout(function () {
          promoBtn.innerHTML = prev;
        }, 1800);
      });
    });

    if (tryDemoBtn) {
      tryDemoBtn.addEventListener('click', function () {
        platformEl.value = DEMO_ACC.company;
        inputEl.value = DEMO_ACC.account_id;
        clearBtn.classList.add('is-visible');
        if (typeof form.requestSubmit === 'function') {
          form.requestSubmit();
        } else {
          form.dispatchEvent(new Event('submit', { cancelable: true }));
        }
      });
    }

    if (copyDemoBtn) {
      copyDemoBtn.addEventListener('click', function () {
        copyText(DEMO_ACC.account_id, function () {
          var prev = copyDemoBtn.textContent;
          copyDemoBtn.textContent = 'تم النسخ ✓';
          setTimeout(function () {
            copyDemoBtn.textContent = prev;
          }, 1600);
        });
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var query = inputEl.value.trim();
      var platform = platformEl.value;

      if (!query) {
        errorEl.textContent = 'يرجى إدخال رقم الحساب الخاص ID للبدء بالفحص.';
        errorEl.classList.add('is-visible');
        return;
      }

      errorEl.classList.remove('is-visible');
      var matches = searchAccount(query, platform);

      if (matches.length === 0) {
        resultsEl.innerHTML =
          '<div class="sbw-res-bar">' +
            '<span>هذا الحساب غير مسجل حاليًا ضمن الأعضاء المؤهلين</span>' +
            '<button type="button" class="sbw-reset-btn" data-action="reset">إعادة الفحص</button>' +
          '</div>' +
          '<div class="sbw-empty">' +
            '<h4>الحساب غير مسجل على منصة ' + escapeHtml(platform) + '</h4>' +
            '<p>تأكد من اختيار المنصة الصحيحة وكتابة رقم الحساب بدون مسافات، ولتحميل سكربت التفاحة مجانًا يجب استيفاء متطلبات التحميل التالية:</p>' +
            '<div class="sbw-req-box">' +
              '<div class="sbw-req-title">متطلبات التحميل المجاني:</div>' +
              '<ol class="sbw-req-list">' +
                '<li>إنشاء حساب جديد باستخدام بروموكود <strong class="sbw-mono sbw-amber" dir="ltr">' + escapeHtml(PROMO) + '</strong>.</li>' +
                '<li>إتمام الإيداع على الحساب وتوثيقه بالكامل.</li>' +
                '<li>الإعلان عن رقم الحساب على <strong>' + escapeHtml(CHANNEL) + '</strong>.</li>' +
              '</ol>' +
            '</div>' +
            '<div class="sbw-reg-bar">' +
              '<a class="sbw-reg-btn" href="' + escapeHtml(SITE_URL) + '" target="_blank" rel="noopener noreferrer">' + REG_ICON + '<span>التسجيل والاشتراك عبر الموقع</span></a>' +
              '<button type="button" class="sbw-promo-btn" data-copy-promo-inline="1">نسخ البروموكود: <span class="sbw-mono" dir="ltr">' + escapeHtml(PROMO) + '</span></button>' +
            '</div>' +
          '</div>';
      } else {
        var cardsHtml = matches.map(function (acc) {
          var isReady = acc.download_status === 'مكتمل' && acc.download_url;
          return (
            '<div class="sbw-card">' +
              '<div>' +
                '<div class="sbw-card-top">' +
                  '<div>' +
                    '<h4 class="sbw-name">' + escapeHtml(maskName(acc.player_name)) + '</h4>' +
                    '<div class="sbw-id-row">' +
                      '<span class="sbw-mono" dir="ltr">' + escapeHtml(acc.account_id) + '</span>' +
                      '<button type="button" class="sbw-mini-copy" data-copy-id="' + escapeHtml(acc.account_id) + '">نسخ</button>' +
                    '</div>' +
                  '</div>' +
                  '<span class="sbw-status ' + getStatusClass(acc.download_status) + '">' + escapeHtml(acc.download_status) + '</span>' +
                '</div>' +
                '<ul class="sbw-meta">' +
                  '<li><span>المنصة والدولة</span><strong><span class="sbw-mono" dir="ltr">' + escapeHtml(acc.company) + '</span> · ' + escapeHtml(acc.country) + '</strong></li>' +
                  '<li><span>البروموكود</span><strong class="sbw-mono sbw-amber" dir="ltr">' + escapeHtml(acc.promo_code) + '</strong></li>' +
                  '<li><span>قيمة الإيداع</span><strong class="sbw-mono" dir="ltr">' + escapeHtml(acc.amount) + '</strong></li>' +
                  '<li><span>الإيداع والتوثيق</span><strong class="' + (acc.deposit_verified ? 'sbw-ok' : '') + '">' + (acc.deposit_verified ? 'تم الإيداع والتوثيق' : 'بانتظار الإيداع') + '</strong></li>' +
                  '<li><span>الإعلان (' + escapeHtml(CHANNEL) + ')</span><strong class="' + (acc.announced_on_channel ? 'sbw-ok' : '') + '">' + (acc.announced_on_channel ? 'تم الإعلان' : 'لم يُعلن بعد') + '</strong></li>' +
                  '<li><span>تاريخ التحقق</span><strong class="sbw-mono" dir="ltr">' + escapeHtml(acc.verified_at || '2026-11-20') + '</strong></li>' +
                '</ul>' +
              '</div>' +
              (isReady
                ? '<a class="sbw-dl" href="' + escapeHtml(acc.download_url) + '" target="_blank" rel="noopener noreferrer">تحميل سكربت التفاحة مجانًا</a>'
                : '<div class="sbw-locked">التحميل غير متاح قبل استيفاء متطلبات التحميل</div><a class="sbw-reg-sub" href="' + escapeHtml(SITE_URL) + '" target="_blank" rel="noopener noreferrer">' + REG_ICON + '<span>التسجيل واستكمال الشروط عبر الموقع</span></a>') +
            '</div>'
          );
        }).join('');

        resultsEl.innerHTML =
          '<div class="sbw-res-bar">' +
            '<span>تم العثور على <strong>' + matches.length + '</strong> حساب مطابق</span>' +
            '<button type="button" class="sbw-reset-btn" data-action="reset">مسح النتائج</button>' +
          '</div>' +
          '<div class="sbw-grid">' + cardsHtml + '</div>' +
          '<div class="sbw-reg-bar">' +
            '<span style="font-size:12px;color:#94a3b8">متطلبات التحميل: بروموكود <strong class="sbw-mono sbw-amber" dir="ltr">' + escapeHtml(PROMO) + '</strong> · الإيداع والتوثيق · الإعلان على ' + escapeHtml(CHANNEL) + '</span>' +
            '<a class="sbw-reg-btn" href="' + escapeHtml(SITE_URL) + '" target="_blank" rel="noopener noreferrer">' + REG_ICON + '<span>التسجيل عبر الموقع</span></a>' +
          '</div>';
      }

      var resetBtn = resultsEl.querySelector('[data-action="reset"]');
      if (resetBtn) resetBtn.addEventListener('click', clearResults);

      var inlinePromoBtn = resultsEl.querySelector('[data-copy-promo-inline]');
      if (inlinePromoBtn) {
        inlinePromoBtn.addEventListener('click', function () {
          copyText(PROMO, function () {
            inlinePromoBtn.textContent = 'تم نسخ الكود: ' + PROMO + ' ✓';
          });
        });
      }

      var copyBtns = resultsEl.querySelectorAll('[data-copy-id]');
      copyBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var idVal = btn.getAttribute('data-copy-id') || '';
          copyText(idVal, function () {
            btn.textContent = 'تم ✓';
            setTimeout(function () {
              btn.textContent = 'نسخ';
            }, 1500);
          });
        });
      });
    });
  }

  /* تحديد موضع التضمين تلقائياً في الموقع البعيد */
  var currentScript = document.currentScript;

  function init() {
    var targetSelector = currentScript && currentScript.getAttribute('data-target');
    if (targetSelector) {
      var customEl = document.querySelector(targetSelector);
      if (customEl) {
        mountWidget(customEl);
        return;
      }
    }

    var presetEl = document.getElementById('spiderbet-search-widget');
    if (presetEl && presetEl.getAttribute('data-sbw-mounted') !== '1') {
      mountWidget(presetEl);
      return;
    }

    var host = document.createElement('div');
    host.className = 'spiderbet-search-embed-host';
    if (currentScript && currentScript.parentNode) {
      currentScript.parentNode.insertBefore(host, currentScript);
    } else if (document.body) {
      document.body.appendChild(host);
    }
    mountWidget(host);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();`;
}

/**
 * 0-ب. كود <script> الجاهز للصق المباشر في أي موقع بعيد (محرك البحث فقط)
 */
export function buildSearchEmbedScriptTag(): string {
  return `<script>\n${buildSearchEmbedJsOnly()}\n</script>`;
}

/**
 * 1. المقال فقط (Pure Semantic HTML — No CSS, No JS)
 */
export function buildArticleHtmlOnly(): string {
  const faqItemsHtml = FAQ_ITEMS.map(
    (item, idx) => `    <div class="sb-faq-item">
      <button type="button" class="sb-faq-q" data-faq-toggle="${item.id}" aria-expanded="${idx === 0 ? 'true' : 'false'}">
        <span>${item.question}</span>
        <span class="sb-faq-arrow" aria-hidden="true">▾</span>
      </button>
      <div class="sb-faq-a${idx === 0 ? ' is-open' : ''}" id="sb-faq-panel-${item.id}">
        <p>${item.answer}${
          item.highlightCode
            ? ` <strong dir="ltr">${item.highlightCode}</strong>`
            : ''
        }</p>
      </div>
    </div>`
  ).join('\n');

  return `<!-- 1) المقال فقط (HTML صافي بدون CSS أو JS) -->
<article id="spiderbet-article" dir="rtl">
  <header class="sb-hero">
    <p class="sb-kicker">موقع العنكبوت للمعلومات · بروموكود <strong dir="ltr">${OFFICIAL_PROMO_CODE}</strong></p>
    <h1>أداة سكربت التفاحة 1xBet وLinebet مجانًا</h1>
    <p class="sb-lead">
      سكربت التفاحة أصبح الآن من أكثر السكربتات المطلوبة عبر الإنترنت، وخصوصًا لمحبي ألعاب الكازينو وتطبيقات المراهنات
      <strong dir="ltr">1xBet</strong> و<strong dir="ltr">Linebet</strong>. تابع معنا للتعرف على كيفية تفعيل سكربت التفاحة مجانًا وبدون شراء للأعضاء المسجلين على بروموكود
      <strong dir="ltr">${OFFICIAL_PROMO_CODE}</strong> فقط.
    </p>
  </header>

  <!-- أداة فحص رقم الحساب الخاص ID -->
  <section class="sb-box" aria-labelledby="sb-checker-title">
    <h2 id="sb-checker-title">فحص رقم الحساب الخاص ID</h2>
    <p>اختر المنصة المسجل عليها ثم أدخل رقم الحساب الخاص بك واضغط على زر البحث للتحقق من أهليتك للتحميل.</p>

    <!-- حساب تجريبي فوق البحث -->
    <div class="sb-demo-box">
      <div class="sb-demo-top">
        <div>
          <strong>حساب تجريبي للتجربة الفورية: <span dir="ltr">${DEMO_ACCOUNT.account_id}</span></strong>
          <p>اكتب الرقم <strong dir="ltr">${DEMO_ACCOUNT.account_id}</strong> في خانة البحث بالأسفل أو اضغط على زر التجربة لمعرفة شكل النتيجة والتفاصيل.</p>
        </div>
        <button type="button" class="sb-btn sb-demo-btn" data-try-demo="${DEMO_ACCOUNT.account_id}" data-try-platform="${DEMO_ACCOUNT.company}">جرّب هذا الحساب</button>
      </div>
      <div class="sb-demo-meta">
        <span>اللاعب: <strong>${DEMO_ACCOUNT.player_name}</strong></span>
        <span>الحساب: <strong dir="ltr">${DEMO_ACCOUNT.account_id}</strong></span>
        <span>المنصة والدولة: <strong>${DEMO_ACCOUNT.company} · ${DEMO_ACCOUNT.country}</strong></span>
        <span>البروموكود: <strong dir="ltr">${DEMO_ACCOUNT.promo_code}</strong></span>
        <span>الإيداع: <strong dir="ltr">${DEMO_ACCOUNT.amount}</strong></span>
        <span>الحالة: <strong>${DEMO_ACCOUNT.download_status}</strong></span>
      </div>
    </div>

    <form id="sbSearchForm" class="sb-form">
      <select id="sbPlatform" class="sb-select" aria-label="اختر المنصة">
        <option value="1xBet">1xBet</option>
        <option value="Linebet">Linebet</option>
      </select>

      <input
        id="sbQuery"
        type="text"
        class="sb-input"
        placeholder="أدخل رقم الحساب الخاص ID (مثل ${DEMO_ACCOUNT.account_id})"
        aria-label="رقم الحساب الخاص ID"
      />

      <button type="submit" class="sb-btn">فحص الحساب</button>
    </form>

    <div id="sbResult" class="sb-result" aria-live="polite"></div>
  </section>

  <!-- ما هي أداة تفعيل سكربت التفاحة؟ -->
  <section class="sb-section">
    <h2>ما هي أداة تفعيل سكربت التفاحة؟</h2>
    <p>
      مرحبًا بك في مقال جديد من مقالات موقع <strong>العنكبوت للمعلومات</strong>، اليوم نتحدث عن أداة تحميل سكربت التفاحة بشكل مجاني.
      سكربت التفاحة تم تطويره وإنشاؤه ليكون مجانيًا للأعضاء المسجلين على بروموكود
      <strong dir="ltr">${OFFICIAL_PROMO_CODE}</strong> فقط.
    </p>
    <p>
      أداة تفعيل سكربت التفاحة هي أداة مجانية تهدف إلى تسهيل عملية فحص الحسابات وتحميل سكريبت التفاحة لمواقع الكازينو
      <strong dir="ltr">1xBet</strong> و<strong dir="ltr">Linebet</strong> للأعضاء المؤهلين.
    </p>
  </section>

  <!-- كيفية استخدام الأداة -->
  <section class="sb-section">
    <h2>كيفية استخدام الأداة؟</h2>
    <ol class="sb-steps">
      <li>إكمال الخانات المطلوبة بمعلومات الحساب المسجل على <span dir="ltr">Linebet</span> أو <span dir="ltr">1xBet</span>.</li>
      <li>إدخال رقم الحساب الخاص <span dir="ltr">ID</span> والضغط على زر البحث الموجود في واجهة الأداة.</li>
      <li>تقوم الأداة بفحص المعلومات والتحقق من استيفاء شروط العضوية.</li>
      <li>بعد انتهاء الفحص وتأكيد الأهلية، يظهر لك رابط التحميل المرتبط بحسابك مباشرة.</li>
    </ol>
  </section>

  <!-- شروط التحميل والاشتراك -->
  <section class="sb-section">
    <h2>شروط تحميل سكربت التفاحة 1xBet وLinebet</h2>
    <ol class="sb-list">
      <li>أن تكون عضوًا مسجلاً على بروموكود <strong dir="ltr">${OFFICIAL_PROMO_CODE}</strong>.</li>
      <li>أن يكون حسابك قد تم الإيداع عليه وتم توثيقه بالكامل.</li>
      <li>أن يكون حسابك قد تم الإعلان عنه على <strong>${OFFICIAL_CHANNEL_NAME}</strong>.</li>
    </ol>

    <h3>كيفية الاشتراك في سكربت التفاحة</h3>
    <p>
      للاشتراك في سكربت التفاحة، احرص على مشاهدة الفيديو التوضيحي بالكامل، مع فتح حساب جديد باستخدام البروموكود
      <strong dir="ltr">${OFFICIAL_PROMO_CODE}</strong> وإجراء إيداع وتوثيق الحساب.
    </p>
    <button type="button" class="sb-copy-btn" data-copy-promo="${OFFICIAL_PROMO_CODE}">
      نسخ البروموكود: ${OFFICIAL_PROMO_CODE}
    </button>

    <div class="sb-notice" role="note">
      <strong>تنويه وإخلاء مسؤولية:</strong>
      جميع المعلومات وأداة الفحص في هذا المقال لأغراض التوضيح والتحقق من سجلات العضوية فقط. تعتمد ألعاب الكازينو على خوارزميات عشوائية على السيرفرات ولا توجد أداة تضمن الربح المؤكد.
    </div>
  </section>

  <!-- الأسئلة الشائعة -->
  <section class="sb-section">
    <h2>الأسئلة الشائعة</h2>
    <div class="sb-faq">
${faqItemsHtml}
    </div>
  </section>
</article>`;
}

/**
 * 2. التصميم لوحده (Pure Scoped CSS — No HTML, No JS)
 */
export function buildArticleCssOnly(): string {
  return `/* 2) التصميم لوحده (CSS مستقل محصور داخل #spiderbet-article) */
#spiderbet-article {
  font-family: 'Cairo', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #0b1120;
  color: #f1f5f9;
  max-width: 920px;
  margin: 0 auto;
  padding: 28px 20px;
  line-height: 1.8;
  direction: rtl;
  text-align: right;
  box-sizing: border-box;
}

#spiderbet-article *,
#spiderbet-article *::before,
#spiderbet-article *::after {
  box-sizing: border-box;
}

#spiderbet-article .sb-hero {
  background: #111827;
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  margin-bottom: 24px;
}

#spiderbet-article .sb-kicker {
  font-size: 13px;
  font-weight: 700;
  color: #38bdf8;
  margin: 0 0 10px;
}

#spiderbet-article .sb-kicker strong {
  color: #fcd34d;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
}

#spiderbet-article h1 {
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 12px;
  line-height: 1.3;
}

#spiderbet-article .sb-lead {
  font-size: 15px;
  color: #cbd5e1;
  max-width: 680px;
  margin: 0 auto;
}

#spiderbet-article .sb-box,
#spiderbet-article .sb-section {
  background: #111827;
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}

#spiderbet-article h2 {
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 12px;
}

#spiderbet-article h3 {
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
  margin: 20px 0 8px;
}

#spiderbet-article p {
  font-size: 14px;
  color: #cbd5e1;
  margin: 0 0 12px;
}

#spiderbet-article .sb-demo-box {
  background: #0b1120;
  border: 1px solid rgba(14, 165, 233, 0.35);
  border-radius: 12px;
  padding: 14px 16px;
  margin-top: 14px;
}

#spiderbet-article .sb-demo-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #1e293b;
}

#spiderbet-article .sb-demo-top p {
  margin: 4px 0 0;
  font-size: 12.5px;
  color: #94a3b8;
}

#spiderbet-article .sb-demo-btn {
  height: auto;
  padding: 8px 16px;
  background: #059669;
  font-size: 12.5px;
}

#spiderbet-article .sb-demo-btn:hover {
  background: #10b981;
}

#spiderbet-article .sb-demo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  font-size: 12.5px;
  color: #cbd5e1;
}

#spiderbet-article .sb-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

#spiderbet-article .sb-select,
#spiderbet-article .sb-input {
  height: 46px;
  border-radius: 10px;
  border: 1px solid #334155;
  background: #0b1120;
  color: #ffffff;
  font-family: inherit;
  font-size: 14px;
  padding: 0 14px;
  outline: none;
}

#spiderbet-article .sb-select {
  min-width: 140px;
  font-weight: 700;
  cursor: pointer;
}

#spiderbet-article .sb-input {
  flex: 1 1 240px;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
}

#spiderbet-article .sb-input::placeholder {
  font-family: 'Cairo', system-ui, sans-serif;
  color: #64748b;
}

#spiderbet-article .sb-select:focus,
#spiderbet-article .sb-input:focus {
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.22);
}

#spiderbet-article .sb-btn {
  height: 46px;
  padding: 0 24px;
  border: none;
  border-radius: 10px;
  background: #0284c7;
  color: #ffffff;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

#spiderbet-article .sb-btn:hover {
  background: #0ea5e9;
}

#spiderbet-article .sb-result {
  margin-top: 18px;
}

#spiderbet-article .sb-result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
}

#spiderbet-article .sb-card {
  background: #0b1120;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 16px;
}

#spiderbet-article .sb-card h4 {
  margin: 0 0 4px;
  font-size: 15px;
  color: #ffffff;
}

#spiderbet-article .sb-card-meta {
  font-size: 13px;
  color: #94a3b8;
  margin: 6px 0;
}

#spiderbet-article .sb-dl-link {
  display: block;
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  background: #059669;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
}

#spiderbet-article .sb-dl-link:hover {
  background: #10b981;
}

#spiderbet-article .sb-locked {
  margin-top: 12px;
  padding: 9px 12px;
  border-radius: 10px;
  border: 1px solid #1e293b;
  background: #111827;
  color: #64748b;
  font-size: 12px;
  text-align: center;
}

#spiderbet-article .sb-steps,
#spiderbet-article .sb-list {
  margin: 0 0 12px;
  padding-right: 20px;
  color: #cbd5e1;
  font-size: 14px;
}

#spiderbet-article .sb-steps li,
#spiderbet-article .sb-list li {
  margin-bottom: 8px;
}

#spiderbet-article .sb-copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 10px;
  border: 1px solid rgba(245, 158, 11, 0.45);
  background: rgba(245, 158, 11, 0.12);
  color: #fcd34d;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

#spiderbet-article .sb-copy-btn:hover {
  background: rgba(245, 158, 11, 0.22);
}

#spiderbet-article .sb-notice {
  margin-top: 18px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(245, 158, 11, 0.35);
  background: rgba(245, 158, 11, 0.08);
  color: #fde68a;
  font-size: 13px;
}

#spiderbet-article .sb-faq {
  border: 1px solid #1e293b;
  border-radius: 12px;
  overflow: hidden;
}

#spiderbet-article .sb-faq-item {
  border-bottom: 1px solid #1e293b;
}

#spiderbet-article .sb-faq-item:last-child {
  border-bottom: none;
}

#spiderbet-article .sb-faq-q {
  width: 100%;
  background: transparent;
  border: none;
  color: #ffffff;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: right;
  cursor: pointer;
}

#spiderbet-article .sb-faq-q:hover {
  background: rgba(30, 41, 59, 0.45);
}

#spiderbet-article .sb-faq-a {
  display: none;
  padding: 0 16px 14px;
  background: rgba(11, 17, 32, 0.55);
}

#spiderbet-article .sb-faq-a.is-open {
  display: block;
}

@media (max-width: 600px) {
  #spiderbet-article {
    padding: 16px 12px;
  }
  #spiderbet-article .sb-select,
  #spiderbet-article .sb-btn {
    width: 100%;
  }
}`;
}

/**
 * 3. السكربت لوحده (Pure JavaScript — No HTML, No CSS)
 */
export function buildArticleJsOnly(): string {
  const compactData = serializeCompactPlayersTuples();
  return `// 3) السكربت لوحده (JavaScript صافي مع دالة البحث searchAccount بدون HTML أو CSS)
(function () {
  const PROMO = ${JSON.stringify(OFFICIAL_PROMO_CODE)};
  const CHANNEL = ${JSON.stringify(OFFICIAL_CHANNEL_NAME)};
  const DOWNLOAD_URL = ${JSON.stringify(AUTHORIZED_URL)};

  // قاعدة بيانات اللاعبين الحقيقية (${PLAYERS_DB.length} سجل)
  const RAW_ROWS = ${compactData};
  const ACCOUNTS_DB = RAW_ROWS.map(function (r) {
    const status = r[5];
    const completed = status === 'مكتمل';
    return {
      player_name: r[0],
      account_id: r[1],
      company: r[2],
      promo_code: r[3],
      country: r[4],
      download_status: status,
      amount: r[6],
      deposit_verified: completed || status === 'جارٍ التحميل',
      announced_on_channel: completed,
      download_url: r[7] === 1 ? DOWNLOAD_URL : (r[7] || '')
    };
  });

  // دالة البحث المستقلة (1xBet أو Linebet فقط)
  function searchAccount(accountId, platform) {
    const query = String(accountId || '').trim();
    const targetPlatform = platform === 'Linebet' ? 'Linebet' : '1xBet';
    if (!query) return [];

    const normalized = query.toLowerCase();
    return ACCOUNTS_DB.filter(function (acc) {
      if (acc.company !== targetPlatform) return false;
      return (
        acc.account_id.includes(query) ||
        acc.promo_code.toLowerCase().includes(normalized) ||
        acc.player_name.toLowerCase().includes(normalized) ||
        acc.country.includes(query)
      );
    });
  }

  // إتاحة الدالة عالمياً للاستدعاء من أي مكان
  window.searchAccount = searchAccount;

  // ربط نموذج البحث إن وُجد في الصفحة
  const form = document.getElementById('sbSearchForm');
  const platformEl = document.getElementById('sbPlatform');
  const queryEl = document.getElementById('sbQuery');
  const resultEl = document.getElementById('sbResult');

  if (form && platformEl && queryEl && resultEl) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const id = queryEl.value.trim();
      const platform = platformEl.value;

      if (!id) {
        resultEl.innerHTML = '<p>يرجى إدخال رقم الحساب الخاص ID للبدء بالفحص.</p>';
        return;
      }

      const matches = searchAccount(id, platform);
      if (matches.length === 0) {
        resultEl.innerHTML =
          '<div class="sb-card">' +
            '<h4>الحساب غير مسجل ضمن الأعضاء المؤهلين حاليًا على منصة ' + platform + '</h4>' +
            '<p class="sb-card-meta"><strong>متطلبات التحميل المجاني:</strong></p>' +
            '<ol class="sb-list">' +
              '<li>التسجيل بحساب جديد عبر بروموكود <strong dir="ltr">' + PROMO + '</strong>.</li>' +
              '<li>إتمام الإيداع وتوثيق الحساب بالكامل.</li>' +
              '<li>الإعلان عن الحساب على <strong>' + CHANNEL + '</strong>.</li>' +
            '</ol>' +
            '<a class="sb-dl-link" href="' + ${JSON.stringify(SITE_REGISTRATION_URL)} + '" target="_blank" rel="noopener noreferrer">التسجيل والاشتراك عبر الموقع</a>' +
          '</div>';
        return;
      }

      resultEl.innerHTML =
        '<div class="sb-result-grid">' +
        matches
          .map(function (acc) {
            const ok = acc.download_status === 'مكتمل' && acc.download_url;
            return (
              '<div class="sb-card">' +
                '<h4>' + acc.player_name + '</h4>' +
                '<p class="sb-card-meta">ID: <span dir="ltr">' + acc.account_id + '</span> · ' + acc.company + ' · ' + acc.country + '</p>' +
                '<p class="sb-card-meta">البروموكود: <strong dir="ltr">' + acc.promo_code + '</strong> · الإيداع: <strong dir="ltr">' + acc.amount + '</strong> · الحالة: ' + acc.download_status + '</p>' +
                '<p class="sb-card-meta">الإيداع والتوثيق: ' + (acc.deposit_verified ? 'تم الإيداع والتوثيق' : 'بانتظار الإيداع') + '</p>' +
                '<p class="sb-card-meta">الإعلان (' + CHANNEL + '): ' + (acc.announced_on_channel ? 'تم الإعلان' : 'لم يُعلن بعد') + '</p>' +
                (ok
                  ? '<a class="sb-dl-link" href="' + acc.download_url + '" target="_blank" rel="noopener noreferrer">تحميل سكربت التفاحة مجانًا</a>'
                  : '<div class="sb-locked">التحميل غير متاح قبل استيفاء الشروط</div>') +
              '</div>'
            );
          })
          .join('') +
        '</div>';
    });

    document.querySelectorAll('[data-try-demo]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const demoId = btn.getAttribute('data-try-demo') || ${JSON.stringify(DEMO_ACCOUNT.account_id)};
        const demoPlatform = btn.getAttribute('data-try-platform') || ${JSON.stringify(DEMO_ACCOUNT.company)};
        platformEl.value = demoPlatform;
        queryEl.value = demoId;
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      });
    });
  }

  // زر نسخ البروموكود
  document.querySelectorAll('[data-copy-promo]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const code = btn.getAttribute('data-copy-promo') || PROMO;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(function () {
          const original = btn.textContent;
          btn.textContent = 'تم نسخ الكود: ' + code;
          setTimeout(function () {
            btn.textContent = original;
          }, 2000);
        });
      }
    });
  });

  // فتح وإغلاق الأسئلة الشائعة
  document.querySelectorAll('[data-faq-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = btn.getAttribute('data-faq-toggle');
      const panel = document.getElementById('sb-faq-panel-' + id);
      if (!panel) return;
      const isOpen = panel.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
})();`;
}

export function getExportBundle(part: ExportPart) {
  switch (part) {
    case 'embed':
      return {
        code: buildSearchEmbedScriptTag(),
        downloadContent: buildSearchEmbedJsOnly(),
        fileName: 'spiderbet-search-embed.js',
        mimeType: 'application/javascript;charset=utf-8',
        label: 'سكربت تضمين محرك البحث فقط',
      };
    case 'article':
      return {
        code: buildArticleHtmlOnly(),
        downloadContent: buildArticleHtmlOnly(),
        fileName: 'apple-script-article.html',
        mimeType: 'text/html;charset=utf-8',
        label: 'المقال فقط (HTML)',
      };
    case 'css':
      return {
        code: buildArticleCssOnly(),
        downloadContent: buildArticleCssOnly(),
        fileName: 'apple-script-styles.css',
        mimeType: 'text/css;charset=utf-8',
        label: 'التصميم لوحده (CSS)',
      };
    case 'js':
      return {
        code: buildArticleJsOnly(),
        downloadContent: buildArticleJsOnly(),
        fileName: 'apple-script-search.js',
        mimeType: 'application/javascript;charset=utf-8',
        label: 'السكربت لوحده (JS)',
      };
  }
}
