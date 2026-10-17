const yearSpan = document.querySelector("#year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav = document.getElementById('main-nav');

// 2. Nasłuchujemy kliknięcia w przycisk hamburgera
hamburgerBtn.addEventListener('click', () => {
    // 3. Metoda toggle dopisuje klasę 'active', jeśli jej nie ma, lub ją usuwa, jeśli jest
    mainNav.classList.toggle('active');
});