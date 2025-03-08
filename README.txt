PureGlam Store - Online Beauty Store

Overview: PureGlam is an online store that sells makeup products from different and famous brands. We sell variety of makeup products;
 however the aim of our store is not only providing makeup products but also making it easier for users to access cruelty-free, 
 sustainable, and clean beauty products that fit their lifestyle. PureGlam is an online beauty store featuring: 
-Product Catalog fetched from an API
-Shopping Cart with local Storage
-Wishlist for favorite products (with local storage)
-AI chatbot for beauty advice.

Features of Our Website
1. Product browsing - Fetch and display products dynamically.
2. Add to cart and Wishlist - save and manage selected products.
3. Cart total calculation - Automatic total price updates.
4. AI chatbot - ask beauty-related questions.
5. Responsive Design - Works on mobile and desktop.

How to Use:
1.Shopping Features:
-Browse products on store.html
-Click "Add to Cart" to save items
-View selected items in cart.html
-Adjust quantities or remove items
2.Wishlist:
-Click the heart icon to add products to Wishlist
-access them on wishlist.html
3.AI Chatbot:
-Open bot.html
-Ask beauty-related questions
-AI responds using the Hugging Face API

APIs Used:
1. Hugging Face AI - provides chatbot responses
   URL: https://api-inference.huggingface.co/models/google/flan-t5-large
2. Makeup API - Fetches beauty products
URL: http://makeup-api.herokuapp.com/api/v1/products.json

Technologies Used:
-Frontend: Html, CSS, JavaScript
-Icons: FontAwesome
-Saved Cart & Wishlist: LocalStorage
-AI Chatbot: Hugging Face API

Troubleshooting: 
(P: Problem , S: Solution) 
P: Cart/Wishlist isn't saving after refresh
S: Ensure localStorage is enabled in your browser.

P: AI chatbot is giving wrong responses?
S: Try switching to another AI model in bot.js

P: The cart total price isn't updating when I remove items?
S: Check if updateCartTotal() is being called after removing an item.
S: Add updateCartTotal() at the end of the remove function.

P: Clicking the heart icon does noting?
S: Make sure addtoWishlist(productId) is being called correctly. 
S: Ensure wishlist.js is included in wishlist.html.

P: The AI chatbot is repeating my question instead of answering?
S: API response should be parsed correctly. 
S: Make sure to extract the correct response text. 
S: Try using different Al model

P: Products aren't loading from the API?
S: Check if the API is online by opening its URL in a browser

P: Buttons/Icons don't show up?
AS: Ensure FontAwesome is linked in index.html

*N.B: these problems are based on real bugs in the original code*

FAQs
Q: Can I add my own products instead of using an API?
A: Yes! You can manually add products in store.js

Q: How do I change the AI chatbot model?
A: Edit bot.js and change the API endpoint.

Q: Can I deploy this for free?
A: Yes! Use GitHub pages and Netlify

Credits:
Developer: Tasneem Misho
API Providers: Makeup API, Hugging Face
Icons and Fonts: FontAwesome