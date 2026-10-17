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

function updateClock() {
    const now = new Date();
    
    // Pobieramy godziny, minuty i sekundy i formatujemy je tak, aby zawsze miały 2 cyfry (np. 09 zamiast 9)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Składamy w ładny format np. "14:05:32"
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Wrzucamy tekst do naszego elementu w HTML
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Uruchamiamy od razu po załadowaniu...
updateClock();

// ...i odświeżamy co 1 sekundę (1000 milisekund)
setInterval(updateClock, 1000);