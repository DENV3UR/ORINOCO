const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const conf = urlParams.get('conf');
const price = urlParams.get('price');


document.querySelector('#msg').innerHTML = 'Félicitations! <br /> Votre numéro de commande est le : ' + conf + ' <br />Prix total : ' + price; 