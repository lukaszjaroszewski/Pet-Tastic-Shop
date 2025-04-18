/*
 * PetTastic - Products Data
 * This file contains product data and functions to manage products
 */

/**
 * Product database - static product data
 */
const products = [
    {
        id: '1',
        name: 'Squeaky Duck Toy',
        price: 9.99,
        category: 'Dog Toys',
        image: 'https://placedog.net/500/500?r=1',
        description: 'A durable squeaky duck toy that will keep your dog entertained for hours. Made from non-toxic, pet-safe materials that can withstand even the most enthusiastic chewers.',
        shortDescription: 'Durable rubber duck with a squeaker for hours of fun',
        inStock: true,
        features: ['Squeaker inside', 'Floats on water', 'Easy to clean']
    },
    {
        id: '2',
        name: 'Catnip Mouse Toy',
        price: 6.99,
        category: 'Cat Toys',
        image: 'https://placekitten.com/500/500?image=8',
        description: 'A soft plush mouse filled with premium catnip that will trigger your cat\'s natural hunting instincts. The perfect toy to keep your feline friend active and engaged.',
        shortDescription: 'Soft plush mouse filled with premium catnip',
        inStock: true,
        features: ['Premium catnip filling', 'Soft fabric exterior', 'Realistic mouse shape']
    },
    {
        id: '3',
        name: 'Durable Rope Toy',
        price: 12.99,
        category: 'Dog Toys',
        image: 'https://placedog.net/500/500?r=2',
        description: 'An extra-durable rope toy perfect for tug-of-war games with your dog. The cotton fibers help clean your dog\'s teeth during play, promoting dental health.',
        shortDescription: 'Strong cotton rope for interactive play and dental health',
        inStock: true,
        features: ['Dental cleaning', 'Machine washable', 'Multiple knots for easy grip']
    },
    {
        id: '4',
        name: 'Interactive Treat Ball',
        price: 14.99,
        category: 'Dog Toys',
        image: 'https://placedog.net/500/500?r=3',
        description: 'This treat-dispensing ball keeps your dog mentally stimulated as they work to get the treats out. Adjustable difficulty levels make it perfect for dogs of all intelligence levels.',
        shortDescription: 'Treat-dispensing toy for mental stimulation',
        inStock: true,
        features: ['Adjustable difficulty', 'Easy to fill', 'Dishwasher safe']
    },
    {
        id: '5',
        name: 'Feather Wand Toy',
        price: 8.99,
        category: 'Cat Toys',
        image: 'https://placekitten.com/500/500?image=6',
        description: 'This interactive feather wand will bring out your cat\'s natural hunting instincts. The unpredictable movements of the feathers mimic bird movements, providing excitement and exercise.',
        shortDescription: 'Interactive feather wand for active play',
        inStock: true,
        features: ['Retractable wand', 'Replacement feathers available', 'Crinkle material for extra excitement']
    },
    {
        id: '6',
        name: 'Bird Swing',
        price: 11.99,
        category: 'Bird Toys',
        image: 'https://placeimg.com/500/500/animals',
        description: 'A colorful swing for your feathered friend. Made from bird-safe wood and non-toxic colors, this swing provides exercise and entertainment for small to medium birds.',
        shortDescription: 'Colorful wooden swing for bird cage or stand',
        inStock: true,
        features: ['Natural wood', 'Easy to install', 'Suitable for parakeets, cockatiels, and similar birds']
    },
    {
        id: '7',
        name: 'Plush Donut Bed',
        price: 29.99,
        category: 'Dog Toys',
        image: 'https://placedog.net/500/500?r=4',
        description: 'A soft, cozy plush bed in a donut shape that provides a sense of security for your pet. The raised rim creates a sense of security and offers head and neck support.',
        shortDescription: 'Soft, self-warming bed with raised rim for security',
        inStock: true,
        features: ['Machine washable', 'Non-slip bottom', 'Ultra-soft filling']
    },
    {
        id: '8',
        name: 'Crinkle Ball Set',
        price: 7.99,
        category: 'Cat Toys',
        image: 'https://placekitten.com/500/500?image=7',
        description: 'A set of 4 colorful crinkle balls that make an enticing crinkling sound that cats love. Lightweight and easy to bat around, these balls provide hours of entertainment.',
        shortDescription: 'Set of 4 lightweight crinkle balls that cats love to chase',
        inStock: true,
        features: ['Crinkle sound', 'Lightweight', 'Bright colors']
    },
    {
        id: '9',
        name: 'Hamster Exercise Wheel',
        price: 16.99,
        category: 'Small Pet Toys',
        image: 'https://placeimg.com/500/500/animals?t=1',
        description: 'A silent-spinning exercise wheel for hamsters, gerbils, and other small pets. The solid running surface is safer for little paws than wire wheels.',
        shortDescription: 'Silent-spinning wheel for hamsters and other small pets',
        inStock: true,
        features: ['Silent operation', 'Solid running surface', 'Easy to clean']
    },
    {
        id: '10',
        name: 'Indestructible Chew Toy',
        price: 18.99,
        category: 'Dog Toys',
        image: 'https://placedog.net/500/500?r=5',
        description: 'Designed for the most aggressive chewers, this virtually indestructible toy will stand up to your dog\'s strongest bites. Made from tough, non-toxic materials that are safe for your pet.',
        shortDescription: 'Extra-tough toy for aggressive chewers',
        inStock: true,
        features: ['Extremely durable', 'Bacon flavor', 'Floats in water']
    },
    {
        id: '11',
        name: 'Cat Tunnel Playground',
        price: 24.99,
        category: 'Cat Toys',
        image: 'https://placekitten.com/500/500?image=9',
        description: 'A collapsible tunnel system with peek holes and crinkle material that satisfies your cat\'s natural instinct to hide and hunt. Includes a dangling toy for added fun.',
        shortDescription: 'Collapsible tunnel system with peek holes and crinkle material',
        inStock: true,
        features: ['Collapsible for easy storage', 'Multiple peek holes', 'Built-in dangling toy']
    },
    {
        id: '12',
        name: 'Bird Ladder Toy',
        price: 9.99,
        category: 'Bird Toys',
        image: 'https://placeimg.com/500/500/animals?t=2',
        description: 'A colorful wooden ladder for birds to climb and play on. The varying textures and colors provide enrichment and exercise for your feathered friend.',
        shortDescription: 'Colorful wooden ladder with varying textures for birds',
        inStock: true,
        features: ['Natural wood construction', 'Multiple textures', 'Attaches easily to cage']
    }
];

