// ui shortener
document.addEventListener('DOMContentLoaded', () => {

  const BASE_URL = 'https://shortener-infobip.herokuapp.com/';
  const address = document.querySelector('#address');
  const shorten = document.querySelector('#shorten');
  const info = document.querySelector('#info');
  const wrong = 'Something went wrong!';

  shorten.addEventListener('click', () => {
    if (isValidUrl(address.value)) {
      getUniqueString(address.value);
    } else {
      info.innerHTML = 'Please add valid address.'
    }
  });

  function getUniqueString(addressToShorten) {
    const options = { 
      method: 'POST',
      body: `{"url": "${addressToShorten}"}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    fetch(BASE_URL + 'generate', options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.shortUrl) {
          info.innerHTML = `Your shortened address for <a href="${response.originalUrl}" target="_blank">${response.originalUrl}</a> is 
          <a href="${BASE_URL}${response.shortUrl}" target="_blank" title="shortened address">${BASE_URL}${response.shortUrl}</a> and it is valid till ${new Date(response.expirationDate)}`;          
        } else {
          info.innerHTML = wrong
        }
        address.value = '';
      })
      .catch(err => {
        console.error(err);
        info.innerHTML = wrong
      }); 
  }

  function isValidUrl(address) {
    try {
      new URL(address);
      return true;
    } catch (err) {
      return false;
    }
  }
});