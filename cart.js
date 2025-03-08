document.addEventListener("DOMContentLoaded", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    mobileMenu.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
    displayCartItems();
});

// Function to display cart items in `cart.html`
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartDiv = document.getElementById("cart-items");
    let totalpricediv = document.getElementById("total-price");
    cartDiv.innerHTML = "";
    let total= 0 ;
    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Your cart is empty.</p>";
        totalpricediv.innerHTML="Total: $0.00";
        return;
    }
    cart.forEach(product => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        let productprice = parseFloat(product.price) * (product.quantity);
        total += productprice;
        cartItem.innerHTML = `
            <img src="${product.image_link}" alt="${product.name}" width="100">
            <p>${product.name} - $${parseFloat(product.price).toFixed(2)}</p>
            <p>Quantity: <input type="number" value="${product.quantity}" min="1" onchange="updateQuantity('${product.id}', this.value)"></p>
            <button onclick="removeFromCart('${product.id}')">Remove</button>
        `;
        cartDiv.appendChild(cartItem);
    });
    totalpricediv.innerHTML= `Total: $${total.toFixed(2)}`;
}
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(product => product.id != productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}
function clearCart(){
    localStorage.removeItem("cart");
    displayCartItems();
}
function updateQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = cart.find(p => p.id === productId);
    if (product && newQuantity > 0) {
        product.quantity = parseInt(newQuantity);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
    }
}

/* window.addEventListener("load", function(){
    displaycart();
});
function displaycart(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartcontainer = document.getElementById("cart-container");
    let cartsummary = document.getElementById("cart-total");
    cartcontainer.innerHTML=""; 
    if (cart.length === 0) {
        cart.container.innerHTML = "<p> Cart is empty </p>";
        cartsummary.textContent = "0.00";
        return; 
    }
    let total = 0;
    cart.forEach(product => {
        let cartitem = document.createElement("div");
        cartitem.classList.add("cart-item");
        cartitem.innerHTML= `<div class="product"> <img src="${product.image_link || product.api_featured_image}" alt="${product.name}" class="product-image">
        <div class="product-details"> <h3>${product.name}</h3> <p>Price: $${parseFloat(product.price).toFixed(2)} </p>
        <p> Quantity: ${product.quantity}</p>
        <button onclick="removefromcart('${product.id}')">Remove</button>
        </div>
        </div>`;
        cartcontainer.appendChild(cartitem);
        total += product.quantity * parseFloat(product.price);
    });
    cartsummary.textContent= total.toFixed(2);
}
function removefromcart (productId){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart= cart.filter( item => item.id != productId);
    localStorage.setItem("cart" , JSON.stringify(cart));
    displaycart();
}
*/