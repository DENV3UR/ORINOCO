const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const conf = urlParams.get('conf');


document.querySelector('#msg').innerHTML = 'Félicitations! Votre numéro de commande est le : ' + conf; 