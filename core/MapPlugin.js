import GoogleSearchInfo from "../sections/GoogleSearchInfo.js";
import DOMPlugin from "./DOMPlugin.js";
import GoogleSearchPlugin from "./GoogleSearchPlugin.js";

class MapPlugin {
  map = null;
  redIcon = null;
  cyanIcon = null;
  greenIcon = null;
  markers = [];
  spots = [];

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
    this.greenIcon = new L.Icon({
      iconUrl: "/img/green_dot.svg",
      iconSize: [10, 10],
      iconAnchor: [10, 10],
    });

    this.markers.forEach((marker) => {
      this.addMarker(marker.lat, marker.lng, marker.title, marker.description, marker.color, marker.link);
    });

    this.spots.forEach((spot) => {
      this.addSpot(spot.lat, spot.lng, spot.title, spot.description);
    });

    this.initializeSpotClickDetection();
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

  addSpot = (lat, lng, title, description) => {
    let label = `<b>${title}</b><br>${description}`;

    if (this.greenIcon !== null) {
      L.marker([lat, lng], { icon: this.greenIcon }).addTo(this.map).bindPopup(label);
      if (this.spots.find((spot) => spot.lat === lat && spot.lng === lng) === undefined) {
        this.spots.push({ lat, lng, title, description });
      }
    } else {
      this.spots.push({ lat, lng, title, description });
    }
  };

  initializeSpotClickDetection = () => {
    this.map.on("popupopen", async (event) => {
      // event.popup will contain the popup that was opened
      const openedPopup = event.popup;

      // Extracts the title from the popup content
      const spotTitle = openedPopup.getContent().match(/<b>(.*?)<\/b>/)[1];

      // Now, find the spot with this title in your spots array
      const clickedSpot = this.spots.find((spot) => spot.title === spotTitle);

      if (clickedSpot) {
        DOMPlugin.reRender("google_search_info", GoogleSearchInfo(undefined, undefined, true));
        let searchInfo = await GoogleSearchPlugin.search(clickedSpot.title + " " + clickedSpot.description);
        let searchImages = await GoogleSearchPlugin.searchImages(clickedSpot.title + " " + clickedSpot.description);
        DOMPlugin.reRender("google_search_info", GoogleSearchInfo(searchInfo, searchImages));
      }
    });
    this.map.on("popupclose", (event) => {
      const closedPopup = event.popup;

      const spotTitle = closedPopup.getContent().match(/<b>(.*?)<\/b>/)[1];

      const clickedSpot = this.spots.find((spot) => spot.title === spotTitle);

      // On ferme la fenêtre d'information si on clique sur un autre spot
      if (clickedSpot) {
        DOMPlugin.reRender("google_search_info", GoogleSearchInfo());
      }
    });
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
