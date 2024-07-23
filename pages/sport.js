import InteractiveMap from "../components/InteractiveMap.js";
import Spinner from "../components/Spinner.js";
import { BrowserLink } from "../core/BrowserRouter.js";
import { formatDate, formatHours } from "../core/DatesHelper.js";
import DOMPlugin from "../core/DOMPlugin.js";
import MapPlugin from "../core/MapPlugin.js";
import Footer from "../sections/Footer.js";
import getSportImage from "../utils/SportsUtils.js";

export default function Sport(params, data = undefined, map) {
  if (map === undefined) {
    map = new MapPlugin();
  }

  console.log(data);

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

        fetch(
          "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-boutiques-officielles/records?limit=99"
        )
          .then((response) => response.json())
          .then((shopList) => {
            let shopSearch = shopList.results.map((shop) => ({
              title: shop.title,
              label: shop.address,
              longitude: shop.localisation_geographique.lon,
              latitude: shop.localisation_geographique.lat,
            }));

            shopSearch.map((shop) => map.addRedMarker(shop.latitude, shop.longitude, shop.title, shop.label, "cyan"));
            sportsSearch.map((sport) => map.addRedMarker(sport.latitude, sport.longitude, sport.title, sport.label));

            DOMPlugin.reRender("sport_page", Sport(params, { sport: sport }, map));
            setTimeout(() => {
              map.showPosition(sport.point_geo.lat, sport.point_geo.lon, sport.sports, sport.nom_site);
            }, 200);
          });
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
            "max-width": "1000px",
            margin: "0 auto",
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
                          class: "barlow-extrabold",
                          props: {
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

function SportDetails(sport, detail = "calendrier", data) {
  if (!data) {
    if (detail == "calendrier") {
      let codeSport = sport.sports.split("(")[1].split(")")[0];
      fetch("https://sph-s-api.olympics.com/summer/schedules/api/ENG/schedule/discipline/" + codeSport.toUpperCase())
        .then((response) => response.json())
        .then((calendar) => {
          DOMPlugin.reRender("sport_details", SportDetails(sport, detail, { calendar: calendar.units }));
        });
    } else if (detail == "images") {
      const encodedName = encodeURIComponent(sport.nom_site);
      // AIzaSyCHzRzxCzN42920CeHDKr1oLnTKciqDIpU
      // AIzaSyA3PYeK4r1vnaCPqQ7hC4a9XjGmfqg_4_0
      fetch(
        "https://www.googleapis.com/customsearch/v1?key=AIzaSyCHzRzxCzN42920CeHDKr1oLnTKciqDIpU&cx=639a89b0e9e4343b0&q=" +
          encodedName +
          "&searchType=image"
      )
        .then((response) => response.json())
        .then((images) => {
          DOMPlugin.reRender("sport_details", SportDetails(sport, detail, { images: images }));
        });
    }
  }

  return {
    type: "div",
    props: {
      id: "sport_details",
      style: {
        "max-width": "1200px",
        margin: "20px auto",
      },
    },
    children: [
      getDetailsTitles(detail, (tab) => DOMPlugin.reRender("sport_details", SportDetails(sport, tab))),
      {
        type: "hr",
        props: {
          style: {
            width: "100%",
            opacity: "0.5",
            margin: "5px 0",
          },
        },
      },
      getDetailSection(detail, data),
    ],
  };
}

function getDetailsTitles(detail, onclick) {
  let tabs = ["Calendrier", "Images"].map((tab) => ({
    type: "button",
    props: {
      style: {
        "background-color": "transparent",
        color: "#fff0da",
        border: detail == tab.toLowerCase() ? "2px solid #fff0da" : "none",
        "border-radius": "10px",
        padding: "8px 16px",
        cursor: "pointer",
        opacity: detail == tab.toLowerCase() ? "1" : "0.75",
        "font-size": detail == tab.toLowerCase() ? "1.25rem" : "1rem",
        "font-weight": "bold",
      },
      onclick: (e) => {
        e.stopPropagation();
        onclick(tab.toLocaleLowerCase());
      },
    },
    children: [
      {
        type: "TEXT_NODE",
        content: tab,
      },
    ],
  }));

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        "align-items": "center",
        gap: "10px",
      },
    },
    children: tabs,
  };
}

function getDetailSection(detail, data) {
  if (data == undefined) {
    return Spinner();
  }

  console.log(data);
  if (detail == "calendrier" && data.calendar) {
    return {
      type: "ul",
      props: {
        style: {
          "list-style-type": "none",
          padding: "0",
        },
      },
      children: data.calendar.map((event) => ({
        type: "li",
        props: {
          style: {
            display: "flex",
            "align-items": "center",
            "background-color": "#342E46",
            color: "#fff0da",
            gap: "20px",
            "border-radius": "10px",
            padding: "16px",
            margin: "5px 0",
          },
        },
        children: [
          {
            type: "HTML_NODE",
            content:
              '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20px" heigh="20px" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" /></svg>',
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                "flex-direction": "column",
                "align-items": "center",
              },
            },
            children: [
              {
                type: "p",
                props: {
                  class: "inter-light",
                  style: {
                    margin: "0",
                    "font-size": "0.85rem",
                  },
                },
                children: [
                  {
                    type: "TEXT_NODE",
                    content: formatDate(event.startDate),
                  },
                ],
              },
              {
                type: "p",
                props: {
                  class: "inter-regular",
                  style: {
                    margin: "0",
                    "font-size": "0.9rem",
                  },
                },
                children: [
                  {
                    type: "TEXT_NODE",
                    content: formatHours(event.startDate) + " - " + formatHours(event.endDate),
                  },
                ],
              },
            ],
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                "border-left": "2px solid #fff0da",
                "flex-grow": "1",
                "padding-left": "10px",
                "flex-direction": "column",
                gap: "4px",
              },
            },
            children: [
              {
                type: "p",
                props: {
                  class: event.competitors.length == 0 ? "inter-regular-italic" : "barlow-bold",
                  style: {
                    margin: "0",
                    "font-size": "1.5rem",
                  },
                },
                children: [
                  {
                    type: "TEXT_NODE",
                    content:
                      event.competitors.length == 0
                        ? "Les épreuves ne sont pas encore définies"
                        : event.competitors
                            .reduce((acc, competitor) => acc + competitor.name + " vs ", "")
                            .slice(0, -4),
                  },
                ],
              },
              {
                type: "p",
                props: {
                  class: "inter-regular-italic",
                  style: {
                    margin: "0",
                    "font-size": "0.9rem",
                  },
                },
                children: [
                  {
                    type: "TEXT_NODE",
                    content: event.phaseName,
                  },
                ],
              },
            ],
          },
        ],
      })),
    };
  }

  if (detail == "images" && data.images)
    return {
      type: "div",
      props: {
        style: {
          padding: "20px",
          display: "grid",
          "grid-template-columns": "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "10px",
        },
      },
      children: data.images.items.map((image) => ({
        type: "img",
        props: {
          src: image.link,
          style: {
            width: "100%",
            height: "100%",
            border: "2px solid #342e46",
            "border-radius": "10px",
            "object-fit": "cover",
            "margin-top": "20px",
          },
        },
      })),
    };
}
