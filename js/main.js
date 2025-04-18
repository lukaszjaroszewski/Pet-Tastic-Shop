/*
 * PetTastic - Main JavaScript
 * This file contains general functionality for the PetTastic website
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initHeader();
    initMobileMenu();
    initNewsletterPopup();
    initLightbox();
    initFAQs();
    
    // Specific page initializations based on current page
    const currentPage = getCurrentPage();
    
    if (currentPage === 'index') {
        // Homepage specific initialization
    } else if (currentPage === 'product') {
        initProductPage();
    } else if (currentPage === 'shop') {
        initShopPage();
    } else if (currentPage === 'cart') {
        updateCartDisplay();
    } else if (currentPage === 'checkout') {
        initCheckoutPage();
    } else if (currentPage === 'contact') {
        initContactPage();
    }
});

/**
 * Determines the current page based on URL
 * @returns {string} The current page identifier
 */
function getCurrentPage() {
    const path = window.location.pathname;
    
    if (path.includes('product.html')) {
        return 'product';
    } else if (path.includes('shop.html')) {
        return 'shop';
    } else if (path.includes('cart.html')) {
        return 'cart';
    } else if (path.includes('checkout.html')) {
        return 'checkout';
    } else if (path.includes('about.html')) {
        return 'about';
    } else if (path.includes('contact.html')) {
        return 'contact';
    } else {
        return 'index';
    }
}

/**
 * Initialize sticky header functionality
 */
function initHeader() {
    const header = document.getElementById('header');
    let lastScrollPosition = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;
        
        // Determine scroll direction
        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 200) {
            // Scrolling down and past threshold
            header.classList.add('header-hidden');
        } else {
            // Scrolling up
            header.classList.remove('header-hidden');
        }
        
        lastScrollPosition = currentScrollPosition;
    });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const toggleButton = document.querySelector('.mobile-menu-toggle button');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    // Create overlay for mobile nav
    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    body.appendChild(overlay);
    
    // Toggle mobile menu
    toggleButton.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when overlay is clicked
    overlay.addEventListener('click', function() {
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

/**
 * Initialize newsletter popup
 */
function initNewsletterPopup() {
    const popup = document.getElementById('newsletter-popup');
    const closeButton = document.querySelector('.close-popup');
    const popupForm = document.getElementById('popup-newsletter-form');
    
    // Check if we've shown the popup before in this session
    const hasSeenPopup = sessionStorage.getItem('newsletterPopupSeen');
    
    if (!hasSeenPopup) {
        // Show popup after 10 seconds
        setTimeout(function() {
            popup.classList.add('active');
        }, 10000);
        
        // Mark as seen for this session
        sessionStorage.setItem('newsletterPopupSeen', 'true');
    }
    
    // Close popup when X is clicked
    closeButton.addEventListener('click', function() {
        popup.classList.remove('active');
    });
    
    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
    
    // Handle form submission
    if (popupForm) {
        popupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = popupForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Store newsletter subscription
                localStorage.setItem('newsletterSubscribed', 'true');
                
                // Show success message
                popupForm.innerHTML = '<p class="success-message">Thank you for subscribing! Your 10% discount code is: <strong>WELCOME10</strong></p>';
                
                // Close popup after delay
                setTimeout(function() {
                    popup.classList.remove('active');
                }, 3000);
            }
        });
    }
    
    // Also handle the footer newsletter form
    const footerNewsletterForm = document.getElementById('newsletter-form');
    if (footerNewsletterForm) {
        footerNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = footerNewsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Store newsletter subscription
                localStorage.setItem('newsletterSubscribed', 'true');
                
                // Clear and update form
                emailInput.value = '';
                
                // Show temporary success message
                const successMsg = document.createElement('p');
                successMsg.className = 'success-message';
                successMsg.textContent = 'Thank you for subscribing!';
                
                footerNewsletterForm.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
            }
        });
    }
}

