// ── Load jQuery from CDN (add this to your HTML <head> if not already there) ──
// <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

// ── FULL SHOE CATALOG ──
const catalog = [
    { name: "Nike Pegasus", price: "₱7 – ₱12k", img: "Top Selling/Nike Pegasus.png", page: "top-selling" },
    { name: "Jordan 1 85 Bred", price: "₱27 – ₱32k", img: "Top Selling/Jordan 1 '85 bred.png", page: "top-selling" },
    { name: "Jordan X Nigel Sylvester Better With Time", price: "₱13 – ₱16k", img: "Top Selling/Jordan X Nigel Sylvester.png", page: "top-selling" },
    { name: "New Balance 2000", price: "₱7 – ₱10k", img: "Top Selling/New Balance 2000.png", page: "top-selling" },
    { name: "Jordan 5 Black Metallic Reimagined", price: "₱8 – ₱9k", img: "Top Selling/Jordan 5 black metallic reimagined.png", page: "top-selling" },
    { name: "Adidas Evo SL", price: "₱8 – ₱9k", img: "Top Selling/Adidas evo sl.png", page: "top-selling" },
    { name: "Jordan 1 Union Chicago Shadow", price: "₱19 – ₱25k", img: "Top Selling/Jordan 1 union Chicago shadow.png", page: "top-selling" },
    { name: "Jordan 4 White Cements", price: "₱13 – ₱15k", img: "Top Selling/Jordan 4 white cements.png", page: "top-selling" },
    { name: "Jordan 5 Tokyo", price: "₱11 – ₱18k", img: "Top Selling/Jordan 5 Tokyo.png", page: "top-selling" },
    { name: "Adidas Jellyfish", price: "₱14 – ₱17k", img: "Top Selling/Adidas jellyfish.png", page: "top-selling" },
    { name: "Jordan 4 Nigel Sylvester Brick by Brick", price: "₱22 – ₱36k", img: "Top Selling/Jordan 4 Nigel Sylvester brick by brick.png", page: "top-selling" },
    { name: "Nike Air Force 1", price: "₱6 – ₱8k", img: "Most Famous/Nike Air Force 1.png", page: "most-famous" },
    { name: "Adidas Samba", price: "₱3 – ₱6k", img: "Most Famous/Adidas Samba.png", page: "most-famous" },
    { name: "Air Jordan 1", price: "₱13 – ₱14k", img: "Most Famous/Air Jordan 1.png", page: "most-famous" },
    { name: "Adidas Gazelle", price: "₱7 – ₱9k", img: "Most Famous/Adidas Gazelle.png", page: "most-famous" },
    { name: "New Balance 9060", price: "₱7 – ₱10k", img: "Most Famous/New Balance 9060.png", page: "most-famous" },
    { name: "Nike Air Max 97", price: "₱5 – ₱10k", img: "Most Famous/Nike Air Max 97.png", page: "most-famous" },
    { name: "Adidas Stan Smith", price: "₱5 – ₱7k", img: "Most Famous/Adidas Stan Smith.png", page: "most-famous" },
    { name: "Nike Total 90", price: "₱3 – ₱5k", img: "Newly Released/Nike total90.png", page: "newly-released" },
    { name: "Nike Air Max 95 OG", price: "₱7 – ₱10k", img: "Newly Released/Nike Air Max 95 OG.png", page: "newly-released" },
    { name: "ABZORB 2000", price: "₱9 – ₱10k", img: "Newly Released/ABZORB 2000.png", page: "newly-released" },
    { name: "204L", price: "₱6 – ₱9k", img: "Newly Released/204L.png", page: "newly-released" },
    { name: "Deviate NITRO", price: "₱6 – ₱7k", img: "Newly Released/Deviate NITRO.png", page: "newly-released" },
    { name: "HALI 1 Smoke", price: "₱7 – ₱9k", img: "Newly Released/HALI 1 SMOKE.png", page: "newly-released" },
    { name: "Cloudfoam Flex Lounge Rapidfit", price: "₱3 – ₱5k", img: "Newly Released/Cloudfoam flex lounge rapidfit.png", page: "newly-released" },
    { name: "Barreda Lo", price: "₱3 – ₱6k", img: "Newly Released/BARREDA LO.png", page: "newly-released" },
    { name: "Air Jordan 1 Retro High OG", price: "₱13 – ₱14k", img: "Nike/Jordan/Air Jordan 1 Retro High OG.png", page: "nike-jordan" },
    { name: "Air Jordan 11 Retro", price: "₱15 – ₱20k", img: "Nike/Jordan/Air Jordan 11 Retro.png", page: "nike-jordan" },
    { name: "Air Jordan 4 Retro", price: "₱13 – ₱15k", img: "Nike/Jordan/Air Jordan 4 Retro.png", page: "nike-jordan" },
    { name: "Nike Air Force 1 Low", price: "₱6 – ₱8k", img: "Nike/Lifestyle/Nike Air Force 1 Low.png", page: "nike-lifestyle" },
    { name: "Nike Air Max 90", price: "₱7 – ₱10k", img: "Nike/Lifestyle/Nike Air Max 90.png", page: "nike-lifestyle" },
    { name: "Nike Dunk Low", price: "₱7 – ₱9k", img: "Nike/Lifestyle/Nike Dunk Low.png", page: "nike-lifestyle" },
    { name: "LeBron 21", price: "₱9 – ₱12k", img: "Nike/Basketball/LeBron 21.png", page: "nike-basketball" },
    { name: "Nike KD 16", price: "₱8 – ₱11k", img: "Nike/Basketball/Nike KD 16.png", page: "nike-basketball" },
    { name: "Nike Sabrina 1", price: "₱7 – ₱9k", img: "Nike/Basketball/Nike Sabrina 1.png", page: "nike-basketball" },
    { name: "Nike Air Zoom Pegasus 40", price: "₱7 – ₱9k", img: "Nike/Running/Nike Air Zoom Pegasus 40.png", page: "nike-running" },
    { name: "Nike InfinityRN 4", price: "₱8 – ₱10k", img: "Nike/Running/Nike InfinityRN 4.png", page: "nike-running" },
    { name: "Nike ZoomX Vaporfly NEXT 3", price: "₱18 – ₱22k", img: "Nike/Running/Nike ZoomX Vaporfly NEXT% 3.png", page: "nike-running" },
    { name: "Nike Mercurial Superfly 9", price: "₱10 – ₱14k", img: "Nike/Football/Nike Mercurial Superfly 9.png", page: "nike-football" },
    { name: "Nike Phantom GX 2", price: "₱9 – ₱13k", img: "Nike/Football/Nike Phantom GX 2.png", page: "nike-football" },
    { name: "Nike Tiempo Legend 10", price: "₱9 – ₱12k", img: "Nike/Football/Nike Tiempo Legend 10.png", page: "nike-football" },
    { name: "Puma All Pro Nitro", price: "₱8 – ₱11k", img: "Puma/Basketball/Puma All Pro Nitro.png", page: "puma-basketball" },
    { name: "Puma Clyde All Pro", price: "₱7 – ₱10k", img: "Puma/Basketball/Puma Clyde All Pro.png", page: "puma-basketball" },
    { name: "Puma MB.04", price: "₱9 – ₱12k", img: "Puma/Basketball/Puma MB.04.png", page: "puma-basketball" },
    { name: "Puma Deviate Nitro 2", price: "₱9 – ₱12k", img: "Puma/Running/Puma Deviate Nitro 2.png", page: "puma-running" },
    { name: "Puma Magnify Nitro 2", price: "₱7 – ₱10k", img: "Puma/Running/Puma Magnify Nitro 2.png", page: "puma-running" },
    { name: "Puma Velocity Nitro 3", price: "₱6 – ₱9k", img: "Puma/Running/Puma Velocity Nitro 3.png", page: "puma-running" },
    { name: "Puma Cali", price: "₱4 – ₱6k", img: "Puma/Sneaker/Puma Cali.png", page: "puma-sneakers" },
    { name: "Puma Future Rider", price: "₱4 – ₱6k", img: "Puma/Sneaker/Puma Future Rider.png", page: "puma-sneakers" },
    { name: "Puma Suede Classic", price: "₱4 – ₱7k", img: "Puma/Sneaker/Puma Suede Classic.png", page: "puma-sneakers" },
    { name: "Adidas Dame 8", price: "₱7 – ₱10k", img: "Adidas/Basketball/Adidas Dame 8.png", page: "adidas-basketball" },
    { name: "Adidas Harden Vol 6", price: "₱8 – ₱11k", img: "Adidas/Basketball/Adidas Harden Vol. 6.png", page: "adidas-basketball" },
    { name: "Adidas Pro Boost", price: "₱7 – ₱10k", img: "Adidas/Basketball/Adidas Pro Boost.png", page: "adidas-basketball" },
    { name: "Adidas Copa Sense", price: "₱8 – ₱12k", img: "Adidas/Football/Adidas Copa Sense.png", page: "adidas-football" },
    { name: "Adidas Predator Freak", price: "₱10 – ₱14k", img: "Adidas/Football/Adidas Predator Freak.png", page: "adidas-football" },
    { name: "Adidas X Speedportal", price: "₱10 – ₱13k", img: "Adidas/Football/Adidas X Speedportal.png", page: "adidas-football" },
    { name: "Adidas Adizero Adios Pro 3", price: "₱16 – ₱20k", img: "Adidas/Running/Adidas Adizero Adios Pro 3.png", page: "adidas-running" },
    { name: "Adidas Solarboost 4", price: "₱7 – ₱10k", img: "Adidas/Running/Adidas Solarboost 4.png", page: "adidas-running" },
    { name: "Adidas Ultraboost 23", price: "₱8 – ₱12k", img: "Adidas/Running/Adidas Ultraboost 23.png", page: "adidas-running" },
    { name: "New Balance Kawhi Leonard KAWHI", price: "₱9 – ₱13k", img: "Nb/basketball/New Balance Kawhi Leonard KAWHI.png", page: "nb-basketball" },
    { name: "New Balance OMN1S", price: "₱8 – ₱11k", img: "Nb/basketball/New Balance OMN1S.png", page: "nb-basketball" },
    { name: "New Balance TWO WXY V4", price: "₱8 – ₱12k", img: "Nb/basketball/New Balance TWO WXY V4.png", page: "nb-basketball" },
    { name: "New Balance Audazo Pro", price: "₱7 – ₱10k", img: "Nb/foot ball/New Balance Audazo Pro.png", page: "nb-football" },
    { name: "New Balance Furon V8 Pro", price: "₱9 – ₱13k", img: "Nb/foot ball/New Balance Furon V8 Pro.png", page: "nb-football" },
    { name: "New Balance Tekela V4", price: "₱9 – ₱12k", img: "Nb/foot ball/New Balance Tekela V4.png", page: "nb-football" },
    { name: "New Balance 327", price: "₱5 – ₱8k", img: "Nb/lifestye/New Balance 327.png", page: "nb-lifestyle" },
    { name: "New Balance 574 Core", price: "₱4 – ₱7k", img: "Nb/lifestye/New Balance 574 Core.png", page: "nb-lifestyle" },
    { name: "New Balance 990v5", price: "₱12 – ₱16k", img: "Nb/lifestye/New Balance 990v5.png", page: "nb-lifestyle" },
    { name: "New Balance Fresh Foam X 1080v12", price: "₱9 – ₱13k", img: "Nb/running/New Balance Fresh Foam X 1080v12.png", page: "nb-running" },
    { name: "New Balance FuelCell TC", price: "₱14 – ₱18k", img: "Nb/running/New Balance FuelCell TC.png", page: "nb-running" },
    { name: "New Balance Fresh Foam X More v4", price: "₱8 – ₱11k", img: "Nb/running/New Balance Fresh Foam X More v4.png", page: "nb-running" },
    { name: "Nike Brasilia Training Duffel Bag", price: "₱2 – ₱4k", img: "others/Nike Brasilia Training Duffel Bag.png", page: "others-bags" },
    { name: "Adidas Alphaskin Cushioned Crew Socks", price: "₱300 – ₱500", img: "others/Adidas Alphaskin Maximum Cushioned Crew Socks.png", page: "others-socks" },
    { name: "Nike Dri-FIT Everyday Cushion Crew Socks", price: "₱300 – ₱500", img: "others/Nike Dri-FIT Everyday Cushion Crew Socks.png", page: "others-socks" },
    { name: "Adidas Performance Baseball Cap", price: "₱800 – ₱1.2k", img: "others/Adidas Performance Baseball Cap.png", page: "others-headwear" },
    { name: "Nike Aerobill Tailwind Cap", price: "₱900 – ₱1.5k", img: "others/Nike Aerobill Tailwind Cap.png", page: "others-headwear" },
];


