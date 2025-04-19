console.log("Debug script loaded");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");

    // Debug shop page loading
    console.log("Current page: " + window.location.pathname);
    
    // Check if we're on the shop page
    if (window.location.pathname.includes('shop.html')) {
        console.log("On shop page");
        
        // Check if the products container exists
        const productsContainer = document.getElementById('shop-products');
        console.log("Products container:", productsContainer);
        
        // Check if getAllProducts function exists and works
        if (typeof getAllProducts === 'function') {
            console.log("getAllProducts function exists");
            const products = getAllProducts();
            console.log("Products count:", products.length);
            console.log("First product:", products[0]);
        } else {
            console.error("getAllProducts function is not available");
        }
        
        // Check if createProductCard function exists
        if (typeof createProductCard === 'function') {
            console.log("createProductCard function exists");
        } else {
            console.error("createProductCard function is not available");
        }
    }
});