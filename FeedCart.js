const cartItems = JSON.parse(localStorage.getItem('cameras'))
var x = 0
console.log(cartItems)

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
    table.appendChild(tr);
}