# Decision Log — журнал решений

| ID | Дата | Решение | Причина | Состояние |
|---|---|---|---|---|
| ADR-001 | 04.10.2026 | Вариант 4 ЛР2: B2B-лендинг «Модуль» | Объединяет витрину, каталог, форму и документацию | Приложение опубликовано |
| ADR-002 | 05.10.2026 | Форма «Получить коммерческое предложение» для ЛР1 | Соответствует B2B-запросу | Яндекс Форма опубликована; ошибки и успешная отправка проверены |
| ADR-003 | 04.10.2026 | Статический MVP с localStorage | Воспроизводимые сценарии без серверной БД | Реализовано; CRM и сервер отложены |
| ADR-004 | 05.10.2026 | Kanban; WIP In Progress 2, Review 1 | Ограничивает активную реализацию и очередь проверки | Лимиты настроены и проверены; 14 Done / 2 In Progress |
| ADR-005 | 05.10.2026 | GitHub Flow: main + feature-ветки + PR | Подходит для статического MVP | Репозиторий и PR №1 опубликованы |
| ADR-006 | 05.10.2026 | GitHub Actions и deploy Pages после успешного CI в main | Автоматизирует проверки и публикацию | Красный/зеленый CI проверены; merge и deploy успешны |
| ADR-007 | 05.10.2026 | Записывать результаты с фактическими URL и журналами | Обеспечивает проверяемость | [Реестр результатов](../online-results.json) |
| ADR-008 | 05.10.2026 | GitHub Projects / Issues вместо Яндекс 360 / Трекера | Бесплатная связка задач с кодом и CI/CD | [Project](https://github.com/users/akov40320/projects/1) создан по шаблону Kanban: 16 issues; настройка проверена: 14 Done / 2 In Progress |
| ADR-009 | 05.10.2026 | Защитить main: обязательный ci, strict, enforce admins, разрешение обсуждений | Не пропускать неуспешные или устаревшие проверки | Настроено; reviews 0, force push и удаление запрещены |

[Репозиторий](https://github.com/akov40320/modul-labs) · [Яндекс Форма](https://forms.yandex.ru/u/6ac336f295add59f2d7597ad) · [CI и deploy](https://github.com/akov40320/modul-labs/actions/runs/37269189301).

## Подтвержденное состояние на 05.10.2026

[Project](https://github.com/users/akov40320/projects/1): **14 Done / 2 In Progress**; активны MOD-EPIC-04 и MOD-403. WIP: In Progress 2, Review 1. Поля Priority, Role, Start date, Target date и Design link заполнены во всех 16 карточках.

[Figma-прототип](https://www.figma.com/proto/QJOUjnQiwxzXIUY2ATDpZm/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C-%E2%80%94-MVP-%D0%BC%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B8-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9-%D0%BF%D1%83%D1%82%D1%8C?node-id=1-105&t=QIxddXrGjI39AaY0-0&scaling=min-zoom&content-scaling=fixed&page-id=1%3A104&starting-point-node-id=1%3A105): каталог → форма → подтверждение → каталог; три перехода проверены. [PR18](https://github.com/akov40320/modul-labs/pull/18), [PR19](https://github.com/akov40320/modul-labs/pull/19) и [PR20](https://github.com/akov40320/modul-labs/pull/20) объединены после успешного CI; конфликт PR20 разрешен. [Последующий CI и deploy](https://github.com/akov40320/modul-labs/actions/runs/37270869722) — SUCCESS, commit `978ac9bbe0ad52505ea03835505d67e0e404e722`.
