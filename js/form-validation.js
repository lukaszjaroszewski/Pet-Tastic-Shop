/*
 * PetTastic - Form Validation JavaScript
 * This file contains functions for validating forms
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation for all forms
    initFormValidation();
});

/**
 * Initialize form validation for all forms
 */
function initFormValidation() {
    // Newsletter form in footer
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', validateNewsletterForm);
    }
    
    // Newsletter popup form
    const popupNewsletterForm = document.getElementById('popup-newsletter-form');
    if (popupNewsletterForm) {
        popupNewsletterForm.addEventListener('submit', validateNewsletterForm);
    }
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }
    
    // Checkout form
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', validateCheckoutForm);
        setupCheckoutFormListeners();
    }
}

/**
 * Validate newsletter subscription form
 * @param {Event} e - Form submission event
 */
function validateNewsletterForm(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    // Check if email is valid
    if (!validateEmail(email)) {
        showInputError(emailInput, 'Please enter a valid email address');
        return false;
    }
    
    // Clear any previous error
    clearInputError(emailInput);
    
    // Success! Show success message
    const successMessage = document.createElement('p');
    successMessage.className = 'form-success-message';
    successMessage.textContent = 'Thank you for subscribing!';
    
    // Replace form with success message or append after form
    if (this.id === 'popup-newsletter-form') {
        const popupContent = this.closest('.popup-content');
        if (popupContent) {
            // Save to local storage to avoid showing popup again
            localStorage.setItem('newsletterSubscribed', 'true');
            
            // Clear form and show success message
            this.innerHTML = '';
            this.appendChild(successMessage);
            
            // Close popup after delay
            setTimeout(() => {
                const popup = document.getElementById('newsletter-popup');
                if (popup) {
                    popup.classList.remove('active');
                }
            }, 3000);
        }
    } else {
        // Footer newsletter form
        this.reset();
        
        // Show temporary success message
        this.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }
    
    return true;
}

/**
 * Validate contact form
 * @param {Event} e - Form submission event
 */
function validateContactForm(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    
    let isValid = true;
    
    // Clear previous error messages
    clearAllErrors(this);
    
    // Validate name (required)
    if (!nameInput.value.trim()) {
        showInputError(nameInput, 'Please enter your name');
        isValid = false;
    }
    
    // Validate email (required and format)
    if (!validateEmail(emailInput.value.trim())) {
        showInputError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject (required)
    if (!subjectInput.value.trim()) {
        showInputError(subjectInput, 'Please enter a subject');
        isValid = false;
    }
    
    // Validate message (required)
    if (!messageInput.value.trim()) {
        showInputError(messageInput, 'Please enter your message');
        isValid = false;
    }
    
    if (isValid) {
        // Show success modal
        const successModal = document.getElementById('contact-success');
        if (successModal) {
            successModal.classList.add('active');
            
            // Reset form
            this.reset();
            
            // Close modal when X is clicked
            const closeButton = successModal.querySelector('.close-modal');
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    successModal.classList.remove('active');
                });
            }
            
            // Close modal when Close button is clicked
            const closeModalBtn = successModal.querySelector('.close-modal-btn');
            if (closeModalBtn) {
                closeModalBtn.addEventListener('click', function() {
                    successModal.classList.remove('active');
                });
            }
            
            // Close modal when clicking outside
            successModal.addEventListener('click', function(e) {
                if (e.target === successModal) {
                    successModal.classList.remove('active');
                }
            });
        }
    }
    
    return isValid;
}

/**
 * Validate checkout form
 * @param {Event} e - Form submission event
 */
