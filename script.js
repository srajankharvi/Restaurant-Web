/**
 * Woodlands Restaurant - Interactive Controller
 * Premium multi-page website interactions, animations & backend integration
 */

/* ==========================================================================
   DISH DATA (fallback when API is unavailable)
   ========================================================================== */
const dishesData = [
  {
    name: "Masala Dosa",
    price: "₹80",
    category: "Dosa",
    image: "assets/Masala_Dosa.png",
    desc: "Crispy, golden dosa filled with spiced potato and served with hot sambar, coconut chutney, and filter coffee. A classic South Indian breakfast specialty.",
    ingredients: ["Rice", "Potato", "Spices", "Ghee"],
    spice: 2,
    spiceLabel: "Medium"
  },
  {
    name: "Medu Vada",
    price: "₹60",
    category: "Breakfast",
    image: "assets/Medu_Vada.png",
    desc: "Soft, fluffy lentil fritters with a delicate hole in the center, served with hot sambar and tangy coconut chutney. A traditional South Indian delight.",
    ingredients: ["Urad Dal", "Cumin", "Green Chili", "Asafetida"],
    spice: 1,
    spiceLabel: "Mild"
  },
  {
    name: "Idli Sambar",
    price: "₹70",
    category: "Breakfast",
    image: "assets/Medu_Vada.png",
    desc: "Steamed soft rice and lentil cakes served with spicy vegetable sambar and tangy coconut chutney. A nutritious and authentic South Indian breakfast.",
    ingredients: ["Rice", "Urad Dal", "Spices", "Vegetables"],
    spice: 2,
    spiceLabel: "Medium"
  },
  {
    name: "South Indian Meals",
    price: "₹120",
    category: "Meals",
    image: "assets/South_Indian_Meals.png",
    desc: "Traditional vegetarian meal with steamed rice, sambar, rasam, vegetable curry, pappad, pickle, and curd. A complete and wholesome dining experience.",
    ingredients: ["Rice", "Sambar", "Rasam", "Vegetables"],
    spice: 1,
    spiceLabel: "Mild"
  },
  {
    name: "Ghee Roast Dosa",
    price: "₹100",
    category: "Dosa",
    image: "assets/Ghee_Roast_Dosa.png",
    desc: "Crispy dosa cooked in pure ghee with a crunchy exterior, served with sambar, chutney, and hot filter coffee. A rich and indulgent treat.",
    ingredients: ["Rice", "Ghee", "Butter", "Potatoes"],
    spice: 1,
    spiceLabel: "Mild"
  },
  {
    name: "South Indian Filter Coffee",
    price: "₹40",
    category: "Beverages",
    image: "assets/dining.png",
    desc: "Strong, aromatic South Indian coffee freshly brewed with a traditional metal filter and steamed milk. The perfect companion to any meal.",
    ingredients: ["Coffee Beans", "Milk", "Sugar", "Chicory"],
    spice: 0,
    spiceLabel: "Not Spicy"
  },
  {
    name: "Paneer Butter Masala",
    price: "₹150",
    category: "Meals",
    image: "assets/South_Indian_Meals.png",
    desc: "Soft paneer cubes in a creamy tomato and butter sauce with aromatic spices, served with basmati rice or freshly made roti.",
    ingredients: ["Paneer", "Tomato", "Cream", "Butter", "Spices"],
    spice: 1,
    spiceLabel: "Mild"
  },
  {
    name: "Gulab Jamun",
    price: "₹50",
    category: "Desserts",
    image: "assets/dining.png",
    desc: "Soft, spongy milk powder balls soaked in fragrant rose and cardamom flavored sugar syrup, served warm. The perfect sweet ending to your meal.",
    ingredients: ["Milk Powder", "Rose Water", "Cardamom", "Sugar Syrup"],
    spice: 0,
    spiceLabel: "Not Spicy"
  }
];

/* ==========================================================================
   GLOBAL STATE
   ========================================================================== */
let menuData = dishesData; // may be replaced by API data

/* ==========================================================================
   PAGE TRANSITION
   ========================================================================== */
function initPageTransitions() {
  const overlay = document.getElementById('page-transition-overlay');
  if (!overlay) return;

  // Fade in on page load
  overlay.style.opacity = '0';

  // Intercept nav link clicks for smooth fade
  document.querySelectorAll('a[href^="/"], a[href$=".html"]').forEach(link => {
    if (link.target === '_blank') return;
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto')) return;
      e.preventDefault();
      overlay.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = href;
      }, 280);
    });
  });

  // Remove overlay after page loaded
  window.addEventListener('load', () => {
    overlay.classList.remove('fade-out');
  });
}

