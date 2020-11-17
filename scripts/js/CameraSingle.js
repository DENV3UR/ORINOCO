const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')

//Call the function that will automatically run renderAllCameras() also 
fetchData(id);

function fetchData(id) {
    fetch('http://localhost:3000/api/cameras/' + id)
    .then( response => response.json() )
    .then( data => renderOneCamera(data) )
}

function renderOneCamera(camera) {

    for(let i=0; i < camera.lenses.length; i++){
        displayOption(camera.lenses[i])
    }
    document.querySelector(".card-img-top").src = camera.imageUrl
    document.querySelector("h5").innerHTML = camera.name
    document.querySelector("h6").innerHTML = camera.price + ' €'
    document.querySelector("p").innerHTML = camera.description

    document.querySelector(".btn-primary").addEventListener('click' , function() {
        addToCart()
    })
}

function displayOption(lense){
    let selectBox = document.querySelector("select");
    // create option using DOM
    const newOption = document.createElement('option');
    const optionText = document.createTextNode(lense);
    // set option text
    newOption.appendChild(optionText);
    // and option value
    newOption.setAttribute('value',lense);
    selectBox.appendChild(newOption);
}

function addToCart() {
    let alreadyIn = false
    let selectBox = document.querySelector("select");
    let cameras = []
    let stored = JSON.parse(localStorage.getItem("cameras"));
    if (stored) {
        for (let i=0; i < stored.length; i++){
            if(stored[i]['id'] == id &&  stored[i]['lense'] == selectBox.value) {
                alreadyIn = true
                console.log('already in')
            }
        }
        if(alreadyIn == false) stored.push({'id' : id, 'lense' : selectBox.value})
        cameras = stored
        alreadyIn = false
    }
    else {
        cameras.push({'id' : id, 'lense' : selectBox.value})
    }
    localStorage.setItem("cameras", JSON.stringify(cameras));
}