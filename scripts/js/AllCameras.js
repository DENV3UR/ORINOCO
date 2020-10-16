function fetchData() {
    fetch('http://localhost:3000/api/cameras/')
    .then( response => response.json() )
    .then( data => renderAllCameras(data) )
  }

function renderAllCameras(data) {
    for (const camera of data) {
        
      if ("content" in document.createElement("template")) {

          const main = document.querySelector('#product-list')
          // On prépare une ligne pour le tableau 
          let template = document.querySelector("#product");
      
          let clone = document.importNode(template.content, true);
          let price = clone.querySelector(".card-header");
          let img = clone.querySelector("img");
          let name = clone.querySelector("h5");
          let desc = clone.querySelector("p");
          let button = clone.querySelector("a");

          img.src = camera.imageUrl
          button.href = 'product.html?id=' + camera._id
          price.innerHTML = camera.price + ' €'
          name.innerHTML = camera.name
          desc.innerHTML = camera.description

          main.appendChild(clone);
      }
    }
 }

//Call the function that will automatically run renderAllCameras() also 
fetchData();

