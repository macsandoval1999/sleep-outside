/*
====================================
This module provides a ProductDetails class to manage and display product details.
The ProductDetails class allows fetching a specific product by its ID and rendering its details on the page.
It also provides functionality to add the product to a shopping cart stored in local storage.
The only exported entity from this module is the ProductDetails class, which contains the following:
- A constructor to initialize the product ID and data source.
- An init method to fetch product details and set up event listeners.
- An addProductToCart method to add the product to the cart.
- A renderProductDetails method to display product details on the page.
====================================
*/



/* 
For this module, we need utility functions to interact with local storage.
getLocalStorage: Retrieves data from local storage by key.
setLocalStorage: Sets updated LocalStorage 
*/
import { getLocalStorage, setLocalStorage } from "./utils.mjs";



export default class ProductDetails {
/*====================================
Description: 
Product Details Template class
This class provides a template for rendering product details on the page.
It updates the DOM elements with the product brand, name, image, price, color, and description.
Takes a product object as input and updates the corresponding DOM elements.
Constructor Parameters:
   - productId: The ID of the product to be rendered.
   - dataSource: The data source to fetch product details from.
Constructor Variables:
   - product (the product object to be rendered)
   - productId (the ID of the product to be rendered)
   - dataSource (the data source to fetch product details from)
Methods:
   - init(): Fetches product details and sets up event listeners.
   - addProductToCart(): Adds the product to the cart.
   - renderProductDetails(): Displays product details on the page.
====================================*/
    // -CONSTRUCTOR
    constructor(productId, dataSource) { // Initialize the ProductDetails class with a product ID and data source
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    // -METHODS    
    // Method to perform any setup required before using the class
    async init() {
        this.product = await this.dataSource.findProductById(this.productId); // Fetch product details using the data source
        this.renderProductDetails(); // Render the product details using the template function method
        const addToCartBtn = document.getElementById('addToCart'); // Add event listener to Add to Cart button
        if (addToCartBtn) { // if the add to cart button exists...
            addToCartBtn.addEventListener('click', this.addProductToCart.bind(this)); // Bind the addProductToCart method to the current instance. binding ensures 'this' refers to the class instance. This means when the event listener is triggered, 'this' inside addProductToCart refers to the ProductDetails instance.
        }
    }

    // Method to add the current product to the cart
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || []; // Retrieve existing cart items from local storage or initialize an empty array
        cartItems.push(this.product); // Add the current product to the cart items array
        setLocalStorage("so-cart", cartItems); // Update local storage with the new cart items array
    }

    // Method to render product details to the page
    renderProductDetails() {
        productDetailsTemplate(this.product); // Render the product details using the template function That is defined below
    }
}




function productDetailsTemplate(product) {
    /* 
    =============================
    Description:
    Product Details Template function.
    Used in the ProductDetails class to render product details on the page.
    This function updates the DOM elements with the product details.
    Parameters:
        - product: The product object containing details to be rendered.
    Returns:
        - None
    ============================= 
    */
    // Update DOM elements with product details using keys from the product objects. Check JSON structure for correct keys.
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}
