import './css/styles.css';
import fetchCountries from "./fetchCountries.js";
import lodashDebounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// fetchCountries('ukraine').then(console.log);

input.addEventListener('input', lodashDebounce(onInput, 300));

function onInput(e) {
    e.preventDefault();
    const value = e.target.value.trim();
    if (value === '') {
        return;
    }

    fetchCountries(value).then((data) => {

        console.log(data);   
        

        if(data.length > 10){
          Notiflix.Notify.info("Too many matches found. Please enter a more specific name."); 

        } else if(data.length > 1 & data.length <= 10){
            console.log('list');
            
        }else {
            console.log('card');
        }
    });
}

