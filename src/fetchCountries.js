function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`,
  ).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      reject('Oops,there is no country whith that name!');
    }
  });
}

export default fetchCountries;
