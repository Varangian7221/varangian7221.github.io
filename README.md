# Сайт-портфолио — Олег Коршунов (Vibe Coder)

Одностраничный сайт-витрина по ТЗ из рабочей тетради (Кейс 5, задание 4).
Статический сайт: чистый HTML + CSS + JavaScript, без сборщиков и зависимостей —
открывается с любого хостинга, весит меньше 1 МБ и грузится меньше 2 секунд.

## Структура страницы (по ТЗ, 8 блоков)

| № | Блок | Якорь |
|---|---|---|
| 1 | Hero — оффер, статус «Открыт для заказов», CTA, цифры, ссылки на кейсы | `#hero` |
| 2 | Что делаю — 4 направления: сайты, боты и Mini App, MVP, CRM | `#services` |
| 3 | Кейсы — 3 реальных проекта со скриншотами и ссылками на живые сайты | `#cases` |
| 4 | Как проходит работа — 5 шагов | `#process` |
| 5 | Цены — 4 пакета + условия оплаты | `#prices` |
| 6 | Почему работают со мной — 4 преимущества + цитата | `#why` |
| 7 | FAQ — 5 вопросов (нативный `<details>`) | `#faq` |
| 8 | CTA / контакты — форма запроса расчёта + почта, Telegram, GitHub | `#contacts` |

## Файлы

```
portfolio-site/
├── index.html          # страница + SEO/OG-мета-теги
├── css/styles.css      # дизайн, тёмная тема, адаптив от 320 px
├── js/main.js          # меню, появление блоков, форма → письмо
├── images/
│   ├── case-math.webp      # скриншот живого сайта кейса
│   ├── case-art.webp       # скриншот живого сайта кейса
│   ├── case-tracktel.webp  # композит из docs/screenshots репозитория
│   └── og-image.jpg        # картинка для соцсетей 1200×630
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── README.md
```

## Технические требования ТЗ — выполнено

- **Адаптив от 320 px** — брейкпоинты 1080 / 920 / 760 / 480 / 360 px, мобильное меню-бургер.
- **Скорость до 2 секунд** — 0 внешних запросов: системные шрифты, WebP-скриншоты (~160 КБ суммарно), `loading="lazy"`, `defer` у скрипта.
- **Базовое SEO** — `title`, `description`, `keywords`, canonical, Open Graph и Twitter Card, `alt` у всех картин, семантика `header/main/section/footer`, `robots.txt`, `sitemap.xml`.
- **Аналитика** — блок Яндекс.Метрики вставлен в `<head>` в закомментированном виде (нужен номер счётчика).
- **Lighthouse** — Accessibility 1.0 · Best Practices 1.0 · SEO 1.0.

## Запуск локально

```bash
cd portfolio-site
python -m http.server 8747
# открыть http://127.0.0.1:8747/
```

## Публикация

### Вариант A — GitHub Pages (бесплатно, рекомендуется)

```bash
cd portfolio-site
git init
git add .
git commit -m "Сайт-портфолио: первый билд"
git branch -M main
git remote add origin https://github.com/Varangian7221/varangian7221.github.io.git
git push -u origin main
```

Затем на GitHub: **Settings → Pages → Source: Deploy from a branch → main /(root) → Save**.
Сайт появится на `https://varangian7221.github.io/`.

### Вариант B — Vercel

```bash
npm i -g vercel
vercel --prod
```

## Чек-лист перед публикацией

- [ ] Заменить `@Varangian7221` в Telegram-ссылке, если ник другой (в `index.html` — 2 места).
- [ ] Вставить номер счётчика Яндекс.Метрики (раскомментировать блок в `<head>`, заменить `XXXXXXX`).
- [ ] Обновить `loc` в `sitemap.xml` и `canonical`/`og:url`, если домен будет другим.
- [ ] Проверить все ссылки в режиме инкогнито.
