const API = "http://localhost:5000/api/products";

// LOAD PRODUCTS
async function loadProducts(){
    const res = await fetch(API);
    const data = await res.json();

    const container = document.getElementById("products");
    container.innerHTML = "";

    data.forEach(p=>{
        container.innerHTML += `
        <div class="card">
            <h3>${p.title}</h3>
            <p>${p.category}</p>
            <p>${p.location}</p>
            <p>${p.description}</p>
            <h3>₹${p.price}</h3>
            <p>Contact: ${p.contact}</p>
        </div>`;
    });
}

// SEARCH
async function search(){
    const text = document.getElementById("search").value.toLowerCase();
    const res = await fetch(API);
    const data = await res.json();

    const filtered = data.filter(p =>
        p.title.toLowerCase().includes(text) ||
        p.category.toLowerCase().includes(text)
    );

    const container = document.getElementById("products");
    container.innerHTML = "";

    filtered.forEach(p=>{
        container.innerHTML += `
        <div class="card">
            <h3>${p.title}</h3>
            <p>${p.category}</p>
            <h3>₹${p.price}</h3>
        </div>`;
    });
}

// ADD PRODUCT
async function addProduct(){
    const data = {
        title: title.value,
        category: category.value,
        price: price.value,
        location: location.value,
        contact: contact.value,
        description: description.value
    };

    await fetch(API, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data)
    });

    alert("Product Added ✅");
}

loadProducts();