function fetchData() {
    fetch('http://localhost:3000/api/cameras/')
    .then( response => response.json() )
    .then( data => renderAllCameras(data) )
  }

function renderAllCameras(data) {
    for (const camera of data) {
//Find the container where we attach everything to
    const main = document.querySelector('#main_window')
//Create all necessary elements
    const id = document.createElement('div')
    id.setAttribute('class', 'id')
    id.innerHTML = camera._id
    id.addEventListener('click', function() {
        fetch('http://localhost:3000/api/cameras/' + camera._id)
        .then( response => response.json() )
        .then( data => renderOneCamera(data) )
    })
    const p = document.createElement('p')
    p.innerHTML = camera.name + ' ' + camera.price + 'euro ' + camera.description

    const image = document.createElement('img')
    image.src = camera.imageUrl
    image.style.width = '50px'
    image.style.height = 'auto'
    p.append(image)
    id.append(p)
    main.append(id)
    }
 }

 function renderOneCamera (camera) {
    console.log(camera.name)
    const main = document.querySelector('#main_window')
    main.innerHTML = ''
    const image = document.createElement('img')
    image.src = camera.imageUrl
    image.style.width = '100px'
    image.style.height = 'auto'
    main.append(image)
 }
//Call the function that will automatically run renderQuote() also 
 fetchData();