function validateCheckoutForm(e) {
    e.preventDefault();
    
    // Billing details inputs
    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const cityInput = document.getElementById('city');
    const stateInput = document.getElementById('state');
    const zipInput = document.getElementById('zip');
    
    // Payment inputs
    const cardNumberInput = document.getElementById('card-number');
    const expiryDateInput = document.getElementById('expiry-date');
    const cvvInput = document.getElementById('cvv');
    const cardNameInput = document.getElementById('card-name');
    
    // Shipping inputs (if not same as billing)
    const sameAsBillingCheckbox = document.getElementById('same-as-billing');
    let shippingInputs = [];
    
    if (sameAsBillingCheckbox && !sameAsBillingCheckbox.checked) {
        shippingInputs = [
            document.getElementById('shipping-full-name'),
            document.getElementById('shipping-address'),
            document.getElementById('shipping-city'),
            document.getElementById('shipping-state'),
            document.getElementById('shipping-zip')
        ];
    }
    
    let isValid = true;
    
    // Clear previous error messages
    clearAllErrors(this);
    
    // Validate billing details
    
    // Full name (required)
    if (!fullNameInput.value.trim()) {
        showInputError(fullNameInput, 'Please enter your full name');
        isValid = false;
    }
    
    // Email (required and format)
    if (!validateEmail(emailInput.value.trim())) {
        showInputError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone (required and format)
    if (!validatePhone(phoneInput.value.trim())) {
        showInputError(phoneInput, 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Address (required)
    if (!addressInput.value.trim()) {
        showInputError(addressInput, 'Please enter your address');
        isValid = false;
    }
    
    // City (required)
    if (!cityInput.value.trim()) {
        showInputError(cityInput, 'Please enter your city');
        isValid = false;
    }
    
    // State (required)
    if (!stateInput.value.trim()) {
        showInputError(stateInput, 'Please enter your state/province');
        isValid = false;
    }
    
    // Zip (required and format)
    if (!validateZip(zipInput.value.trim())) {
        showInputError(zipInput, 'Please enter a valid zip/postal code');
        isValid = false;
    }
    
    // Validate shipping details if not same as billing
    if (sameAsBillingCheckbox && !sameAsBillingCheckbox.checked) {
        // Shipping full name (required)
        if (!shippingInputs[0].value.trim()) {
            showInputError(shippingInputs[0], 'Please enter the recipient\'s full name');
            isValid = false;
        }
        
        // Shipping address (required)
        if (!shippingInputs[1].value.trim()) {
            showInputError(shippingInputs[1], 'Please enter the shipping address');
            isValid = false;
        }
        
        // Shipping city (required)
        if (!shippingInputs[2].value.trim()) {
            showInputError(shippingInputs[2], 'Please enter the city');
            isValid = false;
        }
        
        // Shipping state (required)
        if (!shippingInputs[3].value.trim()) {
            showInputError(shippingInputs[3], 'Please enter the state/province');
            isValid = false;
        }
        
        // Shipping zip (required and format)
        if (!validateZip(shippingInputs[4].value.trim())) {
            showInputError(shippingInputs[4], 'Please enter a valid zip/postal code');
            isValid = false;
        }
    }
    
    // Validate payment details
    
    // Card number (required and format)
    if (!validateCardNumber(cardNumberInput.value.trim())) {
        showInputError(cardNumberInput, 'Please enter a valid card number');
        isValid = false;
    }
    
    // Expiry date (required and format)
    if (!validateExpiryDate(expiryDateInput.value.trim())) {
        showInputError(expiryDateInput, 'Please enter a valid expiry date (MM/YY)');
        isValid = false;
    }
    
    // CVV (required and format)
    if (!validateCVV(cvvInput.value.trim())) {
        showInputError(cvvInput, 'Please enter a valid CVV (3-4 digits)');
        isValid = false;
    }
    
    // Card name (required)
    if (!cardNameInput.value.trim()) {
        showInputError(cardNameInput, 'Please enter the name on your card');
        isValid = false;
    }
    
    if (isValid) {
        // Show order confirmation modal
        const confirmationModal = document.getElementById('order-confirmation');
        
        if (confirmationModal) {
            // Generate random order number
            const orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
            const orderNumberElement = document.getElementById('order-number');
            if (orderNumberElement) {
                orderNumberElement.textContent = orderNumber;
            }
            
            // Show modal
            confirmationModal.classList.add('active');
            
            // Clear cart after successful order
            clearCart();
            
            // Reset form
            this.reset();
            
            // Close modal when X is clicked
            const closeButton = confirmationModal.querySelector('.close-modal');
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    confirmationModal.classList.remove('active');
                    window.location.href = 'index.html'; // Redirect to homepage
                });
            }
            
            // Close modal when clicking outside
            confirmationModal.addEventListener('click', function(e) {
                if (e.target === confirmationModal) {
                    confirmationModal.classList.remove('active');
                    window.location.href = 'index.html'; // Redirect to homepage
                }
            });
        }
    }
    
    return isValid;
}

/**
 * Setup event listeners for checkout form fields
 */
function setupCheckoutFormListeners() {
    // Format card number as user types
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            this.value = formatCardNumber(this.value);
        });
    }
    
    // Format expiry date as user types
    const expiryDateInput = document.getElementById('expiry-date');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            this.value = formatExpiryDate(this.value);
        });
    }
    
    // Allow only numbers for CVV
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').substring(0, 4);
        });
    }
    
    // Format phone number as user types
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = formatPhoneNumber(this.value);
        });
    }
    
    // Toggle shipping fields based on checkbox
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
 * Format credit card number with spaces
 * @param {string} value - Unformatted card number
 * @returns {string} Formatted card number
 */
