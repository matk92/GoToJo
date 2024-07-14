class MapPlugin {
  map = null;
  markers = [];

  initMap = () => {
    // partie de code qui permet de mettre paris par défaut sur la carte
    this.map = L.map("mapholder").setView([48.866667, 2.333333], 13);

    // partie de code qui permet de mettre la carte openstreetmap sur la carte
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  };

  locateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => this.showPosition(res.coords.latitude, res.coords.longitude));
    } else {
      document.getElementById("error").innerHTML =
        "La géolocalisation n'est pas prise en charge par ce navigateur. " <
        br >
        "Geolocation is not supported by this browser.";
    }
  };

  showPosition = (latitude, longitude, description) => {
    if (this.map) {
      let marker = this.markers.find((e) => e.getLatLng().lat === latitude && e.getLatLng().lng === longitude);
      if (marker) {
        this.map.removeLayer(marker);
        this.markers = this.markers.filter((e) => e !== marker);
      } else {
        this.map.setView([latitude, longitude], 13); // Update the position of the map
        marker = L.marker([latitude, longitude]).addTo(this.map);

        if (description) {
          marker.bindPopup(description).openPopup();
        }
        this.markers.push(marker);
      }
    }
  };

  onSearch = (event) => {
    var searchValue = event.target.value.value.trim().toLowerCase();
    fetch("https://nominatim.openstreetmap.org/search?format=json&q=" + searchValue)
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
  };
}

export default MapPlugin;
