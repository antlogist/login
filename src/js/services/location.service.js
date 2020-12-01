import axios from "../plugins/axios";

async function getCountries() {
    try {
        const response = await axios.get("/location/get-countries");
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export async function getCities(index) {
    try {
        const response = await axios.get(`/location/get-cities/${index}`);
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export function init() {
    const countriesObj = getCountries();
    countriesObj.then(result => {
        const arr = Object.values(result);
        setCountryAutocomplete(arr);
        console.log(arr);
    });
}

function setCountryAutocomplete(elem = [], className = ".country-auto-complete") {
    $(className).autocomplete({
        source: elem,
        delay: 500,
        minLength: 3
    });
}

export function setCityAutocomplete(country) {
    const countriesObj = getCountries();
    
    // find country index
    countriesObj.then(result => {
        // get country index
        const countryIndex = Object.keys(result).find(
            key => result[key] === country
        );
        // get sities array
        const cities = getCities(countryIndex);
        // set autocomplete
        cities.then(result => {
            setCountryAutocomplete(result, ".city-auto-complete")
            const input = document.querySelector(".city-auto-complete");
            input.disabled = false;
        });
    });
    
    // 
}
