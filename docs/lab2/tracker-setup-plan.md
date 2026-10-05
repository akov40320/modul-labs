# ЛР2 — настройка рабочего пространства GitHub Projects

Фактическая платформа управления задачами: **GitHub Projects + GitHub Issues**. GitHub-аккаунт: **akov40320**. [Репозиторий](https://github.com/akov40320/modul-labs) и [приложение](https://akov40320.github.io/modul-labs/) опубликованы. [Wiki](https://github.com/akov40320/modul-labs/wiki) опубликована. [Project](https://github.com/users/akov40320/projects/1) создан с 16 issues; [Figma](https://www.figma.com/design/QJOUjnQiwxzXIUY2ATDpZm/) содержит проверенные макеты. Конфигурация Project проверена: 16 карточек, 14 Done / 2 In Progress, WIP 2 / 1.

В исходном задании указаны организация Яндекс 360 и Яндекс Трекер. В используемой схеме задачи и доска переносятся в GitHub Projects; соответствие сервисов отражено в [service-mapping.md](../service-mapping.md).

## Последовательность настройки

1. **Выполнено:** создан публичный [репозиторий проекта «Модуль»](https://github.com/akov40320/modul-labs) в аккаунте `akov40320`. Публичный репозиторий позволяет использовать защиту ветки и GitHub Pages на бесплатном тарифе.
2. **Выполнено:** [GitHub Project](https://github.com/users/akov40320/projects/1) создан по шаблону Kanban и содержит 16 issues. Пять статусов, поля и итоговые значения проверены: 14 Done / 2 In Progress.
3. **Выполнено:** настроены пять значений **Status**: **Backlog**, **To Do**, **In Progress**, **Review**, **Done**. Status используется для колонок Board.
4. **Выполнено:** у всех 16 карточек заполнены **Priority**, текстовое поле **Role**, **Start date**, **Target date**, **Design link**. Тип отражают labels, версию — milestone. Size и Estimate не заполнены: оценка трудозатрат не задавалась. Роли соответствуют [Team](../wiki/Team.md).
5. **Выполнено:** перенесены четыре эпика и двенадцать задач из [backlog.csv](backlog.csv) в GitHub Issues. Сохранить исходные идентификаторы `MOD-…` в названиях или описаниях, поскольку номера GitHub Issues назначаются сервисом.
6. **Выполнено:** созданы 12 native parent/sub-issue связей и 34 labels. В описания issues перенесены User Story, критерии приемки, зависимости, материалы и окружение; назначены milestone и поля Project.
7. Назначать issues подтвержденному аккаунту `akov40320`; функциональную ответственность отражать полем **«Роль»**. Других assignees добавлять только после появления доступных аккаунтов.
8. **Выполнено:** Wiki и макеты опубликованы, Design link содержит URL Figma во всех 16 карточках; кликабельный прототип проверен.
9. **Выполнено:** создан [milestone «MVP 1.0»](https://github.com/akov40320/modul-labs/milestone/1). Плановая контрольная дата MVP — **10.10.2026**; его объем описан в MVP Scope.
10. **Выполнено:** лимиты **In Progress — 2**, **Review — 1**, Backlog без ограничения. GitHub показывает превышение лимита; правило соблюдается при выборе следующей задачи.
11. **Проверено:** завершенные задачи находятся в Done. У эпиков 2–4 все дочерние задачи закрыты; сами эпики также закрыты. Выполнение подтверждается результатом и проверкой.

## Проверка готовности

| Результат | Подтверждение | Статус |
|---|---|---|
| Репозиторий опубликован | [GitHub](https://github.com/akov40320/modul-labs) | выполнено |
| Project создан по шаблону Kanban | [Project](https://github.com/users/akov40320/projects/1) | настроен и проверен |
| Четыре epic и двенадцать задач | [Issues](https://github.com/akov40320/modul-labs/issues), 12 native sub-issues | выполнено |
| Поля и роли заполнены | Повторное чтение 96 значений шести полей 16 карточек | выполнено |
| Wiki, макеты и milestone опубликованы | [Wiki](https://github.com/akov40320/modul-labs/wiki), [Figma](https://www.figma.com/design/QJOUjnQiwxzXIUY2ATDpZm/), [milestone](https://github.com/akov40320/modul-labs/milestone/1) | опубликованы; ссылки Project заполнены и проверены |
| WIP 2 / 1 настроен | Проверенные лимиты In Progress / Review | выполнено |

Итоговое состояние — **14 Done / 2 In Progress**. Активны MOD-EPIC-04 и MOD-403. Высокий приоритет соответствует P1, средний — P2; P0 зарезервирован для критического блокера. У всех карточек Start date = 2026-10-05 и Target date = 2026-10-10. Значения Role: `Team Lead / frontend`, `аналитик / дизайн / QA`, `backend / DevOps`. [Backlog](backlog.csv) и [снимок доски](../board.json) содержат соответствие исходных ключей и фактических данных сервиса.
