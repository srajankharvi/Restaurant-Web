/* ============================================
   HOTEL RAYS INN — Premium JavaScript
   Animations, Interactions & API Integration
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ── Preloader ──
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loaded');
                // Trigger hero animation
                const hero = document.getElementById('hero');
                if (hero) hero.classList.add('loaded');
            }, 800);
        });
        // Fallback: hide preloader after 3s max
        setTimeout(() => {
            preloader.classList.add('loaded');
            const hero = document.getElementById('hero');
            if (hero) hero.classList.add('loaded');
        }, 3000);
    }

    // ── Navbar Scroll Effect ──
    const navbar = document.getElementById('navbar');
    if (navbar && !navbar.classList.contains('scrolled')) {
        const handleNavScroll = () => {
            if (window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleNavScroll, { passive: true });
        handleNavScroll();
    }

    // ── Mobile Navigation ──
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            if (mobileOverlay) mobileOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
                if (mobileOverlay) mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ── Smooth Scroll for Anchor Links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#book') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ── Scroll Reveal Animations ──
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ── Counter Animation ──
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const suffix = el.dataset.suffix || '';
                const duration = 2000;
                const start = performance.now();

                const animate = (now) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out quad
                    const eased = 1 - (1 - progress) * (1 - progress);
                    const current = Math.round(eased * target);
                    el.textContent = current.toLocaleString() + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };

                requestAnimationFrame(animate);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    // ── Testimonials Slider ──
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        currentSlide = index;
        if (slides[currentSlide]) slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, 5000);

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(parseInt(dot.dataset.index));
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    }

    // ── Gallery Lightbox ──
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryItems = document.querySelectorAll('.gallery-item[data-lightbox]');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.dataset.lightbox;
            if (lightboxImg) lightboxImg.src = src;
            if (lightbox) lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    function closeLightbox() {
        if (lightbox) lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeBookingModal();
        }
    });

    // ── Back to Top ──
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── Booking Modal ──
    const bookingModal = document.getElementById('bookingModal');
    const openBookingBtns = document.querySelectorAll('#openBookingBtn, #openBookingBtn2, [href="#book"]');
    const closeBookingBtn = document.getElementById('closeBookingBtn');

    openBookingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openBookingModal();
        });
    });

    if (closeBookingBtn) {
        closeBookingBtn.addEventListener('click', closeBookingModal);
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) closeBookingModal();
        });
    }

    function openBookingModal() {
        if (bookingModal) {
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeBookingModal() {
        if (bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ── Toast Notification ──
    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = (type === 'success' ? '✓ ' : '✕ ') + message;
        toast.className = 'toast ' + type;
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // ── Contact Form Submission ──
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value,
                type: document.getElementById('contactType').value,
                message: document.getElementById('contactMessage').value
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const data = await response.json();

                if (response.ok && data.success) {
                    showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    showToast(data.error || 'Something went wrong. Please try again.', 'error');
                }
            } catch (err) {
                showToast('Network error. Please check your connection.', 'error');
            }
        });
    }

    // ── Booking Form Submission ──
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: document.getElementById('bookName').value,
                email: document.getElementById('bookEmail').value,
                phone: document.getElementById('bookPhone').value,
                guests: document.getElementById('bookGuests').value,
                date: document.getElementById('bookDate').value,
                time: document.getElementById('bookTime').value
            };

            try {
                const response = await fetch('/api/book-table', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const data = await response.json();

                if (response.ok && data.success) {
                    showToast('Booking confirmed! We look forward to your visit.', 'success');
                    bookingForm.reset();
                    closeBookingModal();
                } else {
                    showToast(data.error || 'Booking failed. Please try again.', 'error');
                }
            } catch (err) {
                showToast('Network error. Please check your connection.', 'error');
            }
        });
    }

    // ── Menu Page: Load Menu Items ──
    const menuGrid = document.getElementById('menuGrid');
    const menuFilters = document.getElementById('menuFilters');

    // Static menu data for Pegs Restaurant (multi-cuisine)
    const pegsMenuData = [
        {
            id: 0, name: "Paneer Tikka", price: "₹280", category: "starters",
            image: "assets/Paneer_Butter_Masala.png",
            desc: "Marinated cottage cheese cubes grilled to perfection in a tandoor with bell peppers and onions. Served with mint chutney.",
            ingredients: ["Paneer", "Bell Pepper", "Yogurt", "Spices"],
            spice: 2, spiceLabel: "Medium"
        },
        {
            id: 1, name: "Crispy Veg Spring Rolls", price: "₹220", category: "starters",
            image: "assets/Medu_Vada.png",
            desc: "Golden-fried crispy rolls stuffed with a savory mix of fresh vegetables and aromatic herbs. Served with sweet chili sauce.",
            ingredients: ["Vegetables", "Spring Roll Sheets", "Herbs", "Soy"],
            spice: 1, spiceLabel: "Mild"
        },
        {
            id: 2, name: "Masala Dosa", price: "₹120", category: "indian",
            image: "assets/Masala_Dosa.png",
            desc: "Crispy golden dosa filled with spiced potato masala, served with sambar and coconut chutney. A South Indian classic.",
            ingredients: ["Rice", "Potato", "Spices", "Ghee"],
            spice: 2, spiceLabel: "Medium"
        },
        {
            id: 3, name: "Butter Chicken", price: "₹380", category: "indian",
            image: "assets/Paneer_Butter_Masala.png",
            desc: "Tender chicken pieces in a rich, creamy tomato-butter sauce with aromatic spices. Paired with naan or jeera rice.",
            ingredients: ["Chicken", "Tomato", "Cream", "Butter", "Spices"],
            spice: 1, spiceLabel: "Mild"
        },
        {
            id: 4, name: "South Indian Meals", price: "₹180", category: "indian",
            image: "assets/South_Indian_Meals.png",
            desc: "Traditional vegetarian thali with steamed rice, sambar, rasam, two vegetable curries, papad, pickle, and curd.",
            ingredients: ["Rice", "Sambar", "Rasam", "Vegetables"],
            spice: 1, spiceLabel: "Mild"
        },
        {
            id: 5, name: "Ghee Roast Dosa", price: "₹140", category: "indian",
            image: "assets/Ghee_Roast_Dosa.png",
            desc: "Crispy dosa generously cooked in pure ghee with a crunchy exterior. Served with sambar and chutney.",
            ingredients: ["Rice", "Ghee", "Butter", "Potatoes"],
            spice: 1, spiceLabel: "Mild"
        },
        {
            id: 6, name: "Chilli Chicken", price: "₹340", category: "chinese",
            image: "assets/Paneer_Butter_Masala.png",
            desc: "Succulent chicken tossed with green chilies, bell peppers, and soy sauce in a fiery Indo-Chinese preparation.",
            ingredients: ["Chicken", "Bell Pepper", "Soy Sauce", "Chili"],
            spice: 3, spiceLabel: "Spicy"
        },
        {
            id: 7, name: "Veg Manchurian", price: "₹260", category: "chinese",
            image: "assets/Medu_Vada.png",
            desc: "Deep-fried vegetable balls tossed in a tangy, spicy Manchurian gravy with spring onions and soy sauce.",
            ingredients: ["Mixed Veg", "Corn Flour", "Soy Sauce", "Garlic"],
            spice: 2, spiceLabel: "Medium"
        },
        {
            id: 8, name: "Hakka Noodles", price: "₹240", category: "chinese",
            image: "assets/South_Indian_Meals.png",
            desc: "Stir-fried noodles tossed with crunchy vegetables, soy sauce, and aromatic spices. Available in veg and chicken options.",
            ingredients: ["Noodles", "Vegetables", "Soy Sauce", "Sesame Oil"],
            spice: 1, spiceLabel: "Mild"
        },
        {
            id: 9, name: "Grilled Chicken Steak", price: "₹420", category: "continental",
            image: "assets/Paneer_Butter_Masala.png",
            desc: "Juicy herb-marinated chicken breast grilled to perfection, served with mashed potatoes and sautéed vegetables.",
            ingredients: ["Chicken", "Herbs", "Potato", "Vegetables"],
            spice: 0, spiceLabel: "Not Spicy"
        },
        {
            id: 10, name: "Pasta Alfredo", price: "₹340", category: "continental",
            image: "assets/South_Indian_Meals.png",
            desc: "Creamy penne pasta in a rich parmesan alfredo sauce with garlic, mushrooms, and fresh herbs.",
            ingredients: ["Pasta", "Cream", "Parmesan", "Garlic", "Mushrooms"],
            spice: 0, spiceLabel: "Not Spicy"
        },
        {
            id: 11, name: "South Indian Filter Coffee", price: "₹60", category: "beverages",
            image: "assets/South_Indian_Filter_Coffee.png",
            desc: "Strong, aromatic coffee freshly brewed with a traditional metal filter and steamed milk. The perfect pick-me-up.",
            ingredients: ["Coffee Beans", "Milk", "Sugar", "Chicory"],
            spice: 0, spiceLabel: "Not Spicy"
        },
        {
            id: 12, name: "Mango Lassi", price: "₹120", category: "beverages",
            image: "assets/South_Indian_Filter_Coffee.png",
            desc: "Refreshing yogurt-based smoothie blended with ripe Alphonso mangoes, cardamom, and a touch of honey.",
            ingredients: ["Yogurt", "Mango", "Cardamom", "Honey"],
            spice: 0, spiceLabel: "Not Spicy"
        },
        {
            id: 13, name: "Fresh Lime Soda", price: "₹80", category: "beverages",
            image: "assets/South_Indian_Filter_Coffee.png",
            desc: "Zesty fresh lime juice with sparkling soda, a pinch of salt, and a hint of cumin. Available sweet or salted.",
            ingredients: ["Lime", "Soda", "Salt", "Cumin"],
            spice: 0, spiceLabel: "Not Spicy"
        },
        {
            id: 14, name: "Gulab Jamun", price: "₹120", category: "desserts",
            image: "assets/Gulab_Jamun.png",
            desc: "Soft, spongy milk-powder dumplings soaked in rose-cardamom sugar syrup, served warm. A classic Indian sweet.",
            ingredients: ["Milk Powder", "Rose Water", "Cardamom", "Sugar"],
            spice: 0, spiceLabel: "Not Spicy"
        },
        {
            id: 15, name: "Rasmalai", price: "₹150", category: "desserts",
            image: "assets/Gulab_Jamun.png",
            desc: "Delicate cottage cheese patties immersed in sweetened, saffron-flavored milk garnished with pistachios and almonds.",
            ingredients: ["Paneer", "Milk", "Saffron", "Pistachios"],
            spice: 0, spiceLabel: "Not Spicy"
        }
    ];

    if (menuGrid) {
        renderMenu(pegsMenuData);

        // Filter buttons
        if (menuFilters) {
            menuFilters.querySelectorAll('.menu-filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    menuFilters.querySelectorAll('.menu-filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const filter = btn.dataset.filter;
                    const filtered = filter === 'all'
                        ? pegsMenuData
                        : pegsMenuData.filter(item => item.category === filter);
                    renderMenu(filtered);
                });
            });
        }
    }

    function renderMenu(items) {
        if (!menuGrid) return;
        menuGrid.innerHTML = '';
        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.style.animationDelay = `${index * 0.08}s`;
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';

            const spiceEmojis = '🌶️'.repeat(item.spice) || '🍃';

            card.innerHTML = `
                <div class="menu-card-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <span class="menu-card-price">${item.price}</span>
                    <span class="menu-card-category">${item.category}</span>
                </div>
                <div class="menu-card-body">
                    <h3 class="menu-card-title">${item.name}</h3>
                    <p class="menu-card-desc">${item.desc}</p>
                    <div class="menu-card-meta">
                        <span class="menu-card-spice">${spiceEmojis} ${item.spiceLabel}</span>
                        <div class="menu-card-ingredients">
                            ${item.ingredients.slice(0, 3).map(i => `<span class="menu-card-ingredient">${i}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            menuGrid.appendChild(card);

            // Animate in
            setTimeout(() => {
                card.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50 + index * 80);
        });
    }

    // ── Parallax Effect for Hero ──
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const heroBg = heroSection.querySelector('.hero-bg img');
        if (heroBg) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                if (scrolled < window.innerHeight) {
                    heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
                }
            }, { passive: true });
        }
    }

    // ── Active Nav Link Highlight ──
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0 && navbar) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset + 200;
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    const links = navbar.querySelectorAll('.nav-links a:not(.nav-cta)');
                    links.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}` ||
                            link.getAttribute('href') === `/#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { passive: true });
    }

    // ── Hover tilt effect on room cards ──
    const roomCards = document.querySelectorAll('.room-card');
    roomCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (y - centerY) / centerY * 3;
            const tiltY = (centerX - x) / centerX * 3;
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });

    // ── Set minimum date for booking ──
    const bookDate = document.getElementById('bookDate');
    if (bookDate) {
        const today = new Date().toISOString().split('T')[0];
        bookDate.setAttribute('min', today);
    }

    // ── Magnetic button effect ──
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-outline');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    console.log('%c✨ Hotel Rays Inn — Premium Website', 'color: #c9a96e; font-size: 16px; font-weight: bold;');
    console.log('%cDesigned with luxury & elegance', 'color: #999; font-size: 12px;');
});