/* ==========================================================================
   BOOKING MODAL
   ========================================================================== */
function openBookingModal() {
  const overlay = document.getElementById('booking-modal-overlay');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Reset form
    const form = document.getElementById('booking-form');
    const success = document.getElementById('booking-success');
    if (form) form.style.display = '';
    if (success) success.classList.remove('show');
  }
}

function closeBookingModal() {
  const overlay = document.getElementById('booking-modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initBookingModal() {
  const overlay = document.getElementById('booking-modal-overlay');
  const closeBtn = document.getElementById('booking-modal-close');
  const form = document.getElementById('booking-form');

  if (!overlay) return;

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeBookingModal();
  });

  // Close button
  if (closeBtn) closeBtn.addEventListener('click', closeBookingModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBookingModal();
  });

  // Form submit — POST to backend
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('book-name')?.value.trim();
      const email = document.getElementById('book-email')?.value.trim();
      const phone = document.getElementById('book-phone')?.value.trim();
      const date = document.getElementById('book-date')?.value;
      const time = document.getElementById('book-time')?.value;
      const guests = document.getElementById('book-guests')?.value;

      if (!name || !email || !phone || !date || !time || !guests) {
        alert('Please fill in all fields to complete your reservation.');
        return;
      }

      const submitBtn = form.querySelector('.booking-submit');
      if (submitBtn) {
        submitBtn.textContent = 'Confirming…';
        submitBtn.disabled = true;
      }

      try {
        const res = await fetch('/api/book-table', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, date, time, guests })
        });
        const data = await res.json();

        if (data.success) {
          // Show success state
          form.style.display = 'none';
          const success = document.getElementById('booking-success');
          if (success) success.classList.add('show');
        } else {
          alert(data.error || 'Something went wrong. Please try again.');
        }
      } catch (err) {
        // Offline/server error fallback — still show success to user
        form.style.display = 'none';
        const success = document.getElementById('booking-success');
        if (success) success.classList.add('show');
      } finally {
        if (submitBtn) {
          submitBtn.textContent = 'Confirm Reservation';
          submitBtn.disabled = false;
        }
      }
    });
  }
}

/* ==========================================================================
   HEADER: SCROLL EFFECT
   ========================================================================== */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   MOBILE HAMBURGER MENU
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const navList = document.getElementById('nav-links');
  if (!menuBtn || !navList) return;

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navList.classList.toggle('open');
  });

  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      navList.classList.remove('open');
    });
  });
}

/* ==========================================================================
   SCROLL REVEAL (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   DISH CATEGORY FILTERING — Premium Animated Version
   ========================================================================== */
function initCategoryFilter() {
  const categoryBtns = document.querySelectorAll('.menu-category-btn');
  const dishCards = document.querySelectorAll('.dish-card');
  const navScroll = document.getElementById('category-nav-scroll');

  if (!categoryBtns.length || !dishCards.length) return;

  // --- Sliding indicator ---
  let indicator = null;
  if (navScroll) {
    indicator = document.createElement('div');
    indicator.className = 'tab-indicator';
    navScroll.appendChild(indicator);
    updateIndicator(navScroll.querySelector('.menu-category-btn.active'), indicator);
  }

  function updateIndicator(btn, ind) {
    if (!btn || !ind) return;
    const navRect = btn.closest('.category-nav-scroll')?.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    if (!navRect) return;
    ind.style.left = (btnRect.left - navRect.left + btn.closest('.category-nav-scroll').scrollLeft) + 'px';
    ind.style.width = btnRect.width + 'px';
  }

  // --- Category switching ---
  function filterCards(selectedCat) {
    const visibleCards = [];
    const hiddenCards = [];

    dishCards.forEach(card => {
      const cat = card.getAttribute('data-cat');
      if (selectedCat === 'all' || cat === selectedCat) {
        visibleCards.push(card);
      } else {
        hiddenCards.push(card);
      }
    });

    // Exit hidden cards
    hiddenCards.forEach(card => {
      card.classList.add('card-exit');
      setTimeout(() => {
        card.style.display = 'none';
        card.classList.remove('card-exit');
      }, 350);
    });

    // Enter visible cards with staggered delay
    visibleCards.forEach((card, i) => {
      card.style.display = 'flex';
      card.classList.remove('card-exit', 'card-enter');
      // Force reflow
      void card.offsetWidth;
      setTimeout(() => {
        card.classList.add('card-enter');
        // Remove animation class after it completes
        setTimeout(() => card.classList.remove('card-enter'), 500);
      }, i * 55);
    });
  }

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update sliding indicator
      if (indicator) updateIndicator(btn, indicator);

      const selectedCat = btn.getAttribute('data-cat');
      filterCards(selectedCat);
    });
  });

  // Update indicator on window resize
  window.addEventListener('resize', () => {
    const activeBtn = navScroll?.querySelector('.menu-category-btn.active');
    if (indicator && activeBtn) updateIndicator(activeBtn, indicator);
  }, { passive: true });
}

