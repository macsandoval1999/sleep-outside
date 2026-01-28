/*  
The ProductList class is responsible for rendering a list of products on the page from an array of product data.
It uses a template function to generate the HTML for each product card and inserts it into the specified list element in the DOM.
Constructor Parameters:
   - category: The category of products to be displayed (e.g., "tents", "sleeping-bags").
   - dataSource: The data source to fetch product details from.
   - listElement: The DOM element where the product list will be rendered.
Constructor Variables:
   - category (the category of products to be displayed)
   - dataSource (the data source to fetch product details from)
   - listElement (the DOM element where the product list will be rendered)
Methods:
   - init(): Fetches product data for the specified category and renders the product list.
   - renderList(list): Renders the list of products using the productCardTemplate function.
====================================
*/

import { renderListWithTemplate } from "./utils.mjs"; // Import the renderListWithTemplate utility function

function productCardTemplate(product) {
/* Product Card Template function
=====================================
Description:
This function generates the HTML template for a product card.
It takes a product object as input and returns an HTML string representing the product card.
Parameters:
   - product: The product object containing details such as ID, name, brand, image, and price.
Returns:
    - An HTML string representing the product card.
USED IN: ProductList class in ProductList.mjs to render each product in the product listing page.
====================================*/
    
    return ` 
        <li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.NameWithoutBrand}">
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card__name">${product.NameWithoutBrand}</h3>
            <p class="product-card__price">$${product.ListPrice}</p>
        </a>
    </li>`;
}



export default class ProductList {
    /*
    Product List class
    ====================================
    Description:
    This class is responsible for rendering a list of products on the page from an array of product data.
    It uses a template function to generate the HTML for each product card and inserts it into the specified list element in the DOM.
    Constructor Parameters:
        - category: The category of products to be displayed (e.g., "tents", "sleeping-bags").
        - dataSource: The data source to fetch product details from.
        - listElement: The DOM element where the product list will be rendered.
    Constructor Variables:
        - category (the category of products to be displayed)
        - dataSource (the data source to fetch product details from)
        - listElement (the DOM element where the product list will be rendered)
    Methods:
        - init(): Fetches product data for the specified category and renders the product list.
        - renderList(list): Renders the list of products using the productCardTemplate function.
    USED IN: product-listing.js to create and initialize the product listing page.
    ==================================== */

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
    /* Method to perform any setup required before using the class
    ====================================
    Description:
    This method fetches product data for the specified category from the data source
    and renders the product list using the renderList method.
    Parameters:
        - None
    Returns:
        - None
    USED IN: product-listing.js to initialize and render the product list on page load.
    ====================================*/
        
        const list = await this.dataSource.getData(this.category); // Fetch product data for the specified category from the data source
        this.renderList(list); // Render the product list using the renderList method
        document.querySelector(".title").textContent = this.category.charAt(0).toUpperCase() + this.category.slice(1); // Set the page title based on the category and capitalize the first letter
    }

    renderList(list) {
    /* Method to render the list of products using the productCardTemplate function
    ====================================
    Description:
    This method takes an array of product data and uses the renderListWithTemplate utility function
    to generate and insert the HTML for each product card into the specified list element in the DOM.
    Parameters:
        - list: An array of product objects to be rendered.
    Returns:
        - None
    USED IN: init method of ProductList class to render the product list after fetching data.
    ====================================*/
        
        renderListWithTemplate(productCardTemplate, this.listElement, list); // Use the renderListWithTemplate utility function to render the product list
    }
}