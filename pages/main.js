// Load navigation component
fetch('nav.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('nav-container').innerHTML = html;
        initThemeToggle();
    })
    .catch(error => console.error('Error loading navigation:', error));

// Load footer component
fetch('footer.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('footer-container').innerHTML = html;
    })
    .catch(error => console.error('Error loading footer:', error));

// Theme Toggle (Light/Dark/System Mode)
function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);

    // Desktop buttons
    const lightBtn = document.getElementById('light-mode-btn');
    const darkBtn = document.getElementById('dark-mode-btn');
    const systemBtn = document.getElementById('system-mode-btn');
    // Mobile buttons
    const mobileLightBtn = document.getElementById('mobile-light-btn');
    const mobileDarkBtn = document.getElementById('mobile-dark-btn');
    const mobileSystemBtn = document.getElementById('mobile-system-btn');

    if (lightBtn) lightBtn.addEventListener('click', () => applyTheme('light'));
    if (darkBtn) darkBtn.addEventListener('click', () => applyTheme('dark'));
    if (systemBtn) systemBtn.addEventListener('click', () => applyTheme('system'));
    if (mobileLightBtn) mobileLightBtn.addEventListener('click', () => applyTheme('light'));
    if (mobileDarkBtn) mobileDarkBtn.addEventListener('click', () => applyTheme('dark'));
    if (mobileSystemBtn) mobileSystemBtn.addEventListener('click', () => applyTheme('system'));

    // Listen for OS theme changes when in system mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('theme') === 'system') {
            applyTheme('system');
        }
    });
}

function applyTheme(theme) {
    const html = document.documentElement;
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
        html.classList.add('dark');
    } else if (theme === 'light') {
        html.classList.remove('dark');
    } else {
        // System mode: follow OS preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }

    updateToggleButtons(theme);
}

function updateToggleButtons(theme) {
    const lightBtns = [document.getElementById('light-mode-btn'), document.getElementById('mobile-light-btn')];
    const darkBtns = [document.getElementById('dark-mode-btn'), document.getElementById('mobile-dark-btn')];
    const systemBtns = [document.getElementById('system-mode-btn'), document.getElementById('mobile-system-btn')];

    // Reset all buttons
    [lightBtns, darkBtns, systemBtns].flat().forEach(btn => {
        if (!btn) return;
        btn.classList.remove('bg-orange-200/50', 'ring-2', 'ring-orange-400', 'bg-indigo-500/30', 'ring-indigo-400', 'bg-blue-200/50', 'ring-blue-400');
        btn.querySelector('svg').classList.remove('text-orange-500', 'text-indigo-300', 'text-blue-500');
        btn.querySelector('svg').classList.add('text-gray-700');
    });

    // Highlight active button
    lightBtns.forEach(btn => {
        if (!btn) return;
        if (theme === 'light') {
            btn.classList.add('bg-orange-200/50', 'ring-2', 'ring-orange-400');
            btn.querySelector('svg').classList.remove('text-gray-700');
            btn.querySelector('svg').classList.add('text-orange-500');
        }
    });

    darkBtns.forEach(btn => {
        if (!btn) return;
        if (theme === 'dark') {
            btn.classList.add('bg-indigo-500/30', 'ring-2', 'ring-indigo-400');
            btn.querySelector('svg').classList.remove('text-gray-700');
            btn.querySelector('svg').classList.add('text-indigo-300');
        }
    });

    systemBtns.forEach(btn => {
        if (!btn) return;
        if (theme === 'system') {
            btn.classList.add('bg-blue-200/50', 'ring-2', 'ring-blue-400');
            btn.querySelector('svg').classList.remove('text-gray-700');
            btn.querySelector('svg').classList.add('text-blue-500');
        }
    });
}

// Only enable custom cursor and glow on non-touch devices
(function() {
    if (window.matchMedia('(pointer: coarse)').matches) {
        // Remove cursor-glow and cursor-trail if present
        const glow = document.getElementById('cursor-glow');
        const trail = document.getElementById('cursor-trail');
        if (glow) glow.style.display = 'none';
        if (trail) trail.style.display = 'none';
        document.body.classList.remove('custom-cursor');
        return;
    }
    // ...existing code for enabling custom cursor and glow...
})();
