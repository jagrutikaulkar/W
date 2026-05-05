# FAQ

## How did you make the table responsive?

Answer: "I wrapped the <table> in a div with overflow-x: auto. This ensures that on smaller screens, the table doesn't break the layout; it simply allows the user to scroll horizontally within the container."

## Why did you use JavaScript for pagination?

Answer: "Using JavaScript allows for a seamless user experience. By calculating the start and end index of the array, I can dynamically render only the required portion of data without reloading the page, which is more efficient."

## What if there are more than 10 products?

Answer: "The Math.ceil(products.length / rowsPerPage) logic in the setupPagination function automatically calculates the number of buttons needed. So, if you add 100 products to the products array, it will automatically create 10 pages."
