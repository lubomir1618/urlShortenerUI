document.addEventListener('DOMContentLoaded', () => {

  const BASE_URL = 'https://shortener-infobip.herokuapp.com/';
  const address = document.querySelector('#address');
  const shorten = document.querySelector('#shorten');
  const info = document.querySelector('#info');

  shorten.addEventListener('click', () => {
    if (isValidUrl(address.value)) {
      getUniqueString(address.value);
    }
  });

  function getUniqueString(addressToShorten) {
    const options = { 
      method: 'POST', body: `'{"url": "${addressToShorten}"}'`
    };

    fetch(BASE_URL + 'generate', options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        info.innerHTML = `Your shortened address for <a href="${response.originalUrl}">${response.originalUrl}</a> is 
          <a href="${BASE_URL}${response.shortUrl}" target="_blank" title="shortened address">${BASE_URL}${response.shortUrl}</a> and it is valid till ${new Date(response.expirationDate)}`;
        address.value = '';
      })
      .catch(err => {
        console.error(err);
        info.innerHTML = 'Something went wrong!'
      }); 
  }

  function isValidUrl(address) {
    try {
      new URL(address);
      return true;
    } catch (err) {
      info.innerHTML = 'Please add valid address.'
      return false;
    }
  }
});