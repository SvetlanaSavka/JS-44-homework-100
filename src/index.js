import './css/styles.css';

import templateCountryCard from './country-card.hbs';

//const DEBOUNCE_DELAY = 300;

const refs = {
  cardContainer: document.querySelector('.country-list'),
  searchForm: document.querySelector('.search-box'),
};

refs.searchForm.addEventListener('input', onSearch);

function onSearch(event) {
  event.preventDefault();
  const form = event
    .fetchCountries()
    .then(renderCountryCard)
    .catch(error => console.log(error));
}

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`) // сходить на сервер - вернет промис
    .then(responce => {
      return responce.json(); // разпарсили ответ от бекенда,вернет еще один промис
    });
}

function renderCountryCard(countries) {
  const markup = templateCountryCard(countries);
  refs.cardContainer.innerHTML = markup;
}