/**
 * Initialize lightbox functionality for images
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // Add click event to all Instagram images
    const instagramItems = document.querySelectorAll('.instagram-item');
    instagramItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close lightbox when X is clicked
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close lightbox when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Initialize FAQ accordions on the contact page
 */
function initFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class for this item
            item.classList.toggle('active');
            
            // Close other FAQs (uncomment for accordion behavior)
            /*
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            */
        });
    });
}

/**
 * Initialize the product detail page
 */
function initProductPage() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        // Find product in our data
        const product = findProductById(productId);
        
        if (product) {
            populateProductDetails(product);
            setupProductImageGallery();
            setupProductTabs();
            setupQuantitySelector();
            setupAddToCartButton(product);
            loadRelatedProducts(product.category);
        } else {
            // Product not found, redirect to shop
            window.location.href = 'shop.html';
        }
    } else {
        // No product ID, redirect to shop
        window.location.href = 'shop.html';
    }
}

/**
 * Populate the product details on the product page
 * @param {object} product - The product object
 */
function populateProductDetails(product) {
    // Set page title
    document.title = `${product.name} - PetTastic`;
    
    // Update breadcrumb
    const breadcrumb = document.getElementById('product-breadcrumb');
    if (breadcrumb) {
        breadcrumb.textContent = product.name;
    }
    
    // Update product details
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-short-description').textContent = product.shortDescription || product.description;
    document.getElementById('product-category').textContent = product.category;
    
    // Update full description
    const descriptionElement = document.getElementById('product-description');
    if (descriptionElement) {
        descriptionElement.innerHTML = `<p>${product.description}</p>
            <ul>
                <li>Material: Premium quality, non-toxic materials</li>
                <li>Dimensions: Medium size, perfect for ${product.category === 'Dog Toys' ? 'medium to large dogs' : product.category === 'Cat Toys' ? 'all cats' : 'small pets'}</li>
                <li>Features: ${product.features ? product.features.join(', ') : 'Durable, washable, pet-friendly'}</li>
            </ul>`;
    }
    
    // Update main product image
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
        mainImage.src = product.image;
        mainImage.alt = product.name;
    }
    
    // Update thumbnail images - for now we'll use the same image
    const thumbnails = document.querySelectorAll('.thumbnail img');
    thumbnails.forEach(thumbnail => {
        thumbnail.src = product.image;
        thumbnail.alt = product.name;
    });
    
    // Update stock status
    const stockStatus = document.getElementById('stock-status');
    if (stockStatus) {
        stockStatus.textContent = product.inStock ? 'In Stock' : 'Out of Stock';
        stockStatus.style.color = product.inStock ? 'var(--success-color)' : 'var(--error-color)';
    }
}

/**
 * Setup the product image gallery with thumbnail functionality
 */
function setupProductImageGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update main image
            const thumbnailImg = this.querySelector('img');
            mainImage.src = thumbnailImg.src;
            mainImage.alt = thumbnailImg.alt;
            
            // Update active class
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * Setup the product tabs (Description, Reviews, Care)
 */
function setupProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the tab to show
            const tabToShow = this.getAttribute('data-tab');
            
            // Hide all tabs
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Show the selected tab
            document.getElementById(tabToShow).classList.add('active');
            
            // Update active tab button
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

/**
 * Setup the quantity selector with plus/minus buttons
 */
function setupQuantitySelector() {
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const quantityInput = document.getElementById('quantity');
    
    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            value = Math.max(1, value - 1);
            quantityInput.value = value;
        });
        
        increaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            value = Math.min(10, value + 1); // Set max quantity to 10
            quantityInput.value = value;
        });
        
        // Validate manual input
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value) || 1;
            value = Math.min(10, Math.max(1, value));
            this.value = value;
        });
    }
}

/**
 * Setup the Add to Cart button
 * @param {object} product - The product object
 */
