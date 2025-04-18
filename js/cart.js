/*
 * PetTastic - Cart JavaScript
 * This file contains functionality for managing the shopping cart
 */

// Initialize cart from local storage or create empty cart
let cart = JSON.parse(localStorage.getItem('pettasticCart')) || [];

/**
 * Add a product to the cart
 * @param {object} product - The product to add
 * @param {number} quantity - The quantity to add
 */
function addToCart(product, quantity = 1) {
    // Check if product is already in cart
    const existingItemIndex = cart.findIndex(item => item.productId === product.id);
    
    if (existingItemIndex !== -1) {
        // Update quantity if product already in cart
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            productId: product.id,
            product: product,
            quantity: quantity
        });
    }
    
    // Save cart to local storage
    saveCart();
    
    // Update cart count in header
    updateCartCount();
}

/**
 * Remove a product from the cart
 * @param {string} productId - The ID of the product to remove
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    
    // Save cart to local storage
    saveCart();
    
    // Update cart display
    updateCartDisplay();
    
    // Update cart count in header
    updateCartCount();
}

/**
 * Update the quantity of a product in the cart
 * @param {string} productId - The ID of the product to update
 * @param {number} quantity - The new quantity
 */
function updateCartItemQuantity(productId, quantity) {
    const itemIndex = cart.findIndex(item => item.productId === productId);
    
    if (itemIndex !== -1) {
        // Ensure quantity is at least 1
        quantity = Math.max(1, quantity);
        
        // Update quantity
        cart[itemIndex].quantity = quantity;
        
        // Save cart to local storage
        saveCart();
        
        // Update subtotal display for this item
        const subtotalElement = document.querySelector(`[data-product-id="${productId}"] .cart-subtotal`);
        if (subtotalElement) {
            const price = cart[itemIndex].product.price;
            subtotalElement.textContent = `$${(price * quantity).toFixed(2)}`;
        }
        
        // Update cart totals
        updateCartTotals();
    }
}

/**
 * Save cart to local storage
 */
function saveCart() {
    localStorage.setItem('pettasticCart', JSON.stringify(cart));
}

/**
 * Get cart items
 * @returns {Array} Array of cart items
 */
function getCartItems() {
    return cart;
}

/**
 * Calculate the total quantity of items in the cart
 * @returns {number} Total quantity
 */
function calculateCartQuantity() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Calculate the total price of the cart
 * @returns {number} Total price
 */
function calculateCartTotal() {
    return cart.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
    }, 0);
}

/**
 * Update the cart count display in the header
 */
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = calculateCartQuantity();
    
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

/**
 * Update the cart display on the cart page
 */
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartContent = document.getElementById('cart-content');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        // Show empty cart message
        if (emptyCartMessage) emptyCartMessage.classList.remove('hidden');
        if (cartContent) cartContent.classList.add('hidden');
        return;
    }
    
    // Hide empty cart message and show cart content
    if (emptyCartMessage) emptyCartMessage.classList.add('hidden');
    if (cartContent) cartContent.classList.remove('hidden');
    
    // Clear cart items container
    cartItemsContainer.innerHTML = '';
    
    // Add each item to the cart
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-product-id', item.productId);
        
        row.innerHTML = `
            <td data-label="Product">
                <div class="cart-product">
                    <div class="cart-product-image">
                        <img src="${item.product.image}" alt="${item.product.name}">
                    </div>
                    <div class="cart-product-info">
                        <h3 class="cart-product-name">${item.product.name}</h3>
                        <p class="cart-product-category">${item.product.category}</p>
                    </div>
                </div>
            </td>
            <td data-label="Price">$${item.product.price.toFixed(2)}</td>
            <td data-label="Quantity">
                <div class="cart-quantity quantity-selector">
                    <button class="quantity-btn minus cart-decrease" data-id="${item.productId}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="cart-item-quantity" data-id="${item.productId}">
                    <button class="quantity-btn plus cart-increase" data-id="${item.productId}">+</button>
                </div>
            </td>
            <td data-label="Subtotal" class="cart-subtotal">$${(item.product.price * item.quantity).toFixed(2)}</td>
            <td>
                <button class="cart-remove-btn" data-id="${item.productId}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        // Add the row to the cart
        cartItemsContainer.appendChild(row);
    });
    
    // Add event listeners for quantity buttons and remove buttons
    addCartEventListeners();
    
    // Update cart totals
    updateCartTotals();
}

/**
 * Add event listeners to cart elements
 */
function addCartEventListeners() {
    // Quantity decrease buttons
    const decreaseButtons = document.querySelectorAll('.cart-decrease');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const quantityInput = document.querySelector(`.cart-item-quantity[data-id="${productId}"]`);
            let quantity = parseInt(quantityInput.value) - 1;
            quantity = Math.max(1, quantity);
            quantityInput.value = quantity;
            updateCartItemQuantity(productId, quantity);
        });
    });
    
    // Quantity increase buttons
    const increaseButtons = document.querySelectorAll('.cart-increase');
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const quantityInput = document.querySelector(`.cart-item-quantity[data-id="${productId}"]`);
            let quantity = parseInt(quantityInput.value) + 1;
            quantity = Math.min(10, quantity); // Max quantity of 10
            quantityInput.value = quantity;
            updateCartItemQuantity(productId, quantity);
        });
    });
    
    // Quantity input fields
    const quantityInputs = document.querySelectorAll('.cart-item-quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const productId = this.getAttribute('data-id');
            let quantity = parseInt(this.value);
            quantity = Math.max(1, Math.min(10, quantity)); // Between 1 and 10
            this.value = quantity;
            updateCartItemQuantity(productId, quantity);
        });
    });
    
    // Remove buttons
    const removeButtons = document.querySelectorAll('.cart-remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            removeFromCart(productId);
        });
    });
    
    // Update cart button
    const updateCartButton = document.getElementById('update-cart');
    if (updateCartButton) {
        updateCartButton.addEventListener('click', function() {
            // Get all quantity inputs and update the cart
            const quantityInputs = document.querySelectorAll('.cart-item-quantity');
            quantityInputs.forEach(input => {
                const productId = input.getAttribute('data-id');
                const quantity = parseInt(input.value);
                updateCartItemQuantity(productId, quantity);
            });
            
            showNotification('Cart updated successfully!', 'success');
        });
    }
}

/**
 * Update the cart totals display
 */
function updateCartTotals() {
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');
    
    if (subtotalElement && totalElement) {
        const subtotal = calculateCartTotal();
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${subtotal.toFixed(2)}`;
    }
}

/**
 * Clear the entire cart
 */
function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // If we're on the cart page, update the cart display
    if (window.location.pathname.includes('cart.html')) {
        updateCartDisplay();
    }
});