// ════════════════════════════════════════════
//  Everything below runs after the page loads
//  (jQuery's version of window.onload)
// ════════════════════════════════════════════
$(document).ready(function () {

    // ── ON PAGE LOAD: show nickname modal ──
    $('#nickname-modal').show();

    // ── NICKNAME: confirm on button click ──
    $('#nickname-confirm-btn').on('click', function () {
        confirmNickname();
    });

    // ── NICKNAME: confirm on Enter key ──
    $('#nickname-input').on('keydown', function (e) {
        if (e.key === 'Enter') confirmNickname();
    });

    // ── NICKNAME: restore saved name from localStorage ──
    const saved = localStorage.getItem('saks-nickname');
    if (saved) $('#username-display').text(saved);

    // ── SEARCH: show dropdown on focus ──
    $('#search-input').on('focus', function () {
        showSearchDropdown();
    });

    // ── SEARCH: filter results while typing ──
    $('#search-input').on('input', function () {
        handleSearch();
    });

    // ── SEARCH: close dropdown when clicking outside ──
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.search-bar').length) {
            closeSearchDropdown();
        }
    });

});


// ── NICKNAME ──
function confirmNickname() {
    const input = $('#nickname-input').val().trim();
    if (!input) return;
    $('#username-display').text(input);
    localStorage.setItem('saks-nickname', input);
    $('#nickname-modal').hide();
    $('#terms-modal').show();
}


