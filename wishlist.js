document.addEventListener("DOMContentLoaded", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    mobileMenu.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
    displayWishlistItems();
});

// Function to display wishlist items
function displayWishlistItems() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let wishlistDiv = document.getElementById("wishlist-items");
    wishlistDiv.innerHTML = "";
    if (wishlist.length === 0) {
        wishlistDiv.innerHTML = "<p>Your wishlist is empty.</p>";
        return;
    }
    // For each product, create a wishlist item element
    wishlist.forEach(product => {
        let wishlistItem = document.createElement("div");
        wishlistItem.classList.add("wishlist-item");
        wishlistItem.innerHTML = `
            <img src="${product.image_link}" alt="${product.name}" width="100">
            <p>${product.name} - $${parseFloat(product.price).toFixed(2)}</p>
            <button onclick="removeFromWishlist('${product.id}')">Remove</button>
            <button onclick="moveToCart('${product.id}')">Move to Cart</button>
        `;
        wishlistDiv.appendChild(wishlistItem);
    });
}

function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(product => product.id != productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    displayWishlistItems();
}

function moveToCart(productId) {
    
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    let product = wishlist.find(p => p.id == productId);
    if (product) {
        // Remove it from the wishlist
        wishlist = wishlist.filter(p => p.id != productId);
        // Check if the product already exists in the cart
        let existingProduct = cart.find(p => p.id == productId);
        if (existingProduct) {
            existingProduct.quantity = (existingProduct.quantity || 1) + 1;
        } else {
            // Set default quantity and add to cart
            product.quantity = 1;
            cart.push(product);
        }
        // Update localStorage for both cart and wishlist
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} has been moved to your cart!`);
        displayWishlistItems();
    }
}
