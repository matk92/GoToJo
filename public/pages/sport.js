import InteractiveMap from "../components/InteractiveMap.js";
import Spinner from "../components/Spinner.js";
import { BrowserLink } from "../core/BrowserRouter.js";
import { formatDate } from "../core/DatesHelper.js";
import DOMPlugin from "../core/DOMPlugin.js";
import MapPlugin from "../core/MapPlugin.js";
import Footer from "../sections/Footer.js";
import SportDetails from "../sections/sport_details/SportDetails.js";
import getSportImage from "../utils/SportsUtils.js";
import spots from "../data/spots.js";

export default function Sport(params, data = undefined, map) {
  if (map === undefined) {
    map = new MapPlugin();
  }

  // Si il n'y as pas de data on appelle les API pour recuperer de l'informations
  if (data == undefined) {
    fetch(
      "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?limit=63"
    )
      .then((response) => response.json())
      .then(async (eventsList) => {
        let sportsSearch = eventsList.results.map((sport) => ({
          title: sport.sports,
          label: sport.nom_site,
          longitude: sport.point_geo.lon,
          latitude: sport.point_geo.lat,
        }));

        let sport = eventsList.results.find((e) => e.sports == params.name);
        if (sport == undefined) {
          sport = null;
          console.error("Sport not found :" + params.name);
          return;
        }

        let shopList = await fetch(
          "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-boutiques-officielles/records?limit=99"
        ).then((response) => response.json());
        let shopSearch = shopList.results.map((shop) => ({
          title: shop.title,
          label: shop.address,
          longitude: shop.localisation_geographique.lon,
          latitude: shop.localisation_geographique.lat,
        }));

        shopSearch.map((shop) => map.addShop(shop.latitude, shop.longitude, shop.title, shop.label));
        sportsSearch.map((sport) =>
          map.addMarker(sport.latitude, sport.longitude, sport.title, sport.label, "/event/" + sport.title)
        );
        spots.map((spot) => map.addSpot(spot.latitude, spot.longitude, spot.title, spot.label));

        DOMPlugin.reRender("sport_page", Sport(params, { sport: sport }, map));
        setTimeout(() => {
          map.showPosition(sport.point_geo.lat, sport.point_geo.lon, sport.sports, sport.nom_site);
        }, 200);
      });
  }

  return {
    type: "div",
    props: {
      id: "sport_page",
    },
    children: [
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            padding: "20px",
          },
        },
        children: [
          {
            type: "HTML_NODE",
            content: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24px" height="24px"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" /></svg>`,
          },
          BrowserLink({ path: "/", title: "Retour", color: "currentcolor" }),
        ],
      },
      {
        type: "div",
        props: {
          style: {
            "max-width": "1200px",
            margin: "0 auto",
            "padding-inline": "20px",
            "padding-bottom": "60px",
            "min-height": "100vh",
          },
        },
        children:
          data === undefined
            ? [Spinner()]
            : [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      position: "relative",
                      padding: "20px",
                      width: "100%",
                      "justify-content": "space-between",
                      "align-items": "center",
                    },
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          "flex-direction": "column",
                          "max-width": "75%",
                          overflow: "hidden",
                        },
                      },
                      children: [
                        {
                          type: "h3",
                          props: {
                            style: {
                              margin: "0",
                              "font-size": "1rem",
                              "font-weight": "600",
                              "text-overflow": "ellipsis",
                              "white-space": "nowrap",
                              overflow: "hidden",
                            },
                          },
                          children: [
                            {
                              type: "TEXT_NODE",
                              content:
                                "du " + formatDate(data.sport.start_date) + " au " + formatDate(data.sport.end_date),
                            },
                          ],
                        },
                        {
                          type: "h1",
                          props: {
                            class: "barlow-extrabold",
                            style: {
                              "font-size": "2.5rem",
                              margin: "10px 0",
                              "text-overflow": "ellipsis",
                              "white-space": "nowrap",
                              overflow: "hidden",
                            },
                          },
                          children: [
                            {
                              type: "TEXT_NODE",
                              content: data.sport.sports,
                            },
                          ],
                        },
                        {
                          type: "a",
                          events: {
                            click: [
                              (e) => {
                                e.stopPropagation();
                                map.showPosition(
                                  data.sport.point_geo.lat,
                                  data.sport.point_geo.lon,
                                  data.sport.sports,
                                  data.sport.start_date + " " + data.sport.nom_site
                                );
                              },
                            ],
                          },
                          props: {
                            style: {
                              width: "fit-content",
                            },
                          },
                          children: [
                            {
                              type: "HTML_NODE",
                              content:
                                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" heigh="24px" fill="currentColor"> <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" /> </svg>',
                            },
                            {
                              type: "span",
                              children: [
                                {
                                  type: "TEXT_NODE",
                                  content: data.sport.nom_site,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: "img",
                      props: {
                        style: {
                          position: "absolute",
                          right: "-20px",
                          top: "-60px",
                          "object-fit": "contain",
                          opacity: "0.8",
                        },
                        width: "350px",
                        height: "350px",
                        src: "../img/sports_logo/" + getSportImage(data.sport.sports, true),
                        alt: data.sport.sports,
                      },
                    },
                  ],
                },
                {
                  type: "div",
                  props: {
                    style: {
                      "margin-top": "20px",
                    },
                  },
                  children: [InteractiveMap(map)],
                },
                SportDetails(data.sport, "calendrier"),
              ],
      },
      Footer(),
      {
        type: "script",
        props: {
          async: true,
          src: "https://cse.google.com/cse.js?cx=639a89b0e9e4343b0",
        },
      },
    ],
  };
}