// ── TERMS ──
function confirmTerms() {
    if (!$('#terms-checkbox').is(':checked')) {
        $('#terms-checkbox').css('outline', '2px solid red');
        return;
    }
    $('#terms-modal').hide();
}


// ── ABOUT & CONTACT ──
function openAbout()   { $('#about-modal').show(); }
function openContact() { $('#contact-modal').show(); }
function closeModal(id) { $('#' + id).hide(); }


// ── NAVIGATION HELPERS ──
function hideEverything() {
    $('#original-content').hide();
    $('.menu').hide();
    $('.page').hide();
}

function showMenu(menuId)   { hideEverything(); $('#' + menuId).show(); }
function openPage(pageId)   { hideEverything(); $('#' + pageId).show(); }
function showPage(pageId)   { hideEverything(); $('#' + pageId).show(); }
function showHome()         { hideEverything(); $('#original-content').show(); }
function goBack()           { showHome(); }


// ── SEARCH: get 4 random featured shoes ──
function getFeatured() {
    return [...catalog].sort(() => Math.random() - 0.5).slice(0, 4);
}

// ── SEARCH: show dropdown (featured or results) ──
function showSearchDropdown() {
    const query = $('#search-input').val().trim();
    if (query === '') {
        renderResults(getFeatured(), true);
    } else {
        handleSearch();
    }
    $('#search-dropdown').show();
}

