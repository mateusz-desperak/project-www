//menu

const yearSpan = document.querySelector("#year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav = document.getElementById('main-nav');

hamburgerBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    mainNav.classList.toggle('active');
});

document.addEventListener('click', () => {
    mainNav.classList.remove('active');
});



// clock

function updateClock() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;

    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

updateClock();
setInterval(updateClock, 1000);


document.addEventListener("DOMContentLoaded", () => {
    initFAQ();
    initFilters();
    initFormValidation();
    initNewsPage();
});
