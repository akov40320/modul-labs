# Разрешение конфликта в GitHub

**Дата:** 05.10.2026. [PR18](https://github.com/akov40320/modul-labs/pull/18), [PR19](https://github.com/akov40320/modul-labs/pull/19), [PR20](https://github.com/akov40320/modul-labs/pull/20) завершены merge после успешного обязательного CI. Реальный автор GitHub — `akov40320`.

## Выполненный сценарий

1. PR18 задает общий текст политики проверки заявки. Общая база после merge — commit `359c01e…`.
2. Из этой базы подготовлены ветки изменения email и количества. PR19 объединен первым.
3. PR20 до разрешения имел **CONFLICTING / DIRTY**, REST mergeable — **false**.
4. В конфликтной ветке согласован итоговый текст, удалены маркеры и выполнены проверки. Commit разрешения — `ee85890c946ddb4c6a859d67d30b7d4950b7e29c`, два родителя.
5. После успешного required CI PR20 объединен. Итоговый commit main — `978ac9bbe0ad52505ea03835505d67e0e404e722`.
6. [CI и deploy после merge](https://github.com/akov40320/modul-labs/actions/runs/37270869722) успешны.

## Подтверждения

Снимок конфликтного PR: `evidence/online/git-conflict.jpg`. Журнал: `evidence/online/git-conflict-log.txt`. Машиночитаемое состояние: `evidence/online/git-conflict-state.json`. Локальный ранний журнал `evidence/git-conflict.txt` сохранен как дополнительный материал, а внешний сценарий подтвержден отдельными PR.

Имена функциональных ответственных хранятся в задачах; GitHub-авторство определяется реальной историей сервиса.
