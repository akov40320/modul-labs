# Home — проект «Модуль»

«Модуль» — B2B-лендинг с каталогом модульных конструкторов. Пользователь выбирает направление и набор, рассчитывает ориентировочную стоимость партии и сохраняет заявку в браузере. Для внешнего запроса опубликована Яндекс Форма.

## Приложение и сервисы

- [Работающее приложение](https://akov40320.github.io/modul-labs/).
- [Репозиторий](https://github.com/akov40320/modul-labs).
- [Яндекс Форма](https://forms.yandex.ru/u/6ac336f295add59f2d7597ad).
- [PR №1](https://github.com/akov40320/modul-labs/pull/1).
- [Успешные CI и deploy](https://github.com/akov40320/modul-labs/actions/runs/37269189301).

GitHub Projects используется вместо Яндекс Трекера. [Wiki](https://github.com/akov40320/modul-labs/wiki) опубликована. [Project](https://github.com/users/akov40320/projects/1) создан: 16 issues. [Figma](https://www.figma.com/design/QJOUjnQiwxzXIUY2ATDpZm/) содержит четыре проверенных низкодетализированных экрана; кликабельный прототип проверен; настройка доски проверена: 14 Done / 2 In Progress. Пробная отправка Яндекс Формы проверена: ошибки обязательных полей, email и количества; корректный запрос с пустым телефоном отправлен успешно. [Алиса AI](https://alice.yandex.ru/chat/01a10a9a-23e4-4000-ab5b-a5dc1bb7b0b2/): два запроса и ответа получены.

## Границы MVP

- адаптивная витрина с якорной навигацией, каталогом, FAQ и контактами;
- категории, поиск, ценовой фильтр и сортировка;
- редактор демонстрационного каталога;
- расчет партии и скидки;
- валидация заявки и хранение в localStorage;
- кабинет: просмотр, экспорт и очистка данных;
- опубликованное приложение и автоматический CI/CD.

Данные формы приложения сохраняются в браузере. Яндекс Форма работает как отдельный сервис; CRM, серверная база, платежи и защищенная админка отложены.

## Документация

[Team](Team.md) · [Glossary](Glossary.md) · [Onboarding](Onboarding.md) · [Decision Log](Decision-Log.md) · [MVP Scope](MVP-Scope.md) · [CI/CD](CI-CD-Pipeline.md).

[User Flow](../design/user-flow.drawio) · [Макеты](../design/wireframes.html) · [Backlog](../lab2/backlog.csv) · [Снимок задач](../board.html) · [Соответствие сервисов](../service-mapping.md).

[Проверенный прототип Figma и переходы](../design/figma-prototype.md).

## Подтвержденное состояние на 05.10.2026

[Project](https://github.com/users/akov40320/projects/1): **14 Done / 2 In Progress**; активны MOD-EPIC-04 и MOD-403. WIP: In Progress 2, Review 1. Поля Priority, Role, Start date, Target date и Design link заполнены во всех 16 карточках.

[Figma-прототип](https://www.figma.com/proto/QJOUjnQiwxzXIUY2ATDpZm/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C-%E2%80%94-MVP-%D0%BC%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B8-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9-%D0%BF%D1%83%D1%82%D1%8C?node-id=1-105&t=QIxddXrGjI39AaY0-0&scaling=min-zoom&content-scaling=fixed&page-id=1%3A104&starting-point-node-id=1%3A105): каталог → форма → подтверждение → каталог; три перехода проверены. [PR18](https://github.com/akov40320/modul-labs/pull/18), [PR19](https://github.com/akov40320/modul-labs/pull/19) и [PR20](https://github.com/akov40320/modul-labs/pull/20) объединены после успешного CI; конфликт PR20 разрешен. [Последующий CI и deploy](https://github.com/akov40320/modul-labs/actions/runs/37270869722) — SUCCESS, commit `978ac9bbe0ad52505ea03835505d67e0e404e722`.
