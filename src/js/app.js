import "bootstrap/dist/css/bootstrap.css";
import "../css/style.css";

import UI from "./config/ui.config";
import UIReg from "./config/ui-reg.config";
import { validate } from "./helpers/validate";

const { form, inputEmail, inputPassword } = UI;
const {
    formReg,
    inputEmailReg,
    inputPasswordReg,
    inputNickNameReg,
    inputFirstNameReg,
    inputLastNameReg,
    inputPhoneReg,
    inputCityReg,
    inputCountryReg,
    inputGenderOrientationReg,
    inputDateOfBirthReg
} = UIReg;
const inputs = [inputEmail, inputPassword];
const inputsReg = [
    inputEmailReg,
    inputPasswordReg,
    inputNickNameReg,
    inputFirstNameReg,
    inputLastNameReg,
    inputPhoneReg,
    inputCityReg,
    inputCountryReg,
    inputGenderOrientationReg,
    inputDateOfBirthReg
];

import { showInputError, removeInputError, setCountryAutocomplete } from "./views/form";

import { notify } from "./views/notifications";
import { login, register } from "./services/auth.service";

import { getNews } from "./services/news.service";

import toggleForms from "./views/toggleForms";
const { loginBtn, registerBtn } = toggleForms;
const toggleButtons = [loginBtn, registerBtn];

import { initDatePickers } from "./plugins/jquery-ui";

import { init, setCityAutocomplete } from "./services/location.service";

(function appInit() {
    document.addEventListener("DOMContentLoaded", () => {
        initApp();
    });
})();

// Events
form.addEventListener("submit", e => {
    e.preventDefault();
    onSubmit();
});

formReg.addEventListener("submit", e => {
    e.preventDefault();
    onRegSubmit();
});

inputs.forEach(el => {
    el.addEventListener("focus", () => removeInputError(el));
});

inputsReg.forEach(el => {
    el.addEventListener("focus", () => removeInputError(el));
});

toggleButtons.forEach(btn => {
    btn.addEventListener("click", () => showForm(btn));
});

inputCountryReg.addEventListener("change", e => {
    e.preventDefault();
    setCityAutocomplete(e.target.value);
});


async function initApp() {
    initDatePickers();
    init();
}

// Handlers
async function onSubmit() {
    const isValidForm = inputs.every(el => {
        const isValidInput = validate(el);
        if (!isValidInput) {
            showInputError(el);
        }
        return isValidInput;
    });

    if (!isValidForm) {
        return;
    }

    try {
        await login(inputEmail.value, inputPassword.value);
        await getNews();
        notify({ msg: "Login success", className: "alert-success" });
        // success notification
    } catch (err) {
        // error notification
        notify({ msg: "Login failed", className: "alert-danger" });
    }

    form.reset();
}

async function onRegSubmit() {
    const isValidForm = inputsReg.every(el => {
        const isValidInput = validate(el);
        if (!isValidInput) {
            showInputError(el);
        }
        return isValidInput;
    });
    
    if (!isValidForm) {
        return;
    }
    
    const obj = {}
    
    obj.email = inputEmailReg.value;
    obj.password = inputPasswordReg.value;
    obj.nickname = inputNickNameReg.value;
    obj.first_name = inputFirstNameReg.value;
    obj.last_name = inputLastNameReg.value;
    obj.phone = inputPhoneReg.value;
    obj.gender_orientation = inputGenderOrientationReg.value; // or "female"
    obj.city = inputCityReg.value;
    obj.country = inputCountryReg.value;
    obj.date_of_birth_day = new Date(inputDateOfBirthReg.value).getDate();
    obj.date_of_birth_month = new Date(inputDateOfBirthReg.value).getMonth() + 1;
    obj.date_of_birth_year = new Date(inputDateOfBirthReg.value).getFullYear();
    
    try {
        await register(obj);
        await getNews();
        notify({ msg: "Login success", className: "alert-success" });
        // success notification
    } catch (err) {
        // error notification
        notify({ msg: "Login failed", className: "alert-danger" });
    }
    
    formReg.reset();
    console.log(obj);
}

function showForm(btn) {
    const btnId = btn.id;
    toggleForms.showForm(btnId);
}
