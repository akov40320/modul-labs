# CI/CD Pipeline

Пайплайн выполнен в [GitHub Actions](https://github.com/akov40320/modul-labs/actions). После успешного CI при push в main приложение автоматически опубликовано в [GitHub Pages](https://akov40320.github.io/modul-labs/).

## Схема

**push / PR → checkout → Node.js 22 → lint → unit-тесты → build → при push в main: Pages artifact → deploy.**

Конфигурация: [ci-cd.yml](../../.github/workflows/ci-cd.yml). Рабочая папка команд — `project`. Текущий проект не содержит внешних npm-зависимостей.

## Триггеры и шаги

- push во все ветки — CI;
- pull_request — CI;
- workflow_dispatch — ручной запуск;
- push в main после успешного CI — публикация Pages.

CI выполняет `npm run lint`, `npm test`, `npm run build`. CD использует `actions/deploy-pages@v4`, зависит от CI и публикует artifact из `project/dist`. Права workflow: `pages: write`, `id-token: write`; environment — `github-pages`. Отдельный токен внешнего хостинга не требуется.

## Проверка

- [PR №1](https://github.com/akov40320/modul-labs/pull/1).
- [Красный CI](https://github.com/akov40320/modul-labs/actions/runs/37268219608).
- [Зеленый CI после исправления](https://github.com/akov40320/modul-labs/actions/runs/37268345975).
- [Успешные CI и deploy после merge](https://github.com/akov40320/modul-labs/actions/runs/37269189301).
- Commit первой публикации: `061b6814a47e1bbbf0bc483b12d0ec23e4bcbeab`.

Защита main требует успешный **ci** и актуальность ветки, применяется к администратору, требует разрешения обсуждений. Reviews — 0; force push и удаление запрещены.

## Логи и расширение

Открыть вкладку **Actions**, выбрать запуск, затем job **ci** или **deploy** и раскрыть нужный шаг. Ссылка на конкретный запуск сохраняется в задаче.

Для нового шага изменить workflow в feature-ветке, добавить команду с ненулевым кодом при ошибке, открыть PR и проверить результат. Если меняется имя обязательного job, обновить branch protection после успешного запуска нового status check.

Локальные журналы и smoke-проверки находятся в `project/evidence` и `evidence/browser-checks.json`; сервисные подтверждения — в `evidence/online`. Публикация документации отслеживается в реестре сервисов.

## Публикация после разрешения конфликта

[PR18](https://github.com/akov40320/modul-labs/pull/18), [PR19](https://github.com/akov40320/modul-labs/pull/19) и [PR20](https://github.com/akov40320/modul-labs/pull/20) объединены после успешного CI. Конфликт PR20 в docs/merge-policy.md разрешен с сохранением норм email и количества. Итоговый commit: `978ac9bbe0ad52505ea03835505d67e0e404e722`. [Последующий CI и deploy](https://github.com/akov40320/modul-labs/actions/runs/37270869722) успешны.
