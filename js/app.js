/* =====================================================
   1. APP STATE & STORAGE
===================================================== */
class LocalStore {
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Storage quota exceeded');
        }
    }

    static get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return null;
        }
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}

const MOKAULENGWE_PHONE = '2673115582';

/* =====================================================
   2. NAVIGATION & UI HELPERS
===================================================== */
function switchTab(tabIndex) {
    const pages = document.querySelectorAll('.tab-page');
    const navItems = document.querySelectorAll('.nav-item');

    pages.forEach((page, index) => {
        page.classList.toggle('active', index === tabIndex);
    });

    navItems.forEach((item, index) => {
        item.classList.toggle('active', index === tabIndex);
    });

    const area = document.querySelector('.content-area');
    if (area) area.scrollTop = 0;
    LocalStore.set('lastTab', tabIndex);
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}

function toast(message) {
    alert(message);
}

function initialsOf(name) {
    if (!name) return '?';
    return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('') || '?';
}

/* =====================================================
   3. WHATSAPP INTEGRATION
===================================================== */
function whatsappShare(type, message) {
    const text = encodeURIComponent(message);
    const url = 'https://wa.me/' + MOKAULENGWE_PHONE + '?text=' + text;
    window.open(url, '_blank');
}

function openWhatsapp(message) {
    whatsappShare('support', message);
}

/* =====================================================
   4. OFFLINE DETECTION
===================================================== */
window.addEventListener('online', () => {
    const dot = document.getElementById('statusDot');
    if (dot) dot.style.backgroundColor = '#4CAF50';
});

window.addEventListener('offline', () => {
    const dot = document.getElementById('statusDot');
    if (dot) dot.style.backgroundColor = '#FFC107';
});

/* =====================================================
   5. DATA SAVER + CLEAR DATA
===================================================== */
function toggleDataSaver() {
    const cb = document.getElementById('dataSaver');
    const app = document.getElementById('appContainer');
    const enabled = cb.checked;
    app.classList.toggle('data-saver', enabled);
    LocalStore.set('dataSaver', enabled);
}

function clearLocalData() {
    if (confirm('Are you sure? This will delete all saved data.')) {
        LocalStore.clear();
        location.reload();
    }
}

/* =====================================================
   6. INITIALIZE
===================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const savedTab = LocalStore.get('lastTab') || 0;
    switchTab(savedTab);

    const dataSaver = LocalStore.get('dataSaver');
    if (dataSaver) {
        document.getElementById('dataSaver').checked = true;
        document.getElementById('appContainer').classList.add('data-saver');
    }
});