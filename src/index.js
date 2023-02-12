import './css/styles.css';
import fetchCountries from "./fetchCountries.js";
import lodashDebounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', lodashDebounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    e.preventDefault();
    const value = e.target.value.trim();
    if (value === '') {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
    }

    fetchCountries(value).then((data) => {
       
        if (data.length > 10) {
            countryList.innerHTML = '';
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            return;

        } else if (data.length > 1 && data.length <= 10) {
            countryInfo.innerHTML = '';
            createMarkupList(data);                         
            
        } else if (data.length === 1) {
            countryList.innerHTML = '';
            createMarkupCard(data);
        }
                
    }).catch(onError);
}

function createMarkupList(data) {
    const markupList = data.reduce((markupList, { flags, name }) => { return ` <li class="country-item"> <img src = ${flags.svg} class="country-img"/> <p class="country-name">${name.official}</p></li> ` + markupList }, '');
   
    countryList.innerHTML = markupList;
}

function createMarkupCard(data) {    
    const markupCard = data.reduce((markupCard, { flags, name, capital, population, languages }) => {

    return `<img src = ${flags.svg} class="country-img"/> 
    <p class="country-name-official">${name.official}</p>
    <div class="box-item"><p class="country-text">Capital:</p> <p>${capital}</p></div>
    <div class="box-item"><p class="country-text">Population:</p> <p>${population}</p> </div>
    <div class="box-item"><p class="country-text">Languages:</p> <p>${Object.values(languages).join(", ")}</p></div> ` + markupCard }, '');
    
    countryInfo.innerHTML = markupCard;
}

function onError(err) {
    Notiflix.Notify.failure("Oops, there is no country with that name");
}
