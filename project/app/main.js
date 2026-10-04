import { CATEGORIES, calculateQuote, filterCatalog, formatMoney, restoreCatalog, restoreLeads, validateLead, validateProduct } from './domain.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const STORAGE = { catalog: 'modul.catalog.v1', leads: 'modul.leads.v1' };
function readStorage(key) { try { return localStorage.getItem(key); } catch { return null; } }
function writeStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}
let catalog = restoreCatalog(readStorage(STORAGE.catalog));
let leads = restoreLeads(readStorage(STORAGE.leads));
let category = 'all';
const leadForm = $('#lead-form');
const productForm = $('#product-form');
const element = (tag, className, value) => { const node = document.createElement(tag); if (className) node.className = className; if (value !== undefined) node.textContent = value; return node; };
const action = (label, className, handler) => { const button = element('button', className, label); button.type = 'button'; button.addEventListener('click', handler); return button; };

function productIllustration(product) {
  const img = element('img');
  img.src = `./assets/blocks-${product.color}.svg`;
  img.alt = `Иллюстрация модульных блоков набора «${product.name}»`;
  img.width = 420; img.height = 280; img.loading = 'lazy';
  return img;
}

function chooseProduct(id) {
  const item = catalog.find((product) => product.id === id);
  if (!item) return;
  $('#lead-product').value = id;
  $('#lead-quantity').value = item.minOrder;
  updateQuote();
  $('#lead-status').textContent = `Выбран набор «${item.name}». Заполните контактные данные.`;
  location.hash = 'request';
  leadForm.elements.name.focus({ preventScroll: true });
}

function showDetails(item) {
  const content = $('#dialog-content'); content.replaceChildren();
  content.append(productIllustration(item), element('p', 'eyebrow', CATEGORIES[item.category]), element('h2', '', item.name));
  content.querySelector('h2').id = 'dialog-title';
  content.append(element('p', '', item.description), element('p', 'dialog-specs', `${item.pieces} деталей · партия от ${item.minOrder} шт. · ${formatMoney(item.price)} за набор`));
  content.append(action('Выбрать набор ↗', 'button', () => { $('#product-dialog').close(); chooseProduct(item.id); }));
  $('#product-dialog').showModal();
}

function renderCatalog() {
  const items = filterCatalog(catalog, { category, query: $('#search').value, maxPrice: $('#max-price').value === 'all' ? Infinity : $('#max-price').value, sort: $('#sort').value });
  const grid = $('#catalog-grid'); grid.replaceChildren();
  $('#catalog-count').textContent = `Найдено наборов: ${items.length}`;
  if (!items.length) grid.append(element('p', 'empty-state', 'Подходящих наборов пока нет. Измените запрос или сбросьте фильтры.'));
  items.forEach((item) => {
    const card = element('article', 'product-card');
    const visual = element('div', `product-visual ${item.color}`);
    visual.append(element('span', 'product-category', CATEGORIES[item.category]), productIllustration(item), element('span', 'product-pieces', `${item.pieces} деталей`));
    const body = element('div', 'product-body');
    body.append(element('p', 'product-label', item.label), element('h3', '', item.name), element('p', 'product-description', item.description));
    const specs = element('div', 'product-specs'); specs.append(element('strong', '', formatMoney(item.price)), element('span', '', `за набор · от ${item.minOrder} шт.`));
    const controls = element('div', 'product-actions'); controls.append(action('В заявку ↗', 'button button-small', () => chooseProduct(item.id)), action('Подробнее', 'text-link', () => showDetails(item)));
    body.append(specs, controls); card.append(visual, body); grid.append(card);
  });
}

function updateLeadOptions() {
  const select = $('#lead-product'); const selected = select.value; select.replaceChildren();
  catalog.forEach((item) => { const option = element('option', '', item.name); option.value = item.id; select.append(option); });
  if (catalog.some((item) => item.id === selected)) select.value = selected;
  const current = catalog.find((item) => item.id === select.value);
  if (current && Number($('#lead-quantity').value) < current.minOrder) $('#lead-quantity').value = current.minOrder;
  updateQuote();
}

function updateQuote() {
  const product = catalog.find((item) => item.id === $('#lead-product').value);
  const box = $('#quote-box'); box.replaceChildren();
  if (!product) { box.append(element('p', '', 'Выберите набор.')); return; }
  $('#lead-quantity').min = product.minOrder;
  try {
    const quote = calculateQuote(product, $('#lead-quantity').value);
    const total = element('div', 'quote-total'); total.append(element('span', '', 'Ориентировочная стоимость'), element('strong', '', formatMoney(quote.total)));
    const caption = quote.discount ? `${quote.quantity} шт. × ${formatMoney(product.price)} · скидка ${quote.discount * 100}% (${formatMoney(quote.savings)})` : `${quote.quantity} шт. × ${formatMoney(product.price)} · без скидки`;
    box.append(total, element('p', '', caption), element('small', '', 'Учебный расчёт. Стоимость доставки и реальные коммерческие условия не рассчитываются.'));
  } catch (error) { box.append(element('p', '', error.message)); }
}

