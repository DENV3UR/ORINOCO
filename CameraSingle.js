function fetchData(id) {
    fetch('http://localhost:3000/api/cameras/' + id)
    .then( response => response.json() )
    .then( data => renderOneCamera(data) )
}

function renderOneCamera(camera) {
    var alreadyIn = false
    let selectBox = document.querySelector("select");
    for(let i=0; i < camera.lenses.length; i++){

        // create option using DOM
        const newOption = document.createElement('option');
        const optionText = document.createTextNode(camera.lenses[i]);
        // set option text
        newOption.appendChild(optionText);
        // and option value
        newOption.setAttribute('value',camera.lenses[i]);
        selectBox.appendChild(newOption);
    }
    let img = document.querySelector(".card-img-top");
    let name = document.querySelector("h5");
    let price = document.querySelector("h6");
    let desc = document.querySelector("p");
    let button = document.querySelector(".btn-primary");

    img.src = camera.imageUrl
    name.innerHTML = camera.name
    price.innerHTML = camera.price + ' €'
    desc.innerHTML = camera.description
    button.addEventListener('click' , function() {
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
        var result = JSON.parse(localStorage.getItem("cameras"));
        console.log(result);
    })
}

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')

//Call the function that will automatically run renderAllCameras() also 
fetchData(id);