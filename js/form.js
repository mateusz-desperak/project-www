function initFormValidation() {
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

    const formFields = [
        { input: nameInput, err: errName },
        { input: emailInput, err: errEmail },
        { input: dateInput, err: errDate },
        { input: timeInput, err: errTime },
        { input: guestsInput, err: errGuests },
        { input: tableTypeInput, err: errTableType }
    ];

    formFields.forEach(item => {
        item.input.addEventListener("input", () => {
            item.err.textContent = "";
            item.input.classList.remove("input-error");
        });
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

        else if (date <= new Date().toISOString().split("T")[0]) {
            errDate.textContent = "Data rezerwacji nie może być wcześniejsza niż jutrzejsza.";
            dateInput.classList.add("input-error");
            ok = false;
        }

        function timeToMinutes(timeStr) {
            const [hours, minutes] = timeStr.split(":").map(Number);
            return hours * 60 + minutes;
        }

        const openingTime = timeToMinutes("09:00"); 
        const closingTime = timeToMinutes("21:00");
        const userTime = timeToMinutes(time);

        if (time === "") {
            errTime.textContent = "Proszę wybrać godzinę rezerwacji.";
            timeInput.classList.add("input-error");
            ok = false;
        } 
        else if (userTime < openingTime || userTime > closingTime) {
            errTime.textContent = "Godzina rezerwacji musi być w przedziale od 09:00 do 21:00.";
            timeInput.classList.add("input-error");
            ok = false;
        } else {
            timeInput.classList.remove("input-error");
            errTime.textContent = "";
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
}