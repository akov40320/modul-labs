# ЛР5 — GitHub Flow и правила коммитов

[Репозиторий](https://github.com/akov40320/modul-labs) использует GitHub Flow: защищенная `main`, короткие feature-ветки и Pull Request. [PR №1](https://github.com/akov40320/modul-labs/pull/1) проверяет поведение неуспешного и исправленного CI.

## Имена веток и коммиты

Ветки связываются с задачами: `feature/MOD-201-catalog-filters`, `feature/MOD-301-request-form`, `bugfix/MOD-302-quote-validation`.

Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`. Сообщение описывает смысл изменения, например `fix: validate minimum batch size`.

## Процесс изменения

1. Создать ветку от актуальной main и указать связанную задачу.
2. Сделать небольшие коммиты и запустить lint/test/build.
3. Открыть PR, проверить критерии приемки и дождаться CI.
4. Синхронизировать ветку с main, если она отстала.
5. После успешных проверок и разрешения обсуждений объединить PR.

## Защита main

Обязательный status check — **ci**. Ветка должна быть актуальной перед merge (**strict**); правила применяются к администратору. Требуется разрешение обсуждений. Force push и удаление запрещены. Обязательное число approving reviews — **0**.

При таком количестве reviews наличие независимого одобрения не утверждается: его можно фиксировать дополнительно по действительным комментариям.

## Проверенные результаты

- [Неуспешный CI PR №1](https://github.com/akov40320/modul-labs/actions/runs/37268219608).
- [Исправленный успешный CI](https://github.com/akov40320/modul-labs/actions/runs/37268345975).
- [Успешный CI и deploy после merge](https://github.com/akov40320/modul-labs/actions/runs/37269189301).
- Commit: `061b6814a47e1bbbf0bc483b12d0ec23e4bcbeab`.

[Разрешение конфликтов](../conflict-demo.md) описывается отдельно. Реальный конфликт [PR20](https://github.com/akov40320/modul-labs/pull/20) разрешен; [PR18](https://github.com/akov40320/modul-labs/pull/18), [PR19](https://github.com/akov40320/modul-labs/pull/19) и PR20 объединены после CI. Фактическое GitHub-авторство — akov40320. [CI и deploy после merge](https://github.com/akov40320/modul-labs/actions/runs/37270869722) успешны.
