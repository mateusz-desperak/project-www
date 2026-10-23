function initNewsPage() {
    const statusEl = document.querySelector("#status");
    const postsEl = document.querySelector("#posts");
    const btnClear = document.querySelector("#btnClearCache");

    if (!postsEl || !statusEl) return;

    function saveCache(posts) {
        localStorage.setItem("postsCache", JSON.stringify(posts));
    }

    function loadCache() {
        const raw = localStorage.getItem("postsCache");
        if (!raw) return null;
        return JSON.parse(raw);
    }

    function renderPosts(posts, label = "") {
        postsEl.innerHTML = "";
        if (label) statusEl.textContent = label;
        posts.forEach((p) => {
            const card = document.createElement("article");
            card.className = "post-card";
            const h3 = document.createElement("h3");
            h3.textContent = p.title;
            const para = document.createElement("p");
            para.textContent = p.body;
            card.appendChild(h3);
            card.appendChild(para);
            postsEl.appendChild(card);
        });
    }

    async function loadPostsSafe() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            if (!response.ok) throw new Error("HTTP error: " + response.status);
            return await response.json();
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    async function run() {
        statusEl.textContent = "Loading...";
        const data = await loadPostsSafe();
        if (data) {
            const posts = data.slice(0, 10);
            renderPosts(posts, "");
            saveCache(posts);
        } else {
            const cached = loadCache();
            if (cached) {
                renderPosts(cached, "Loaded from cache (offline)");
            } else {
                statusEl.textContent = "Error: cannot load data and cache is empty.";
            }
        }
    }

    if (btnClear) {
        btnClear.addEventListener("click", () => {
            localStorage.removeItem("postsCache");
            statusEl.textContent = "Cache cleared.";
            postsEl.innerHTML = "";
        });
    }

    run();
}