/**
 * Get all products
 * @returns {Array} Array of product objects
 */
function getAllProducts() {
    return products;
}

/**
 * Find a product by ID
 * @param {string} id - Product ID to find
 * @returns {object|null} Product object or null if not found
 */
function findProductById(id) {
    return products.find(product => product.id === id) || null;
}

/**
 * Get featured products
 * @param {number} limit - Maximum number of products to return
 * @returns {Array} Array of featured product objects
 */
function getFeaturedProducts(limit = 8) {
    // For simplicity, we'll just return the first few products as featured
    return products.slice(0, limit);
}

/**
 * Get related products by category
 * @param {string} category - Product category
 * @param {string} excludeId - Product ID to exclude (usually current product)
 * @param {number} limit - Maximum number of products to return
 * @returns {Array} Array of related product objects
 */
function getRelatedProducts(category, excludeId, limit = 4) {
    return products
        .filter(product => product.category === category && product.id !== excludeId)
        .slice(0, limit);
}

/**
 * Create a product card element
 * @param {object} product - Product object
 * @returns {HTMLElement} Product card element
 */
function createProductCard(product) {
    // Create card container
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Create HTML content
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-quick-actions">
                <button class="quick-view-btn" data-id="${product.id}">Quick View</button>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    // Add event listeners
    const addToCartBtn = card.querySelector('.add-to-cart');
    const quickViewBtn = card.querySelector('.quick-view-btn');
    const addToCartQuickBtn = card.querySelector('.add-to-cart-btn');
    
    addToCartBtn.addEventListener('click', function() {
        addToCart(product, 1);
        showNotification(`Added ${product.name} to your cart!`, 'success');
        updateCartCount();
    });
    
    addToCartQuickBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        addToCart(product, 1);
        showNotification(`Added ${product.name} to your cart!`, 'success');
        updateCartCount();
    });
    
    quickViewBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        window.location.href = `product.html?id=${product.id}`;
    });
    
    // Make entire card clickable to go to product page
    card.addEventListener('click', function() {
        window.location.href = `product.html?id=${product.id}`;
    });
    
    return card;
}

/**
 * Load featured products on homepage
 */
function loadFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
    
    if (featuredProductsContainer) {
        const featuredProducts = getFeaturedProducts(8);
        
        // Clear container
        featuredProductsContainer.innerHTML = '';
        
        // Add products
        featuredProducts.forEach(product => {
            featuredProductsContainer.appendChild(createProductCard(product));
        });
    }
}

// Initialize featured products when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    
    // Load suggested products on cart page
    const suggestedProductsContainer = document.getElementById('suggested-products');
    if (suggestedProductsContainer) {
        const suggestedProducts = products
            .sort(() => 0.5 - Math.random()) // Simple shuffle
            .slice(0, 4); // Get 4 random products
        
        suggestedProducts.forEach(product => {
            suggestedProductsContainer.appendChild(createProductCard(product));
        });
    }
});
