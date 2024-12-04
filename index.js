"use strict";

const html = document.querySelector("html");
const toggleModeBtn = document.querySelector(".switch_mode-btn");
const inputSearch = document.querySelector(".input_field");
const countriesContainer = document.querySelector(".country_container");
const inputContainer = document.querySelector(".input-filter_container");
const backBtn = document.querySelector(".back_btn");
const countryDetails = document.querySelector(".country_details-container");
let darkMode = localStorage.getItem("dark-mode");
let countryCards = document.querySelectorAll(".card_country");

const flagCountry = countryDetails.querySelector(".country_flag");
const CountryName = countryDetails.querySelector(".country_name");
const nativeName = countryDetails.querySelector(".nativeName");
const tld = countryDetails.querySelector(".tld");
const population = countryDetails.querySelector(".population");
const currencies = countryDetails.querySelector(".currencies");
const region = countryDetails.querySelector(".region");
const languages = countryDetails.querySelector(".languages");
const subRegion = countryDetails.querySelector(".subRegion");
const capital = countryDetails.querySelector(".capital");

const borderContainer = document.querySelector(".border-countries_container");

//

const updateEvents = function () {
  countryCards = document.querySelectorAll(".card_country");
  countryCards.forEach((el) => {
    el.removeEventListener("click", openCountryDetails);
    el.addEventListener("click", openCountryDetails);
  });
};

const openCountryDetails = async function (e) {
  const countryName = e.target
    .closest(".card_country")
    .querySelector(".country_name").textContent;
  countriesContainer.classList.add("hidden");
  inputContainer.classList.add("hidden");
  backBtn.classList.remove("hidden");
  countryDetails.classList.remove("hidden");
  const data = await getCountrySearched(countryName);
  renderCountryDetails(data);

  setTimeout(() => {
    countryDetails.style.opacity = "1";
  }, 200);
};

// switching between dark mode and light mode :
if (darkMode === "enabled") {
  html.classList.add("dark_mode-html");
  toggleModeBtn.innerHTML = "";
  toggleModeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="switch_mode--svg" viewBox="0 0 24 24">
	<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
		<path stroke-dasharray="36" stroke-dashoffset="36" d="M12 7c2.76 0 5 2.24 5 5c0 2.76 -2.24 5 -5 5c-2.76 0 -5 -2.24 -5 -5c0 -2.76 2.24 -5 5 -5">
			<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="36;0" />
		</path>
		<path stroke-dasharray="2" stroke-dashoffset="2" d="M12 19v1M19 12h1M12 5v-1M5 12h-1" opacity="0">
			<animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1" />
			<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="2;0" />
			<set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
			<animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
		</path>
		<path stroke-dasharray="2" stroke-dashoffset="2" d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5" opacity="0">
			<animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5" />
			<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="2;0" />
			<set fill="freeze" attributeName="opacity" begin="0.8s" to="1" />
			<animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
		</path>
	</g>
</svg> <p>Light mode</p>`;
}

toggleModeBtn.addEventListener("click", function () {
  if (html.classList.contains("dark_mode-html")) {
    html.classList.remove("dark_mode-html");
    toggleModeBtn.innerHTML = "";
    toggleModeBtn.innerHTML = `<svg
          xmlns="http://www.w3.org/2000/svg"
          class="switch_mode--svg"
          viewBox="0 0 24 24"
        >
          <g fill="currentColor" fill-opacity="0">
            <path
              d="M15.22 6.03l2.53-1.94L14.56 4L13.5 1l-1.06 3l-3.19.09l2.53 1.94l-.91 3.06l2.63-1.81l2.63 1.81z"
            >
              <animate
                id="lineMdMoonLoop0"
                fill="freeze"
                attributeName="fill-opacity"
                begin="0.7s;lineMdMoonLoop0.begin+6s"
                dur="0.4s"
                values="0;1"
              />
              <animate
                fill="freeze"
                attributeName="fill-opacity"
                begin="lineMdMoonLoop0.begin+2.2s"
                dur="0.4s"
                values="1;0"
              />
            </path>
            <path
              d="M13.61 5.25L15.25 4l-2.06-.05L12.5 2l-.69 1.95L9.75 4l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"
            >
              <animate
                fill="freeze"
                attributeName="fill-opacity"
                begin="lineMdMoonLoop0.begin+3s"
                dur="0.4s"
                values="0;1"
              />
              <animate
                fill="freeze"
                attributeName="fill-opacity"
                begin="lineMdMoonLoop0.begin+5.2s"
                dur="0.4s"
                values="1;0"
              />
            </path>
            <path
              d="M19.61 12.25L21.25 11l-2.06-.05L18.5 9l-.69 1.95l-2.06.05l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"
            >
              <animate
                fill="freeze"
                attributeName="fill-opacity"
                begin="lineMdMoonLoop0.begin+0.4s"
                dur="0.4s"
                values="0;1"
              />
              <animate
                fill="freeze"
                attributeName="fill-opacity"
                begin="lineMdMoonLoop0.begin+2.8s"
                dur="0.4s"
                values="1;0"
              />
            </path>
            <path
              d="M20.828 9.731l1.876-1.439l-2.366-.067L19.552 6l-.786 2.225l-2.366.067l1.876 1.439L17.601 12l1.951-1.342L21.503 12z"
            >
              <animate
                fill="freeze"
                attributeName="fill-opacity"
                begin="lineMdMoonLoop0.begin+3.4s"
                dur="0.4s"
                values="0;1"
              />
              <animate
                fill="freeze"
                attributeName="fill-opacity"
                begin="lineMdMoonLoop0.begin+5.6s"
                dur="0.4s"
                values="1;0"
              />
            </path>
          </g>
          <path
            fill="none"
            stroke="currentColor"
            stroke-dasharray="56"
            stroke-dashoffset="56"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.6s"
              values="56;0"
            />
          </path>
        </svg>

        <p>Dark Mode</p>`;
    localStorage.setItem("dark-mode", "disabled");
  } else {
    html.classList.add("dark_mode-html");
    toggleModeBtn.innerHTML = "";
    toggleModeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="switch_mode--svg" viewBox="0 0 24 24">
	<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
		<path stroke-dasharray="36" stroke-dashoffset="36" d="M12 7c2.76 0 5 2.24 5 5c0 2.76 -2.24 5 -5 5c-2.76 0 -5 -2.24 -5 -5c0 -2.76 2.24 -5 5 -5">
			<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="36;0" />
		</path>
		<path stroke-dasharray="2" stroke-dashoffset="2" d="M12 19v1M19 12h1M12 5v-1M5 12h-1" opacity="0">
			<animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1" />
			<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="2;0" />
			<set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
			<animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
		</path>
		<path stroke-dasharray="2" stroke-dashoffset="2" d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5" opacity="0">
			<animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5" />
			<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="2;0" />
			<set fill="freeze" attributeName="opacity" begin="0.8s" to="1" />
			<animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
		</path>
	</g>
</svg> <p>Light mode</p>`;
    localStorage.setItem("dark-mode", "enabled");
  }
});

