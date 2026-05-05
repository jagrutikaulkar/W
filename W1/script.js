// Sample Data (In a real project, this might come from an API)
const products = [
  {
    img: "earphone.png",
    name: "Wireless Headphones",
    price: "₹7,999",
    desc: "Noise-cancelling over-ear.",
  },
  {
    img: "watch.png",
    name: "Smartwatch",
    price: "₹12,999",
    desc: "Fitness tracking watch.",
  },
  {
    img: "path_to_img.jpg",
    name: "Gaming Mouse",
    price: "₹2,499",
    desc: "Ergonomic mouse.",
  },
  {
    img: "path_to_img.jpg",
    name: "Laptop Stand",
    price: "₹1,999",
    desc: "Adjustable aluminum.",
  },
  {
    img: "path_to_img.jpg",
    name: "Mechanical Keyboard",
    price: "₹4,500",
    desc: "RGB Backlit.",
  },
  {
    img: "path_to_img.jpg",
    name: "Webcam",
    price: "₹3,000",
    desc: "1080p Streaming.",
  },
];

const rowsPerPage = 2; // Change this to 10 for the final submission
let currentPage = 1;

function displayTable(page) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; // Clear current table

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedItems = products.slice(start, end);

  paginatedItems.forEach((item) => {
    let row = `<tr>
            <td><img src="${item.img}" alt="Product"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.desc}</td>
        </tr>`;
    tableBody.innerHTML += row;
  });
}

function setupPagination() {
  const pagination = document.getElementById("pagination");
  const pageCount = Math.ceil(products.length / rowsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    let btn = document.createElement("button");
    btn.innerText = i;
    btn.addEventListener("click", () => {
      currentPage = i;
      displayTable(currentPage);
    });
    pagination.appendChild(btn);
  }
}

// Initialize
displayTable(currentPage);
setupPagination();