function showErrors(form, errors, prefix) {
  const attr = prefix === 'lead' ? 'data-error' : 'data-product-error';
  $$(`[${attr}]`, form).forEach((node) => { const field = node.getAttribute(attr); node.textContent = errors[field] ?? ''; const input = form.elements.namedItem(field); if (input) { input.setAttribute('aria-invalid', errors[field] ? 'true' : 'false'); node.id = `${prefix}-${field}-error`; input.setAttribute('aria-describedby', node.id); } });
  const first = Object.keys(errors)[0]; if (first) form.elements.namedItem(first)?.focus();
}

function clearCorrectedErrors(form, result, attribute, statusId) {
  $$(`[${attribute}]`, form).forEach((node) => {
    const field = node.getAttribute(attribute); const input = form.elements.namedItem(field);
    if (input?.getAttribute('aria-invalid') === 'true' && !result.errors[field]) {
      node.textContent = ''; input.setAttribute('aria-invalid', 'false');
    }
  });
  if (result.valid && $(statusId).textContent === 'Проверьте отмеченные поля.') $(statusId).textContent = '';
}
leadForm.addEventListener('input', () => {
  const data = Object.fromEntries(new FormData(leadForm)); data.consent = leadForm.elements.consent.checked;
  clearCorrectedErrors(leadForm, validateLead(data, catalog), 'data-error', '#lead-status');
});
productForm.addEventListener('input', () => {
  clearCorrectedErrors(productForm, validateProduct(Object.fromEntries(new FormData(productForm))), 'data-product-error', '#product-status');
});

leadForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(leadForm)); data.consent = leadForm.elements.consent.checked;
  const result = validateLead(data, catalog); showErrors(leadForm, result.errors, 'lead');
  if (!result.valid) { $('#lead-status').textContent = 'Проверьте отмеченные поля.'; return; }
  if (leads.length >= 100) { $('#lead-status').textContent = 'Достигнут лимит 100 заявок. Экспортируйте и удалите ненужные заявки в кабинете.'; return; }
  const product = catalog.find((item) => item.id === data.productId); const quote = calculateQuote(product, data.quantity);
  const lead = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...result.normalized, productName: product.name, total: quote.total, discount: quote.discount };
  if (!writeStorage(STORAGE.leads, [...leads, lead])) { $('#lead-status').textContent = 'Браузер запретил сохранение или хранилище заполнено. Заявка не сохранена.'; return; }
  leads.push(lead); renderLeads(); leadForm.reset(); updateLeadOptions();
  $('#lead-status').textContent = 'Учебная заявка сохранена в этом браузере. Посмотрите её в кабинете ниже.';
});
$('#lead-product').addEventListener('change', () => { const item = catalog.find((product) => product.id === $('#lead-product').value); if (item && Number($('#lead-quantity').value) < item.minOrder) $('#lead-quantity').value = item.minOrder; updateQuote(); });
$('#lead-quantity').addEventListener('input', updateQuote);

function renderLeads() {
  $('#lead-count').textContent = leads.length;
  $('#export-leads').disabled = leads.length === 0;
  const list = $('#leads-list'); list.replaceChildren();
  if (!leads.length) { list.append(element('p', 'empty-state', 'Заявок пока нет. Сохраните первую учебную заявку в форме выше.')); return; }
  [...leads].reverse().forEach((lead) => {
    const card = element('article', 'lead-card');
    const header = element('div', 'lead-card-header');
    header.append(element('h3', '', lead.company), element('span', '', new Date(lead.createdAt).toLocaleString('ru-RU')));
    card.append(header, element('p', '', `${lead.name} · ${lead.email}${lead.phone ? ` · ${lead.phone}` : ''}`), element('p', 'lead-summary', `${lead.productName} · ${lead.quantity} шт. · ${formatMoney(lead.total)}`));
    if (lead.message) card.append(element('p', 'lead-message', lead.message));
    card.append(action('Удалить заявку', 'text-link danger-link', () => {
      const next = leads.filter((item) => item.id !== lead.id);
      if (!writeStorage(STORAGE.leads, next)) { $('#lead-status').textContent = 'Не удалось удалить данные из хранилища.'; return; }
      leads = next; renderLeads();
    }));
    list.append(card);
  });
}