function setupAddToCartButton(product) {
    const addToCartBtn = document.getElementById('add-to-cart');
    const quantityInput = document.getElementById('quantity');
    
    if (addToCartBtn && quantityInput) {
        addToCartBtn.addEventListener('click', function() {
            const quantity = parseInt(quantityInput.value);
            
            // Add to cart
            addToCart(product, quantity);
            
            // Show feedback
            showNotification(`Added ${quantity} ${product.name} to your cart!`, 'success');
            
            // Update cart count
            updateCartCount();
        });
    }
}

/**
 * Load related products based on category
 * @param {string} category - The product category
 */
function loadRelatedProducts(category) {
    const relatedProductsContainer = document.getElementById('related-products');
    
    if (relatedProductsContainer) {
        // Get all products
        const allProducts = getAllProducts();
        
        // Filter related products (same category, limit to 4)
        const relatedProducts = allProducts
            .filter(product => product.category === category)
            .slice(0, 4);
        
        // Clear container
        relatedProductsContainer.innerHTML = '';
        
        // Add products
        relatedProducts.forEach(product => {
            relatedProductsContainer.appendChild(createProductCard(product));
        });
    }
}

/**
 * Initialize shop page functionality
 */
function initShopPage() {
    loadShopProducts();
    setupShopFilters();
    setupProductsSorting();
    setupFilterToggle();
}

/**
 * Load products on the shop page
 */
function loadShopProducts() {
    const productsContainer = document.getElementById('shop-products');
    
    if (productsContainer) {
        // Get all products
        const allProducts = getAllProducts();
        
        // Clear container
        productsContainer.innerHTML = '';
        
        // Add products
        allProducts.forEach(product => {
            productsContainer.appendChild(createProductCard(product));
        });
        
        // Update product count
        const productCount = document.getElementById('product-count');
        if (productCount) {
            productCount.textContent = allProducts.length;
        }
    }
}

/**
 * Setup shop filters functionality
 */
function setupShopFilters() {
    const categoryFilters = document.querySelectorAll('.category-filters input');
    const priceRange = document.getElementById('price-range');
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const tags = document.querySelectorAll('.tag');
    
    // Price range slider
    if (priceRange && priceMin && priceMax) {
        priceRange.addEventListener('input', function() {
            priceMax.textContent = this.value;
        });
    }
    
    // Apply filters button
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // Get all products
            const allProducts = getAllProducts();
            
            // Get selected categories
            const selectedCategories = [];
            categoryFilters.forEach(filter => {
                if (filter.checked) {
                    selectedCategories.push(filter.value);
                }
            });
            
            // Get price range
            const maxPrice = parseInt(priceRange.value);
            
            // Filter products
            let filteredProducts = allProducts;
            
            // Apply category filter
            if (selectedCategories.length > 0) {
                filteredProducts = filteredProducts.filter(product => {
                    // Match category names to filter values
                    if (product.category === 'Dog Toys' && selectedCategories.includes('dog')) return true;
                    if (product.category === 'Cat Toys' && selectedCategories.includes('cat')) return true;
                    if (product.category === 'Bird Toys' && selectedCategories.includes('bird')) return true;
                    if (product.category === 'Small Pet Toys' && selectedCategories.includes('small-pet')) return true;
                    return false;
                });
            }
            
            // Apply price filter
            filteredProducts = filteredProducts.filter(product => {
                return product.price <= maxPrice;
            });
            
            // Update product display
            const productsContainer = document.getElementById('shop-products');
            productsContainer.innerHTML = '';
            
            if (filteredProducts.length > 0) {
                filteredProducts.forEach(product => {
                    productsContainer.appendChild(createProductCard(product));
                });
            } else {
                productsContainer.innerHTML = '<div class="no-products"><p>No products match your filters. Please try different criteria.</p></div>';
            }
            
            // Update count
            const productCount = document.getElementById('product-count');
            if (productCount) {
                productCount.textContent = filteredProducts.length;
            }
            
            // Close mobile filter sidebar if open
            closeMobileFilterSidebar();
        });
    }
    
    // Tag cloud filtering (simple implementation)
    tags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get tag value
            const tagValue = this.textContent.toLowerCase();
            
            // Get all products
            const allProducts = getAllProducts();
            
            // Filter by tag (simple match by tag name in product name or description)
            const filteredProducts = allProducts.filter(product => {
                return (
                    product.name.toLowerCase().includes(tagValue) || 
                    product.description.toLowerCase().includes(tagValue)
                );
            });
            
            // Update product display
            const productsContainer = document.getElementById('shop-products');
            productsContainer.innerHTML = '';
            
            if (filteredProducts.length > 0) {
                filteredProducts.forEach(product => {
                    productsContainer.appendChild(createProductCard(product));
                });
            } else {
                productsContainer.innerHTML = '<div class="no-products"><p>No products match this tag. Please try a different one.</p></div>';
            }
            
            // Update count
            const productCount = document.getElementById('product-count');
            if (productCount) {
                productCount.textContent = filteredProducts.length;
            }
        });
    });
}

