// ══════════════════════════════════════════════
//  ACCOUNTS SYSTEM
// ══════════════════════════════════════════════

const DEFAULT_ACCOUNTS = [
    { username: 'kim', password: 'password' }
];

function getAccounts() {
    const stored = localStorage.getItem('saks-accounts');
    const extra = stored ? JSON.parse(stored) : [];
    return [...DEFAULT_ACCOUNTS, ...extra];
}

function saveNewAccount(username, password) {
    const stored = localStorage.getItem('saks-accounts');
    const extra = stored ? JSON.parse(stored) : [];
    extra.push({ username, password });
    localStorage.setItem('saks-accounts', JSON.stringify(extra));
}

function switchTab(tab) {
    document.getElementById('login-form').style.display = tab === 'login' ? 'flex' : 'none';
    document.getElementById('register-form').style.display = tab === 'register' ? 'flex' : 'none';
    document.getElementById('tab-login').classList.toggle('active', tab === 'login');
    document.getElementById('tab-register').classList.toggle('active', tab === 'register');
    document.getElementById('login-error').style.display = 'none';
    document.getElementById('reg-error').style.display = 'none';
    document.getElementById('reg-success').style.display = 'none';
}

function doLogin() {
    const username = document.getElementById('login-username').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    const errEl = document.getElementById('login-error');
    if (!username || !password) {
        errEl.textContent = 'Please enter username and password.';
        errEl.style.display = 'block';
        return;
    }
    const accounts = getAccounts();
    const match = accounts.find(a => a.username.toLowerCase() === username && a.password === password);
    if (match) {
        localStorage.setItem('saks-logged-in', match.username);
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('site-wrapper').style.display = 'block';
        initSite();
    } else {
        errEl.textContent = 'Invalid username or password.';
        errEl.style.display = 'block';
    }
}

function doRegister() {
    const username = document.getElementById('reg-username').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    const errEl = document.getElementById('reg-error');
    const sucEl = document.getElementById('reg-success');
    errEl.style.display = 'none';
    sucEl.style.display = 'none';
    if (!username || !password || !confirm) { errEl.textContent = 'All fields are required.'; errEl.style.display = 'block'; return; }
    if (username.length < 3) { errEl.textContent = 'Username must be at least 3 characters.'; errEl.style.display = 'block'; return; }
    if (password.length < 6) { errEl.textContent = 'Password must be at least 6 characters.'; errEl.style.display = 'block'; return; }
    if (password !== confirm) { errEl.textContent = 'Passwords do not match.'; errEl.style.display = 'block'; return; }
    const accounts = getAccounts();
    if (accounts.find(a => a.username.toLowerCase() === username)) { errEl.textContent = 'Username already taken.'; errEl.style.display = 'block'; return; }
    saveNewAccount(username, password);
    sucEl.textContent = `Account "${username}" created! You can now log in.`;
    sucEl.style.display = 'block';
    document.getElementById('reg-username').value = '';
    document.getElementById('reg-password').value = '';
    document.getElementById('reg-confirm').value = '';
    setTimeout(() => switchTab('login'), 1500);
}

function doLogout() {
    localStorage.removeItem('saks-logged-in');
    location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
    ['login-username', 'login-password'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
    });
    ['reg-username', 'reg-password', 'reg-confirm'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') doRegister(); });
    });
    const loggedIn = localStorage.getItem('saks-logged-in');
    if (loggedIn) {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('site-wrapper').style.display = 'block';
        initSite();
    }
});


// ══════════════════════════════════════════════
//  SITE INIT
// ══════════════════════════════════════════════

