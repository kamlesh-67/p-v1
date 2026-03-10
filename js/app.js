// PartnerHub — Shared App Logic
// ================================================

// ------------------------------------------------
// PRODUCT DATA
// ------------------------------------------------
const PH_PRODUCTS = [
  { id: 1, name: 'ProBook Laptop 15"', sku: 'LP-PRO-001', category: 'Laptops', price: 1249.99, stock: 45, unit: 'piece', image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=480&q=80' },
  { id: 2, name: 'AudioMax Pro Headphones', sku: 'HP-AUD-002', category: 'Audio', price: 299.99, stock: 120, unit: 'piece', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=480&q=80' },
  { id: 3, name: 'Precision Watch Executive', sku: 'WT-PRE-003', category: 'Accessories', price: 599.99, stock: 8, unit: 'piece', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=480&q=80' },
  { id: 4, name: 'CapturePlus DSLR Camera', sku: 'CM-CAP-004', category: 'Cameras', price: 899.99, stock: 23, unit: 'piece', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=480&q=80' },
  { id: 5, name: 'ErgoKeys Mechanical 75%', sku: 'KB-ERG-005', category: 'Peripherals', price: 149.99, stock: 67, unit: 'piece', image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=480&q=80' },
  { id: 6, name: 'SwiftRun Pro Sneakers', sku: 'SN-SWT-006', category: 'Footwear', price: 129.99, stock: 3, unit: 'pair', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=480&q=80' },
  { id: 7, name: 'NoiseFree TWS Earbuds', sku: 'EB-NF-007', category: 'Audio', price: 199.99, stock: 89, unit: 'piece', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165cd8b?w=480&q=80' },
  { id: 8, name: 'UltraSlim Laptop 13"', sku: 'LP-ULT-008', category: 'Laptops', price: 999.99, stock: 31, unit: 'piece', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=480&q=80' },
  { id: 9, name: 'ChargePlus Wireless Pad', sku: 'WC-CHG-009', category: 'Accessories', price: 49.99, stock: 0, unit: 'piece', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=480&q=80' },
  { id: 10, name: 'ViewMax Monitor 27"', sku: 'MN-VW-010', category: 'Monitors', price: 449.99, stock: 14, unit: 'piece', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=480&q=80' },
  { id: 11, name: 'SteadyClick Pro Mouse', sku: 'MS-STD-011', category: 'Peripherals', price: 79.99, stock: 55, unit: 'piece', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=480&q=80' },
  { id: 12, name: 'TravelPro Backpack 30L', sku: 'BG-TRV-012', category: 'Bags', price: 89.99, stock: 42, unit: 'piece', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=480&q=80' },
];

// ------------------------------------------------
// ORDERS DATA
// ------------------------------------------------
const PH_ORDERS = [
  { id: 'ORD-2024-0091', date: '2024-03-08', customer: 'Nexus Corp', items: 4, total: 3499.96, status: 'shipped', payment: 'Bank Transfer' },
  { id: 'ORD-2024-0090', date: '2024-03-07', customer: 'Vertex Solutions', items: 2, total: 1399.98, status: 'processing', payment: 'Credit Card' },
  { id: 'ORD-2024-0089', date: '2024-03-07', customer: 'Apex Industries', items: 7, total: 5249.93, status: 'delivered', payment: 'Bank Transfer' },
  { id: 'ORD-2024-0088', date: '2024-03-06', customer: 'Delta Systems', items: 1, total: 599.99, status: 'pending', payment: 'Credit Card' },
  { id: 'ORD-2024-0087', date: '2024-03-05', customer: 'Orion Tech', items: 3, total: 2149.97, status: 'delivered', payment: 'Bank Transfer' },
  { id: 'ORD-2024-0086', date: '2024-03-04', customer: 'Summit Partners', items: 5, total: 4299.95, status: 'cancelled', payment: 'Credit Card' },
  { id: 'ORD-2024-0085', date: '2024-03-03', customer: 'Cascade Retail', items: 2, total: 799.98, status: 'delivered', payment: 'Bank Transfer' },
  { id: 'ORD-2024-0084', date: '2024-03-01', customer: 'Prism Distributors', items: 6, total: 7199.94, status: 'shipped', payment: 'Credit Card' },
];

// ------------------------------------------------
// CART STATE
// ------------------------------------------------
let phCart = JSON.parse(localStorage.getItem('ph_cart') || '[]');

function saveCart() {
  localStorage.setItem('ph_cart', JSON.stringify(phCart));
  updateCartBadge();
}

function getCartCount() {
  return phCart.reduce((sum, i) => sum + i.qty, 0);
}

function getCartSubtotal() {
  return phCart.reduce((sum, i) => sum + (i.price * i.qty), 0);
}

function addToCart(productId, qty = 1) {
  const product = PH_PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = phCart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    phCart.push({ id: product.id, name: product.name, sku: product.sku, price: product.price, image: product.image, qty });
  }
  saveCart();
  showCartToast(product.name);
  refreshCartDrawer();
}

function removeFromCart(productId) {
  phCart = phCart.filter(i => i.id !== productId);
  saveCart();
  refreshCartDrawer();
}

function updateCartQty(productId, qty) {
  const item = phCart.find(i => i.id === productId);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart();
    refreshCartDrawer();
  }
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-count-badge');
  const count = getCartCount();
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

// ------------------------------------------------
// AUTH
// ------------------------------------------------
function checkAuth() {
  const publicPages = ['index.html', '/'];
  const path = window.location.pathname;
  const isPublic = publicPages.some(p => path.endsWith(p)) || path.endsWith('/partnerhub/');
  if (!localStorage.getItem('ph_auth') && !isPublic) {
    window.location.href = 'index.html';
  }
}

function logout() {
  localStorage.removeItem('ph_auth');
  localStorage.removeItem('ph_user');
  window.location.href = 'index.html';
}

// ------------------------------------------------
// TOAST NOTIFICATION
// ------------------------------------------------
function showCartToast(productName) {
  let toast = document.getElementById('ph-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'ph-toast';
    toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] transition-all duration-300';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <div class="flex items-center gap-3 bg-gray-900 text-white text-sm px-4 py-3 rounded shadow-lg">
      <svg class="w-4 h-4 text-primary-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      <span><strong>${productName}</strong> added to cart</span>
    </div>`;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// ------------------------------------------------
// SIDEBAR HTML
// ------------------------------------------------
function getSidebarHTML(active) {
  const nav = [
    { id: 'dashboard', label: 'Dashboard', href: 'dashboard.html', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>' },
    { id: 'products', label: 'Products', href: 'products.html', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>' },
    { id: 'stock', label: 'Stock', href: 'stock.html', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>' },
    { id: 'orders', label: 'Orders', href: 'orders.html', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>' },
    { id: 'analytics', label: 'Analytics', href: 'analytics.html', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>' },
    { id: 'partners', label: 'Partners', href: 'partners.html', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>' },
    { id: 'billing', label: 'Billing', href: 'billing.html', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>' },
    { id: 'settings', label: 'Settings', href: 'settings.html', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>' },
    { id: 'cart', label: 'Cart', href: 'cart.html', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>' },
  ];

  const user = JSON.parse(localStorage.getItem('ph_user') || '{"name":"Demo User","company":"PartnerHub Inc."}');

  const navItems = nav.map(item => {
    const isActive = item.id === active;
    return `
      <a href="${item.href}" class="flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${isActive ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}">
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">${item.icon}</svg>
        <span>${item.label}</span>
        ${item.id === 'cart' ? `<span class="cart-count-badge ml-auto text-xs bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded font-medium" style="display:none">0</span>` : ''}
      </a>`;
  }).join('');

  return `
    <!-- Mobile Backdrop -->
    <div id="sidebar-backdrop" class="fixed inset-0 bg-gray-900/40 z-30 lg:hidden hidden" onclick="closeSidebar()"></div>

    <!-- Sidebar -->
    <aside id="app-sidebar-inner"
      class="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-100 z-40 flex flex-col
             transition-transform duration-300 -translate-x-full lg:translate-x-0">

      <!-- Brand -->
      <div class="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100 shrink-0">
        <div class="w-7 h-7 bg-primary-700 rounded flex items-center justify-center shrink-0">
          <span class="text-white font-bold text-xs tracking-wide">PH</span>
        </div>
        <span class="font-semibold text-gray-900 text-sm tracking-tight">PartnerHub</span>
        <span class="ml-auto text-xs text-gray-400 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded">B2B</span>
      </div>

      <!-- Nav Label -->
      <div class="px-5 pt-5 pb-1">
        <span class="text-xs font-medium text-gray-400 uppercase tracking-widest">Navigation</span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        ${navItems}
      </nav>

      <!-- Divider -->
      <div class="border-t border-gray-100 mx-3"></div>

      <!-- User + Logout -->
      <div class="p-3 space-y-1">
        <div class="flex items-center gap-3 px-3 py-2">
          <div class="w-7 h-7 rounded bg-primary-100 flex items-center justify-center shrink-0">
            <span class="text-primary-700 text-xs font-semibold">${user.name.charAt(0).toUpperCase()}</span>
          </div>
          <div class="min-w-0">
            <div class="text-sm font-medium text-gray-900 truncate">${user.name}</div>
            <div class="text-xs text-gray-400 truncate">${user.company}</div>
          </div>
        </div>
        <button onclick="logout()" class="w-full flex items-center gap-3 px-3 py-2 rounded text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          <span>Sign out</span>
        </button>
      </div>
    </aside>`;
}

// ------------------------------------------------
// HEADER HTML
// ------------------------------------------------
function getHeaderHTML(title) {
  return `
    <header class="sticky top-0 z-20 bg-white border-b border-gray-100">
      <div class="flex items-center gap-4 px-6 h-14">
        <!-- Mobile Hamburger -->
        <button onclick="toggleSidebar()" class="lg:hidden p-1.5 rounded text-gray-500 hover:bg-gray-100 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        <!-- Page Title -->
        <h1 class="text-sm font-semibold text-gray-900 tracking-tight">${title}</h1>

        <div class="flex items-center gap-2 ml-auto">
          <!-- Cart Button -->
          <button onclick="openCartDrawer()" class="relative p-2 rounded text-gray-500 hover:bg-gray-100 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span class="cart-count-badge absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-700 text-white text-xs rounded-full items-center justify-center font-medium" style="display:none">0</span>
          </button>

          <!-- Notifications -->
          <button class="relative p-2 rounded text-gray-500 hover:bg-gray-100 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full"></span>
          </button>

          <!-- User Avatar -->
          <div class="w-8 h-8 rounded bg-primary-100 flex items-center justify-center cursor-pointer ml-1">
            <span class="text-primary-700 text-xs font-semibold">DU</span>
          </div>
        </div>
      </div>
    </header>`;
}

// ------------------------------------------------
// CART DRAWER HTML
// ------------------------------------------------
function getCartDrawerHTML() {
  return `
    <!-- Cart Drawer Backdrop -->
    <div id="cart-backdrop" class="fixed inset-0 bg-gray-900/40 z-[80] hidden" onclick="closeCartDrawer()"></div>

    <!-- Cart Drawer -->
    <div id="cart-drawer"
      class="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white border-l border-gray-100 z-[90] flex flex-col transform translate-x-full transition-transform duration-300">

      <!-- Drawer Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold text-gray-900">Cart</span>
          <span class="cart-count-badge text-xs bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded font-medium" style="display:none">0</span>
        </div>
        <button onclick="closeCartDrawer()" class="p-1.5 rounded text-gray-400 hover:bg-gray-100 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto" id="cart-drawer-items"></div>

      <!-- Cart Footer -->
      <div class="border-t border-gray-100 p-5 shrink-0 space-y-3" id="cart-drawer-footer"></div>
    </div>`;
}

function refreshCartDrawer() {
  const itemsEl = document.getElementById('cart-drawer-items');
  const footerEl = document.getElementById('cart-drawer-footer');
  if (!itemsEl || !footerEl) return;

  if (phCart.length === 0) {
    itemsEl.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full py-16 text-center px-5">
        <svg class="w-12 h-12 text-gray-200 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <p class="text-sm text-gray-400">Your cart is empty</p>
        <a href="products.html" class="mt-3 text-sm text-primary-700 hover:underline">Browse products</a>
      </div>`;
    footerEl.innerHTML = '';
  } else {
    itemsEl.innerHTML = `<div class="divide-y divide-gray-50 px-5">` +
      phCart.map(item => `
        <div class="py-4 flex gap-3">
          <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-cover rounded border border-gray-100 shrink-0">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">${item.name}</p>
            <p class="text-xs text-gray-400 mt-0.5">${item.sku}</p>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center border border-gray-200 rounded overflow-hidden">
                <button onclick="updateCartQty(${item.id}, ${item.qty - 1})" class="px-2 py-0.5 text-gray-500 hover:bg-gray-50 text-sm transition-colors">-</button>
                <span class="px-2 text-xs font-medium text-gray-700 border-x border-gray-200">${item.qty}</span>
                <button onclick="updateCartQty(${item.id}, ${item.qty + 1})" class="px-2 py-0.5 text-gray-500 hover:bg-gray-50 text-sm transition-colors">+</button>
              </div>
              <span class="text-sm font-semibold text-gray-900">$${(item.price * item.qty).toFixed(2)}</span>
            </div>
          </div>
          <button onclick="removeFromCart(${item.id})" class="shrink-0 p-1 text-gray-300 hover:text-red-500 transition-colors self-start mt-0.5">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>`).join('') +
      `</div>`;

    const subtotal = getCartSubtotal();
    footerEl.innerHTML = `
      <div class="flex justify-between text-sm text-gray-600">
        <span>Subtotal (${getCartCount()} items)</span>
        <span class="font-semibold text-gray-900">$${subtotal.toFixed(2)}</span>
      </div>
      <div class="flex justify-between text-xs text-gray-400">
        <span>Shipping calculated at checkout</span>
      </div>
      <a href="cart.html" class="block w-full text-center text-sm font-medium text-gray-700 border border-gray-200 rounded px-4 py-2 hover:bg-gray-50 transition-colors">View Cart</a>
      <a href="checkout.html" class="block w-full text-center text-sm font-medium text-white bg-primary-700 rounded px-4 py-2 hover:bg-primary-800 transition-colors">Checkout</a>`;
  }
  updateCartBadge();
}

// ------------------------------------------------
// SIDEBAR TOGGLE
// ------------------------------------------------
function toggleSidebar() {
  const sidebar = document.getElementById('app-sidebar-inner');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!sidebar) return;
  const isOpen = !sidebar.classList.contains('-translate-x-full');
  if (isOpen) {
    sidebar.classList.add('-translate-x-full');
    backdrop && backdrop.classList.add('hidden');
  } else {
    sidebar.classList.remove('-translate-x-full');
    backdrop && backdrop.classList.remove('hidden');
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('app-sidebar-inner');
  const backdrop = document.getElementById('sidebar-backdrop');
  sidebar && sidebar.classList.add('-translate-x-full');
  backdrop && backdrop.classList.add('hidden');
}

// ------------------------------------------------
// CART DRAWER TOGGLE
// ------------------------------------------------
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  refreshCartDrawer();
  drawer && drawer.classList.remove('translate-x-full');
  backdrop && backdrop.classList.remove('hidden');
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  drawer && drawer.classList.add('translate-x-full');
  backdrop && backdrop.classList.add('hidden');
}

// ------------------------------------------------
// PAGE INIT
// ------------------------------------------------
function initPage(activePage, pageTitle) {
  checkAuth();

  // Inject sidebar
  const sidebarContainer = document.getElementById('sidebar-container');
  if (sidebarContainer) {
    sidebarContainer.innerHTML = getSidebarHTML(activePage);
  }

  // Inject header
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    headerContainer.innerHTML = getHeaderHTML(pageTitle);
  }

  // Inject cart drawer
  const cartContainer = document.getElementById('cart-drawer-container');
  if (cartContainer) {
    cartContainer.innerHTML = getCartDrawerHTML();
  }

  // Update cart badges
  updateCartBadge();
}
