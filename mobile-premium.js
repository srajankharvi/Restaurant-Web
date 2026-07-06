/* ============================================
   HOTEL RAYS INN — Mobile Premium JS
   Bottom Nav, Touch Gestures & Mobile UX
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // ── Bottom Navigation ──
    const bottomNav = document.getElementById('mobileBottomNav');
    if (bottomNav) {
        const navItems = bottomNav.querySelectorAll('.mobile-bottom-nav-item');
        const currentPath = window.location.pathname;

        // Set active state based on current page
        navItems.forEach(item => {
            const href = item.getAttribute('data-href');
            if (href === currentPath ||
                (href === '/' && currentPath === '/index.html') ||
                (href === '/' && currentPath === '/')) {
                item.classList.add('active');
            } else if (href && currentPath.includes(href) && href !== '/') {
                item.classList.add('active');
            }
        });

        // Navigation click handlers
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const href = item.getAttribute('data-href');
                const section = item.getAttribute('data-section');

                // Ripple animation
                item.style.transform = 'scale(0.9)';
                setTimeout(() => { item.style.transform = ''; }, 150);

                if (section) {
                    // Scroll to section on same page
                    e.preventDefault();
                    const target = document.querySelector(section);
                    if (target) {
                        const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
                        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                        window.scrollTo({ top: targetPos, behavior: 'smooth' });
                    } else if (href) {
                        // Section not on this page, navigate to the href
                        window.location.href = href;
                    }
                } else if (href) {
                    window.location.href = href;
                }
            });
        });

        // Hide/show bottom nav on scroll (slide-away on scroll down)
        let lastScrollY = window.scrollY;
        let scrollTimer;

        window.addEventListener('scroll', () => {
            if (!isMobile) return;

            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY + 15 && currentScrollY > 200) {
                bottomNav.classList.add('hidden');
            } else if (currentScrollY < lastScrollY - 5) {
                bottomNav.classList.remove('hidden');
            }
            lastScrollY = currentScrollY;

            // Show after scroll stops
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                bottomNav.classList.remove('hidden');
            }, 1500);
        }, { passive: true });
    }

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
            // Swipe right to close (since drawer opens from right)
            if (diff > 80) {
                navToggle?.classList.remove('active');
                navLinks.classList.remove('open');
                mobileOverlay?.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, { passive: true });
    }

    // ── Swipe gallery on mobile ──
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid && isMobile) {
        let galleryScrolling = false;

        // Add scroll momentum snap
        galleryGrid.addEventListener('scroll', () => {
            if (galleryScrolling) return;
            galleryScrolling = true;
            requestAnimationFrame(() => {
                galleryScrolling = false;
            });
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

        // Button press feedback
        const buttons = document.querySelectorAll('.btn, .form-submit-btn, .showcase-tab, .menu-filter-btn');
        buttons.forEach(btn => {
            btn.addEventListener('touchstart', () => {
                btn.style.transition = 'transform 0.1s ease, opacity 0.1s';
                btn.style.transform = 'scale(0.95)';
                btn.style.opacity = '0.9';
            }, { passive: true });

            btn.addEventListener('touchend', () => {
                btn.style.transition = 'transform 0.3s ease, opacity 0.3s';
                btn.style.transform = '';
                btn.style.opacity = '';
            }, { passive: true });

            btn.addEventListener('touchcancel', () => {
                btn.style.transition = 'transform 0.3s ease, opacity 0.3s';
                btn.style.transform = '';
                btn.style.opacity = '';
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
                // Only start drag from the top handle area
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
                    // Close modal
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

    // ── Intersection Observer for bottom nav active state ──
    if (bottomNav) {
        const sections = document.querySelectorAll('section[id]');
        const navItems = bottomNav.querySelectorAll('.mobile-bottom-nav-item[data-section]');

        if (sections.length > 0 && navItems.length > 0) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = '#' + entry.target.id;
                        navItems.forEach(item => {
                            const section = item.getAttribute('data-section');
                            if (section === id) {
                                // Only highlight if we're on the same page
                                const href = item.getAttribute('data-href');
                                const currentPath = window.location.pathname;
                                if (!href || href === currentPath || href === '/' && (currentPath === '/' || currentPath === '/index.html')) {
                                    navItems.forEach(i => i.classList.remove('active'));
                                    item.classList.add('active');
                                }
                            }
                        });
                    }
                });
            }, { threshold: 0.3 });

            sections.forEach(section => sectionObserver.observe(section));
        }
    }

    // ── Viewport height fix for mobile (100vh issue) ──
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setVH();
    window.addEventListener('resize', setVH);

    // ── Prevent overscroll bounce on iOS ──
    if (isMobile && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
        document.body.addEventListener('touchmove', (e) => {
            if (e.target.closest('.nav-links.open') ||
                e.target.closest('.modal') ||
                e.target.closest('.menu-carousel') ||
                e.target.closest('.gallery-grid')) {
                return; // Allow scrolling in these containers
            }
        }, { passive: true });
    }

    console.log('%c📱 Mobile Premium UX Loaded', 'color: #c9a96e; font-size: 14px; font-weight: bold;');
});
