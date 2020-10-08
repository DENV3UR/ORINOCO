const cartItems = JSON.parse(localStorage.getItem('cameras'))
var x = 0
var totalPrice = 0
console.log(cartItems)
document.querySelector("button").addEventListener("click", function(){
    var id = []
    for(let i=0; i<cartItems.length; i++){
        id.push(cartItems[i]['id'])
    }
    let infosServeur = JSON.stringify({products: id, contact: {
        email : document.getElementById('email').value,
        prenom : document.getElementById('prenom').value,
        nom : document.getElementById('nom').value,
        adresse : document.getElementById('adresse').value,
        ville : document.getElementById('ville').value
      }});

      let infosServeur2 = JSON.stringify({products: ['5be9c4471c9d440000a730e8'], contact: {
        email : 'test@test.fr',
        prenom : 'jean',
        nom : 'dupont',
        adresse : '1 rue voltaire',
        ville : 'toulpuse'
      }});

      //alert(infosServeur2)
      /*fetch('http://localhost:3000/api/cameras/order',{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : infosServeur}
        //.then(res => res.json())
        .then(res => console.log(res))
        .then(res => alert(res)));*/

        /*fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        mode: 'cors',
        body: infosServeur2,
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(function(response){
        response.json().then(function(data) {
            console.log(data.orderId);
            //EnvoiConfirmationPage(data.orderId, PrixFacture);
        })})*/

        const postdataCart = async function () {
            try {
              let response = await fetch("http://localhost:3000/api/cameras/order", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: infosServeur
              });
              if (response.ok) {
                let data = await response.json()
                console.log(data);
                let idConfirmation = (data["orderId"])
                console.log(idConfirmation);
                let PrixConfirmation = (totalPrice)
                console.log(PrixConfirmation);
                //window.location = confirmation.html?id=${data["orderId"]}&price=${PrixConfirmation};
              } else {
                console.error('reponse serveur : ', response.status);
              }
            } catch (e) { 
              console.log(e) 
            }
          }

          postdataCart()

    
    //let dataApi = response.json()
       // console.log(dataApi)
})
for(let i=0; i<cartItems.length; i++){
    fetchData(cartItems[i]['id'])
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
    table.appendChild(tr)
    totalPrice += camera.price
    document.querySelector("h5").innerHTML = 'TOTAL : ' + totalPrice + ' €'
}

function Buy() {
    //var form = new FormData(document.getElementById('cart-form'));
    //var form = getForm()
    var id = []
    for(let i=0; i<cartItems.length; i++){
        id.push(cartItems[i]['id'])
    }
    //id = JSON.stringify(id)
    var data = JSON.stringify({ contact : {
        email : document.getElementById('email').value,
        prenom : document.getElementById('prenom').value,
        nom : document.getElementById('nom').value,
        adresse : document.getElementById('adresse').value,
        ville : document.getElementById('ville').value
      },
        products : id})


        let infosServeur = JSON.stringify({products: id, contact: {
            email : document.getElementById('email').value,
            prenom : document.getElementById('prenom').value,
            nom : document.getElementById('nom').value,
            adresse : document.getElementById('adresse').value,
            ville : document.getElementById('ville').value
          }});
    
      alert(infosServeur)
    /*fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    body: data
    })
    .then((response) => response.text())
    .then((responseText) => {
    alert(responseText);
    console.log(responseText)
    })
    .catch((error) => {
        console.error(error);
    });*/
    
    const options = {
        method: 'POST',
        body: infosServeur,
        headers: {
            'Content-Type': 'application/json',
        }
    }
     
    fetch('http://localhost:3000/api/cameras/order',{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : infosServeur}
        //.then(res => res.json())
        .then(res => console.log(res))
        .then(res => alert(res)));
    
    let dataApi = response.json()
        console.log(dataApi)

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