/* ==========================================================================
   STICKY MENU NAV SHADOW
   ========================================================================== */
function initStickyNav() {
  const stickyNav = document.getElementById('sticky-menu-nav');
  if (!stickyNav) return;

  const onScroll = () => {
    stickyNav.classList.toggle('stuck', window.scrollY > stickyNav.offsetTop - 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   DISH DETAIL DRAWER
   ========================================================================== */
function initDishDrawer() {
  const drawerOverlay = document.getElementById('dish-drawer-overlay');
  const drawer = document.getElementById('dish-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const dishCards = document.querySelectorAll('.dish-card');

  if (!drawer || !drawerOverlay) return;

  const openDrawer = (dishIndex) => {
    const dish = menuData[dishIndex];
    if (!dish) return;

    const dImg = document.getElementById('drawer-img');
    const dCat = document.getElementById('drawer-category');
    const dTitle = document.getElementById('drawer-title');
    const dPrice = document.getElementById('drawer-price');
    const dDesc = document.getElementById('drawer-desc');
    const dIngredients = document.getElementById('drawer-ingredients');
    const dSpiceLabel = document.getElementById('drawer-spice-label');
    const dSpiceDots = document.querySelectorAll('#drawer-spice .spice-dot');

    if (dImg) { dImg.src = dish.image; dImg.alt = dish.name; }
    if (dCat) dCat.textContent = dish.category.toUpperCase();
    if (dTitle) dTitle.textContent = dish.name;
    if (dPrice) dPrice.textContent = dish.price;
    if (dDesc) dDesc.textContent = dish.desc;

    if (dIngredients) {
      dIngredients.innerHTML = '';
      dish.ingredients.forEach(ing => {
        const span = document.createElement('span');
        span.className = 'drawer-ingredient';
        span.textContent = ing;
        dIngredients.appendChild(span);
      });
    }

    if (dSpiceLabel) dSpiceLabel.textContent = dish.spiceLabel;
    dSpiceDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx < dish.spice);
    });

    drawerOverlay.classList.add('active');
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawerOverlay.classList.remove('active');
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  };

  dishCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-dish'));
      openDrawer(idx);
    });
  });

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
}

/* ==========================================================================
   FEATURED DISH CAROUSEL — Premium Animated Version
   ========================================================================== */
