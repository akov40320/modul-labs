# Onboarding — запуск и доступы

## Ссылки

- [Репозиторий](https://github.com/akov40320/modul-labs).
- [Приложение](https://akov40320.github.io/modul-labs/).
- [Яндекс Форма](https://forms.yandex.ru/u/6ac336f295add59f2d7597ad).
- [Actions](https://github.com/akov40320/modul-labs/actions).
- [PR №1](https://github.com/akov40320/modul-labs/pull/1).

[Wiki](https://github.com/akov40320/modul-labs/wiki) опубликована. [Project](https://github.com/users/akov40320/projects/1) создан; [Figma](https://www.figma.com/design/QJOUjnQiwxzXIUY2ATDpZm/) содержит проверенные макеты. Кликабельный прототип проверен; настройка доски проверена: 14 Done / 2 In Progress. Аккаунт GitHub: `akov40320`. Права других аккаунтов добавляются после получения логинов и подтверждения доступа. Пароли и токены в документации не хранятся.

## Запуск

1. Клонировать `https://github.com/akov40320/modul-labs.git`.
2. Перейти в папку `project`; использовать Node.js 22.
3. Запустить `npm run lint`, затем `npm test`.
4. Собрать приложение: `npm run build`.
5. Открыть приложение согласно [README проекта](../../project/README.md) либо воспользоваться опубликованной ссылкой.
6. Для изменений создать feature-ветку, связать задачу и открыть PR. Основная ветка защищена; перед merge должны пройти проверки.

Текущий проект не содержит внешних npm-зависимостей. При добавлении зависимостей команды установки и workflow обновляются вместе.

## Данные и проверка

Для пробных отправок использовать тестовые значения. Форма приложения сохраняет данные в localStorage; кабинет позволяет просмотреть, экспортировать и удалить их. Это хранилище текущего браузера, а не серверная CRM. Яндекс Форма имеет отдельные ответы. Проверены ошибки обязательных полей и email, отклонение количества 9, успешная отправка количества 10 с пустым телефоном. Внешняя форма проверяет общий диапазон 10–10000; минимумы 25 и 20 указаны в выборе набора, а автоматическая проверка по выбранному набору реализована в приложении.

`hello@modul.example` — пример контактного адреса, не действующий канал связи. Не использовать его как адрес получателя уведомлений формы.

## Подтвержденное состояние на 05.10.2026

[Project](https://github.com/users/akov40320/projects/1): **14 Done / 2 In Progress**; активны MOD-EPIC-04 и MOD-403. WIP: In Progress 2, Review 1. Поля Priority, Role, Start date, Target date и Design link заполнены во всех 16 карточках.

[Figma-прототип](https://www.figma.com/proto/QJOUjnQiwxzXIUY2ATDpZm/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C-%E2%80%94-MVP-%D0%BC%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B8-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9-%D0%BF%D1%83%D1%82%D1%8C?node-id=1-105&t=QIxddXrGjI39AaY0-0&scaling=min-zoom&content-scaling=fixed&page-id=1%3A104&starting-point-node-id=1%3A105): каталог → форма → подтверждение → каталог; три перехода проверены. [PR18](https://github.com/akov40320/modul-labs/pull/18), [PR19](https://github.com/akov40320/modul-labs/pull/19) и [PR20](https://github.com/akov40320/modul-labs/pull/20) объединены после успешного CI; конфликт PR20 разрешен. [Последующий CI и deploy](https://github.com/akov40320/modul-labs/actions/runs/37270869722) — SUCCESS, commit `978ac9bbe0ad52505ea03835505d67e0e404e722`.
