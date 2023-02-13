import Notiflix from 'notiflix';

function fetchCountries(name) {
    const URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(URL).then(
        response => {
            if (!response.ok) {
                throw new Error(Notiflix.Notify.failure("Oops, there is no country with that name"));
            }
            return response.json();
        }
    )
}


export default fetchCountries;