import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_CATALOG, calculateQuote, filterCatalog, restoreCatalog, restoreLeads, validateLead, validateProduct, formatMoney } from '../app/domain.js';

const product = DEFAULT_CATALOG[0];
const validLead = { name: '  Тестовый клиент  ', company: '  ООО Пример  ', email: ' Demo@Example.COM ', phone: '+7 (900) 000-00-00', productId: product.id, quantity: '10', message: '  Только учебный пример  ', consent: true };

test('catalog combines category, budget and case-insensitive search', () => {
  assert.deepEqual(filterCatalog(DEFAULT_CATALOG, { category: 'education', maxPrice: 3000, query: ' КЛАССНЫЙ ' }).map((item) => item.id), ['school-start']);
  assert.equal(filterCatalog(DEFAULT_CATALOG, { category: 'education', maxPrice: 2000 }).length, 0);
});
test('sorting does not mutate the original catalog', () => {
  const before = DEFAULT_CATALOG.map((item) => item.id);
  const result = filterCatalog(DEFAULT_CATALOG, { sort: 'price-asc' });
  assert.equal(result[0].id, 'retail-world');
  assert.equal(result.at(-1).id, 'corporate-brand');
  assert.deepEqual(DEFAULT_CATALOG.map((item) => item.id), before);
});
test('descending price and pieces sort in the expected order', () => {
  assert.equal(filterCatalog(DEFAULT_CATALOG, { sort: 'price-desc' })[0].price, 6990);
  assert.equal(filterCatalog(DEFAULT_CATALOG, { sort: 'pieces-desc' })[0].pieces, 920);
});
test('quote respects minimum order and zero discount below 50', () => {
  assert.deepEqual(calculateQuote(product, 10), { quantity: 10, subtotal: 24900, discount: 0, savings: 0, total: 24900 });
  assert.equal(calculateQuote(product, 49).discount, 0);
});
test('discount changes exactly at 50 and 100 units', () => {
  assert.equal(calculateQuote(product, 50).total, 118275);
  assert.equal(calculateQuote(product, 99).discount, 0.05);
  assert.deepEqual(calculateQuote(product, 100), { quantity: 100, subtotal: 249000, discount: 0.1, savings: 24900, total: 224100 });
});
test('quote rounds savings to whole rubles', () => {
  assert.equal(calculateQuote({ ...product, price: 101 }, 51).savings, 258);
});
test('quote rejects fractions, out-of-range quantities and absent products', () => {
  for (const quantity of [0, 9, 10.1, -10, 10001, NaN, Infinity, 'abc']) assert.throws(() => calculateQuote(product, quantity), RangeError);
  assert.throws(() => calculateQuote(null, 10), RangeError);
  assert.equal(calculateQuote(product, 10000).quantity, 10000);
  assert.throws(() => calculateQuote(DEFAULT_CATALOG[2], 24), RangeError);
});
test('valid lead trims fields, normalizes email and converts quantity', () => {
  const result = validateLead(validLead, DEFAULT_CATALOG);
  assert.equal(result.valid, true);
  assert.equal(result.normalized.name, 'Тестовый клиент');
  assert.equal(result.normalized.email, 'demo@example.com');
  assert.equal(result.normalized.quantity, 10);
  assert.equal(result.normalized.message, 'Только учебный пример');
});
test('lead flags invalid contacts, quantity, message and consent independently', () => {
  const result = validateLead({ ...validLead, name: 'A', company: '', email: 'bad@', phone: 'call-me', quantity: 9, message: 'x'.repeat(1001), consent: 'true' }, DEFAULT_CATALOG);
  assert.equal(result.valid, false);
  assert.deepEqual(Object.keys(result.errors).sort(), ['company', 'consent', 'email', 'message', 'name', 'phone', 'quantity']);
});
test('phone is optional while product must exist', () => {
  assert.equal(validateLead({ ...validLead, phone: '' }, DEFAULT_CATALOG).valid, true);
  assert.ok(validateLead({ ...validLead, productId: 'unknown' }, DEFAULT_CATALOG).errors.productId);
  assert.ok(validateLead({ ...validLead, phone: '123456789' }, DEFAULT_CATALOG).errors.phone);
  assert.ok(validateLead({ ...validLead, phone: '1'.repeat(16) }, DEFAULT_CATALOG).errors.phone);
});
test('product normalization keeps valid integers and safe presentation defaults', () => {
  const result = validateProduct({ ...product, name: '  Новая модель  ', price: '3000', color: 'purple', label: 'x'.repeat(70) });
  assert.equal(result.valid, true);
  assert.equal(result.normalized.name, 'Новая модель');
  assert.equal(result.normalized.price, 3000);
  assert.equal(result.normalized.color, 'blue');
  assert.equal(result.normalized.label.length, 60);
});
test('product rejects unknown category and invalid business limits', () => {
  const result = validateProduct({ name: 'ab', category: 'invalid', price: 1.5, pieces: 50001, minOrder: 0, description: 'short' });
  assert.equal(result.valid, false);
  assert.deepEqual(Object.keys(result.errors).sort(), ['category', 'description', 'minOrder', 'name', 'pieces', 'price']);
});
test('restored catalog validates ids and duplicates, falling back atomically', () => {
  const customized = [{ ...product, name: 'Модель для теста', price: 3000 }];
  assert.equal(restoreCatalog(JSON.stringify(customized))[0].price, 3000);
  for (const raw of ['broken JSON', 'null', '[]', '{}', JSON.stringify([product, product]), JSON.stringify([{ ...product, id: '../bad' }]), JSON.stringify([{ ...product, price: -1 }])]) {
    assert.deepEqual(restoreCatalog(raw), DEFAULT_CATALOG);
  }
});
test('restored defaults are independent mutable copies', () => {
  const restored = restoreCatalog(null);
  restored[0].name = 'Changed';
  assert.equal(DEFAULT_CATALOG[0].name, 'Классный старт');
  assert.notEqual(restoreCatalog(null)[0], DEFAULT_CATALOG[0]);
});
test('lead restoration drops corrupt records and retains latest 100', () => {
  const lead = { id: 'test', name: 'Demo', company: 'Example', email: 'demo@example.com', productName: product.name, createdAt: '2026-01-01T00:00:00.000Z', quantity: 10, total: 24900 };
  assert.deepEqual(restoreLeads('broken JSON'), []);
  assert.deepEqual(restoreLeads('{}'), []);
  assert.deepEqual(restoreLeads(JSON.stringify([null, lead, { ...lead, quantity: 1.5 }, { ...lead, total: -1 }])), [lead]);
  const restored = restoreLeads(JSON.stringify(Array.from({ length: 105 }, (_, index) => ({ ...lead, id: String(index) }))));
  assert.equal(restored.length, 100);
  assert.equal(restored[0].id, '5');
});
test('money formatting uses rubles with no decimal portion', () => {
  assert.match(formatMoney(2490), /2\s490\s₽/u);
  assert.equal(formatMoney(0), '0\u00a0₽');
});
