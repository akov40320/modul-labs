# Соответствие сервисов лабораторных работ

Проект «Модуль» опубликован в [GitHub](https://github.com/akov40320/modul-labs) и [GitHub Pages](https://akov40320.github.io/modul-labs/). [Яндекс Форма](https://forms.yandex.ru/u/6ac336f295add59f2d7597ad) опубликована и проверена. Состояния сервисов по данным на **05.10.2026** приведены ниже; машиночитаемый реестр — [online-results.json](online-results.json).

| ЛР | Исходное требование | Фактический сервис и результат |
|---|---|---|
| 1 | Алиса AI; Яндекс Формы для формы/опроса либо Директ для лендинга | Яндекс Форма: восемь вопросов, ошибки обязательных полей/email/количества и успешная отправка проверены. [Алиса AI](https://alice.yandex.ru/chat/01a10a9a-23e4-4000-ab5b-a5dc1bb7b0b2/): два запроса и ответа получены. Выбран вариант формы, поэтому Директ не требуется. |
| 2 | Организация Яндекс 360, Яндекс Трекер, доступы, очередь, эпики и подзадачи | Платформа заменена на GitHub Projects / Issues. Backlog: четыре epic, двенадцать задач, роли и критерии приемки. 16 issues и 12 native sub-issue связей созданы; [Project](https://github.com/users/akov40320/projects/1) создан, настройка проверена: 14 Done / 2 In Progress. |
| 3 | Wiki, User Flow, прототипы, MVP Scope, истории/DoD, веха и ссылки на макеты | Исходники Wiki, User Flow и макетов подготовлены. [GitHub Wiki](https://github.com/akov40320/modul-labs/wiki) опубликована: семь страниц. [Figma](https://www.figma.com/design/QJOUjnQiwxzXIUY2ATDpZm/): четыре макета перенесены и проверены; три кадра кликабельного прототипа и три перехода проверены. [Milestone «MVP 1.0»](https://github.com/akov40320/modul-labs/milestone/1) создан. |
| 4 | Доска Яндекс Трекера; Scrum/Kanban, пять колонок, WIP и ежедневная работа весь семестр | Используется GitHub Projects, Kanban. Пять колонок; WIP «В работе» 2 и «На проверке» 1. Снимок задач обновлен; [Project](https://github.com/users/akov40320/projects/1) создан с 16 issues; конфигурация проверена: 14 Done / 2 In Progress. Семестровая история продолжается. |
| 5 | GitHub/GitLab, модель ветвления, защита, коммиты и feature-ветки, конфликт | Публичный GitHub, GitHub Flow, PR №1 и защита main выполнены. Реальный конфликт [PR20](https://github.com/akov40320/modul-labs/pull/20) разрешен; PR18/19/20 объединены, required CI и последующий deploy успешны. Авторство и доступы определяются по данным Git. |
| 6 | Тесты/сборка, CI, защита ветки, красный/зеленый PR, CD и публичный URL | GitHub Actions: красный и зеленый CI в PR №1; после merge CI/deploy SUCCESS. Приложение опубликовано в GitHub Pages. |

## Фактическая замена Трекера

ЛР2 прямо указывает создание организации Яндекс 360 и активацию Яндекс Трекера; ЛР4 — доску в Яндекс Трекере. Эти этапы заменены рабочим пространством GitHub Projects / Issues. В документах указана фактически использованная платформа.

Распределение ролей отражено в [Team](wiki/Team.md). Assignee в GitHub — `akov40320`; поле **«Роль»** определяет ответственность. Приглашения, подтверждение доступа, авторство коммитов и review фиксируются по действительным действиям. Начальная доска не означает завершения требуемой ЛР4 работы в течение всего семестра.

## Проверенные ссылки

- [Репозиторий](https://github.com/akov40320/modul-labs).
- [Приложение](https://akov40320.github.io/modul-labs/).
- [Яндекс Форма](https://forms.yandex.ru/u/6ac336f295add59f2d7597ad).
- [PR №1](https://github.com/akov40320/modul-labs/pull/1).
- [Неуспешный CI](https://github.com/akov40320/modul-labs/actions/runs/37268219608).
- [Исправленный CI](https://github.com/akov40320/modul-labs/actions/runs/37268345975).
- [Успешные CI и deploy после merge](https://github.com/akov40320/modul-labs/actions/runs/37269189301).

Commit первой публикации: `061b6814a47e1bbbf0bc483b12d0ec23e4bcbeab`. main: обязательный ci, strict, применение к администратору, разрешение обсуждений, reviews 0, запрет force push и удаления.

## Проверка формы и ограничения

При пустых обязательных полях отображаются ошибки. Неверный email: **«Введите корректный адрес электронной почты.»** Количество 9: **«Убедитесь, что значение больше либо равно 10.»** Корректный email, количество 10 и пустой телефон: успешная отправка.

В Яндекс Форме настроен общий диапазон целого количества **10–10000**. Минимумы **10 / 25 / 20** указаны для наборов, но автоматическая зависимость минимума от выбранного набора во внешней форме не настроена. Приложение проверяет минимальную партию выбранного набора отдельно. Хранение localStorage приложения не является подключением CRM.

## Сервисы в работе

[Wiki](https://github.com/akov40320/modul-labs/wiki) опубликована. [GitHub Project](https://github.com/users/akov40320/projects/1) создан, [Figma](https://www.figma.com/design/QJOUjnQiwxzXIUY2ATDpZm/) содержит проверенные макеты, [milestone](https://github.com/akov40320/modul-labs/milestone/1) создан, [Алиса AI](https://alice.yandex.ru/chat/01a10a9a-23e4-4000-ab5b-a5dc1bb7b0b2/) завершена. Кликабельный прототип Figma проверен; поля Project заполнены и проверены: 14 Done / 2 In Progress. Реестр внешних действий: [external-steps.csv](lab2/external-steps.csv).

## Бесплатная конфигурация

Публичный репозиторий обеспечивает доступ к бесплатной защите main и GitHub Pages. GitHub Projects включает поля и parent/sub-issues. Column limits подсвечивают превышение WIP, но технически не запрещают перенос карточки.

[Тарифы GitHub](https://github.com/pricing) · [доски и WIP](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/customizing-the-board-layout) · [подзадачи](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues) · [защита веток](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).

## Подтвержденное состояние на 05.10.2026

[Project](https://github.com/users/akov40320/projects/1): **14 Done / 2 In Progress**; активны MOD-EPIC-04 и MOD-403. WIP: In Progress 2, Review 1. Поля Priority, Role, Start date, Target date и Design link заполнены во всех 16 карточках.

[Figma-прототип](https://www.figma.com/proto/QJOUjnQiwxzXIUY2ATDpZm/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C-%E2%80%94-MVP-%D0%BC%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B8-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9-%D0%BF%D1%83%D1%82%D1%8C?node-id=1-105&t=QIxddXrGjI39AaY0-0&scaling=min-zoom&content-scaling=fixed&page-id=1%3A104&starting-point-node-id=1%3A105): каталог → форма → подтверждение → каталог; три перехода проверены. [PR18](https://github.com/akov40320/modul-labs/pull/18), [PR19](https://github.com/akov40320/modul-labs/pull/19) и [PR20](https://github.com/akov40320/modul-labs/pull/20) объединены после успешного CI; конфликт PR20 разрешен. [Последующий CI и deploy](https://github.com/akov40320/modul-labs/actions/runs/37270869722) — SUCCESS, commit `978ac9bbe0ad52505ea03835505d67e0e404e722`.
