const API = "http://localhost:5000/api";

// SEARCH
async function search() {
    const to = document.getElementById("to").value.toLowerCase();

    const res = await fetch(`${API}/packages`);
    const data = await res.json();

    const filtered = data.filter(p => p.location.toLowerCase().includes(to));

    const container = document.getElementById("results");
    container.innerHTML = "";

    filtered.forEach(p => {
        container.innerHTML += `
        <div class="card">
            <div>
                <h3>${p.title}</h3>
                <p>${p.location}</p>
                <p>${p.description}</p>
            </div>
            <div>
                <h3>₹${p.price}</h3>
                <button onclick="alert('Booked!')">Book</button>
            </div>
        </div>`;
    });
}

// LOGIN
async function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/auth/login`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({email,password})
    });

    const data = await res.json();
    alert(data.msg);
}

// REGISTER
async function register(){
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/auth/register`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({name,email,password})
    });

    const data = await res.json();
    alert(data.msg);
}