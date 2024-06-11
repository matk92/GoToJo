document.querySelectorAll(".events-filters button").forEach((button) => {
  button.addEventListener("click", function () {
    if (this.classList.contains("clicked")) {
      this.classList.remove("clicked");
    } else {
      this.classList.add("clicked");
    }
  });
});
// partie de code qui permet de mettre paris par défaut sur la carte
var map = L.map("mapholder").setView([48.866667, 2.333333], 13);

// partie de code qui permet de mettre la carte openstreetmap sur la carte
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//partie de code qui permet de récupérer la position de l'utilisateur
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    document.getElementById("error").innerHTML =
      "La géolocalisation n'est pas prise en charge par ce navigateur. " <
      br >
      "Geolocation is not supported by this browser.";
  }
}

//partie de code qui permet d'afficher la position de l'utilisateur
function showPosition(position) {
  map.setView([position.coords.latitude, position.coords.longitude], 13); // Update the position of the map
  L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
}

// partie de code qui permet de mettre un ping sur la carte
// partie de code qui permet de modifier l'image
// var pingIcon = L.icon({
//   iconUrl: "img/ping.png",
//   iconSize: [30, 50], // size of the icon
//   shadowSize: [50, 64], // size of the shadow
//   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//   shadowAnchor: [4, 62], // the same for the shadow
//   popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
// });

// // partie de code qui permet de donner la position du ping
// var marker = L.marker([48.866667, 2.333333], { icon: pingIcon }).addTo(map);

// // partie de code qui permet de modifier la taille du ping en fonction du zoom
// map.on("zoomend", function () {
//   var currentZoom = map.getZoom();
//   pingIcon.options.iconSize = [
//     (30 * currentZoom) / 20,
//     (50 * currentZoom) / 20,
//   ]; // ajuster la taille de l'icône en fonction du niveau de zoom actuel
//   pingIcon.options.iconAnchor = [
//     (14 * currentZoom) / 20,
//     (49 * currentZoom) / 20,
//   ]; // ajuster lacroche de l'icône en fonction du niveau de zoom actuel
//   marker.setIcon(pingIcon);
// });

var searchInput = document.querySelector(".search-bar input");

var searchButton = document.querySelector(".search-bar button");

function performSearch() {
  var searchValue = searchInput.value.trim().toLowerCase();

  if (searchValue === "basketball") {
    if (bercyMarker) {
      map.removeLayer(bercyMarker);
      bercyMarker = null;
    } else {
      var bercyCoordinates = [48.8382, 2.3782];
      map.setView(bercyCoordinates, 13);
      bercyMarker = L.marker(bercyCoordinates).addTo(map);
      bercyMarker.bindPopup("<b>Arena Bercy</b><br>Basketball").openPopup();
    }
  } else if (searchValue === "rugby") {
    if (stadeFranceMarker) {
      map.removeLayer(stadeFranceMarker);
      stadeFranceMarker = null;
    } else {
      var stadeFranceCoordinates = [48.924459, 2.360164];
      map.setView(stadeFranceCoordinates, 13);
      stadeFranceMarker = L.marker(stadeFranceCoordinates).addTo(map);
      stadeFranceMarker
        .bindPopup("<b>Stade de France</b><br>Rugby")
        .openPopup();
    }
  } else {
    fetch(
      "https://nominatim.openstreetmap.org/search?format=json&q=" + searchValue
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.length > 0) {
          var lat = data[0].lat;
          var lon = data[0].lon;

          map.setView([lat, lon], 13);
        } else {
          alert('Aucun résultat trouvé pour "' + searchValue + '".');
        }
      });
  }
}

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    performSearch();
  }
});

searchButton.addEventListener("click", function () {
  performSearch();
});

var bercyMarker = null;
var stadeFranceMarker = null;

var buttons = document.querySelectorAll(".events-filters button");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    var buttonLabel = this.textContent.trim().toLowerCase();

    if (buttonLabel === "basketball") {
      if (bercyMarker) {
        map.removeLayer(bercyMarker);
        bercyMarker = null;
      } else {
        var bercyCoordinates = [48.8382, 2.3782];
        map.setView(bercyCoordinates, 13);
        bercyMarker = L.marker(bercyCoordinates).addTo(map);
        bercyMarker.bindPopup("<b>Arena Bercy</b><br>Basketball").openPopup();
      }
    } else if (buttonLabel === "rugby") {
      if (stadeFranceMarker) {
        map.removeLayer(stadeFranceMarker);
        stadeFranceMarker = null;
      } else {
        var stadeFranceCoordinates = [48.924459, 2.360164];
        map.setView(stadeFranceCoordinates, 13);
        stadeFranceMarker = L.marker(stadeFranceCoordinates).addTo(map);
        stadeFranceMarker
          .bindPopup("<b>Stade de France</b><br>Rugby")
          .openPopup();
      }
    }
  });
});