function formatCardNumber(value) {
    // Remove all non-digit characters
    let cardNumber = value.replace(/\D/g, '');
    
    // Limit to 16 digits
    cardNumber = cardNumber.substring(0, 16);
    
    // Add spaces after every 4 digits
    let formattedNumber = '';
    for (let i = 0; i < cardNumber.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedNumber += ' ';
        }
        formattedNumber += cardNumber[i];
    }
    
    return formattedNumber;
}

/**
 * Format expiry date (MM/YY)
 * @param {string} value - Unformatted expiry date
 * @returns {string} Formatted expiry date
 */
function formatExpiryDate(value) {
    // Remove all non-digit characters
    let expiryDate = value.replace(/\D/g, '');
    
    // Limit to 4 digits
    expiryDate = expiryDate.substring(0, 4);
    
    // Add slash after 2 digits
    if (expiryDate.length > 2) {
        expiryDate = expiryDate.substring(0, 2) + '/' + expiryDate.substring(2);
    }
    
    return expiryDate;
}

/**
 * Format phone number as (XXX) XXX-XXXX
 * @param {string} value - Unformatted phone number
 * @returns {string} Formatted phone number
 */
function formatPhoneNumber(value) {
    // Remove all non-digit characters
    let phoneNumber = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    phoneNumber = phoneNumber.substring(0, 10);
    
    // Format as needed
    if (phoneNumber.length > 6) {
        return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6)}`;
    } else if (phoneNumber.length > 3) {
        return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3)}`;
    } else if (phoneNumber.length > 0) {
        return `(${phoneNumber}`;
    }
    
    return phoneNumber;
}

/**
 * Show error message for an input field
 * @param {HTMLElement} input - The input field
 * @param {string} message - Error message to display
 */
function showInputError(input, message) {
    // Find or create error message element
    let errorElement = input.nextElementSibling;
    
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    
    errorElement.textContent = message;
    input.classList.add('error');
}

/**
 * Clear error message for an input field
 * @param {HTMLElement} input - The input field
 */
function clearInputError(input) {
    // Find error message element
    const errorElement = input.nextElementSibling;
    
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = '';
    }
    
    input.classList.remove('error');
}

/**
 * Clear all error messages in a form
 * @param {HTMLElement} form - The form element
 */
function clearAllErrors(form) {
    const errorElements = form.querySelectorAll('.error-message');
    const inputElements = form.querySelectorAll('input, textarea, select');
    
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    inputElements.forEach(input => {
        input.classList.remove('error');
    });
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether the email is valid
 */
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Whether the phone number is valid
 */
function validatePhone(phone) {
    // Allow digits, spaces, parentheses, and hyphens
    // Must have at least 10 digits
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
}

/**
 * Validate zip/postal code
 * @param {string} zip - Zip/postal code to validate
 * @returns {boolean} Whether the zip/postal code is valid
 */
function validateZip(zip) {
    // US zip code (5 digits or 5+4)
    const usZipRegex = /^\d{5}(-\d{4})?$/;
    
    // Canadian postal code (A1A 1A1)
    const canPostalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    
    // General international postal code (4-10 alphanumeric characters)
    const generalRegex = /^[a-zA-Z0-9]{4,10}$/;
    
    return usZipRegex.test(zip) || canPostalRegex.test(zip) || generalRegex.test(zip);
}

/**
 * Validate credit card number
 * @param {string} cardNumber - Card number to validate
 * @returns {boolean} Whether the card number is valid
 */
function validateCardNumber(cardNumber) {
    // Remove spaces and dashes
    const digitsOnly = cardNumber.replace(/[\s-]/g, '');
    
    // Must be 13-19 digits
    if (!/^\d{13,19}$/.test(digitsOnly)) {
        return false;
    }
    
    // Optional: Implement Luhn algorithm for more thorough validation
    // For now, just check the length and that it contains only digits
    return true;
}

/**
 * Validate expiry date (MM/YY)
 * @param {string} expiryDate - Expiry date to validate
 * @returns {boolean} Whether the expiry date is valid
 */
function validateExpiryDate(expiryDate) {
    // Check format (MM/YY)
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        return false;
    }
    
    const [month, year] = expiryDate.split('/').map(part => parseInt(part, 10));
    
    // Check month (1-12)
    if (month < 1 || month > 12) {
        return false;
    }
    
    // Get current date
    const now = new Date();
    const currentYear = now.getFullYear() % 100; // Last 2 digits of year
    const currentMonth = now.getMonth() + 1; // 1-12
    
    // Check if expired
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return false;
    }
    
    return true;
}

/**
 * Validate CVV
 * @param {string} cvv - CVV to validate
 * @returns {boolean} Whether the CVV is valid
 */
function validateCVV(cvv) {
    // 3-4 digits
    return /^\d{3,4}$/.test(cvv);
}