$('#export-leads').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify({ project: 'Модуль — учебный MVP', exportedAt: new Date().toISOString(), leads }, null, 2)], { type: 'application/json;charset=utf-8' }));
  const link = element('a'); link.href = url; link.download = `modul-demo-leads-${new Date().toISOString().slice(0, 10)}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});

function resetProductForm() { productForm.reset(); productForm.elements.id.value = ''; $('#editor-title').textContent = 'Добавить набор'; showErrors(productForm, {}, 'product'); $('#product-status').textContent = ''; }
function renderEditor() {
  const list = $('#editor-list'); list.replaceChildren();
  catalog.forEach((item) => {
    const row = element('article', 'editor-item'); row.append(element('h4', '', item.name), element('p', '', `${CATEGORIES[item.category]} · ${formatMoney(item.price)} · от ${item.minOrder} шт.`));
    const controls = element('div', 'editor-item-actions');
    controls.append(action('Изменить', 'text-link', () => {
      resetProductForm(); Object.entries(item).forEach(([key, value]) => { if (productForm.elements.namedItem(key)) productForm.elements.namedItem(key).value = value; });
      $('#editor-title').textContent = 'Изменить набор'; productForm.elements.name.focus();
    }), action('Удалить', 'text-link danger-link', () => {
      if (catalog.length === 1) { $('#product-status').textContent = 'В каталоге должен остаться хотя бы один набор.'; return; }
      const next = catalog.filter((product) => product.id !== item.id);
      if (!writeStorage(STORAGE.catalog, next)) { $('#product-status').textContent = 'Браузер запретил сохранение. Каталог не изменён.'; return; }
      catalog = next; resetProductForm(); refreshCatalog(); $('#product-status').textContent = `Набор «${item.name}» удалён. Существующие заявки сохранены.`;
    }));
    row.append(controls); list.append(row);
  });
}

function refreshCatalog() { renderCatalog(); renderEditor(); updateLeadOptions(); }
productForm.addEventListener('submit', (event) => {
  event.preventDefault(); const data = Object.fromEntries(new FormData(productForm)); const result = validateProduct(data); showErrors(productForm, result.errors, 'product');
  if (!result.valid) { $('#product-status').textContent = 'Проверьте отмеченные поля.'; return; }
  const id = data.id || `set-${crypto.randomUUID()}`;
  if (!data.id && catalog.length >= 100) { $('#product-status').textContent = 'Достигнут лимит 100 наборов.'; return; }
  const item = { id, ...result.normalized }; const next = data.id ? catalog.map((product) => product.id === id ? item : product) : [...catalog, item];
  if (!writeStorage(STORAGE.catalog, next)) { $('#product-status').textContent = 'Браузер запретил сохранение. Каталог не изменён.'; return; }
  catalog = next; resetProductForm(); refreshCatalog(); $('#product-status').textContent = `Набор «${item.name}» сохранён в этом браузере.`;
});
$('#cancel-edit').addEventListener('click', resetProductForm);
$('#reset-catalog').addEventListener('click', () => {
  const next = restoreCatalog(null);
  if (!writeStorage(STORAGE.catalog, next)) { $('#product-status').textContent = 'Браузер запретил сохранение. Каталог не изменён.'; return; }
  catalog = next; resetProductForm(); refreshCatalog(); $('#product-status').textContent = 'Исходный каталог восстановлен. Заявки сохранены.';
});

function setPanel(editor) {
  $('#leads-panel').hidden = editor; $('#editor-panel').hidden = !editor;
  [['#show-leads', !editor], ['#show-editor', editor]].forEach(([id, active]) => { $(id).classList.toggle('active', active); $(id).setAttribute('aria-pressed', active); });
}
$('#show-leads').addEventListener('click', () => setPanel(false)); $('#show-editor').addEventListener('click', () => setPanel(true));
$$('[data-category]').forEach((button) => button.addEventListener('click', () => { category = button.dataset.category; $$('[data-category]').forEach((tab) => { const active = tab === button; tab.classList.toggle('active', active); tab.setAttribute('aria-pressed', active); }); renderCatalog(); }));
$('#search').addEventListener('input', renderCatalog); $('#max-price').addEventListener('change', renderCatalog); $('#sort').addEventListener('change', renderCatalog);
$('#reset-filters').addEventListener('click', () => { category = 'all'; $('#search').value = ''; $('#max-price').value = 'all'; $('#sort').value = 'recommended'; $$('[data-category]').forEach((tab) => { const active = tab.dataset.category === 'all'; tab.classList.toggle('active', active); tab.setAttribute('aria-pressed', active); }); renderCatalog(); });
$('#menu-toggle').addEventListener('click', () => { const opened = $('#menu-toggle').getAttribute('aria-expanded') !== 'true'; $('#menu-toggle').setAttribute('aria-expanded', opened); $('#main-nav').classList.toggle('open', opened); });
$$('#main-nav a').forEach((link) => link.addEventListener('click', () => { $('#menu-toggle').setAttribute('aria-expanded', false); $('#main-nav').classList.remove('open'); }));
$('#close-dialog').addEventListener('click', () => $('#product-dialog').close());
$('#product-dialog').addEventListener('click', (event) => { if (event.target === $('#product-dialog')) { const rect = event.target.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.target.close(); } });
refreshCatalog(); renderLeads();
