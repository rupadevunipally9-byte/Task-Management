const container = document.getElementById("posts");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

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