// opening filter options :

const filterOptionsBtn = document.querySelector(".filter_open-options");
const filterOptions = document.querySelector(".filter_options");

const closeFilterOptions = function () {
  filterOptions.classList.add("hidden");
  filterOptionsBtn.querySelector(
    "svg"
  ).innerHTML = `xmlns="http://www.w3.org/2000/svg"
            class="left_arrow-svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m14 7l-5 5m0 0l5 5"
            />`;
};

filterOptionsBtn.addEventListener("click", function () {
  if (filterOptions.classList.contains("hidden")) {
    filterOptions.classList.remove("hidden");
    filterOptionsBtn.querySelector(
      "svg"
    ).innerHTML = `xmlns="http://www.w3.org/2000/svg" class="left_arrow-svg" viewBox="0 0 24 24">
	<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m7 10l5 5l5-5" />
`;
  } else {
    closeFilterOptions();
  }
});

document.addEventListener("click", function (e) {
  if (!e.target.closest(".filter_options-container")) {
    if (!filterOptions.classList.contains("hidden")) {
      closeFilterOptions();
    }
  }
});

// handling api

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

async function getData() {
  const url = "https://restcountries.com/v2/all";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

const allCountries = await getData();

const initialUI = function (data) {
  data.forEach((obj) => {
    const html = `<div class="card_country">
          <div class="img_container">
            <img class="country_flag" src="${obj.flags.png}" alt="country Flag">
          </div>
          <div class="details_container">
            <p class="country_name">${obj.name}</p>
            <div class="details_inner">
              <p class="details_text"><span class="head">Population: </span>${numberWithCommas(
                obj.population
              )}</p>
              <p class="details_text"><span class="head">Region: </span>${
                obj.region
              }</p>
              <p class="details_text"><span class="head">Capital: </span>${
                obj.capital
              }</p>
            </div>
          </div>
        </div>`;

    countriesContainer.insertAdjacentHTML("beforeend", html);
  });
  updateEvents();
};

initialUI(allCountries);

// handeling the input changes / searchs

const updateUi = function (data) {
  countriesContainer.innerHTML = ``;
  let html;
  data.forEach((obj) => {
    if (obj.name.common == "Israel") {
      html = `<div class="card_country">
            <div class="img_container">
              <img class="country_flag" src="palestine.png" alt="country Flag">
            </div>
            <div class="details_container">
              <p class="country_name">Palestine</p>
              <div class="details_inner">
                <p class="details_text"><span class="head">FREE PALESTINE</span></p>
                <p class="details_text"><span class="head">FREE PALESTINE</span></p>
                <p class="details_text"><span class="head">FREE PALESTINE</span></p>
              </div>
            </div>
          </div>`;
    } else {
      html = `<div class="card_country">
      <div class="img_container">
      <img class="country_flag" src="${obj.flags.png}" alt="country Flag">
        </div>
        <div class="details_container">
        <p class="country_name">${obj.name.common}</p>
        <div class="details_inner">
        <p class="details_text"><span class="head">Population: </span>${numberWithCommas(
          obj.population
        )}</p>
        <p class="details_text"><span class="head">Region: </span>${
          obj.region
        }</p>
          <p class="details_text"><span class="head">Capital: </span>${
            obj.capital
          }</p>
            </div>
            </div>
            </div>`;
    }
    countriesContainer.insertAdjacentHTML("beforeend", html);
  });
  updateEvents();
};

async function getCountrySearched(name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

async function getCountryBorder(name) {
  const url = `https://restcountries.com/v3.1/alpha/${name}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

inputSearch.addEventListener("input", async function (e) {
  // console.log("changed");
  // console.log(e.target.value);
  const nameSearched = e.target.value;
  if (nameSearched) {
    const country = await getCountrySearched(nameSearched);
    if (country) {
      updateUi(country);
    } else {
      countriesContainer.innerHTML = "";
    }
  } else {
    initialUI(allCountries);
  }
});

//handling filter options :

async function getCountriesFiltered(region) {
  const url = `https://restcountries.com/v3.1/region/${region}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

const filterOptionsArr = document.querySelectorAll(".filter_by");

filterOptionsArr.forEach((el) => {
  el.addEventListener("click", async function (e) {
    const region = e.target.textContent;
    closeFilterOptions();
    const data = await getCountriesFiltered(region);
    updateUi(data);
  });
});

// moving to another page for more details on country

backBtn.addEventListener("click", function () {
  countryDetails.style.opacity = "0";
  setTimeout(() => {
    countriesContainer.classList.remove("hidden");
    inputContainer.classList.remove("hidden");
    backBtn.classList.add("hidden");
    countryDetails.classList.remove("hidden");
  }, 200);
});

const checkExistance = function (data) {
  console.log("checked");
  const text = "Not availble";
  if (data == "0" || data) {
    return data;
  }
  return text;
};

const renderBorder = async function(border){
  const [borderData] = await getCountryBorder(border) ; 
  return borderData.name.common ; 
}

const renderCountryDetails = async function (data) {
  data = data[0];
  console.log(data);
  // console.log(flagCountry.querySelector('img'));
  flagCountry.src = data.flags.svg;
  CountryName.textContent = data.name.common;
  nativeName.innerHTML = `<span>Native Name: </span>${
    Object.values(data.name.nativeName)[0].common
  }`;
  population.innerHTML = `<span>Population: </span>${numberWithCommas(
    data.population
  )}`;
  tld.innerHTML = `<span>Top Level Domain: </span>${data.tld}`;
  currencies.innerHTML = ` <span>Currencies: </span> ${Object.keys(
    data.currencies
  )}`;
  region.innerHTML = `<span>Region: </span>${data.region}`;
  subRegion.innerHTML = `<span>Sub Region: </span>${data.subregion}`;
  capital.innerHTML = `<span>Capital: </span>${data.capital}`;
  languages.innerHTML = `<span>Languages: </span>${Object.values(
    data.languages
  )}`;

  if (data.borders) {
    for (let border of data.borders) {
      const borderName =await renderBorder(border)
      const html = `<button class="border_country">${borderName}</button>`;
      borderContainer.insertAdjacentHTML("beforeend", html);
    }
  }
    
  // data.borders.forEach(border => {
  // });
};

// name.nativeName.values[0]

// tld[]

// population

// currencies.keys

// region

// languages.values

// subregion

// capital[0]
