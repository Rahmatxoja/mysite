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

  /* --- 4. DOM tayyor bo'lganda ulaymiz --- */
  document.addEventListener('DOMContentLoaded', function () {
    btn = document.getElementById('themeToggle');
    label = document.getElementById('themeLabel');

    if (btn) btn.addEventListener('click', toggle);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', sync);

    pruneMissingImages();
    sync();
  });
})();
