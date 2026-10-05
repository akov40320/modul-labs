# ЛР6 — выполненный CI/CD

[Репозиторий](https://github.com/akov40320/modul-labs) содержит [workflow CI/CD](../../.github/workflows/ci-cd.yml). Реальные GitHub Actions запускают проверки при push/PR и автоматически публикуют main в GitHub Pages после успешного CI.

## Проверенные сервисные результаты

| Этап | Результат |
|---|---|
| PR №1 с ошибкой | [Неуспешный CI, run 37268219608](https://github.com/akov40320/modul-labs/actions/runs/37268219608) |
| Исправление PR №1 | [Успешный CI, run 37268345975](https://github.com/akov40320/modul-labs/actions/runs/37268345975) |
| Merge и автоматическая доставка | [CI и deploy SUCCESS, run 37269189301](https://github.com/akov40320/modul-labs/actions/runs/37269189301) |
| Опубликованное приложение | [GitHub Pages](https://akov40320.github.io/modul-labs/) |

[PR №1](https://github.com/akov40320/modul-labs/pull/1). Commit успешного deploy: `061b6814a47e1bbbf0bc483b12d0ec23e4bcbeab`.

## Проверки и защита

Проверки текущей версии: lint — 108 проверок; test — 17 unit-тестов; build — 10 файлов; browser smoke — 10 сценариев. Журналы: `project/evidence/*.log`, `evidence/browser-checks.json`. Онлайн-журналы и изображения: `evidence/online`.

main защищена: обязательный **ci**, strict, применение к администратору, разрешение обсуждений; force push и удаление запрещены; обязательных approving reviews — 0.

## Документация

[Wiki CI/CD Pipeline](../wiki/CI-CD-Pipeline.md) описывает триггеры, команды, deploy и просмотр логов. [Wiki](https://github.com/akov40320/modul-labs/wiki) опубликована; CI/CD и Pages выполнены.

## Публикация после разрешения конфликта

PR18/19/20 объединены после успешного CI. Итоговый commit: `978ac9bbe0ad52505ea03835505d67e0e404e722`. [Последующий CI и deploy](https://github.com/akov40320/modul-labs/actions/runs/37270869722) успешны.
