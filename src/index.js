//import './css/styles.css';

//import templateCountryCard from './country-card.hbs';

//const DEBOUNCE_DELAY = 300;

/* const refs = {
  cardContainer: document.querySelector('.country-list'),
  searchForm: document.querySelector('#search-box'),
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
 */

import './css/styles.css';
import templateCountryCard from './country-card.hbs';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

let name = 'Sweden';

const refs = {
  cardConteiner: document.querySelector('.country-list'),
  searchForm: document.querySelector('#search-box'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function clearData() {
  refs.cardConteiner.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function onSearch(event) {
  const inputValue = event.target.value.trim();
  if (inputValue === '') {
    clearData();
    return;
  }
  function countrySearch(countries) {
    return countries.map(country => {
      return `<li><img src ='${country.flags.svg}' width = '200'/><h1 class='card-title'>${country.name.official}</h1><p class='card-text'>${country.capital}</p><p class='card-text'>${country.population}</p><p class='card-text'>${country.languages}</p></li>`;
    });
  }
  fetchCountries(inputValue)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (data.length === 1) {
        renderCountries(data[0]);
      } else {
        const card = countrySearch(data).join('');
        refs.cardConteiner.insertAdjacentHTML('beforeend', card);
      }
    })
    .catch(onFetchError);
  console.log(inputValue);
}

function renderCountries(country) {
  const markup = templateCountryCard(country);
  refs.cardConteiner.innerHTML = markup;
}

function onFetchError(error) {
  Notiflix.Notify.failure(error);
}

/* function countrySearch(countries) {
  return countries.map(country => {
    return `<li><img src='${country.flags.svg}'/><h1 class='card-title'>${name.official}</h1><p class='card-text'>${capital}</p><p class='card-text'>${population}</p><p class='card-text'>${languages}</p></li>`;
  });
} */
/* function renderPreiw(book) {
  divRight.innerHTML = '';
  divRight.insertAdjacentHTML('afterbegin', createPreiwMarkup(book));
} */
/* function createList() {
  const markup = books
    .map(
      (book) =>
        `<li id="${book.id}" class= "link"><p class ="text">${book.title}</p><button class="edit_btn">Edit</button><button class="delete_btn">Delete</button></li>`
    )
    .join("");
  ulEl.insertAdjacentHTML("afterbegin", markup); */
