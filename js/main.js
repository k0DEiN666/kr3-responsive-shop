/* DOMIKA - учебные сценарии интерфейса без внешних библиотек и backend. */
'use strict';

const PRODUCT_DATA = {
  vase: {
    title: 'Ваза «Оре»', category: 'Декор · мастерская «Тёплая глина»', price: 4200, image: 'vase',
    alt: 'Терракотовая керамическая ваза ручной работы с тонкими веточками',
    description: 'Скульптурная ваза с мягким силуэтом и приятной матовой фактурой. Хороша сама по себе и с одной-двумя сухими веточками.',
    variants: ['Песочный', 'Терракота'],
    specs: [['Материал', 'Керамика ручной работы'], ['Размер', 'Высота 24 см · диаметр 14 см'], ['Цвет', 'Терракотовый'], ['Уход', 'Протирать мягкой тканью']]
  },
  throw: {
    title: 'Плед «Линии»', category: 'Текстиль · мастерская «Тихое утро»', price: 8900, image: 'throw',
    alt: 'Сложенный оливковый плед с фактурной тканью и тонкими линиями',
    description: 'Лёгкий плед изо льна и хлопка - накинуть на плечи прохладным вечером или оставить на диване как мягкий цветовой акцент.',
    variants: ['Оливковый', 'Молочный'],
    specs: [['Материал', '55% лён, 45% хлопок'], ['Размер', '130 × 180 см'], ['Цвет', 'Оливковый'], ['Уход', 'Деликатная стирка при 30 °C']]
  },
  lamp: {
    title: 'Лампа «Тундра»', category: 'Свет · мастерская «Линия света»', price: 12800, image: 'lamp',
    alt: 'Настольная лампа с терракотовым купольным абажуром и тёплым светом',
    description: 'Небольшая настольная лампа с направленным мягким светом. Подойдёт для прикроватной тумбы, рабочего стола или уютного уголка для чтения.',
    variants: ['Терракотовый', 'Оливковый'],
    specs: [['Материал', 'Сталь с матовым покрытием'], ['Размер', 'Высота 34 см · основание 16 см'], ['Цоколь', 'E14, лампа до 7 Вт'], ['Уход', 'Сухая мягкая ткань']]
  },
  chair: {
    title: 'Кресло «Мягкий дом»', category: 'Мебель · мастерская «Северная форма»', price: 34900, image: 'chair',
    alt: 'Небольшое кресло с зелёной спинкой, терракотовым сиденьем и деревянным каркасом',
    description: 'Компактное кресло с открытым каркасом из ясеня и удобной мягкой посадкой. Спокойный силуэт легко вписывается в небольшую гостиную или спальню.',
    variants: ['Зелёный / терракота', 'Песочный / олива'],
    specs: [['Материал', 'Ясень, мебельная ткань'], ['Размер', 'Ширина 68 см · высота 78 см'], ['Нагрузка', 'До 120 кг'], ['Уход', 'Пылесосить мягкой насадкой']]
  },
  mug: {
    title: 'Кружка «Фьорд»', category: 'Посуда · мастерская «Тёплая глина»', price: 2400, image: 'mug',
    alt: 'Песочная керамическая кружка ручной работы на небольшом блюдце',
    description: 'Кружка с округлой формой и приятной на ощупь глазурью. Каждая сделана вручную, поэтому рисунок поверхности немного отличается.',
    variants: ['Песочный', 'Туманно-зелёный'],
    specs: [['Материал', 'Керамика, пищевая глазурь'], ['Объём', '320 мл'], ['Цвет', 'Песочный'], ['Уход', 'Можно мыть в посудомоечной машине']]
  },
  tray: {
    title: 'Поднос «Ритм»', category: 'Посуда · мастерская «Дерево рядом»', price: 3800, image: 'tray',
    alt: 'Дубовый поднос с ручками, керамической чашкой и льняной салфеткой',
    description: 'Лаконичный деревянный поднос для завтрака, любимой книги или небольшого домашнего ритуала. Поверхность защищена натуральным маслом.',
    variants: ['Натуральный дуб', 'Тёмный дуб'],
    specs: [['Материал', 'Массив дуба'], ['Размер', '38 × 24 × 3 см'], ['Покрытие', 'Масло на растительной основе'], ['Уход', 'Не замачивать, протирать насухо']]
  }
};

function formatPrice(value) {
  return `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value)} ₽`;
}

