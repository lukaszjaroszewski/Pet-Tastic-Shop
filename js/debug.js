console.log("Debug script loaded");

// Direct function to load products (not waiting for DOM event)
function debugLoadProducts() {
    console.log("Manually loading products");
    const productsContainer = document.getElementById('shop-products');
    
    if (productsContainer) {
        console.log("Found products container, loading products...");
        
        try {
            // Get all products
            const allProducts = getAllProducts();
            console.log(`Got ${allProducts.length} products`);
            
            // Clear container
            productsContainer.innerHTML = '';
            
            // Add products
            allProducts.forEach(product => {
                try {
                    const card = createProductCard(product);
                    productsContainer.appendChild(card);
                    console.log(`Added product: ${product.name}`);
                } catch (e) {
                    console.error(`Error creating card for ${product.name}:`, e);
                }
            });
        } catch (e) {
            console.error("Error loading products:", e);
        }
    } else {
        console.error("Could not find products container with ID 'shop-products'");
        
        // Try to find it using other methods
        const allDivs = document.querySelectorAll('div');
        console.log(`Total divs on page: ${allDivs.length}`);
        
        const possibleContainers = Array.from(allDivs).filter(div => 
            div.className && div.className.includes('products-grid')
        );
        
        console.log(`Found ${possibleContainers.length} divs with class 'products-grid'`);
        possibleContainers.forEach((div, i) => {
            console.log(`Possible container ${i}:`, div);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");

    // Debug shop page loading
    console.log("Current page: " + window.location.pathname);
    
    // Check if we're on the shop page
    if (window.location.pathname.includes('shop.html')) {
        console.log("On shop page");
        
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
        
        // Try loading products directly
        setTimeout(debugLoadProducts, 500);
    }
});