/** Pure business rules. Shared by the browser and Node tests. */
export const CATEGORIES = Object.freeze({
  education: 'Образование',
  corporate: 'Корпоративные подарки',
  retail: 'Розница',
});

export const DEFAULT_CATALOG = Object.freeze([
  { id: 'school-start', name: 'Классный старт', category: 'education', price: 2490, pieces: 320, minOrder: 10, color: 'blue', label: 'Для первых открытий', description: 'Базовый набор для кружков и учебных занятий. Цветные элементы, модели транспорта и карточки с заданиями.' },
  { id: 'school-engineer', name: 'Юный инженер', category: 'education', price: 4790, pieces: 680, minOrder: 10, color: 'red', label: 'Больше экспериментов', description: 'Механические модели для проектной работы: шестерни, оси, рычаги и детали для группового исследования.' },
  { id: 'corporate-city', name: 'Город команды', category: 'corporate', price: 3590, pieces: 450, minOrder: 25, color: 'yellow', label: 'Подарок со смыслом', description: 'Набор архитектурных элементов для совместной сборки. Упаковку и цветовые акценты можно обсудить в заявке.' },
  { id: 'corporate-brand', name: 'Идея бренда', category: 'corporate', price: 6990, pieces: 920, minOrder: 25, color: 'blue', label: 'Масштабная история', description: 'Расширенная архитектурная серия для корпоративного подарка и командной сессии по созданию общей модели.' },
  { id: 'retail-world', name: 'Маленький мир', category: 'retail', price: 1890, pieces: 240, minOrder: 20, color: 'red', label: 'На каждый день', description: 'Компактные наборы для витрины: несколько простых сюжетов, удобная упаковка и повторяемая сборка.' },
  { id: 'retail-creator', name: 'Большой создатель', category: 'retail', price: 5490, pieces: 760, minOrder: 20, color: 'yellow', label: 'Для больших идей', description: 'Универсальные строительные элементы и детали для свободного творчества. Подходит для расширения ассортимента.' },
]);

export function filterCatalog(catalog, { category = 'all', query = '', maxPrice = Infinity, sort = 'recommended' } = {}) {
  const term = String(query).trim().toLocaleLowerCase('ru-RU');
  const ceiling = Number.isFinite(Number(maxPrice)) ? Number(maxPrice) : Infinity;
  const result = catalog.filter((item) => (category === 'all' || item.category === category)
    && item.price <= ceiling
    && `${item.name} ${item.description}`.toLocaleLowerCase('ru-RU').includes(term));
  if (sort === 'price-asc') result.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name, 'ru'));
  if (sort === 'price-desc') result.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name, 'ru'));
  if (sort === 'pieces-desc') result.sort((a, b) => b.pieces - a.pieces);
  return result;
}

export function calculateQuote(product, quantity) {
  const count = Number(quantity);
  if (!product || !Number.isSafeInteger(count) || count < product.minOrder || count > 10000) {
    throw new RangeError(`Количество должно быть целым числом от ${product?.minOrder ?? 1} до 10000.`);
  }
  const discount = count >= 100 ? 0.1 : count >= 50 ? 0.05 : 0;
  const subtotal = product.price * count;
  const savings = Math.round(subtotal * discount);
  return { quantity: count, subtotal, discount, savings, total: subtotal - savings };
}

export function validateLead(data, catalog) {
  const errors = {};
  const name = String(data.name ?? '').trim();
  const company = String(data.company ?? '').trim();
  const email = String(data.email ?? '').trim();
  const phone = String(data.phone ?? '').trim();
  const digits = phone.replace(/\D/g, '');
  const message = String(data.message ?? '').trim();
  const product = catalog.find((item) => item.id === data.productId);
  if (name.length < 2 || name.length > 80) errors.name = 'Укажите имя: от 2 до 80 символов.';
  if (company.length < 2 || company.length > 120) errors.company = 'Укажите компанию: от 2 до 120 символов.';
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Укажите корректный email.';
  if (phone && (digits.length < 10 || digits.length > 15 || !/^\+?[\d\s()-]+$/.test(phone))) errors.phone = 'Телефон должен содержать от 10 до 15 цифр.';
  if (!product) errors.productId = 'Выберите набор из каталога.';
  if (product) {
    try { calculateQuote(product, data.quantity); }
    catch { errors.quantity = `Минимум ${product.minOrder} наборов, максимум 10000. Введите целое число.`; }
  }
  if (message.length > 1000) errors.message = 'Комментарий должен содержать не более 1000 символов.';
  if (data.consent !== true) errors.consent = 'Подтвердите локальное сохранение учебной заявки.';
  return { valid: Object.keys(errors).length === 0, errors, normalized: { name, company, email: email.toLowerCase(), phone, productId: data.productId, quantity: Number(data.quantity), message, consent: data.consent === true } };
}

export function validateProduct(data) {
  const errors = {};
  const name = String(data.name ?? '').trim();
  const description = String(data.description ?? '').trim();
  const price = Number(data.price);
  const pieces = Number(data.pieces);
  const minOrder = Number(data.minOrder);
  if (name.length < 3 || name.length > 80) errors.name = 'Название: от 3 до 80 символов.';
  if (!Object.hasOwn(CATEGORIES, data.category)) errors.category = 'Выберите направление.';
  if (!Number.isSafeInteger(price) || price < 1 || price > 1000000) errors.price = 'Цена: целое число от 1 до 1000000 ₽.';
  if (!Number.isSafeInteger(pieces) || pieces < 1 || pieces > 50000) errors.pieces = 'Детали: целое число от 1 до 50000.';
  if (!Number.isSafeInteger(minOrder) || minOrder < 1 || minOrder > 10000) errors.minOrder = 'Минимальная партия: от 1 до 10000.';
  if (description.length < 10 || description.length > 500) errors.description = 'Описание: от 10 до 500 символов.';
  const color = ['blue', 'red', 'yellow'].includes(data.color) ? data.color : 'blue';
  return { valid: Object.keys(errors).length === 0, errors, normalized: { name, category: data.category, price, pieces, minOrder, description, color, label: String(data.label ?? 'Новый набор').trim().slice(0, 60) } };
}

export function restoreCatalog(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.length || parsed.length > 100) throw new Error('Invalid catalog');
    const ids = new Set();
    return parsed.map((item) => {
      const result = validateProduct(item);
      if (!result.valid || typeof item.id !== 'string' || !/^[a-z0-9-]{1,80}$/.test(item.id) || ids.has(item.id)) throw new Error('Invalid product');
      ids.add(item.id);
      return { id: item.id, ...result.normalized };
    });
  } catch { return DEFAULT_CATALOG.map((item) => ({ ...item })); }
}

export function restoreLeads(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && typeof item.id === 'string'
      && typeof item.name === 'string' && typeof item.company === 'string' && typeof item.email === 'string'
      && typeof item.productName === 'string' && typeof item.createdAt === 'string'
      && Number.isSafeInteger(item.quantity) && item.quantity > 0
      && Number.isSafeInteger(item.total) && item.total > 0).slice(-100);
  } catch { return []; }
}

export const formatMoney = (amount) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(amount);