function initSite() {
    hideEverything();
    document.getElementById('original-content').style.display = 'flex';
    document.getElementById('home-carousel').style.display = 'flex';
    document.getElementById('home-honarable').style.display = 'flex';
    document.querySelector('.brand-carousels-section').style.display = 'flex';

    const saved = localStorage.getItem('saks-nickname');
    const termsAccepted = localStorage.getItem('saks-terms');
    if (!saved) {
        const nick = document.getElementById('nickname-slide');
        nick.style.display = 'block';
        setTimeout(() => nick.classList.add('open'), 10);
    } else if (!termsAccepted) {
        const terms = document.getElementById('terms-slide');
        terms.style.display = 'block';
        setTimeout(() => terms.classList.add('open'), 10);
    }

    updateCartBadge();
    restoreCartHighlights();
    initCarousel();
}


// ══════════════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════════════

function hideEverything() {
    document.getElementById('original-content').style.display = 'none';
    document.getElementById('home-carousel').style.display = 'none';
    document.getElementById('home-honarable').style.display = 'none';
    document.querySelector('.brand-carousels-section').style.display = 'none';
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
}


function openPage(pageId) {
    hideEverything();
    document.getElementById(pageId).style.display = 'flex';
    restoreCartHighlights();
}

function showPage(pageId) {
    hideEverything();
    document.getElementById(pageId).style.display = 'flex';
    restoreCartHighlights();
}

function showHome() {
    hideEverything();
    document.getElementById('original-content').style.display = 'flex';
    document.getElementById('home-carousel').style.display = 'flex';
    document.getElementById('home-honarable').style.display = 'flex';
    document.querySelector('.brand-carousels-section').style.display = 'flex';
}

function goBack() { showHome(); }
function openAbout() {
    document.querySelector('.site-footer').scrollIntoView({ behavior: 'smooth' });
}
function openContact() {
    document.querySelector('.site-footer').scrollIntoView({ behavior: 'smooth' });
}
function closeModal(id) { document.getElementById(id).style.display = 'none'; }


// ══════════════════════════════════════════════
//  CART SYSTEM
// ══════════════════════════════════════════════

let cart = JSON.parse(localStorage.getItem('saks-cart') || '[]');

function saveCart() { localStorage.setItem('saks-cart', JSON.stringify(cart)); }

function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (cart.length > 0) { badge.textContent = cart.length; badge.style.display = 'flex'; }
    else { badge.style.display = 'none'; }
}

function toggleCart(imgEl, name, price, imgSrc) {
    const card = imgEl.closest('.shoe-card');
    const existing = cart.findIndex(item => item.name === name);
    if (existing >= 0) { cart.splice(existing, 1); card.classList.remove('in-cart'); }
    else { cart.push({ name, price, img: imgSrc }); card.classList.add('in-cart'); }
    saveCart();
    updateCartBadge();
}

function restoreCartHighlights() {
    cart.forEach(item => {
        const card = document.getElementById('card-' + item.name);
        if (card) card.classList.add('in-cart');
    });
}

function openCart() { document.getElementById('cart-modal').style.display = 'flex'; renderCartModal(); }
function closeCart() { document.getElementById('cart-modal').style.display = 'none'; }

function parsePrice(priceStr) {
    const parts = priceStr.replace(/₱/g, '').split('–').map(s => s.trim());
    function toNum(s) {
        s = s.toLowerCase().replace(/,/g, '');
        if (s.endsWith('k')) return parseFloat(s) * 1000;
        return parseFloat(s);
    }
    return { min: toNum(parts[0]), max: toNum(parts[1]) };
}

function formatPeso(num) {
    return '₱' + num.toLocaleString('en-PH');
}

function renderCartModal() {
    const listEl = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('cart-total-display');
    if (cart.length === 0) {
        listEl.innerHTML = '<div class="cart-empty-msg">Your cart is empty.<br>Click on a product image to add it!</div>';
        totalEl.textContent = '—';
        return;
    }
    let html = '';
    let totalMin = 0;
    let totalMax = 0;
    cart.forEach((item, idx) => {
        const { min, max } = parsePrice(item.price);
        totalMin += min;
        totalMax += max;
        html += `<div class="cart-item-row">
            <img src="${item.img}" alt="${item.name}" class="cart-item-img" onerror="this.style.opacity='0.3'">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price}</div>
            </div>
            <button class="cart-remove-btn" onclick="removeFromCart(${idx})">Remove</button>
        </div>`;
    });
    listEl.innerHTML = html;
    totalEl.textContent = `${formatPeso(totalMin)} – ${formatPeso(totalMax)}`;
}

