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


const form = document.querySelector(".reservation-form");

if (form) {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const dateInput = document.querySelector("#date");
    const timeInput = document.querySelector("#time");
    const guestsInput = document.querySelector("#guests");
    const tableTypeInput = document.querySelector("#table-type");

    const errName = document.querySelector("#err-name");
    const errEmail = document.querySelector("#err-email");
    const errDate = document.querySelector("#err-date");
    const errTime = document.querySelector("#err-time");
    const errGuests = document.querySelector("#err-guests");
    const errTableType = document.querySelector("#err-table-type");

    nameInput.addEventListener("input", () => {
        errName.textContent = "";
        nameInput.classList.remove("input-error");
    });

    emailInput.addEventListener("input", () => {
        errEmail.textContent = "";
        emailInput.classList.remove("input-error");
    });

    dateInput.addEventListener("input", () => {
        errDate.textContent = "";
        dateInput.classList.remove("input-error");
    });

    timeInput.addEventListener("input", () => {
        errTime.textContent = "";
        timeInput.classList.remove("input-error");
    });

    guestsInput.addEventListener("input", () => {
        errGuests.textContent = "";
        guestsInput.classList.remove("input-error");
    });

    tableTypeInput.addEventListener("change", () => {
        errTableType.textContent = "";
        tableTypeInput.classList.remove("input-error");
    });

    form.addEventListener("submit", (event) => {
        let ok = true;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const date = dateInput.value.trim();
        const time = timeInput.value.trim();
        const guests = guestsInput.value;
        const tableType = tableTypeInput.value;

        if (name.length < 3) {
            errName.textContent = "Imię i nazwisko musi mieć co najmniej 3 znaki.";
            nameInput.classList.add("input-error");
            ok = false;
        }

        if (!email.includes("@")) {
            errEmail.textContent = "Wpisz poprawny adres e-mail (musi zawierać @).";
            emailInput.classList.add("input-error");
            ok = false;
        }

        if (date == "") {
            errDate.textContent = "Proszę wybrać datę rezerwacji.";
            dateInput.classList.add("input-error");
            ok = false;
        }

        if (date <= new Date().toISOString().split("T")[0] && ti) {
            errDate.textContent = "Data rezerwacji nie może być wcześniejsza niż jutrzejsza.";
            dateInput.classList.add("input-error");
            ok = false;
        }

        if (time == "") {
            errTime.textContent = "Proszę wybrać godzinę rezerwacji.";
            timeInput.classList.add("input-error");
            ok = false;
        }

        if (time < "9:00" || time > "21:00") {
            errTime.textContent = "Godzina rezerwacji musi być w przedziale od 9:00 do 21:00.";
            timeInput.classList.add("input-error");
            ok = false;
        }

        if (guests < 1 || guests > 10) {
            errGuests.textContent = "Liczba osób musi wynosić od 1 do 10.";
            guestsInput.classList.add("input-error");
            ok = false;
        }

        if (tableType == "") {
            errTableType.textContent = "Proszę wybrać rodzaj stolika.";
            tableTypeInput.classList.add("input-error");
            ok = false;
        }

        if (!ok) {
            event.preventDefault();
        }
    });
}