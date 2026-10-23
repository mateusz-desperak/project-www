function initFAQ() {

    const faqToggle = document.querySelector("#faq-toggle");
    const faqList = document.querySelector("#faq-list");

    if (faqToggle && faqList) {
        faqToggle.onclick = null; 
        faqToggle.addEventListener("click", () => {
            faqList.classList.toggle("show");
        });
    }

    const questions = document.querySelectorAll(".faq-q");
    if (questions.length > 0) {
        questions.forEach((btn) => {
            btn.addEventListener("click", () => {
                const answer = btn.nextElementSibling;
                if (answer) answer.classList.toggle("hidden");
            });
        });
    }
}

function initFilters() {
    const buttons = document.querySelectorAll(".filter");
    const cards = document.querySelectorAll(".card");
    if (!buttons.length || !cards.length) return;

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const cat = btn.dataset.category;
            cards.forEach((card) => {
                const cardCat = card.dataset.category;
                if (cat === "all" || cardCat === cat) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });
}