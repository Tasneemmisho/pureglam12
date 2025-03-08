document.addEventListener("DOMContentLoaded", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    mobileMenu.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
});
const apiURL = "http://makeup-api.herokuapp.com/api/v1/products.json";
let allProducts = []; // Store all products globally

// Fetch products from the API
async function fetchProducts() {
    try {
        console.log("Fetching products...");
        let response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log("API Response:", data);

        if (!Array.isArray(data)) {
            throw new Error("Fetched data is not an array. Check API response structure.");
        }
        allProducts = data.filter(product => product.brand && product.price && product.product_type);
        console.log("Filtered Products:", allProducts);

        if (allProducts.length == 0) {
            console.warn("No valid products found after filtering.");
        }

        // Display all products initially
        displayProducts(allProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Display products and move brands without images to the bottom


function displayProducts(products) {
    console.log("Displaying products...");
    let productsDiv = document.getElementById("products");
    productsDiv.innerHTML = "";

    if (products.length == 0) {
        productsDiv.innerHTML = "<p>No products found.</p>";
        return;
    }

    const brandsWithoutImages = [
        "benefit", "iman", "dior", "fenty", "glossier", "alva", "c'est moi",
        "casual classic creation", "green people", "lotus cosmetics USA",
        "maia's mineral galaxy", "marienatie", "nudus", "penny Lane organics",
        "rejuva minerals", "Sally b's skin yummies", "w3llpeople",
        "zorah biocosmetiques", "deciem", "boosh", "colourpop"
    ].map(b => b.toLowerCase());

    // Sort products so that brands without images appear last
    products.sort((a, b) => {
        let aBrand = a.brand ? a.brand.toLowerCase() : "";
        let bBrand = b.brand ? b.brand.toLowerCase() : "";
        let aNoImage = brandsWithoutImages.includes(aBrand);
        let bNoImage = brandsWithoutImages.includes(bBrand);
        if (aNoImage && !bNoImage) return 1;
        if (!aNoImage && bNoImage) return -1;
        return aBrand.localeCompare(bBrand);
    });

    let brands = {};

    // Group products by brand
    products.forEach(product => {
        if (!brands[product.brand]) {
            brands[product.brand] = [];
        }
        brands[product.brand].push(product);
    });

    // Display products per brand
    Object.keys(brands).forEach(brand => {
        let brandSection = document.createElement("div");
        brandSection.classList.add("brand-section");
        brandSection.innerHTML = `<h3>${brand}</h3>`;

        let productGrid = document.createElement("div");
        productGrid.classList.add("product-grid");

        brands[brand].forEach(product => {
            let imageSrc = product.image_link && product.image_link.trim() !== "" && product.image_link !== "null"
                ? product.image_link
                : product.api_featured_image && product.api_featured_image.trim()!=="" && product.api_featured_image!== "null"
                ? product.api_featured_image
                : "placeholder_image.jpg";

            let productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="${imageSrc}" alt="${product.name}" onerror="this.src='placeholder_image.jpg';">
                <h4>${product.name}</h4>
                <p>$${parseFloat(product.price).toFixed(2)}</p>
                <button onclick="addToCart('${product.id}')">Add to Cart</button>
                <span onclick="addToWishlist('${product.id}')"><i class='fas fa-heart' style='font-size:30px;color:red'></i></span>
            `;

            productGrid.appendChild(productCard);
        });

        brandSection.appendChild(productGrid);
        productsDiv.appendChild(brandSection);
    });

    console.log("Products displayed successfully.");
}
function filterproducts(){
    let searchinput = document.getElementById("search-bar").value.toLowerCase();
    let filteredproducts= allProducts.filter(product => product.name.toLowerCase().includes(searchinput) || (product.brand && product.brand.toLowerCase().includes(searchinput)) || (product.product_type && product.product_type.toLowerCase().includes(searchinput)));
    displayProducts(filteredproducts);
}
function filterbytag(tag) {
    console.log(`filtering by: ${tag}`);
    let filteredproducts;
    if (tag == "all") {
        filteredproducts = allProducts;
    } else {
        filteredproducts = allProducts.filter(product => product.tag_list && product.tag_list.includes(tag));
    };
    displayProducts(filteredproducts);
}
function filterbyprice(){
    let minprice = parseFloat(document.getElementById("pricerangemin").value);
    let maxprice = parseFloat(document.getElementById("pricerangemax").value);  
    let filteredproducts = allProducts.filter(product => {
        let price = parseFloat(product.price);
        return price >= minprice && price <= maxprice;
    });
    displayProducts(filteredproducts);
}
function updatepricerange(){
    document.getElementById("minprice").innerText = document.getElementById("pricerangemin").value;
    document.getElementById("maxprice").innerText = document.getElementById("pricerangemax").value;
}
// Fetch products when the page loads
fetchProducts();
//cart & wishlist part 
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
// cart function
function addToCart(productId){
    console.log("product id received:", productId);
    console.log("all products:", allProducts);
    let product = allProducts.find(p =>p.id == productId);
    console.log(product);
    if (!product) {
        console.error("product not found");
        return;
    }
    let existingproduct = cart.find(p=>p.id == productId);
    if (existingproduct) {
        existingproduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to your cart`);
}
// wishlist function 
function addToWishlist(productId){
    let product = allProducts.find(p =>p.id == productId);
    if (!product) {
        console.error("product not found");
        return;
    }
    if (!wishlist.some(p=>p.id == productId)){
        wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(`${product.name} added to your wishlist`);
    } else {
        alert(`${product.name} is already in your wishlist`);
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    await fetchProducts();
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
});