# ЛР5 - модель ветвления и правила коммитов

## Выбор модели

Для небольшого статического MVP выбран **GitHub Flow**: защищенная `main` и короткоживущие feature-ветки. Реальный удаленный репозиторий пока не указан.

Имена веток:

- `feature/MOD-201-catalog-filters`;
- `feature/MOD-301-request-form`;
- `bugfix/MOD-302-quote-validation`.

## Conventional Commits

Допустимые типы: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`. Примеры:

- `feat: add catalog category filters`;
- `fix: validate minimum batch size`;
- `docs: describe local request storage`.

## Процесс PR

1. Создать ветку от актуальной `main`.
2. Сделать небольшие коммиты по одному смыслу.
3. Запустить локальные lint/test/build.
4. Открыть PR и дождаться CI.
5. После проверки объединить PR в `main`.
6. Удалить ветку.

Сценарий конфликта и реальный merge в удаленном репозитории **не выполнены**, так как remote pending. Конфликт можно симулировать на двух локальных ветках, не публикуя результат.
