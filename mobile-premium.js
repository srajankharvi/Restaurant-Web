/* ============================================
   HOTEL RAYS INN — Mobile Premium JS
   Touch Gestures & Mobile UX Enhancements
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // ── Swipe to close mobile drawer ──
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (navLinks && isMobile) {
        let drawerStartX = 0;

        navLinks.addEventListener('touchstart', (e) => {
            drawerStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        navLinks.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].screenX - drawerStartX;
            if (diff > 80) {
                navToggle?.classList.remove('active');
                navLinks.classList.remove('open');
                mobileOverlay?.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, { passive: true });
    }

    // ── Touch feedback for cards ──
    if (isMobile) {
        const touchCards = document.querySelectorAll(
            '.service-card, .room-card, .tourism-card, .pmg-card, .director-card, .mission-card'
        );

        touchCards.forEach(card => {
            card.addEventListener('touchstart', () => {
                card.style.transition = 'transform 0.1s ease';
                card.style.transform = 'scale(0.97)';
            }, { passive: true });

            card.addEventListener('touchend', () => {
                card.style.transition = 'transform 0.3s ease';
                card.style.transform = '';
            }, { passive: true });

            card.addEventListener('touchcancel', () => {
                card.style.transition = 'transform 0.3s ease';
                card.style.transform = '';
            }, { passive: true });
        });
    }

    // ── Pull-down dismiss for modal (mobile bottom sheet) ──
    if (isMobile) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            let modalStartY = 0;
            let isDragging = false;

            modal.addEventListener('touchstart', (e) => {
                const rect = modal.getBoundingClientRect();
                if (e.touches[0].clientY - rect.top < 40) {
                    isDragging = true;
                    modalStartY = e.touches[0].clientY;
                }
            }, { passive: true });

            modal.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                const diff = e.touches[0].clientY - modalStartY;
                if (diff > 0) {
                    modal.style.transform = `translateY(${diff}px)`;
                }
            }, { passive: true });

            modal.addEventListener('touchend', (e) => {
                if (!isDragging) return;
                isDragging = false;
                const diff = e.changedTouches[0].clientY - modalStartY;
                if (diff > 120) {
                    const overlay = modal.closest('.modal-overlay');
                    if (overlay) {
                        overlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
                modal.style.transform = '';
            }, { passive: true });
        });
    }

    // ── Viewport height fix for mobile (100vh issue) ──
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setVH();
    window.addEventListener('resize', setVH);

    console.log('%c📱 Mobile Premium UX Loaded', 'color: #c9a96e; font-size: 14px; font-weight: bold;');
});
