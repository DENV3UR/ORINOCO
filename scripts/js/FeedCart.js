const cartItems = JSON.parse(localStorage.getItem('cameras'))
var x = 0
var totalPrice = 0

document.querySelector("form").addEventListener("submit", function(e){
    e.preventDefault();
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

        const postdataCart = async function () {
            try {
              let response = await fetch("http://localhost:3000/api/cameras/order", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(infosServeur)
              });
              if (response.ok) {
                let data = await response.json()
                console.log(data);
                let idConfirmation = (data["orderId"])
                document.querySelector("tbody").innerHTML = ''
                document.querySelector("h5").innerHTML = ''
                alert(idConfirmation);
                localStorage.clear()
                let PrixConfirmation = (totalPrice)
                console.log(PrixConfirmation);
              } else {
                console.error('reponse serveur : ', response.status);
              }
            } catch (e) { 
              console.log(e) 
            }
          }
          postdataCart()
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