// ── SEARCH: filter catalog by query ──
function handleSearch() {
    const query = $('#search-input').val().trim().toLowerCase();

    if (query === '') {
        renderResults(getFeatured(), true);
        return;
    }

    const scored = catalog.map(item => {
        const name = item.name.toLowerCase();
        if (name === query)          return { item, score: 3 };
        if (name.startsWith(query)) return { item, score: 2 };
        if (name.includes(query))   return { item, score: 1 };
        const words = query.split(' ');
        const matchCount = words.filter(w => w.length > 1 && name.includes(w)).length;
        if (matchCount > 0)         return { item, score: matchCount * 0.5 };
        return { item, score: 0 };
    }).filter(e => e.score > 0).sort((a, b) => b.score - a.score);

    if (scored.length === 0) {
        $('#search-dropdown')
            .html(`<div class="search-no-result">No results found for "<strong>${query}</strong>"</div>`)
            .show();
        return;
    }

    renderResults(scored.map(e => e.item), false);
}

// ── SEARCH: build and inject dropdown HTML ──
function renderResults(items, isFeatured) {
    let html = '';
    if (isFeatured) html += `<div class="search-label">✦ Featured</div>`;

    $.each(items, function (i, item) {
        html += `
        <div class="search-result-item" onclick="goToResult('${item.page}')">
            <img src="${item.img}" alt="${item.name}" class="search-result-img">
            <div class="search-result-info">
                <span class="search-result-name">${item.name}</span>
                <span class="search-result-price">${item.price}</span>
            </div>
        </div>`;
    });

    $('#search-dropdown').html(html).show();
}

// ── SEARCH: navigate to result page ──
function goToResult(pageId) {
    closeSearchDropdown();
    $('#search-input').val('');
    hideEverything();
    $('#' + pageId).show();
}

// ── SEARCH: hide dropdown ──
function closeSearchDropdown() {
    $('#search-dropdown').hide();
}
