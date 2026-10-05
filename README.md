# Лабораторные работы 1–6 по проекту «Модуль»

Проект «Модуль» — B2B-лендинг с каталогом модульных конструкторов. Приложение опубликовано; репозиторий, Pull Request, CI/CD и Яндекс Форма доступны в реальных сервисах.

- [Приложение](https://akov40320.github.io/modul-labs/).
- [Репозиторий](https://github.com/akov40320/modul-labs).
- [Яндекс Форма «Получить коммерческое предложение»](https://forms.yandex.ru/u/6ac336f295add59f2d7597ad).
- [PR №1: неуспешный и исправленный CI](https://github.com/akov40320/modul-labs/pull/1).
- [Успешный CI и deploy после merge](https://github.com/akov40320/modul-labs/actions/runs/37269189301).

## Материалы

Отчеты Word находятся в папке `Отчёты`. Документация, требования и схемы доступны через [страницу материалов](docs/index.html). Исходный код находится в `project/app`; команды запуска и проверки — в [README проекта](project/README.md). Для запуска на компьютере используется `Запустить приложение.cmd`.

## Результаты по работам

| Работа | Результат и состояние |
|---|---|
| ЛР1 | Яндекс Форма опубликована: восемь вопросов. Обязательные поля, email, количество и успешная пробная отправка проверены; [Сеанс Алисы AI](https://alice.yandex.ru/chat/01a10a9a-23e4-4000-ab5b-a5dc1bb7b0b2/) выполнен: два запроса и ответа. |
| ЛР2 | Тема, состав и роли, четыре epic и двенадцать задач подготовлены. [GitHub Project](https://github.com/users/akov40320/projects/1) настроен по шаблону Kanban: 16 issues, нативные связи и 96 проверенных значений полей. Итог: 14 Done / 2 In Progress. |
| ЛР3 | Требования, User Stories, User Flow и макеты подготовлены. [Wiki](https://github.com/akov40320/modul-labs/wiki) опубликована; [Figma](https://www.figma.com/design/QJOUjnQiwxzXIUY2ATDpZm/): четыре низкодетализированных экрана перенесены и проверены. Кликабельный прототип проверен: каталог → форма → подтверждение → каталог. |
| ЛР4 | Kanban: пять колонок, WIP In Progress 2 и Review 1. Конфигурация и состояние 14 Done / 2 In Progress проверены; ведение в течение семестра продолжается. |
| ЛР5 | Публичный GitHub-репозиторий, GitHub Flow, PR №1 и защита main. Удаленный конфликт PR20 разрешен; PR18/19/20 объединены после CI. |
| ЛР6 | Реальный красный и зеленый CI в PR №1, успешный CI и автоматический deploy в GitHub Pages. |

Яндекс Трекер и организация Яндекс 360 заменены GitHub Projects / Issues. Фактическая схема и требования описаны в [соответствии сервисов](docs/service-mapping.md). Форма на сайте сохраняет данные в браузере через localStorage; опубликованная Яндекс Форма — отдельный внешний канал. CRM, серверная БД и реальная продажа в этот MVP не входят.

## CI/CD и подтверждения

- [Неуспешный CI](https://github.com/akov40320/modul-labs/actions/runs/37268219608).
- [Исправленный успешный CI](https://github.com/akov40320/modul-labs/actions/runs/37268345975).
- [Merge, успешные CI и deploy](https://github.com/akov40320/modul-labs/actions/runs/37269189301).
- Commit первой публикации: `061b6814a47e1bbbf0bc483b12d0ec23e4bcbeab`.
- [CI и deploy после разрешения PR20](https://github.com/akov40320/modul-labs/actions/runs/37270869722) — SUCCESS; commit `978ac9bbe0ad52505ea03835505d67e0e404e722`.

В `evidence` сохранены журналы и изображения проверок. Онлайн-подтверждения находятся в `evidence/online`; [реестр результатов](docs/online-results.json) связывает документы с сервисами. Локальные smoke/unit-проверки дополняют удаленный CI.

Защита `main`: обязательный `ci`, актуальная ветка перед merge, применение к администратору, разрешение обсуждений, запрет force push и удаления. Обязательное число approving reviews — 0.

## Участники и титульные данные

Состав и зоны ответственности: [Team](docs/wiki/Team.md). Студент: **А.А. Первых**, группа **3Втба-1**. Преподаватели: **Абарникова Елена Борисовна** и **Шаповалова Варвара Сергеевна**.

Бесплатная конфигурация использует публичный репозиторий, GitHub Actions / Pages и GitHub Projects. [Wiki](https://github.com/akov40320/modul-labs/wiki) опубликована: семь страниц. [Project](https://github.com/users/akov40320/projects/1), [Figma](https://www.figma.com/design/QJOUjnQiwxzXIUY2ATDpZm/) и [ответы Алисы AI](https://alice.yandex.ru/chat/01a10a9a-23e4-4000-ab5b-a5dc1bb7b0b2/) доступны; прототип проверен; поля доски заполнены и проверены: 14 Done / 2 In Progress.