/**
 * Setup mobile filter sidebar toggle
 */
function setupFilterToggle() {
    const sidebar = document.querySelector('.shop-sidebar');
    const body = document.body;
    
    if (sidebar && window.innerWidth <= 992) {
        // Create toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'filter-toggle';
        toggleButton.innerHTML = '<i class="fas fa-filter"></i>';
        body.appendChild(toggleButton);
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        body.appendChild(overlay);
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'close-sidebar';
        closeButton.innerHTML = '&times;';
        sidebar.prepend(closeButton);
        
        // Toggle sidebar
        toggleButton.addEventListener('click', function() {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden';
        });
        
        // Close sidebar when X is clicked
        closeButton.addEventListener('click', function() {
            closeMobileFilterSidebar();
        });
        
        // Close sidebar when overlay is clicked
        overlay.addEventListener('click', function() {
            closeMobileFilterSidebar();
        });
    }
}

/**
 * Close the mobile filter sidebar
 */
function closeMobileFilterSidebar() {
    const sidebar = document.querySelector('.shop-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const body = document.body;
    
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }
}

/**
 * Setup product sorting functionality
 */
function setupProductsSorting() {
    const sortSelect = document.getElementById('sort-by');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const selectedOption = this.value;
            const productsContainer = document.getElementById('shop-products');
            const products = getAllProducts();
            
            // Sort products based on selected option
            let sortedProducts = [...products];
            
            switch (selectedOption) {
                case 'price-low':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'name-az':
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-za':
                    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                // 'featured' is default, no special sorting needed
            }
            
            // Clear and repopulate container
            productsContainer.innerHTML = '';
            sortedProducts.forEach(product => {
                productsContainer.appendChild(createProductCard(product));
            });
        });
    }
}

/**
 * Initialize checkout page functionality
 */
function initCheckoutPage() {
    setupShippingToggle();
    populateOrderSummary();
    setupCheckoutForm();
}

/**
 * Setup shipping toggle (same as billing)
 */
function setupShippingToggle() {
    const sameAsBillingCheckbox = document.getElementById('same-as-billing');
    const shippingFields = document.getElementById('shipping-fields');
    
    if (sameAsBillingCheckbox && shippingFields) {
        sameAsBillingCheckbox.addEventListener('change', function() {
            if (this.checked) {
                shippingFields.classList.add('hidden');
            } else {
                shippingFields.classList.remove('hidden');
            }
        });
    }
}

/**
 * Populate order summary on checkout page
 */
function populateOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    const orderSubtotal = document.getElementById('order-subtotal');
    const orderShipping = document.getElementById('order-shipping');
    const orderTax = document.getElementById('order-tax');
    const orderTotal = document.getElementById('order-total');
    const emptyCheckout = document.getElementById('checkout-empty');
    const checkoutContent = document.getElementById('checkout-content');
    
    // Get cart items
    const cartItems = getCartItems();
    
    if (cartItems.length === 0 && emptyCheckout && checkoutContent) {
        // Cart is empty, show empty message
        emptyCheckout.classList.remove('hidden');
        checkoutContent.classList.add('hidden');
        return;
    }
    
    // Calculate values
    const subtotal = calculateCartTotal();
    const shipping = 5.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    // Update order summary
    if (orderItemsContainer) {
        orderItemsContainer.innerHTML = '';
        
        cartItems.forEach(item => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            
            orderItem.innerHTML = `
                <div class="order-item-image">
                    <img src="${item.product.image}" alt="${item.product.name}">
                </div>
                <div class="order-item-info">
                    <p class="order-item-name">${item.product.name}</p>
                    <p class="order-item-price">$${item.product.price.toFixed(2)}</p>
                    <p class="order-item-quantity">Quantity: ${item.quantity}</p>
                </div>
            `;
            
            orderItemsContainer.appendChild(orderItem);
        });
    }
    
    // Update totals
    if (orderSubtotal) orderSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (orderShipping) orderShipping.textContent = `$${shipping.toFixed(2)}`;
    if (orderTax) orderTax.textContent = `$${tax.toFixed(2)}`;
    if (orderTotal) orderTotal.textContent = `$${total.toFixed(2)}`;
}

/**
 * Setup checkout form validation and submission
 */
function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateCheckoutForm()) {
                return;
            }
            
            // Generate random order number
            const orderNumber = 'ORD-' + Math.floor(Math.random() * 100000);
            
            // Set order number in confirmation modal
            const orderNumberElement = document.getElementById('order-number');
            if (orderNumberElement) {
                orderNumberElement.textContent = orderNumber;
            }
            
            // Show confirmation modal
            const confirmationModal = document.getElementById('order-confirmation');
            if (confirmationModal) {
                confirmationModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            // Setup close modal functionality
            const closeModalBtn = confirmationModal.querySelector('.close-modal');
            if (closeModalBtn) {
                closeModalBtn.addEventListener('click', function() {
                    confirmationModal.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Clear cart and redirect to home
                    clearCart();
                    window.location.href = 'index.html';
                });
            }
            
            // Close modal when clicking outside
            confirmationModal.addEventListener('click', function(e) {
                if (e.target === confirmationModal) {
                    confirmationModal.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Clear cart and redirect to home
                    clearCart();
                    window.location.href = 'index.html';
                }
            });
        });
    }
}

/**
 * Validate checkout form fields
 * @returns {boolean} Whether the form is valid
 */
function validateCheckoutForm() {
    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const zip = document.getElementById('zip');
    const cardNumber = document.getElementById('card-number');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    const cardName = document.getElementById('card-name');
    
    let isValid = true;
    
    // Reset previous errors
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
    });
    
    // Validate billing details
    if (!fullName.value.trim()) {
        showFormError(fullName, 'Please enter your full name');
        isValid = false;
    }
    
    if (!validateEmail(email.value.trim())) {
        showFormError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!validatePhone(phone.value.trim())) {
        showFormError(phone, 'Please enter a valid phone number');
        isValid = false;
    }
    
    if (!address.value.trim()) {
        showFormError(address, 'Please enter your address');
        isValid = false;
    }
    
    if (!city.value.trim()) {
        showFormError(city, 'Please enter your city');
        isValid = false;
    }
    
    if (!state.value.trim()) {
        showFormError(state, 'Please enter your state/province');
        isValid = false;
    }
    
    if (!validateZip(zip.value.trim())) {
        showFormError(zip, 'Please enter a valid zip/postal code');
        isValid = false;
    }
    
    // Validate payment details
    if (!validateCardNumber(cardNumber.value.trim())) {
        showFormError(cardNumber, 'Please enter a valid card number');
        isValid = false;
    }
    
    if (!validateExpiryDate(expiryDate.value.trim())) {
        showFormError(expiryDate, 'Please enter a valid expiry date (MM/YY)');
        isValid = false;
    }
    
    if (!validateCVV(cvv.value.trim())) {
        showFormError(cvv, 'Please enter a valid CVV (3-4 digits)');
        isValid = false;
    }
    
    if (!cardName.value.trim()) {
        showFormError(cardName, 'Please enter the name on your card');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Display form error message
 * @param {HTMLElement} input - The input field
 * @param {string} message - The error message
 */
function showFormError(input, message) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
    }
}

