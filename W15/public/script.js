fetch('/api/products')
.then(res => res.json())
.then(products => {
    const tbody = document.getElementById('productTable');
    products.forEach(p=>{
        tbody.innerHTML+=
        `<tr>
        <td><img src="${p.image}" alt="${p.name}"></td>
        <td>${p.name}</td>
        <td>₹${p.price.toLocaleString()}</td>
        `
    });
});