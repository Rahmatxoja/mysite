/* =========================================================
   Rahmatxo'ja Muhammadxo'jayev — vizitka sayt
   Bu fayl <head> ichida, defer'siz yuklanadi: saqlangan
   mavzu sahifa chizilishidan oldin qo'llanishi kerak,
   aks holda ochilishda oq/qora miltillash bo'ladi.
   ========================================================= */

(function () {
  'use strict';

  var root = document.documentElement;
  var btn = null;
  var label = null;

  /* --- 1. Mavzuni darhol qo'llaymiz (miltillashga qarshi) --- */
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      root.setAttribute('data-theme', saved);
    }
  } catch (e) {
    /* localStorage yopiq bo'lsa (private rejim) — tizim sozlamasi ishlaydi */
  }

  /* --- 2. Amaldagi mavzu --- */
  function current() {
    var set = root.getAttribute('data-theme');
    if (set === 'dark' || set === 'light') return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function sync() {
    if (!btn || !label) return;
    // Tugma matni bosilganda nima bo'lishini ko'rsatadi
    var isDark = current() === 'dark';
    label.textContent = isDark ? 'Yorug\'' : 'Qorong\'i';
    btn.setAttribute('aria-label', isDark ? 'Yorug\' mavzuga o\'tish' : 'Qorong\'i mavzuga o\'tish');
  }

  function toggle() {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
    sync();
  }

  /* --- 3. Yo'q rasmlarni olib tashlaymiz ---
     data-optional belgisi bor rasm yuklanmasa, blokni buzib
     turgandan ko'ra butunlay olib tashlagan ma'qul.
     Rasm DOMContentLoaded'dan oldin ham xato berishi mumkin,
     shuning uchun complete/naturalWidth ni ham tekshiramiz. */
  function pruneMissingImages() {
    var imgs = document.querySelectorAll('img[data-optional]');
    Array.prototype.forEach.call(imgs, function (img) {
      if (img.complete && img.naturalWidth === 0) {
        img.remove();
      } else {
        img.addEventListener('error', function () {
          img.remove();
        });
      }
    });
  }

  /* --- 4. Scroll'da bo'limlarni ko'rsatish ---
     Yashirish CSS'da .js-anim belgisiga bog'langan, belgini esa shu
     yer qo'yadi. Ya'ni JS ishlamasa hech narsa yashirilmaydi —
     sayt animatsiyasiz, lekin to'liq ko'rinadi. */
  function setupScrollReveal() {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var targets = document.querySelectorAll('.panel, .contact');

    if (reduced || !('IntersectionObserver' in window) || !targets.length) return;

    root.classList.add('js-anim');
    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add('on-scroll');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        /* Klasslar joyida qoladi. Ilgari ular animatsiyadan keyin
           olib tashlanardi, lekin o'tish tugamasdan qoida yo'qolsa
           brauzer elementni opacity:0 holatida qotirib qo'yardi —
           ikkita bo'lim butunlay ko'rinmay qolgandi. */
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el) {
      io.observe(el);
    });
  }

  /* --- 5. Yopishgan panel balandligini o'lchab qo'yamiz ---
     CSS'dagi --topbar-h qiymati taxminiy: panel qancha qatorga
     yoyilishi shrift va tilga qarab o'zgaradi. Haqiqiy balandlikni
     o'lchab qo'ysak, bo'limga o'tganda sarlavha panel ostida
     qolmaydi — hech qaysi kenglikni qo'lda sozlash kerak emas. */
  function syncTopbarHeight() {
    var bar = document.querySelector('.topbar');
    if (!bar) return;
    root.style.setProperty('--topbar-h', Math.round(bar.getBoundingClientRect().height) + 'px');
  }

  var resizeTick = false;
  function onResize() {
    if (resizeTick) return;
    resizeTick = true;
    window.requestAnimationFrame(function () {
      resizeTick = false;
      syncTopbarHeight();
    });
  }

  /* --- 6. DOM tayyor bo'lganda ulaymiz --- */
  document.addEventListener('DOMContentLoaded', function () {
    btn = document.getElementById('themeToggle');
    label = document.getElementById('themeLabel');

    if (btn) btn.addEventListener('click', toggle);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', sync);

    pruneMissingImages();
    setupScrollReveal();
    syncTopbarHeight();
    window.addEventListener('resize', onResize);
    sync();
  });
})();
