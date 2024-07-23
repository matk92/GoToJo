import InteractiveMap from "../components/InteractiveMap.js";
import SearchBar from "../components/SearchBar.js";
import DOMPlugin from "../core/DOMPlugin.js";
import MapPlugin from "../core/MapPlugin.js";
import Footer from "../sections/Footer.js";
import Header from "../sections/Header.js";
import SportsList from "../sections/SportsList.js";

export default function Home() {
  const map = new MapPlugin();

  const url =
    "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?limit=63";

  fetch(url)
    .then((response) => response.json())
    .then((eventsList) => {
      DOMPlugin.reRender("sportsList", SportsList(map, eventsList));

      let sportsSearch = eventsList.results.map((sport) => ({
        title: sport.sports,
        label: sport.start_date + "  " + sport.nom_site,
        longitude: sport.point_geo.lon,
        latitude: sport.point_geo.lat,
      }));

      const url2 =
        "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-boutiques-officielles/records?limit=99";

      fetch(url2)
        .then((response) => response.json())
        .then((shopList) => {
          let shopSearch = shopList.results.map((shop) => ({
            title: shop.title,
            label: shop.address,
            longitude: shop.localisation_geographique.lon,
            latitude: shop.localisation_geographique.lat,
          }));
          DOMPlugin.reRender("search-bar", SearchBar(map, [...sportsSearch, ...shopSearch]));

          shopSearch.map((shop) => map.addRedMarker(shop.latitude, shop.longitude, shop.title, shop.label));
          sportsSearch.map((sport) => map.addRedMarker(sport.latitude, sport.longitude, sport.title, sport.label));
        });
    })
    .catch(console.error);

  const targetDate = new Date("July 26, 2024 19:30:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (distance < 0) {
      clearInterval(interval);
      document.querySelector(".countdown").innerText = "The event has started!";
    }
  }

  const interval = setInterval(updateCountdown, 1000);

  return {
    head: ["<title>GoToJo 2024</title>", '<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />'],
    type: "div",
    children: [
      Header(),
      {
        type: "div",
        props: {
          style: {
            height: "35vh",
          },
        },
      },
      {
        type: "main",
        props: {
          style: {
            width: "100%",
            "background-color": "#464158",
            padding: "20px",
          },
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                "max-width": "1200px",
                margin: "0 auto",
              },
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    "justify-content": "space-between",
                    "align-items": "center",
                    "margin-bottom": "20px",
                  },
                },
                children: [
                  {
                    type: "h1",
                    props: {
                      style: {
                        "font-size": "2.5rem",
                        "flex-grow": "1",
                      },
                    },
                    children: [
                      {
                        type: "TEXT_NODE",
                        content: "Carte Interactive",
                      },
                    ],
                  },
                  SearchBar(),
                ],
              },
              {
                type: "div",
                props: {
                  className: "countdown",
                  style: {
                    display: "flex",
                    gap: "10px",
                    "justify-content": "center",
                    "align-items": "center",
                    "margin-bottom": "20px",
                    "background-color": "#342E46",
                    "text-align": "center",
                    color: "#DAA520",
                    padding: "20px",
                    "border-radius": "25px",
                    "font-weight": "800"
                  },
                },
                children: [
                  {
                    type: "div",
                    props: {
                      style: {
                        "background-image": "url(./img/logo_JO.png)",
                        "background-size": "contain",
                        "background-repeat": "no-repeat",
                        "width": "100px",
                        "height": "100px",
                      },
                    },
                  },
                  {
                    type: "div",
                    props: { style: { "font-size": "1.5em", "max-width": "500px" } },
                    children: [
                      { type: "TEXT_NODE", content: "Temps restant avant le début des Jeux Olympiques Paris 2024" },
                    ],
                  },
                  {
                    type: "div",
                    children: [
                      { type: "span", props: { id: "days", style: { display: "block", "font-size": "2em" } } },
                      { type: "TEXT_NODE", content: "Jours" },
                    ],
                  },
                  {
                    type: "div",
                    children: [
                      { type: "span", props: { id: "hours", style: { display: "block", "font-size": "2em" } } },
                      { type: "TEXT_NODE", content: "Heures" },
                    ],
                  },
                  {
                    type: "div",
                    children: [
                      { type: "span", props: { id: "minutes", style: { display: "block", "font-size": "2em" } } },
                      { type: "TEXT_NODE", content: "Minutes" },
                    ],
                  },
                  {
                    type: "div",
                    children: [
                      { type: "span", props: { id: "seconds", style: { display: "block", "font-size": "2em" } } },
                      { type: "TEXT_NODE", content: "Secondes" },
                    ],
                  },
                ],
              },
              InteractiveMap(map),
              SportsList(map),
            ],
          },
        ],
      },
      Footer(),
    ],
  };
}