function removeFromCart(idx) {
    const removed = cart[idx];
    cart.splice(idx, 1);
    saveCart();
    updateCartBadge();
    const card = document.getElementById('card-' + removed.name);
    if (card) card.classList.remove('in-cart');
    renderCartModal();
}

function confirmCart() {
    if (cart.length === 0) { alert('Your cart is empty!'); return; }
    cart = [];
    saveCart();
    updateCartBadge();
    document.querySelectorAll('.shoe-card.in-cart').forEach(c => c.classList.remove('in-cart'));
    closeCart();
    showToast();
}
function showToast() {
    const toast = document.createElement('div');
    toast.id = 'order-toast';
    toast.innerHTML = `
        <span style="font-size:15;">✅</span>
        <div>
            <div style="font-weight:bold; font-size:25px; letter-spacing:1px;">ORDER CONFIRMED!</div>
            <div style="font-size:25px; opacity:0.8; margin-top:2px;">Thank you for shopping at SAKS</div>
        </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}
// ══════════════════════════════════════════════
//  SEARCH
// ══════════════════════════════════════════════

const catalog = [
    { name: "Nike Pegasus", price: "₱7k – ₱12k", img: "Top Selling/Nike Pegasus.png", page: "top-selling" },
    { name: "Jordan 1 85 Bred", price: "₱27k – ₱32k", img: "Top Selling/Jordan 1 '85 bred.png", page: "top-selling" },
    { name: "Jordan X Nigel Sylvester Better With Time", price: "₱13k – ₱16k", img: "Top Selling/Jordan X Nigel Sylvester.png", page: "top-selling" },
    { name: "New Balance 2000", price: "₱7k – ₱10k", img: "Top Selling/New Balance 2000.png", page: "top-selling" },
    { name: "Jordan 5 Black Metallic Reimagined", price: "₱8k – ₱9k", img: "Top Selling/Jordan 5 black metallic reimagined.png", page: "top-selling" },
    { name: "Adidas Evo SL", price: "₱8k – ₱9k", img: "Top Selling/Adidas evo sl.png", page: "top-selling" },
    { name: "Jordan 1 Union Chicago Shadow", price: "₱19k – ₱25k", img: "Top Selling/Jordan 1 union Chicago shadow.png", page: "top-selling" },
    { name: "Jordan 4 White Cements", price: "₱13k – ₱15k", img: "Top Selling/Jordan 4 white cements.png", page: "top-selling" },
    { name: "Jordan 5 Tokyo", price: "₱11k – ₱18k", img: "Top Selling/Jordan 5 Tokyo.png", page: "top-selling" },
    { name: "Adidas Jellyfish", price: "₱14k – ₱17k", img: "Top Selling/Adidas jellyfish.png", page: "top-selling" },
    { name: "Jordan 4 Nigel Sylvester Brick by Brick", price: "₱22k – ₱36k", img: "Top Selling/Jordan 4 Nigel Sylvester brick by brick.png", page: "top-selling" },
    { name: "Nike Air Force 1", price: "₱6k – ₱8k", img: "Most Famous/Nike Air Force 1.png", page: "most-famous" },
    { name: "Adidas Samba", price: "₱3k – ₱6k", img: "Most Famous/Adidas Samba.png", page: "most-famous" },
    { name: "Air Jordan 1", price: "₱13k – ₱14k", img: "Most Famous/Air Jordan 1.png", page: "most-famous" },
    { name: "Adidas Gazelle", price: "₱7k – ₱9k", img: "Most Famous/Adidas Gazelle.png", page: "most-famous" },
    { name: "New Balance 9060", price: "₱7k – ₱10k", img: "Most Famous/New Balance 9060.png", page: "most-famous" },
    { name: "Nike Air Max 97", price: "₱5k – ₱10k", img: "Most Famous/Nike Air Max 97.png", page: "most-famous" },
    { name: "Adidas Stan Smith", price: "₱5k – ₱7k", img: "Most Famous/Adidas Stan Smith.png", page: "most-famous" },
    { name: "Nike Total 90", price: "₱3k – ₱5k", img: "Newly Released/Nike total90.png", page: "newly-released" },
    { name: "Nike Air Max 95 OG", price: "₱7k – ₱10k", img: "Newly Released/Nike Air Max 95 OG.png", page: "newly-released" },
    { name: "ABZORB 2000", price: "₱9k – ₱10k", img: "Newly Released/ABZORB 2000.png", page: "newly-released" },
    { name: "204L", price: "₱6k – ₱9k", img: "Newly Released/204L.png", page: "newly-released" },
    { name: "Deviate NITRO", price: "₱6k – ₱7k", img: "Newly Released/Deviate NITRO.png", page: "newly-released" },
    { name: "HALI 1 Smoke", price: "₱7k – ₱9k", img: "Newly Released/HALI 1 SMOKE.png", page: "newly-released" },
    { name: "Cloudfoam Flex Lounge Rapidfit", price: "₱3k – ₱5k", img: "Newly Released/Cloudfoam flex lounge rapidfit.png", page: "newly-released" },
    { name: "Barreda Lo", price: "₱3k – ₱6k", img: "Newly Released/BARREDA LO.png", page: "newly-released" },
    { name: "Air Jordan 1 Retro High OG", price: "₱13k – ₱14k", img: "Nike/Jordan/Air Jordan 1 Retro High OG.png", page: "nike-jordan" },
    { name: "Air Jordan 11 Retro", price: "₱15k – ₱20k", img: "Nike/Jordan/Air Jordan 11 Retro.png", page: "nike-jordan" },
    { name: "Air Jordan 4 Retro", price: "₱13k – ₱15k", img: "Nike/Jordan/Air Jordan 4 Retro.png", page: "nike-jordan" },
    { name: "Nike Air Force 1 Low", price: "₱6k – ₱8k", img: "Nike/Lifestyle/Nike Air Force 1 Low.png", page: "nike-lifestyle" },
    { name: "Nike Air Max 90", price: "₱7k – ₱10k", img: "Nike/Lifestyle/Nike Air Max 90.png", page: "nike-lifestyle" },
    { name: "Nike Dunk Low", price: "₱7k – ₱9k", img: "Nike/Lifestyle/Nike Dunk Low.png", page: "nike-lifestyle" },
    { name: "LeBron 21", price: "₱9k – ₱12k", img: "Nike/Basketball/LeBron 21.png", page: "nike-basketball" },
    { name: "Nike KD 16", price: "₱8k – ₱11k", img: "Nike/Basketball/Nike KD 16.png", page: "nike-basketball" },
    { name: "Nike Sabrina 1", price: "₱7k – ₱9k", img: "Nike/Basketball/Nike Sabrina 1.png", page: "nike-basketball" },
    { name: "Nike Air Zoom Pegasus 40", price: "₱7k – ₱9k", img: "Nike/Running/Nike Air Zoom Pegasus 40.png", page: "nike-running" },
    { name: "Nike InfinityRN 4", price: "₱8k – ₱10k", img: "Nike/Running/Nike InfinityRN 4.png", page: "nike-running" },
    { name: "Nike ZoomX Vaporfly NEXT 3", price: "₱18k – ₱22k", img: "Nike/Running/Nike ZoomX Vaporfly NEXT% 3.png", page: "nike-running" },
    { name: "Nike Mercurial Superfly 9", price: "₱10k – ₱14k", img: "Nike/Football/Nike Mercurial Superfly 9.png", page: "nike-football" },
    { name: "Nike Phantom GX 2", price: "₱9k – ₱13k", img: "Nike/Football/Nike Phantom GX 2.png", page: "nike-football" },
    { name: "Nike Tiempo Legend 10", price: "₱9k – ₱12k", img: "Nike/Football/Nike Tiempo Legend 10.png", page: "nike-football" },
    { name: "Puma All Pro Nitro", price: "₱8k – ₱11k", img: "Puma/Basketball/Puma All Pro Nitro.png", page: "puma-basketball" },
    { name: "Puma Clyde All Pro", price: "₱7k – ₱10k", img: "Puma/Basketball/Puma Clyde All Pro.png", page: "puma-basketball" },
    { name: "Puma MB.04", price: "₱9k – ₱12k", img: "Puma/Basketball/Puma MB.04.png", page: "puma-basketball" },
    { name: "Puma Deviate Nitro 2", price: "₱9k – ₱12k", img: "Puma/Running/Puma Deviate Nitro 2.png", page: "puma-running" },
    { name: "Puma Magnify Nitro 2", price: "₱7k – ₱10k", img: "Puma/Running/Puma Magnify Nitro 2.png", page: "puma-running" },
    { name: "Puma Velocity Nitro 3", price: "₱6k – ₱9k", img: "Puma/Running/Puma Velocity Nitro 3.png", page: "puma-running" },
    { name: "Puma Cali", price: "₱4k – ₱6k", img: "Puma/Sneaker/Puma Cali.png", page: "puma-sneakers" },
    { name: "Puma Future Rider", price: "₱4k – ₱6k", img: "Puma/Sneaker/Puma Future Rider.png", page: "puma-sneakers" },
    { name: "Puma Suede Classic", price: "₱4k – ₱7k", img: "Puma/Sneaker/Puma Suede Classic.png", page: "puma-sneakers" },
    { name: "Adidas Dame 8", price: "₱7k – ₱10k", img: "Adidas/Basketball/Adidas Dame 8.png", page: "adidas-basketball" },
    { name: "Adidas Harden Vol 6", price: "₱8k – ₱11k", img: "Adidas/Basketball/Adidas Harden Vol. 6.png", page: "adidas-basketball" },
    { name: "Adidas Pro Boost", price: "₱7k – ₱10k", img: "Adidas/Basketball/Adidas Pro Boost.png", page: "adidas-basketball" },
    { name: "Adidas Copa Sense", price: "₱8k – ₱12k", img: "Adidas/Football/Adidas Copa Sense.png", page: "adidas-football" },
    { name: "Adidas Predator Freak", price: "₱10k – ₱14k", img: "Adidas/Football/Adidas Predator Freak.png", page: "adidas-football" },
    { name: "Adidas X Speedportal", price: "₱10k – ₱13k", img: "Adidas/Football/Adidas X Speedportal.png", page: "adidas-football" },
    { name: "Adidas Adizero Adios Pro 3", price: "₱16k – ₱20k", img: "Adidas/Running/Adidas Adizero Adios Pro 3.png", page: "adidas-running" },
    { name: "Adidas Solarboost 4", price: "₱7k – ₱10k", img: "Adidas/Running/Adidas Solarboost 4.png", page: "adidas-running" },
    { name: "Adidas Ultraboost 23", price: "₱8k – ₱12k", img: "Adidas/Running/Adidas Ultraboost 23.png", page: "adidas-running" },
    { name: "New Balance Kawhi Leonard KAWHI", price: "₱9k – ₱13k", img: "Nb/basketball/New Balance Kawhi Leonard KAWHI.png", page: "nb-basketball" },
    { name: "New Balance OMN1S", price: "₱8k – ₱11k", img: "Nb/basketball/New Balance OMN1S.png", page: "nb-basketball" },
    { name: "New Balance TWO WXY V4", price: "₱8k – ₱12k", img: "Nb/basketball/New Balance TWO WXY V4.png", page: "nb-basketball" },
    { name: "New Balance Audazo Pro", price: "₱7k – ₱10k", img: "Nb/foot ball/New Balance Audazo Pro.png", page: "nb-football" },
    { name: "New Balance Furon V8 Pro", price: "₱9k – ₱13k", img: "Nb/foot ball/New Balance Furon V8 Pro.png", page: "nb-football" },
    { name: "New Balance Tekela V4", price: "₱9k – ₱12k", img: "Nb/foot ball/New Balance Tekela V4.png", page: "nb-football" },
    { name: "New Balance 327", price: "₱5k – ₱8k", img: "Nb/lifestye/New Balance 327.png", page: "nb-lifestyle" },
    { name: "New Balance 574 Core", price: "₱4k – ₱7k", img: "Nb/lifestye/New Balance 574 Core.png", page: "nb-lifestyle" },
    { name: "New Balance 990v5", price: "₱12k – ₱16k", img: "Nb/lifestye/New Balance 990v5.png", page: "nb-lifestyle" },
    { name: "New Balance Fresh Foam X 1080v12", price: "₱9k – ₱13k", img: "Nb/running/New Balance Fresh Foam X 1080v12.png", page: "nb-running" },
    { name: "New Balance FuelCell TC", price: "₱14k – ₱18k", img: "Nb/running/New Balance FuelCell TC.png", page: "nb-running" },
    { name: "New Balance Fresh Foam X More v4", price: "₱8k – ₱11k", img: "Nb/running/New Balance Fresh Foam X More v4.png", page: "nb-running" },
    { name: "Nike Brasilia Training Duffel Bag", price: "₱2k – ₱4k", img: "others/Nike Brasilia Training Duffel Bag.png", page: "others-bags" },
    { name: "Adidas Alphaskin Cushioned Crew Socks", price: "₱300 – ₱500", img: "others/Adidas Alphaskin Maximum Cushioned Crew Socks.png", page: "others-socks" },
    { name: "Nike Dri-FIT Everyday Cushion Crew Socks", price: "₱300 – ₱500", img: "others/Nike Dri-FIT Everyday Cushion Crew Socks.png", page: "others-socks" },
    { name: "Adidas Performance Baseball Cap", price: "₱800 – ₱1.2k", img: "others/Adidas Performance Baseball Cap.png", page: "others-headwear" },
    { name: "Nike Aerobill Tailwind Cap", price: "₱900 – ₱1.5k", img: "others/Nike Aerobill Tailwind Cap.png", page: "others-headwear" },
];

function getFeatured() {
    return [...catalog].sort(() => Math.random() - 0.5).slice(0, 4);
}

function showSearchDropdown() {
    const query = document.getElementById('search-input').value.trim();
    if (query === '') { renderResults(getFeatured(), true); }
    else { handleSearch(); }
    document.getElementById('search-dropdown').style.display = 'block';
}

function handleSearch() {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    const dropdown = document.getElementById('search-dropdown');
    if (query === '') { renderResults(getFeatured(), true); return; }
    const scored = catalog.map(item => {
        const name = item.name.toLowerCase();
        if (name === query) return { item, score: 3 };
        if (name.startsWith(query)) return { item, score: 2 };
        if (name.includes(query)) return { item, score: 1 };
        const words = query.split(' ');
        const matchCount = words.filter(w => w.length > 1 && name.includes(w)).length;
        if (matchCount > 0) return { item, score: matchCount * 0.5 };
        return { item, score: 0 };
    }).filter(e => e.score > 0).sort((a, b) => b.score - a.score);
    if (scored.length === 0) {
        dropdown.innerHTML = `<div class="search-no-result">No results found for "<strong>${query}</strong>"</div>`;
        dropdown.style.display = 'block';
        return;
    }
    renderResults(scored.map(e => e.item), false);
}

function renderResults(items, isFeatured) {
    const dropdown = document.getElementById('search-dropdown');
    let html = '';
    if (isFeatured) html += `<div class="search-label">✦ Featured</div>`;
    items.forEach(item => {
        html += `<div class="search-result-item" onclick="goToResult('${item.page}')">
            <img src="${item.img}" alt="${item.name}" class="search-result-img">
            <div class="search-result-info">
                <span class="search-result-name">${item.name}</span>
                <span class="search-result-price">${item.price}</span>
            </div>
        </div>`;
    });
    dropdown.innerHTML = html;
    dropdown.style.display = 'block';
}

function goToResult(pageId) {
    closeSearchDropdown();
    document.getElementById('search-input').value = '';
    hideEverything();
    document.getElementById(pageId).style.display = 'flex';
    restoreCartHighlights();
}

function closeSearchDropdown() {
    document.getElementById('search-dropdown').style.display = 'none';
}

document.addEventListener('click', function (e) {
    const bar = document.querySelector('.search-bar');
    if (bar && !bar.contains(e.target)) closeSearchDropdown();
});


// ══════════════════════════════════════════════
//  CAROUSEL
// ══════════════════════════════════════════════

let carouselIdx = 0;
let carouselTimer;

function initCarousel() {
    const track = document.getElementById('carousel-track');
    const dotsEl = document.getElementById('carousel-dots');
    if (!track) return;
    const total = track.querySelectorAll('.carousel-slide').length;
    dotsEl.innerHTML = '';
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => { goToSlide(i); resetTimer(); };
        dotsEl.appendChild(dot);
    }
    goToSlide(0);
    startTimer();
}

function goToSlide(i) {
    const track = document.getElementById('carousel-track');
    const total = track.querySelectorAll('.carousel-slide').length;
    carouselIdx = (i + total) % total;
    track.style.transform = `translateX(-${carouselIdx * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((d, j) => {
        d.classList.toggle('active', j === carouselIdx);
    });
}

function slideCarousel(dir) { goToSlide(carouselIdx + dir); resetTimer(); }
function startTimer() { carouselTimer = setInterval(() => goToSlide(carouselIdx + 1), 3000); }
function resetTimer() { clearInterval(carouselTimer); startTimer(); }


// ══════════════════════════════════════════════
//  NICKNAME & TERMS
// ══════════════════════════════════════════════

function confirmNickname() {
    const input = document.getElementById('nickname-input').value.trim();
    if (!input) return;
    localStorage.setItem('saks-nickname', input);
    const nick = document.getElementById('nickname-slide');
    nick.classList.remove('open');
    setTimeout(() => {
        nick.style.display = 'none';
        const terms = document.getElementById('terms-slide');
        terms.style.display = 'block';
        setTimeout(() => terms.classList.add('open'), 10);
    }, 600);
}

function confirmTerms() {
    const checked = document.getElementById('terms-checkbox').checked;
    if (!checked) { document.getElementById('terms-checkbox').style.outline = '2px solid red'; return; }
    localStorage.setItem('saks-terms', 'accepted');
    const terms = document.getElementById('terms-slide');
    terms.classList.remove('open');
    setTimeout(() => terms.style.display = 'none', 600);
}
// ── BRAND CAROUSELS ──
const brandIdx = {};

function slideBrand(brand, dir) {
    const track = document.getElementById('brand-track-' + brand);
    const slides = track.querySelectorAll('.brand-slide');  // ← was .brand-card, WRONG!
    const total = slides.length;
    if (!brandIdx[brand]) brandIdx[brand] = 0;
    brandIdx[brand] += dir;
    if (brandIdx[brand] < 0) brandIdx[brand] = 0;
    if (brandIdx[brand] > total - 1) brandIdx[brand] = total - 1;
    track.style.transform = `translateX(-${brandIdx[brand] * 100}%)`;
}