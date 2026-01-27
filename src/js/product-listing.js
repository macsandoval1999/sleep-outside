import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category"); // Create an instance of ProductList for the specified category
const dataSource = new ProductData(); // Create an instance of ProductData
const element = document.querySelector(".product-list"); // Get the HTML element where the product list will be rendered
const listing = new ProductList(category, dataSource, element); // Create an instance of ProductList

// Initialize and render the product list with its method init
listing.init();
