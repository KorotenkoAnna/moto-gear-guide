# moto-gear-guide (тестовое название репозитория)

Информационный сайт-гид по экипировке для мото/скутеристов (куртки, шлемы, защита, нормы
сертификации). Без магазина. Не связан со старым брендом домена — только структура и
несколько конкретных URL восстановлены ради существующих обратных ссылок.

Это **тестовая версия**: контент почти везде — заглушка («Page en préparation»), дизайн и
структура URL уже финальные. Когда контент будет готов, тот же репозиторий переносится на
`inventive-citi.com` (см. раздел «Когда будете переносить на боевой домен» ниже) — просто
меняете домен в Netlify, ничего в коде переписывать не нужно.

## Стек и почему он

- **[Eleventy (11ty)](https://www.11ty.dev/)** — генератор статичного сайта. Никакой базы
  данных и сложного бэкенда: каждая страница — это файл `.njk` с YAML-«шапкой» (front matter)
  и (пока пустым) телом. Редактировать такой файл в VS Code может человек без опыта
  программирования.
- Почему не просто HTML: общие шапка/футер/меню — в одном месте
  (`src/_includes/`), а не продублированы в 40 файлах.
- Почему не Wordpress/Tilda: важно было **точно** воспроизвести кривые старые URL
  (`/fr/38-masques-barrieres/masques-barrieres.html` и т.п.) — в 11ty это одна строка
  `permalink:` в шапке файла.
- Хостинг — **Netlify**: бесплатно, подключается к GitHub, при каждом `git push` сайт сам
  пересобирается и обновляется (это и есть «автоматическое обновление», о котором вы спросили).

## Структура проекта

```
moto-gear-guide/
├── src/
│   ├── _includes/
│   │   ├── layouts/        ← общие шаблоны (base = каркас страницы, article = "статья",
│   │   │                      section = "рубрика с карточками")
│   │   └── partials/       ← шапка сайта, футер, SVG-иконки
│   ├── _data/site.json     ← название сайта, меню — поменяете один раз и это применится
│   │                          везде
│   ├── assets/             ← css, js, картинки (см. раздел «Картинки» ниже)
│   ├── index.njk           ← главная
│   ├── vestes-blousons.njk, casques-gants-protections.njk, protection-balistique.njk,
│   │   normes-securite.njk, guides.njk   ← 5 хабов-рубрик (новая IA)
│   ├── a-propos.njk, contact.njk         ← новые страницы
│   └── restored/           ← ВСЕ восстановленные адреса со старыми ссылками (см. таблицу
│                              ниже) — organised по рубрикам, но реальный URL задаётся
│                              строкой `permalink:` в шапке файла, а не именем папки
├── .eleventy.js             ← конфигурация сборки
├── netlify.toml              ← настройки автосборки на Netlify
└── package.json
```

## Как редактировать контент

Открываете нужный файл `.njk`, там сверху блок между `---`:

```yaml
---
layout: layouts/article.njk
permalink: "/products/dorsale/"
title: "Protection dorsale : bien choisir sa dorsale"
section: "Casques, gants & protections"
lead: "..."
keepReason: "..."
noindex: true          ← уберите эту строку, когда напишете реальный текст
---
```

Ниже `---` — тело страницы. Сейчас оно пустое (весь текст-заглушку рисует шаблон
`article.njk`). Когда будете писать реальную статью, здесь, после второй `---`, добавляете
обычный текст/HTML — он выведется вместо жёлтого блока "Page en préparation".

**Никогда не меняйте строку `permalink:`** у файлов в `src/restored/` — это и есть тот самый
адрес со старой ссылкой, который нельзя трогать. Всё остальное (заголовок, текст, `lead`) —
меняйте свободно.

## Полная карта восстановленных URL → файл

| URL (не менять) | Файл |
|---|---|
| /products/veste-costume-pare-balles/ | src/restored/protection-balistique/veste-costume-pare-balles.njk |
| /a/l/en/products/veste-costume-pare-balles/ | src/restored/protection-balistique/veste-costume-pare-balles.en.njk |
| /collections/exclusivite-pare-balles/ | src/restored/protection-balistique/exclusivite-pare-balles.njk |
| /products/doudoune-pare-balles/ | src/restored/protection-balistique/doudoune-pare-balles.njk |
| /a/l/en/products/doudoune-pare-balles/ | src/restored/protection-balistique/doudoune-pare-balles.en.njk |
| /fr/15-furtiv-protection-pare-balles.html | src/restored/protection-balistique/furtiv-protection-pare-balles.njk |
| /en.html (открывается и как /en) | src/restored/protection-balistique/en-overview.njk |
| /products/dorsale/ | src/restored/casques-gants-protections/dorsale.njk |
| /products/sas-tec-protection/ | src/restored/casques-gants-protections/sas-tec-protection.njk |
| /a/l/en/products/sas-tec-protection/ | src/restored/casques-gants-protections/sas-tec-protection.en.njk |
| /fr/38-masques-barrieres/masques-barrieres.html | src/restored/casques-gants-protections/masques-barrieres.njk |
| /products/blouson-reversible/ | src/restored/vestes-blousons/blouson-reversible.njk |
| /a/l/en/products/blouson-reversible/ | src/restored/vestes-blousons/blouson-reversible.en.njk |
| /products/trench-901/ | src/restored/vestes-blousons/trench-901.njk |
| /a/l/en/products/trench-901/ | src/restored/vestes-blousons/trench-901.en.njk |
| /collections/outlet-grandes-tailles/ | src/restored/vestes-blousons/outlet-grandes-tailles.njk |
| /collection/ | src/restored/vestes-blousons/collection.njk |
| /city-bike-york/ | src/restored/guides/city-bike-york.njk |
| /fr/blog/daniel-bravo-en-inventive-citi-b137.html | src/restored/guides/style-urbain-personnalites.njk |
| /blogs/inventive-live/quand-vous-achetez-...-longtemps.html | src/restored/guides/payer-plus-cher-plus-longtemps.njk |
| /fr/content/3-cgv.html (открывается и как /fr/content/3-cgv) | src/restored/mentions-legales.njk |

Полное обоснование каждого URL (какая ссылка/трафик) — в документе
«inventive-citi.com — структура сайта и карта URL» и в присланном xlsx.

⚠️ **Открытый вопрос**: моно- или двуязычный сайт (FR/EN) — вы его ещё не подтвердили (см.
комментарий в документе). Пока сделаны и FR, и EN версии для восстановленных URL, где была
английская версия. Если решите делать только FR — просто удалите файлы `*.en.njk` и вместо
них позже настроим 301 с `/a/l/en/*` на FR-версию.

## Картинки

Инструмента генерации фото в этой сессии не было, поэтому вместо фотографий сейчас везде —
простые линейные SVG-иконки (`src/_includes/partials/icons.njk`) на тёмном фоне. Это временно.

Когда будете добавлять настоящие фото (со стоков — Unsplash, Pexels, или свои):
1. Кладёте файл в `src/assets/img/` (например, `hero-vestes.jpg`).
2. В нужном шаблоне (например, `src/index.njk`) заменяете `{{ icon("jacket") }}` на
   `<img src="/assets/img/hero-vestes.jpg" alt="...">`.
Больше ничего менять не нужно — все картинки в `src/assets/img/` автоматически попадают в
сборку.

## Запуск локально в VS Code

Понадобится [Node.js](https://nodejs.org/) (версия 18 и выше) — если ещё не установлен,
скачайте с сайта и поставьте как обычную программу.

1. Открываете папку `moto-gear-guide` в VS Code (File → Open Folder…).
2. Открываете встроенный терминал (Terminal → New Terminal) и вводите:
   ```bash
   npm install
   npm start
   ```
3. Откроется адрес вида `http://localhost:8080` — это живой предпросмотр сайта, он сам
   обновляется при сохранении файла.
4. Остановить — `Ctrl+C` в терминале.

## Публикация в GitHub + автообновление сайта (Netlify)

### 1. Создать репозиторий на GitHub

1. Зайдите на [github.com](https://github.com), нажмите **New repository**.
2. Имя — например `moto-gear-guide` (или как вам удобно, это не публично видно как домен).
3. Оставьте репозиторий **Private**, пока сайт не готов к показу.
4. Ничего не отмечайте (без README/.gitignore — они уже есть в проекте), нажмите **Create
   repository**.
5. GitHub покажет команды — вам нужны только строки после «…or push an existing repository
   from the command line».

### 2. Отправить проект из VS Code в GitHub

В терминале VS Code, из папки проекта:

```bash
git init
git add .
git commit -m "Первая версия: структура и дизайн сайта"
git branch -M main
git remote add origin https://github.com/ВАШ-АККАУНТ/moto-gear-guide.git
git push -u origin main
```

(Первый раз GitHub попросит войти в аккаунт — можно через браузер, VS Code сам предложит.)

Дальше, после любых правок:

```bash
git add .
git commit -m "Написал статью про dorsale"
git push
```

Проще всего это делать не в терминале, а через вкладку **Source Control** (иконка с
разветвлением слева в VS Code) — там есть кнопки «+», «Commit», «Sync/Push» без единой
команды.

### 3. Подключить Netlify — сайт будет обновляться сам при каждом push

1. Зайдите на [netlify.com](https://www.netlify.com), зарегистрируйтесь через GitHub-аккаунт.
2. **Add new site → Import an existing project → Deploy with GitHub**.
3. Выберите репозиторий `moto-gear-guide`.
4. Netlify сам подхватит настройки из `netlify.toml`, который уже лежит в проекте
   (`npm run build`, папка `_site`) — ничего вручную вводить не нужно, просто нажмите
   **Deploy**.
5. Через минуту получите тестовый адрес вида `https://random-name-123.netlify.app` — это и
   есть ваш «репозиторий вместо домена» из вашего вопроса, только уже с рабочим сайтом.
6. С этого момента **каждый `git push` из VS Code автоматически пересобирает и обновляет
   этот сайт** — вручную ничего заливать не нужно.

### Когда будете переносить на боевой домен (inventive-citi.com)

1. В Netlify: **Site configuration → Domain management → Add a custom domain**, вводите
   `inventive-citi.com`.
2. Netlify покажет DNS-записи — добавляете их у регистратора домена (там же, где домен
   куплен/управляется).
3. Netlify сам выпустит SSL-сертификат (HTTPS) — обычно занимает до часа.
4. Отдельным шагом (когда будет готово техническое ЗТ на 301-редиректы) добавляем блок
   `[[redirects]]` в `netlify.toml` для всех URL, которые НЕ входят в список восстановленных
   выше — это уже готовится отдельным документом.
5. Перед реальным запуском — обязательно уберите `Disallow: /` из `src/robots.txt`
   (сейчас сайт специально закрыт от индексации, пока в нём нет настоящего контента).

## Что уже сделано / что дальше

- [x] Структура сайта (6 рубрик + новые страницы) и дизайн
- [x] Все URL со старыми ссылками восстановлены по точному адресу, пустые страницы-заглушки
- [ ] Написать реальные тексты статей (в первую очередь — те, что в таблице выше)
- [ ] Заменить SVG-иконки на настоящие фото
- [ ] Согласовать вопрос FR/EN (двуязычность)
- [ ] Подготовить и подключить 301-редиректы для НЕ восстановленных старых URL
- [ ] Собрать disavow-файл по спам-ссылкам (см. присланный xlsx)
- [ ] Перед реальным запуском — снять `Disallow: /` из robots.txt