/**
 * Initialize contact page functionality
 */
function initContactPage() {
    setupContactForm();
}

/**
 * Setup contact form validation and submission
 */
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contact-name');
            const email = document.getElementById('contact-email');
            const subject = document.getElementById('contact-subject');
            const message = document.getElementById('contact-message');
            
            let isValid = true;
            
            // Reset previous errors
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(error => {
                error.textContent = '';
            });
            
            // Validate fields
            if (!name.value.trim()) {
                showFormError(name, 'Please enter your name');
                isValid = false;
            }
            
            if (!validateEmail(email.value.trim())) {
                showFormError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!subject.value.trim()) {
                showFormError(subject, 'Please enter a subject');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                showFormError(message, 'Please enter your message');
                isValid = false;
            }
            
            if (isValid) {
                // Show success modal
                const contactSuccessModal = document.getElementById('contact-success');
                if (contactSuccessModal) {
                    contactSuccessModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // Clear form
                    contactForm.reset();
                    
                    // Setup close modal functionality
                    const closeModalBtns = contactSuccessModal.querySelectorAll('.close-modal, .close-modal-btn');
                    closeModalBtns.forEach(btn => {
                        btn.addEventListener('click', function() {
                            contactSuccessModal.classList.remove('active');
                            document.body.style.overflow = '';
                        });
                    });
                    
                    // Close modal when clicking outside
                    contactSuccessModal.addEventListener('click', function(e) {
                        if (e.target === contactSuccessModal) {
                            contactSuccessModal.classList.remove('active');
                            document.body.style.overflow = '';
                        }
                    });
                }
            }
        });
    }
}

/**
 * Show a notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error)
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Hide and remove after delay
    setTimeout(() => {
        notification.classList.remove('active');
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Validate phone number
 * @param {string} phone - The phone number to validate
 * @returns {boolean} Whether the phone number is valid
 */
function validatePhone(phone) {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Validate zip/postal code
 * @param {string} zip - The zip/postal code to validate
 * @returns {boolean} Whether the zip/postal code is valid
 */
function validateZip(zip) {
    // Simple check for now (5 digits for US, alphanumeric for others)
    return /^[a-zA-Z0-9\s-]{4,10}$/.test(zip);
}

/**
 * Validate credit card number
 * @param {string} cardNumber - The card number to validate
 * @returns {boolean} Whether the card number is valid
 */
function validateCardNumber(cardNumber) {
    // Remove spaces and dashes
    const number = cardNumber.replace(/[\s-]/g, '');
    return /^\d{13,19}$/.test(number);
}

/**
 * Validate card expiry date
 * @param {string} expiryDate - The expiry date to validate
 * @returns {boolean} Whether the expiry date is valid
 */
function validateExpiryDate(expiryDate) {
    const re = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!re.test(expiryDate)) {
        return false;
    }
    
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expYear = parseInt(year, 10);
    const expMonth = parseInt(month, 10);
    
    return (expYear > currentYear) || (expYear === currentYear && expMonth >= currentMonth);
}

/**
 * Validate CVV
 * @param {string} cvv - The CVV to validate
 * @returns {boolean} Whether the CVV is valid
 */
function validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}
