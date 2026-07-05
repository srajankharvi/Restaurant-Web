/* ============================================
   PEGS RESTAURANT — Premium Menu JS
   Carousel, Featured Dish, Grid & Filters
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── 10 Real Dishes with Generated Images ──
    const allDishes = [
        {
            id: 0,
            name: "Butter Chicken",
            price: "₹380",
            category: "mains",
            image: "assets/food/butter_chicken.png",
            desc: "Tender chicken pieces in a rich, creamy tomato-butter sauce with aromatic North Indian spices. Served with butter naan.",
            longDesc: "Peckers fried chicken served with mild spicy rice, house-made mayo, and fresh lettuce.",
            ingredients: ["Chicken", "Tomato", "Cream", "Butter", "Kasuri Methi"],
            spice: 1,
            spiceLabel: "Mild",
            calories: "520 Kcal",
            protein: "32g Protein",
            comboNote: "Also available as a combo meal with rice, naan, and dessert"
        },
        {
            id: 1,
            name: "Paneer Tikka",
            price: "₹280",
            category: "starters",
            image: "assets/food/paneer_tikka.png",
            desc: "Marinated cottage cheese cubes chargrilled in tandoor with bell peppers and onions. Served with mint chutney.",
            ingredients: ["Paneer", "Bell Pepper", "Yogurt", "Tandoori Masala", "Lemon"],
            spice: 2,
            spiceLabel: "Medium",
            calories: "340 Kcal",
            protein: "22g Protein",
            comboNote: "Also available as a wrap and a salad bowl"
        },
        {
            id: 2,
            name: "Masala Dosa",
            price: "₹120",
            category: "mains",
            image: "assets/food/masala_dosa.png",
            desc: "Crispy golden dosa filled with spiced potato masala, served with sambar and coconut chutney. A South Indian classic.",
            ingredients: ["Rice Batter", "Potato", "Mustard Seeds", "Curry Leaves", "Ghee"],
            spice: 2,
            spiceLabel: "Medium",
            calories: "290 Kcal",
            protein: "8g Protein",
            comboNote: "Also available as Ghee Roast, Rava, or Paper Dosa"
        },
        {
            id: 3,
            name: "Hyderabadi Biryani",
            price: "₹350",
            category: "mains",
            image: "assets/food/biryani.png",
            desc: "Fragrant basmati rice layered with spiced chicken, saffron threads, and fried onions. Slow-cooked in a sealed handi.",
            ingredients: ["Basmati Rice", "Chicken", "Saffron", "Fried Onions", "Mint"],
            spice: 2,
            spiceLabel: "Medium",
            calories: "580 Kcal",
            protein: "35g Protein",
            comboNote: "Served with raita, mirchi ka salan, and boiled egg"
        },
        {
            id: 4,
            name: "Grilled Chicken Steak",
            price: "₹420",
            category: "continental",
            image: "assets/food/grilled_steak.png",
            desc: "Juicy herb-marinated chicken breast grilled to perfection, served with mashed potatoes and sautéed asparagus.",
            ingredients: ["Chicken Breast", "Rosemary", "Garlic", "Mashed Potato", "Asparagus"],
            spice: 0,
            spiceLabel: "Not Spicy",
            calories: "480 Kcal",
            protein: "42g Protein",
            comboNote: "Also available with mushroom sauce or pepper sauce"
        },
        {
            id: 5,
            name: "Hakka Noodles",
            price: "₹240",
            category: "chinese",
            image: "assets/food/hakka_noodles.png",
            desc: "Stir-fried thin noodles tossed with julienned vegetables, soy sauce, and sesame oil. An Indo-Chinese favourite.",
            ingredients: ["Noodles", "Bell Pepper", "Cabbage", "Soy Sauce", "Sesame Oil"],
            spice: 1,
            spiceLabel: "Mild",
            calories: "380 Kcal",
            protein: "12g Protein",
            comboNote: "Available in Veg, Chicken, and Egg options"
        },
        {
            id: 6,
            name: "Gulab Jamun",
            price: "₹120",
            category: "desserts",
            image: "assets/food/gulab_jamun.png",
            desc: "Soft, golden milk-powder dumplings soaked in rose-cardamom sugar syrup. A timeless Indian dessert.",
            ingredients: ["Milk Powder", "Rose Water", "Cardamom", "Sugar Syrup", "Pistachio"],
            spice: 0,
            spiceLabel: "Not Spicy",
            calories: "310 Kcal",
            protein: "4g Protein",
            comboNote: "Served warm with a scoop of vanilla ice cream on request"
        },
        {
            id: 7,
            name: "Dal Makhani",
            price: "₹260",
            category: "mains",
            image: "assets/food/dal_makhani.png",
            desc: "Rich, creamy black lentil curry slow-cooked overnight with butter, cream, and aromatic spices. Served with naan.",
            ingredients: ["Black Lentils", "Kidney Beans", "Butter", "Cream", "Tomato"],
            spice: 1,
            spiceLabel: "Mild",
            calories: "420 Kcal",
            protein: "18g Protein",
            comboNote: "Also available as a combo with jeera rice and raita"
        },
        {
            id: 8,
            name: "Pasta Alfredo",
            price: "₹340",
            category: "continental",
            image: "assets/food/pasta_alfredo.png",
            desc: "Creamy penne pasta in a rich parmesan alfredo sauce with garlic, mushrooms, and fresh basil leaves.",
            ingredients: ["Penne Pasta", "Parmesan", "Cream", "Garlic", "Mushrooms"],
            spice: 0,
            spiceLabel: "Not Spicy",
            calories: "460 Kcal",
            protein: "16g Protein",
            comboNote: "Also available in Arrabiata (spicy) and Pesto sauce"
        },
        {
            id: 9,
            name: "Filter Coffee",
            price: "₹60",
            category: "beverages",
            image: "assets/food/filter_coffee.png",
            desc: "Strong, aromatic South Indian coffee brewed with a traditional brass filter. Served in a classic davara-tumbler set.",
            ingredients: ["Coffee Beans", "Chicory", "Fresh Milk", "Sugar"],
            spice: 0,
            spiceLabel: "Not Spicy",
            calories: "90 Kcal",
            protein: "3g Protein",
            comboNote: "Also available as Cold Coffee, Cappuccino, and Espresso"
        }
    ];

    let currentDishIndex = 0;
    let filteredDishes = [...allDishes];

    const menuCarousel = document.getElementById('menuCarousel');
    const featuredImg = document.getElementById('featuredImg');
    const featuredName = document.getElementById('featuredName');
    const featuredDesc = document.getElementById('featuredDesc');
    const featuredPrice = document.getElementById('featuredPrice');
    const featuredSpice = document.getElementById('featuredSpice');
    const featuredCal = document.getElementById('featuredCal');
    const featuredIngredients = document.getElementById('featuredIngredients');
    const featuredAlso = document.getElementById('featuredAlso');
    const featuredDish = document.getElementById('featuredDish');
    const featuredInfo = document.getElementById('featuredInfo');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');

    if (!menuCarousel) return; // Not on menu page

    // ── Build Carousel ──
    function buildCarousel() {
        menuCarousel.innerHTML = '';
        filteredDishes.forEach((dish, index) => {
            const el = document.createElement('div');
            el.className = 'carousel-dish' + (index === currentDishIndex ? ' active' : '');
            el.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}" loading="lazy">
                <span class="dish-label">${dish.name}</span>
            `;
            el.addEventListener('click', () => selectDish(index));
            menuCarousel.appendChild(el);
        });
    }

    // ── Select Dish ──
    function selectDish(index) {
        if (index < 0 || index >= filteredDishes.length) return;
        currentDishIndex = index;
        const dish = filteredDishes[currentDishIndex];

        // Update carousel active
        const items = menuCarousel.querySelectorAll('.carousel-dish');
        items.forEach((item, i) => {
            item.classList.toggle('active', i === currentDishIndex);
        });

        // Scroll active into view
        if (items[currentDishIndex]) {
            items[currentDishIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }

        // Animate featured dish
        if (featuredDish) {
            featuredDish.classList.remove('dish-transition');
            void featuredDish.offsetWidth; // Reflow
            featuredDish.classList.add('dish-transition');
        }
        if (featuredInfo) {
            featuredInfo.classList.remove('info-transition');
            void featuredInfo.offsetWidth;
            featuredInfo.classList.add('info-transition');
        }

        // Update featured image
        if (featuredImg) {
            featuredImg.src = dish.image;
            featuredImg.alt = dish.name;
        }

        // Update info
        if (featuredName) featuredName.textContent = dish.name;
        if (featuredDesc) featuredDesc.textContent = dish.desc;
        if (featuredPrice) featuredPrice.textContent = dish.price;
        if (featuredCal) featuredCal.textContent = dish.calories;

        // Spice dots
        if (featuredSpice) {
            const maxSpice = 3;
            let dotsHTML = '';
            for (let i = 0; i < maxSpice; i++) {
                dotsHTML += `<span class="spice-dot${i < dish.spice ? ' active' : ''}"></span>`;
            }
            featuredSpice.innerHTML = dotsHTML;
        }

        // Ingredients
        if (featuredIngredients) {
            featuredIngredients.innerHTML = dish.ingredients.map(i =>
                `<span class="ingredient-tag">${i}</span>`
            ).join('');
        }

        // Combo note
        if (featuredAlso) {
            featuredAlso.querySelector('p').textContent = dish.comboNote || '';
        }
    }

    // ── Carousel Navigation ──
    if (carouselPrev) {
        carouselPrev.addEventListener('click', () => {
            const newIndex = (currentDishIndex - 1 + filteredDishes.length) % filteredDishes.length;
            selectDish(newIndex);
        });
    }

    if (carouselNext) {
        carouselNext.addEventListener('click', () => {
            const newIndex = (currentDishIndex + 1) % filteredDishes.length;
            selectDish(newIndex);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && carouselPrev) carouselPrev.click();
        if (e.key === 'ArrowRight' && carouselNext) carouselNext.click();
    });

    // ── Showcase Tabs (filter carousel) ──
    const showcaseTabs = document.querySelectorAll('.showcase-tab');
    showcaseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            showcaseTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const cat = tab.dataset.cat;
            filteredDishes = cat === 'all' ? [...allDishes] : allDishes.filter(d => d.category === cat);
            currentDishIndex = 0;
            buildCarousel();
            if (filteredDishes.length > 0) selectDish(0);
        });
    });

    // ── Grid Filters ──
    const gridFilters = document.getElementById('gridFilters');
    const premiumMenuGrid = document.getElementById('premiumMenuGrid');

    function renderGrid(items) {
        if (!premiumMenuGrid) return;
        premiumMenuGrid.innerHTML = '';

        items.forEach((dish, index) => {
            const card = document.createElement('div');
            card.className = 'pmg-card';
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';

            let spiceDots = '';
            for (let i = 0; i < 3; i++) {
                spiceDots += `<span class="dot${i < dish.spice ? ' on' : ''}"></span>`;
            }

            card.innerHTML = `
                <div class="pmg-card-image">
                    <img src="${dish.image}" alt="${dish.name}" loading="lazy">
                    <div class="pmg-card-image-overlay"></div>
                    <span class="pmg-card-price">${dish.price}</span>
                    <span class="pmg-card-cat">${dish.category}</span>
                </div>
                <div class="pmg-card-body">
                    <div class="pmg-card-header">
                        <h3 class="pmg-card-title">${dish.name}</h3>
                        <div class="pmg-card-spice">${spiceDots}</div>
                    </div>
                    <p class="pmg-card-desc">${dish.desc}</p>
                    <div class="pmg-card-footer">
                        <div class="pmg-card-ingredients">
                            ${dish.ingredients.slice(0, 3).map(i => `<span class="pmg-card-ing">${i}</span>`).join('')}
                        </div>
                        <span class="pmg-card-cal">${dish.calories}</span>
                    </div>
                </div>
            `;

            premiumMenuGrid.appendChild(card);

            // Animate in
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 60 + index * 90);
        });
    }

    if (gridFilters) {
        gridFilters.querySelectorAll('.menu-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                gridFilters.querySelectorAll('.menu-filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                const filtered = filter === 'all' ? allDishes : allDishes.filter(d => d.category === filter);
                renderGrid(filtered);
            });
        });
    }

    // ── Auto-rotate carousel ──
    let autoRotate = setInterval(() => {
        const newIndex = (currentDishIndex + 1) % filteredDishes.length;
        selectDish(newIndex);
    }, 5000);

    // Pause on hover
    const showcaseSection = document.getElementById('menuShowcase');
    if (showcaseSection) {
        showcaseSection.addEventListener('mouseenter', () => clearInterval(autoRotate));
        showcaseSection.addEventListener('mouseleave', () => {
            autoRotate = setInterval(() => {
                const newIndex = (currentDishIndex + 1) % filteredDishes.length;
                selectDish(newIndex);
            }, 5000);
        });
    }

    // ── Touch swipe for carousel ──
    let touchStartX = 0;
    let touchEndX = 0;

    if (menuCarousel) {
        menuCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        menuCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe left = next
                    selectDish((currentDishIndex + 1) % filteredDishes.length);
                } else {
                    // Swipe right = prev
                    selectDish((currentDishIndex - 1 + filteredDishes.length) % filteredDishes.length);
                }
            }
        }, { passive: true });
    }

    // ── Initialize ──
    buildCarousel();
    selectDish(0);
    renderGrid(allDishes);

});
