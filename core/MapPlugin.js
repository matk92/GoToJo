
class MapPlugin {
  map = null;
  redIcon = null;
  cyanIcon = null;
  markers = [];

  initMap = () => {
    // partie de code qui permet de mettre paris par défaut sur la carte
    this.map = L.map("mapholder").setView([48.866667, 2.333333], 13);

    // partie de code qui permet de mettre la carte openstreetmap sur la carte
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // add red points
    this.redIcon = new L.Icon({
      iconUrl: "/img/red_dot.svg",
      iconSize: [10, 10],
      iconAnchor: [10, 10],
    });
    this.cyanIcon = new L.Icon({
      iconUrl: "/img/cyan_dot.svg",
      iconSize: [10, 10],
      iconAnchor: [10, 10],
    });
    this.markers.forEach((marker) => {
      this.addMarker(marker.lat, marker.lng, marker.title, marker.description, marker.color, marker.link);
    });
  };

  addMarker = (lat, lng, title, description, color = "red", link) => {
    let label = `<b>${title}</b><br>${description}`;

    if (link != undefined) {
      if (window.handleClick === undefined) {
        window.handleClick = (link) => {
          history.pushState(null, null, link);
        };
      }

      label += `<br><a onclick="handleClick('${link}')">Voir plus</a>`;
    }

    if (color == "red" && this.redIcon !== null) {
      L.marker([lat, lng], { icon: this.redIcon }).addTo(this.map).bindPopup(label);
    } else if (color == "cyan" && this.cyanIcon !== null) {
      L.marker([lat, lng], { icon: this.cyanIcon }).addTo(this.map).bindPopup(label);
    } else {
      // Si les icones n'ont pas été chargées, on les ajoute à la liste des marqueurs pour les ajouter plus tard
      this.markers.push({ lat, lng, title, description, color, link });
      return;
    }
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

  showPosition = (latitude, longitude, title, description) => {
    if (this.map) {
      this.map.setView([latitude, longitude], 13); // Update the position of the map
      let marker = L.marker([latitude, longitude]).addTo(this.map);

      if (title) {
        marker.bindPopup(`<b>${title}</b><br>${description}`).openPopup();
      }
    }
  };

  onSearch = (search) => {
    var searchValue = search.trim().toLowerCase();
    fetch("https://nominatim.openstreetmap.org/search?format=json&q=" + searchValue)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          var lat = data[0].lat;
          var lon = data[0].lon;

          this.showPosition(lat, lon, data[0].name, data[0].display_name);
        } else {
          alert('Aucun résultat trouvé pour "' + searchValue + '".');
        }
      });
  };
}

export default MapPlugin;
