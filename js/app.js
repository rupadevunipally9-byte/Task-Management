const container = document.getElementById("posts");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const card = document.createElement("div");
card.className = "card";
async function fetchPosts() {
    loading.style.display = "block";
    error.style.display = "none";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!response.ok) {
            throw new Error("Failed to fetch");
        }

        const posts = await response.json();

        loading.style.display = "none";

        const latestPosts = posts.slice(-6).reverse();

        displayPosts(latestPosts);

    } catch (err) {
        loading.style.display = "none";
        error.style.display = "block";
    }
}

function displayPosts(posts) {
    container.innerHTML = "";

    posts.forEach(post => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;

        container.appendChild(card);
    });
}

fetchPosts();
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return;
    }

    if (message.length < 10) {
        alert("Message must be at least 10 characters.");
        return;
    }

    alert("Message sent successfully!");
    form.reset();
});
const themeToggle = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
    }
});
