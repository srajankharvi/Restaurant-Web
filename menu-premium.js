/* ============================================
   PEGS RESTAURANT — Premium Menu JS
   Carousel, Featured Dish, Grid & Filters
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── 10 Real Dishes with Peckers-Style Detailed Data ──
    const allDishes = [
        {
            id: 0,
            name: "Butter Chicken",
            price: "₹380",
            category: "mains",
            image: "assets/food/butter_chicken.png",
            desc: "Tender chicken pieces in a rich, creamy tomato-butter sauce with aromatic North Indian spices. Served with butter naan.",
            ingredients: ["Chicken", "Tomato", "Cream", "Butter", "Kasuri Methi"],
            spice: 1,
            spiceLabel: "Mild",
            calories: "520 Kcal",
            protein: "32g",
            carbs: "24g",
            fats: "18g",
            allergens: ["Dairy", "Nuts"],
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
            protein: "22g",
            carbs: "14g",
            fats: "12g",
            allergens: ["Dairy"],
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
            protein: "8g",
            carbs: "45g",
            fats: "6g",
            allergens: ["Mustard"],
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
            protein: "35g",
            carbs: "62g",
            fats: "20g",
            allergens: ["Dairy"],
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
            protein: "42g",
            carbs: "12g",
            fats: "14g",
            allergens: ["None"],
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
            protein: "12g",
            carbs: "54g",
            fats: "8g",
            allergens: ["Gluten", "Soy"],
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
            protein: "4g",
            carbs: "48g",
            fats: "10g",
            allergens: ["Dairy", "Gluten", "Nuts"],
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
            protein: "18g",
            carbs: "38g",
            fats: "16g",
            allergens: ["Dairy"],
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
            protein: "16g",
            carbs: "42g",
            fats: "22g",
            allergens: ["Dairy", "Gluten"],
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
            protein: "3g",
            carbs: "12g",
            fats: "4g",
            allergens: ["Dairy"],
            comboNote: "Also available as Cold Coffee, Cappuccino, and Espresso"
        }
    ];

    let currentDishIndex = 0;
    let filteredDishes = [...allDishes];

    // ── Element Bindings ──
    const stagePrev = document.getElementById('stagePrev');
    const stageActive = document.getElementById('stageActive');
    const stageNext = document.getElementById('stageNext');

    const stagePrevImg = document.getElementById('stagePrevImg');
    const stageActiveImg = document.getElementById('stageActiveImg');
    const stageNextImg = document.getElementById('stageNextImg');

    const featuredName = document.getElementById('featuredName');
    const featuredPrice = document.getElementById('featuredPrice');
    const featuredDesc = document.getElementById('featuredDesc');
    const featuredCal = document.getElementById('featuredCal');
    const featuredProtein = document.getElementById('featuredProtein');
    const featuredCarbs = document.getElementById('featuredCarbs');
    const featuredFats = document.getElementById('featuredFats');
    const featuredAllergens = document.getElementById('featuredAllergens');
    const featuredSpice = document.getElementById('featuredSpice');
    const featuredAlso = document.getElementById('featuredAlso');
    const featuredInfo = document.getElementById('featuredInfo');

    if (!stageActive) return; // Not on menu page

    // ── Select Dish ──
    function selectDish(index) {
        if (filteredDishes.length === 0) return;
        
        // Wrap around bounds
        if (index < 0) index = filteredDishes.length - 1;
        if (index >= filteredDishes.length) index = 0;
        
        currentDishIndex = index;

        const activeDish = filteredDishes[currentDishIndex];
        const prevDish = filteredDishes[(currentDishIndex - 1 + filteredDishes.length) % filteredDishes.length];
        const nextDish = filteredDishes[(currentDishIndex + 1) % filteredDishes.length];

        // Animate elements (Reflow & add classes)
        const stageWrapper = document.querySelector('.menu-stage-wrapper');
        if (stageWrapper) {
            stageWrapper.classList.remove('dish-transition');
            void stageWrapper.offsetWidth;
            stageWrapper.classList.add('dish-transition');
        }

        if (featuredInfo) {
            featuredInfo.classList.remove('info-transition');
            void featuredInfo.offsetWidth;
            featuredInfo.classList.add('info-transition');
        }

        // Update Images
        if (stageActiveImg) stageActiveImg.src = activeDish.image;
        if (stagePrevImg) stagePrevImg.src = prevDish.image;
        if (stageNextImg) stageNextImg.src = nextDish.image;

        // Update Text Info
        if (featuredName) featuredName.textContent = activeDish.name;
        if (featuredPrice) featuredPrice.textContent = activeDish.price;
        if (featuredDesc) featuredDesc.textContent = activeDish.desc;

        // Update Stats Column
        if (featuredCal) featuredCal.textContent = activeDish.calories;
        if (featuredProtein) featuredProtein.textContent = activeDish.protein;
        if (featuredCarbs) featuredCarbs.textContent = activeDish.carbs;
        if (featuredFats) featuredFats.textContent = activeDish.fats;

        // Update Allergens
        if (featuredAllergens) {
            featuredAllergens.innerHTML = activeDish.allergens.map(allergen => 
                `<span class="allergen-tag">${allergen}</span>`
            ).join('');
        }

        // Update Spice level (Peckers Bar style)
        if (featuredSpice) {
            let spiceBarHTML = '';
            const maxSpice = 3;
            // Class mapping for different spices
            let spiceClass = 'active';
            if (activeDish.spice === 1) spiceClass = 'active mild';
            if (activeDish.spice === 3) spiceClass = 'active hot';
            
            for (let i = 0; i < maxSpice; i++) {
                spiceBarHTML += `<span class="spice-bar${i < activeDish.spice ? ' ' + spiceClass : ''}"></span>`;
            }
            featuredSpice.innerHTML = spiceBarHTML;
        }

        // Update Also note
        if (featuredAlso) {
            featuredAlso.querySelector('p').textContent = activeDish.comboNote || '';
        }
    }

    // ── Arrow/Stage Item Navigation ──
    if (stagePrev) {
        stagePrev.addEventListener('click', () => {
            selectDish(currentDishIndex - 1);
        });
    }

    if (stageNext) {
        stageNext.addEventListener('click', () => {
            selectDish(currentDishIndex + 1);
        });
    }

    // Keyboard Arrow Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') selectDish(currentDishIndex - 1);
        if (e.key === 'ArrowRight') selectDish(currentDishIndex + 1);
    });

    // ── Showcase Tabs (Category filter) ──
    const showcaseTabs = document.querySelectorAll('.showcase-tab');
    showcaseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            showcaseTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const cat = tab.dataset.cat;
            filteredDishes = cat === 'all' ? [...allDishes] : allDishes.filter(d => d.category === cat);
            currentDishIndex = 0;
            
            if (filteredDishes.length > 0) {
                // Show carousel elements
                if (stagePrev) stagePrev.style.display = filteredDishes.length > 1 ? 'flex' : 'none';
                if (stageNext) stageNext.style.display = filteredDishes.length > 1 ? 'flex' : 'none';
                selectDish(0);
            }
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

            let spiceBars = '';
            for (let i = 0; i < 3; i++) {
                spiceBars += `<span class="bar${i < dish.spice ? ' on' : ''}"></span>`;
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
                        <div class="pmg-card-spice-bars">${spiceBars}</div>
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

    // ── Auto-rotate stage carousel ──
    let autoRotate = setInterval(() => {
        selectDish(currentDishIndex + 1);
    }, 6000);

    // Pause on hover
    const showcaseSection = document.getElementById('menuShowcase');
    if (showcaseSection) {
        showcaseSection.addEventListener('mouseenter', () => clearInterval(autoRotate));
        showcaseSection.addEventListener('mouseleave', () => {
            autoRotate = setInterval(() => {
                selectDish(currentDishIndex + 1);
            }, 6000);
        });
    }

    // ── Swipe gestures on active dish ──
    if (stageActive) {
        let touchStartX = 0;
        let touchEndX = 0;

        stageActive.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        stageActive.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    selectDish(currentDishIndex + 1); // Swipe left = next
                } else {
                    selectDish(currentDishIndex - 1); // Swipe right = prev
                }
            }
        }, { passive: true });
    }

    // ── Initialize ──
    selectDish(0);
    renderGrid(allDishes);

});
