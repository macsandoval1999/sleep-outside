/*
=========================================
 Utility functions for DOM manipulation and localStorage operations
These functions are designed to simplify common tasks such as selecting elements, managing localStorage, and handling events.
Other modules can import and use these functions as needed. 
=========================================
*/



export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// wrapper for querySelector...returns matching element
// =============================
// This function uses querySelector to find the first element that matches the given selector within the specified parent element.
// If no parent is specified, it defaults to the document.
// Typically used to quickly select a single element from the DOM.
// Takes a CSS selector string and an optional parent element to search within.
// Returns the first matching element, or null if no match is found.



export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)); 
}
// retrieve data from localstorage
// =============================
// Takes a key as a parameter and retrieves the corresponding value from localStorage.
// The value is parsed from JSON before being returned.
// Returns the parsed value, or null if the key does not exist.



export function setLocalStorage(key, data) {
/*=============================
Description:
Save data to local storage
Takes a key and a data object as parameters and saves the data to localStorage.
The data is stringified to JSON before being stored. This means that complex data structures like objects and arrays can be stored as strings. When retrieving the data, it should be parsed back into its original form. We have a corresponding getLocalStorage function for this purpose.
Parameters:
  - key: The key under which the data will be stored in localStorage.
  - data: The data object to be stored in localStorage.
Returns:
  - None
=============================*/
  
  localStorage.setItem(key, JSON.stringify(data));
}




export function setClick(selector, callback) {
/*=============================
Description:
Set a listener for both touchend and click
This function sets up event listeners for both touchend and click events on a specified element.
It ensures that the callback is triggered for both types of interactions, providing a consistent experience across touch and non-touch devices.
Takes a CSS selector string and a callback function to be executed when the element is interacted with.

Parameters:
  - selector: A CSS selector string identifying the element to attach the event listeners to.
  - callback: A function to be executed when the element is interacted with.
Returns:
  - None
=============================*/

  qs(selector).addEventListener("touchend", (event) => { // Using the qs utility function, we select the element and add a touchend event listener. A touchend event is triggered when a touch point is removed from the touch surface. This means the user has finished touching the element.
    event.preventDefault(); // When a touchend event occurs, we prevent the default behavior to avoid triggering a click event immediately after by using the built-in preventDefault method which stops the default action associated with the event.
    callback(); // After preventing the default behavior, we execute the callback function provided by the user.
  });
  qs(selector).addEventListener("click", callback); // We also add a click event listener to ensure the callback is triggered on non-touch devices.
}



export function getParam(param) {
  const queryString = window.location.search; // Get the query string from the current URL
  const urlParams = new URLSearchParams(queryString); // Create a URLSearchParams object from the query string
  const product = urlParams.get(param); // Get the value of the specified query parameter
  return product; // Return the value of the query parameter, or null if it does not exist
}
// get the product id from the query string
// =============================
// This function retrieves the value of a specified query parameter from the URL's query string.
// The reason why this works is because we have product pages with query parameters in the URL.
// For example, a URL like "product.html?id=123" would allow us to retrieve the value "123" for the "id" parameter. If the URL does not contain the specified parameter, the function will return null.
// Takes the name of the query parameter as a string.
// Returns the value of the query parameter, or null if the parameter does not exist.



export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
/*==================================
Description: Renders a list of items using a provided template function
Parameters:
- templateFn: A function that takes an item and returns an HTML string.
- parentElement: The DOM element where the list will be rendered.
- list: An array of items to render.
- position: Optional. Specifies where to insert the HTML (default is "afterbegin").
- clear: Optional. Specifies whether to clear the parent element before rendering (default is false).
Returns/Purpose: 
- void
- Inserts the generated HTML into the parent element at the specified position.
==================================*/
	
	const htmlStrings = list.map(templateFn);
	if (clear) {
		parentElement.innerHTML = "";
	}
	parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
};


export function countCartItems() {
	const cartCountBadge = document.querySelector(".cart-count-badge");
	const cartCount = document.querySelector(".cart-count");
	const cartItems = getLocalStorage("so-cart") || [];
	if (cartItems.length === 0) {
		cartCountBadge.classList.add("hide");
	} else {
		cartCount.textContent = cartItems.length;
		cartCountBadge.classList.remove("hide");
	}
}



export function renderWithTemplate(template, parentElement, data, callback) {
  /*==================================
Description: Renders HTML content using a template string and inserts it into a parent element
Parameters:
  - template: A string containing HTML markup.
  - parentElement: The DOM element where the HTML will be inserted.
  - data: An optional data object to be passed to the callback function.
  - callback: An optional function to be executed after rendering.
Returns/Purpose: 
  - void
  - Replaces the content of the parent element with the generated HTML.
  - Executes the callback function with the provided data, if specified.
  ==================================*/
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
};



async function loadTemplate(url) {
/* 
Description: Loads an HTML template from a specified URL
Parameters:
  - url: A string representing the URL of the HTML template to be loaded.
Returns/Purpose:
  - A promise that resolves to the loaded HTML template as a string.
  - Fetches the HTML content from the specified URL and returns it as a string for further processing or rendering.
=============================
*/
  const result = await fetch(url);
  const template = await result.text();
  return template;
}



export async function loadHeaderFooter() {
/* 
=============================
Description: Loads and renders header and footer templates into the main document
Parameters:
  - None
Returns/Purpose:
  - void
  - Fetches the header and footer HTML templates from specified URLs.
  - Renders the fetched templates into the designated header and footer elements in the main document.
=============================
*/
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");

  renderWithTemplate(headerTemplate, headerElement, );
  renderWithTemplate(footerTemplate, footerElement,);
  countCartItems();
}