function russianProductWord(value) {
  const lastTwo = value % 100;
  const last = value % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return 'товаров';
  if (last === 1) return 'товар';
  if (last >= 2 && last <= 4) return 'товара';
  return 'товаров';
}

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (menuButton && siteNav) {
    const closeMenu = (returnFocus = false) => {
      siteNav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Открыть меню');
      if (returnFocus) menuButton.focus();
    };

    menuButton.addEventListener('click', () => {
      const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      siteNav.classList.toggle('is-open', willOpen);
      menuButton.setAttribute('aria-expanded', String(willOpen));
      menuButton.setAttribute('aria-label', willOpen ? 'Закрыть меню' : 'Открыть меню');
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu(true);
      }
    });

    document.addEventListener('click', (event) => {
      if (menuButton.getAttribute('aria-expanded') === 'true' &&
          !siteNav.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu();
      }
    });
  }

  // Счётчик демонстрационной корзины сохраняется только в этом браузере.
  const cartCountNodes = document.querySelectorAll('[data-cart-count]');
  let cartCount = 0;
  try {
    cartCount = Number.parseInt(window.localStorage.getItem('domika-cart-count') || '0', 10);
    if (!Number.isFinite(cartCount) || cartCount < 0) cartCount = 0;
  } catch (_) {
    cartCount = 0;
  }
  const updateCartCount = () => cartCountNodes.forEach((node) => { node.textContent = String(cartCount); });
  updateCartCount();

  const announcement = document.getElementById('site-announcement');
  let announcementTimer;
  const announce = (message) => {
    if (!announcement) return;
    announcement.textContent = message;
    announcement.classList.add('is-visible');
    window.clearTimeout(announcementTimer);
    announcementTimer = window.setTimeout(() => announcement.classList.remove('is-visible'), 2800);
  };

  document.querySelectorAll('[data-add-to-cart]').forEach((button) => {
    button.addEventListener('click', () => {
      cartCount += 1;
      updateCartCount();
      try { window.localStorage.setItem('domika-cart-count', String(cartCount)); } catch (_) { /* Хранилище может быть отключено. */ }
      const label = button.dataset.productLabel || 'Товар';
      announce(`${label} добавлен в учебную корзину. Сейчас в ней ${cartCount} ${russianProductWord(cartCount)}.`);
    });
  });

  // Фильтрация каталога, сортировка, поиск и фильтр по цене.
  const productGrid = document.getElementById('catalog-products');
  if (productGrid) {
    const filterForm = document.getElementById('catalog-filters');
    const categoryInputs = [...document.querySelectorAll('[data-filter-category]')];
    const searchInput = document.getElementById('product-search');
    const maxPrice = document.getElementById('max-price');
    const maxPriceOutput = document.getElementById('max-price-output');
    const sortSelect = document.getElementById('sort-products');
    const countOutput = document.getElementById('product-count');
    const noProducts = document.getElementById('no-products');
    const cards = [...productGrid.querySelectorAll('.product-card')];
    cards.forEach((card, index) => { card.dataset.originalOrder = String(index); });

    const filterPanel = document.getElementById('filter-panel');
    if (filterPanel && window.matchMedia) {
      const mobileFilterQuery = window.matchMedia('(max-width: 699px)');
      const setPanelForViewport = (event) => { filterPanel.open = !event.matches; };
      setPanelForViewport(mobileFilterQuery);
      if (typeof mobileFilterQuery.addEventListener === 'function') {
        mobileFilterQuery.addEventListener('change', setPanelForViewport);
      } else if (typeof mobileFilterQuery.addListener === 'function') {
        mobileFilterQuery.addListener(setPanelForViewport);
      }
    }

    // Поддерживаются ссылки с главной страницы вида catalog.html?category=decor.
    const categoryFromUrl = new URLSearchParams(window.location.search).get('category');
    if (categoryFromUrl) {
      const requestedInput = categoryInputs.find((input) => input.value === categoryFromUrl);
      if (requestedInput) requestedInput.checked = true;
    }

    const updateRangeText = () => {
      if (maxPrice && maxPriceOutput) maxPriceOutput.textContent = `до ${formatPrice(Number(maxPrice.value))}`;
    };

    const applyFilters = () => {
      const selectedCategories = categoryInputs.filter((input) => input.checked).map((input) => input.value);
      const query = (searchInput?.value || '').trim().toLocaleLowerCase('ru-RU');
      const priceLimit = Number(maxPrice?.value || Number.POSITIVE_INFINITY);
      const visible = [];

      cards.forEach((card) => {
        const categoryMatches = selectedCategories.length === 0 || selectedCategories.includes(card.dataset.category);
        const priceMatches = Number(card.dataset.price) <= priceLimit;
        const searchableText = `${card.dataset.search || ''} ${card.textContent}`.toLocaleLowerCase('ru-RU');
        const searchMatches = query.length === 0 || searchableText.includes(query);
        const shouldShow = categoryMatches && priceMatches && searchMatches;
        card.hidden = !shouldShow;
        if (shouldShow) visible.push(card);
      });

      const sortMode = sortSelect?.value || 'featured';
      const orderedCards = [...cards];
      if (sortMode === 'price-asc') orderedCards.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
      else if (sortMode === 'price-desc') orderedCards.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
      else if (sortMode === 'name') orderedCards.sort((a, b) => a.querySelector('.product-title').textContent.localeCompare(b.querySelector('.product-title').textContent, 'ru'));
      else orderedCards.sort((a, b) => Number(a.dataset.originalOrder) - Number(b.dataset.originalOrder));
      orderedCards.forEach((card) => productGrid.insertBefore(card, noProducts));

      if (countOutput) countOutput.textContent = `Найдено ${visible.length} ${russianProductWord(visible.length)}`;
      if (noProducts) noProducts.hidden = visible.length > 0;
      updateRangeText();
    };

    categoryInputs.forEach((input) => input.addEventListener('change', applyFilters));
    searchInput?.addEventListener('input', applyFilters);
    maxPrice?.addEventListener('input', applyFilters);
    sortSelect?.addEventListener('change', applyFilters);
    filterForm?.addEventListener('reset', () => window.requestAnimationFrame(() => {
      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'featured';
      applyFilters();
    }));
    applyFilters();
  }

  // Карточка товара открывается для любого товара по query-параметру ?item=slug.
  const productTitle = document.querySelector('[data-product-title]');
  if (productTitle) {
    const requestedItem = new URLSearchParams(window.location.search).get('item') || 'vase';
    const productKey = PRODUCT_DATA[requestedItem] ? requestedItem : 'vase';
    const product = PRODUCT_DATA[productKey];
    const titleNode = document.querySelector('[data-product-title]');
    const breadcrumbNode = document.querySelector('[data-product-breadcrumb]');
    const categoryNode = document.querySelector('[data-product-category-label]');
    const descriptionNode = document.querySelector('[data-product-description]');
    const priceNode = document.querySelector('[data-product-price]');
    const imageNode = document.querySelector('[data-product-image]');
    const webpNode = document.querySelector('[data-product-webp]');
    const addButton = document.querySelector('.product-info [data-add-to-cart]');
    const orderLink = document.querySelector('[data-order-link]');

    titleNode.textContent = product.title;
    if (breadcrumbNode) breadcrumbNode.textContent = product.title;
    if (categoryNode) categoryNode.textContent = product.category;
    if (descriptionNode) descriptionNode.textContent = product.description;
    if (priceNode) priceNode.textContent = formatPrice(product.price);
    if (imageNode) {
      imageNode.src = `images/${product.image}-960.jpg`;
      imageNode.srcset = `images/${product.image}-480.jpg 480w, images/${product.image}-960.jpg 960w`;
      imageNode.alt = product.alt;
    }
    if (webpNode) webpNode.srcset = `images/${product.image}-480.webp 480w, images/${product.image}-960.webp 960w`;
    if (addButton) {
      addButton.dataset.productLabel = product.title;
      addButton.setAttribute('aria-label', `Добавить ${product.title} в учебную корзину`);
    }
    if (orderLink) orderLink.href = `order.html?item=${encodeURIComponent(productKey)}`;
    document.title = `${product.title} - Домика`;

    const variantFieldset = document.querySelector('[data-product-variants]');
    const variantList = document.querySelector('[data-variant-list]');
    if (variantFieldset && variantList && product.variants?.length) {
      variantFieldset.hidden = false;
      variantList.replaceChildren();
      product.variants.forEach((variant, index) => {
        const label = document.createElement('label');
        label.className = 'variant-option';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'product-variant';
        input.value = variant;
        input.checked = index === 0;
        input.setAttribute('aria-label', `Вариант: ${variant}`);
        const text = document.createElement('span');
        text.textContent = variant;
        label.append(input, text);
        variantList.append(label);
      });
    }

    const tableBody = document.querySelector('[data-spec-table]');
    const specCards = document.querySelector('[data-spec-cards]');
    if (tableBody) {
      tableBody.replaceChildren();
      product.specs.forEach(([name, value]) => {
        const row = document.createElement('tr');
        const heading = document.createElement('th');
        heading.scope = 'row';
        heading.textContent = name;
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(heading, cell);
        tableBody.append(row);
      });
    }
    if (specCards) {
      specCards.replaceChildren();
      product.specs.forEach(([name, value]) => {
        const item = document.createElement('div');
        item.className = 'spec-card';
        const term = document.createElement('dt');
        term.textContent = name;
        const detail = document.createElement('dd');
        detail.textContent = value;
        item.append(term, detail);
        specCards.append(item);
      });
    }

    // Если в URL страницы заказа передан товар, заранее выбираем его в форме.
    const orderSelect = document.getElementById('product-choice');
    if (orderSelect && PRODUCT_DATA[productKey]) orderSelect.value = productKey;
  }

  // Предварительный выбор товара при переходе по order.html?item=slug.
  const orderSelect = document.getElementById('product-choice');
  if (orderSelect) {
    const itemFromUrl = new URLSearchParams(window.location.search).get('item');
    if (itemFromUrl && PRODUCT_DATA[itemFromUrl]) orderSelect.value = itemFromUrl;
  }

  // Валидация остаётся нативной; подтверждение демонстрирует только клиентский интерфейс.
  document.querySelectorAll('[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const status = form.querySelector('[data-form-status]');
      if (status) {
        status.textContent = form.id === 'order-form'
          ? 'Спасибо! Заявка показана в демо-режиме. Данные не отправлены на сервер.'
          : 'Спасибо за сообщение! Это демонстрация: данные не отправлены на сервер.';
      }
      form.reset();
    });
  });

  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = '2026'; });
});
