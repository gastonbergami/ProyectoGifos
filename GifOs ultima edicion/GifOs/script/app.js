// ---- Comportamiento del boton dropdown ---- //

let dropBtn = document.getElementById("dropBtn");
let dropdownContent = document.getElementById("dropdownContent");
let desplegar = 0;

function cambio() {
  if (desplegar == 0) {

    dropdownContent.classList.add("ocultar");
    desplegar = 1;
  } else {

    dropdownContent.classList.remove("ocultar");
    desplegar = 0;
  }
}

dropBtn.addEventListener("click", cambio, true);




//-------------- Botones modo Oscuro, modo dia ---------------//

/* Boton night  */

const nigth = document.querySelector("#night"); 
nigth.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  let imgDark = document.getElementById("logoImg").src = "../img/gifOF_logo_dark.png";

  //---- guardamos modo oscuro ----//

  if (document.body.classList.contains('dark')) {
    localStorage.setItem('dark-mode', 'true');
  } else {
    localStorage.setItem('dark-mode', 'false');
  }
});

//-- mantenemos modo oscuro --//

if (localStorage.getItem('dark-mode') === 'true') {
  let = document.getElementById("logoImg").src = "../img/gifOF_logo_dark.png";
  document.body.classList.add('dark');
} else {
  document.body.classList.remove('dark');
}

/* Boton light  */

const light = document.querySelector("#light");
light.addEventListener("click", () => {
  document.body.classList.remove("dark");
  let = document.getElementById("logoImg").src = "../img/gifOF_logo.png";
  localStorage.removeItem('dark-mode');

});





//------------- Search --------------//

const getSearchContent = () => {
  const q = document.getElementById("searchContent").value,
    apiKey = "9HjNYzEMAnJAqCtOCOZiMbB1KWchCoW2",
    URL = `https://api.giphy.com/v1/gifs/search?q=${q}&api_key=${apiKey}`;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const element = document.getElementById("trendsContent");
      element.innerHTML = ""; // con esto me entrega vacio el contenedor de tendencias
      let searchImg = "";

      for (i = 0; i < data.data.length; i++) {
        searchImg += `
        <div class="trends-content-gif">
          <img class="trendsGif" src=${data.data[i].images.fixed_height.url}>
        </div>
        `;
      }

      element.innerHTML = searchImg;
      const trendsTitle = document.getElementById("trendsTitle");
      trendsTitle.innerHTML = q.charAt(0).toUpperCase() + q.slice(1) + ":"; // cambia el titulo
      trendsTitle.scrollIntoView();
    })

    .catch((err) => console.log(err));

  let searchList = document.getElementById('searchResp');
  searchList.style.display = 'none';
};


// comportamiento de barra de busqueda
const displaySearch = () => {
  let displayWindow = document.getElementById("searchResp").style.display;

  if (displayWindow == "none" ) {
    document.getElementById("searchResp").style.display = "block";
    /* ver si defini boton buscar .classList.toggle('botonBucsador') */
        
  }  else {
    document.getElementById("searchResp").style.display = "none";
    
  }

}

/* let inputSearch = document.getElementById('searchContent'),
    btnSearch = document.getElementById('btnSearch'),
    lupa = document.getElementById('searchImg'),
    text = document.getElementById('searchText'),
    searchResp = document.getElementById('searchResp');

const showSearchResp = () => {
  searchResp.style.display = "block";
 if(document.querySelector('body').style.background == "rgb(17, 0, 56)") {
   btnSearch.style.background = "#EE3EFE";
 } else {
  btnSearch.style.background = "#F7C9F3";
 }
}
const hideSearchResp = () => {
  searchResp.style.display = "none";
}

inputSearch.addEventListener('input', showSearchResp);
inputSearch.addEventListener('click', hideSearchResp);
window.addEventListener('click', hideSearchResp); */




//------------- Suggestions ---------------//

const getSuggestionContent = () => {
  const apiKey = "9HjNYzEMAnJAqCtOCOZiMbB1KWchCoW2",
    ids = [
      "3ohuAxV0DfcLTxVh6w",
      "jIzXYqaQ0nLkA",
      "hTQSzVR7yYW88",
      "J93sVmfYBtsRi",
    ],
    URL = `https://api.giphy.com/v1/gifs?&api_key=${apiKey}&ids=${ids}`;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      for (i = 0; i < data.data.length; i++) {
        let element = document.getElementById("suggestionContent");
        element.innerHTML += `
        <div class="suggestion-div-content">
          <h4 class="suggestion-title">#${data.data[i].title}<i class="fas fa-times"></i></h4>
          <img class="suggestion-gif" src=${data.data[i].images.original.url}>
          <a href="#suggestion" class="btn-suggestion-gif" onclick="showMoreContent('${data.data[i].title}')" alt="ver más contenido">Ver más...</a>
        </div>
        `;
      }
    })
    .catch((err) => console.log(err));
};

getSuggestionContent();



/* con esta funicion al hacer click en el boton ver más, nos trae el contenido del guif sugerido */

const showMoreContent = (suggestion) => {

  const apiKey = "9HjNYzEMAnJAqCtOCOZiMbB1KWchCoW2",
    URL = `https://api.giphy.com/v1/gifs/search?q=${suggestion}&api_key=${apiKey}`;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const element = document.getElementById("trendsContent");
      element.innerHTML = ""; 
      let searchImg = "";

      for (i = 0; i < data.data.length; i++) {
        searchImg += `
        <div class="trends-content-gif">
          <img class="trendsGif" src=${data.data[i].images.fixed_height.url}>
        </div>
        `;
      }

      element.innerHTML = searchImg;
      const trendsTitle = document.getElementById("trendsTitle");
      trendsTitle.innerHTML = suggestion.charAt(0).toUpperCase() + suggestion.slice(1) + ":";
      trendsTitle.scrollIntoView();
    })

    .catch((err) => console.log(err));

}



//------------ Trends ---------------//

const getTrendsContent = () => {
  const apiKey = "9HjNYzEMAnJAqCtOCOZiMbB1KWchCoW2",
    URL = `https://api.giphy.com/v1/gifs/trending?&api_key=${apiKey}&limit=24`;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      for (i = 0; i < data.data.length; i++) {

        let element = document.getElementById("trendsContent");
        element.innerHTML += `
        <div class="trends-content-gif">            
          <img class="trendsGif" src=${data.data[i].images.fixed_height.url}>          
          <div class="title-trends-content">
            <h3 class="title-trends-gif">${data.data[i].title}</h3>
          </div>
        </div>
        `;
      }
    })
    .catch((err) => console.log(err));
};

getTrendsContent();






 