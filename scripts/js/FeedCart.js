const cartItems = JSON.parse(localStorage.getItem('cameras'))
var x = 0
var totalPrice = 0

document.querySelector("form").addEventListener("submit", function(e){
    e.preventDefault();

    if (!checkMail(document.getElementById('email').value)) return false
    if (!checkEmptyFields()) return false

    var id = []
    for(let i=0; i<cartItems.length; i++){
        id.push(cartItems[i]['id'])
    }
    let infosServeur = {products: id, contact: {
        firstName: document.getElementById('prenom').value,
        lastName : document.getElementById('nom').value,
        address : document.getElementById('adresse').value,
        city : document.getElementById('ville').value,
        email : document.getElementById('email').value,
      }};

      postdataCart(infosServeur)
})

if(cartItems){
  for(let i=0; i<cartItems.length; i++){
      fetchData(cartItems[i]['id'])
  }
}
function fetchData(id) {
    fetch('http://localhost:3000/api/cameras/' + id)
    .then( response => response.json() )
    .then( data => appendToCart(data) )
}

function appendToCart(camera){
    x = x + 1
    let table = document.querySelector("table")
    var line = document.createElement("tbody")
    var tr = line.appendChild(document.createElement("tr"))
    var th = tr.appendChild(document.createElement("th"))
    var name = tr.appendChild(document.createElement("td"))
    var price = tr.appendChild(document.createElement("td"))
    var lense = tr.appendChild(document.createElement("td"))
    th.innerHTML = x
    name.innerHTML = camera.name
    price.innerHTML = camera.price + '  €'
    lense.innerHTML = cartItems[x-1]['lense']
    table.appendChild(line)
    totalPrice += camera.price
    document.querySelector("h5").innerHTML = 'TOTAL : ' + totalPrice + ' €'
}

function getForm() {
    var elements = document.getElementById("cart-form").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }

    return JSON.stringify(obj);
}

function checkMail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

function checkEmptyFields() {
  if(document.getElementById('prenom').value.length == 0 || document.getElementById('nom').value.length == 0 || document.getElementById('adresse').value.length == 0 || document.getElementById('ville').value.length == 0){
    alert("All fields need to be completed!")
    return (false)
  }
  else {
    return true
  }
}

async function postdataCart (data) {
  try {
    let response = await fetch("http://localhost:3000/api/cameras/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      handleConfirmation(response)
    } else {
      console.error('reponse serveur : ', response.status);
    }
  } catch (e) { 
    console.log(e) 
  }
}

async function handleConfirmation(response){
  let data = await response.json()
      console.log(data);
      let idConfirmation = (data["orderId"])
      document.querySelector("tbody").innerHTML = ''
      document.querySelector("h5").innerHTML = ''
      //alert("Votre commande a bien été enregistrée sous le numéro : " + idConfirmation);
      localStorage.clear()
      document.querySelector("form").reset()
      //let PrixConfirmation = (totalPrice)
      window.location.assign = 'done.html?conf=' + idConfirmation + '&price=' + totalPrice
}