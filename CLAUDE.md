# CLAUDE.md

## Loyiha
Rahmatxo'ja Muhammadxo'jayevning shaxsiy vizitka sayti — bir sahifali.
U grafik dizayner va taqdimot dizayni bo'yicha mutaxassis; sayt mijozlarni
jalb qilish uchun. Butun sayt o'zbekcha, muloqot ham o'zbekcha.

## Tuzilma
```
index.html      faqat tuzilma (inline style/script yozilmaydi)
css/style.css   barcha uslublar
js/main.js      mavzu almashtirish + yo'q rasmlarni olib tashlash
assets/         rasmlar
```
`js/main.js` `<head>`da defer'siz turadi — mavzu sahifa chizilishidan
oldin qo'llanmasa, ochilishda miltillash bo'ladi. Buni o'zgartirma.

## Uslub
- Ranglar faqat `:root` dagi tokenlar orqali. To'g'ridan-to'g'ri hex yozma.
- `--blue` — to'ldirilgan yuzalar uchun; `--blue-ink` — ko'k matn uchun.
  Ularni almashtirib yuborma, kontrast buziladi.
- Har qanday matn kontrasti kamida **4.5:1** — o'zgartirgandan keyin o'lchab ko'r.
- Yorug' va qorong'i mavzu ikkalasi ham majburiy, uchala holatda:
  `:root`, `prefers-color-scheme: dark`, `[data-theme="dark"]`.
- Ohang: qisqa, aniq, maqtanchoqsiz. Raqamlar to'qib chiqarilmaydi.
- Oddiylik: yangi bo'lim qo'shishdan oldin mavjudini soddalashtirish mumkinmi — o'yla.

## Texnik chegaralar
- Statik sayt: build bosqichi yo'q, npm yo'q, framework yo'q.
- Tashqi CDN, shrift yoki skript ulanmaydi — hammasi loyiha ichida.
- Toza CSS va vanilla JS. Kutubxona qo'shish uchun avval ruxsat so'ra.
- Shrift: SF Pro Display / Creato Display tizim stacki. Litsenziyasiz
  shrift faylini loyihaga ko'chirma.

## Ish qoidalari
- Qurishdan oldin qisqa reja ko'rsat, keyin boshla.
- Kichik qadamlar bilan ishla; har bir o'zgarishdan keyin brauzerda tekshir
  (yorug' + qorong'i, mobil + desktop kengliklar).
- "Ishladi" deyishdan oldin haqiqatan tekshirgan bo'l.
- Parol, API kalit yoki shaxsiy ma'lumot hech qaysi faylga yozilmaydi.
