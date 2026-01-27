/* 
====================================
This module provides a ProductData class to fetch and manage product data from JSON files.
The ProductData class allows fetching all products or finding a specific product by its ID.
This module is designed to simplify the process of working with product data in a structured and consistent manner.
The only exported entity from this module is the ProductData class, which contains the following:
- A constructor to initialize the category and JSON path.
- A getData method to fetch all product data from the JSON file.
- A findProductById method to find a specific product by its ID.
====================================
*/



const baseURL = import.meta.env.VITE_SERVER_URL || "";



function convertToJson(res) {
  if (res.ok) { // If the response is OK (status in the range 200-299)...
    return res.json(); // Convert the response to JSON
  } else { // Otherwise...
    throw new Error("Bad Response"); // Throw an error with the message "Bad Response"
  }
}
// Utility function to convert fetch response to JSON
// =============================
// This function checks if the fetch response is OK (status in the range 200-299).
// If the response is OK, it converts the response to JSON.
// If the response is not OK, it throws an error with the message "Bad Response".
// Takes a fetch response object as input and returns a promise that resolves to JSON data or rejects with an error.
// Returns a promise that resolves to JSON data or rejects with an error.



export default class ProductData {
  // Constructor to initialize category and JSON path. category object will have two properties: category name and path
  constructor() { 
  }
  
  // Method to fetch product data from JSON file
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  // Method to find a product by its ID
  // For asyn recap, check the bottom comments
  async findProductById(id) { // find a product by its ID
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }
}
// =============================
// ProductData class to fetch and manage product data
// =============================
// This class provides methods to fetch all products or find a specific product by its ID.
// Constructor Variables: category
//    -(name of the product category)
//    - path (path to the JSON file containing product data)
// Methods:
//    - getData(): Fetches all product data from the JSON file.
//    - findProductById(id): Finds a specific product by its ID.




/*async recap:
 The async keyword is used to declare an asynchronous function.
 An asynchronous function returns a promise.
 The await keyword is used to wait for a promise to resolve.
 In the findProductById method, await is used to wait for the getData method to fetch all products before finding the product by ID.
 async operations run without blocking the main thread, allowing other code to execute while waiting for the promise to resolve.
 This is particularly useful for fetching data from external sources, such as JSON files or APIs, without freezing the user interface.
 In summary, async/await provides a way to write asynchronous code that is easier to read and understand, while still being non-blocking.
 */