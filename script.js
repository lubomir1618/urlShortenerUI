// ui shortener
document.addEventListener('DOMContentLoaded', () => {

  const BASE_URL = 'https://shortener-infobip.herokuapp.com/';
  const address = document.querySelector('#address');
  const shorten = document.querySelector('#shorten');
  const loading = document.querySelector('#loading');
  const info = document.querySelector('#info');
  const wrong = 'Something went wrong!';

  shorten.addEventListener('click', () => {
    if (isValidUrl(address.value)) {
      getUniqueString(address.value);
      loading.style.display = 'block';
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
        if (response.shortUrl) {
          info.innerHTML = `Your shortened address: <br>
          <a href="${BASE_URL}${response.shortUrl}" target="_blank" title="shortened address">${BASE_URL}${response.shortUrl}</a> <br>
          <p>valid till ${new Date(response.expirationDate)}<p>`;
          loading.style.display = 'none';
        } else {
          info.innerHTML = wrong;
          loading.style.display = 'none';
        }
        address.value = '';
      })
      .catch(err => {
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