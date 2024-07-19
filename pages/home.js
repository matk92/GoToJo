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