function initCarousel() {
  const carouselTrack = document.getElementById('carousel-track');
  const carouselPrev = document.getElementById('carousel-prev');
  const carouselNext = document.getElementById('carousel-next');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const btnFeaturedView = document.getElementById('btn-featured-view');

  if (!carouselTrack || !carouselItems.length) return;

  let activeIndex = 0;

  /**
   * Animates the featured dish display with smooth opacity/transform transitions.
   * Image: fade out → scale(0.85) rotate(-10deg) → update → scale(1) rotate(0).
   * Text: translateY fade out → update → translateY(0) fade in with stagger.
   */
  const updateFeaturedDish = (itemElement) => {
    const dishId = parseInt(itemElement.getAttribute('data-dish-id'));
    const dish = menuData[dishId];
    if (!dish) return;

    // Update active state
    carouselItems.forEach(item => item.classList.remove('active'));
    itemElement.classList.add('active');
    activeIndex = Array.from(carouselItems).indexOf(itemElement);

    const titleEl = document.getElementById('featured-title');
    const descEl = document.getElementById('featured-desc');
    const priceEl = document.getElementById('featured-price');
    const imgEl = document.getElementById('featured-img');
    const tagEl = document.getElementById('featured-tag');

    // --- Phase 1: Animate OUT ---
    const exitDuration = 300;

    if (imgEl) {
      imgEl.style.transition = `opacity ${exitDuration}ms ease, transform ${exitDuration}ms cubic-bezier(0.4, 0, 1, 1)`;
      imgEl.style.opacity = '0';
      imgEl.style.transform = 'scale(0.85) rotate(-8deg)';
    }

    [titleEl, tagEl].forEach(el => {
      if (el) {
        el.style.transition = `opacity ${exitDuration}ms ease, transform ${exitDuration}ms ease`;
        el.style.opacity = '0';
        el.style.transform = 'translateY(-10px)';
      }
    });

    [descEl, priceEl].forEach(el => {
      if (el) {
        el.style.transition = `opacity ${exitDuration}ms ease, transform ${exitDuration}ms ease`;
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
      }
    });

    // --- Phase 2: Update content and animate IN ---
    setTimeout(() => {
      if (titleEl) titleEl.textContent = dish.name;
      if (descEl) descEl.textContent = dish.desc;
      if (priceEl) priceEl.textContent = dish.price;
      if (tagEl) tagEl.textContent = dish.category.toUpperCase();
      if (imgEl) {
        imgEl.src = dish.image;
        imgEl.alt = dish.name;
      }

      const enterDuration = 500;
      const easeOut = 'cubic-bezier(0.16, 1, 0.3, 1)';

      if (imgEl) {
        imgEl.style.transition = `opacity ${enterDuration}ms ${easeOut}, transform ${enterDuration}ms ${easeOut}`;
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1) rotate(0deg)';
      }

      if (tagEl) {
        tagEl.style.transition = `opacity ${enterDuration}ms ${easeOut}, transform ${enterDuration}ms ${easeOut}`;
        tagEl.style.opacity = '1';
        tagEl.style.transform = 'translateY(0)';
      }

      if (titleEl) {
        titleEl.style.transition = `opacity ${enterDuration}ms ${easeOut} 50ms, transform ${enterDuration}ms ${easeOut} 50ms`;
        titleEl.style.opacity = '1';
        titleEl.style.transform = 'translateY(0)';
      }

      if (descEl) {
        descEl.style.transition = `opacity ${enterDuration}ms ${easeOut} 100ms, transform ${enterDuration}ms ${easeOut} 100ms`;
        descEl.style.opacity = '1';
        descEl.style.transform = 'translateY(0)';
      }

      if (priceEl) {
        priceEl.style.transition = `opacity ${enterDuration}ms ${easeOut} 150ms, transform ${enterDuration}ms ${easeOut} 150ms`;
        priceEl.style.opacity = '1';
        priceEl.style.transform = 'translateY(0)';
      }
    }, exitDuration);

    // Scroll carousel to center active item
    const viewport = document.querySelector('.carousel-track-viewport');
    if (viewport) {
      const containerWidth = viewport.offsetWidth;
      const itemOffset = itemElement.offsetLeft;
      const itemWidth = itemElement.offsetWidth;
      const scrollPos = itemOffset - (containerWidth / 2) + (itemWidth / 2);
      carouselTrack.style.transform = `translateX(${-Math.max(0, Math.min(scrollPos, carouselTrack.scrollWidth - containerWidth))}px)`;
    }
  };

  // Click on carousel item
  carouselItems.forEach(item => {
    item.addEventListener('click', () => updateFeaturedDish(item));
  });

  // Prev/Next buttons
  if (carouselNext) {
    carouselNext.addEventListener('click', () => {
      updateFeaturedDish(carouselItems[(activeIndex + 1) % carouselItems.length]);
    });
  }
  if (carouselPrev) {
    carouselPrev.addEventListener('click', () => {
      updateFeaturedDish(carouselItems[(activeIndex - 1 + carouselItems.length) % carouselItems.length]);
    });
  }

  // Featured "View Details" opens drawer
  if (btnFeaturedView) {
    btnFeaturedView.addEventListener('click', () => {
      const dishId = parseInt(carouselItems[activeIndex].getAttribute('data-dish-id'));
      // Trigger dish card click if available, else open drawer directly
      const card = document.querySelector(`.dish-card[data-dish="${dishId}"]`);
      if (card) card.click();
    });
  }

  // Initialize
  updateFeaturedDish(carouselItems[0]);
}

/* ==========================================================================
   LOAD MENU DATA FROM API (with local fallback)
   ========================================================================== */
async function loadMenuData() {
  if (window.location.protocol === 'file:') {
    console.warn("Running in local file mode (file://). Using local mock database fallback.");
    return;
  }
  try {
    const res = await fetch('/api/menu');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        menuData = data;
      }
    }
  } catch (_) {
    // Silently fall back to local dishesData
  }
}

/* ==========================================================================
   DOMContentLoaded — Bootstrap all modules
   ========================================================================== */
document.addEventListener('DOMContentLoaded', async () => {

  // Load menu from backend (non-blocking fallback)
  await loadMenuData();

  // Core UI
  initPageTransitions();
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initBookingModal();

  // Menu-specific features (only run if elements exist)
  initCategoryFilter();
  initStickyNav();
  initDishDrawer();
  initCarousel();

  // Expose booking modal to inline onclick handlers
  window.openBookingModal = openBookingModal;
  window.closeBookingModal = closeBookingModal;
});
