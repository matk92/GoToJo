import InteractiveMap from "../components/InteractiveMap.js";
import Spinner from "../components/Spinner.js";
import { BrowserLink } from "../core/BrowserRouter.js";
import DOMPlugin from "../core/DOMPlugin.js";
import MapPlugin from "../core/MapPlugin.js";
import Footer from "../sections/Footer.js";

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
                          "overflow": "hidden",
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
                                "du " +
                                getFormatedDate(data.sport.start_date) +
                                " au " +
                                getFormatedDate(data.sport.end_date),
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
                        src: getSportImage(data.sport.sports),
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
                SportDetails(data.sport, "informations"),
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

function getSportImage(sport) {
  const sportsImg = {
    "Football (FBL)": "Beach volleyball (Olympic) white.svg",
    "Para Triathlon (PTRI)": "Athletics (Olympic) white.svg",
    "Basketball fauteuil (PWBK)": "Basketball (Olympic) white.svg",
    "Athlétisme - arrivée Marathon (ATM), Cyclisme sur route - départ Contre-la-montre (CRD), Tir à l'arc (ARC)":
      "Archery (Olympic) white.svg",
    "Handball (HBL), Haltérophilie (WLF)": "Beach volleyball (Olympic) white.svg",
    "Volley-ball de plage (VBV)": "Beach volleyball (Olympic) white.svg",
    "Parc Urbain la Concorde (FCO)": "Artistic Gymnastics (Olympic) white.svg",
    "Basketball (BKB), Handball (HBL)": "Basketball (Olympic) white.svg",
    "Tennis de table (TTE)": "Badminton (Olympic) white.svg",
    "Aviron (ROW), Canoë - course en ligne (CSP)": "Canoe slalom (Olympic) white.svg",
    "Hockey (HOC)": "Artistic Gymnastics (Olympic) white.svg",
    "Cyclisme sur route - arrivée Contre-la-montre (CRD), Natation marathon (OWS), Triathlon (TRI)":
      "Cycling road (Olympic) white.svg",
    "Basketball (BKB), Gymnastique artistique (GAR), Gymnastique trampoline (GTR)": "Basketball (Olympic) white.svg",
    "Judo (JUD), Lutte (WRE)": "Boxing (Olympic) white.svg",
    "Badminton (BDM), Gymnastique rythmique (GRY)": "Badminton (Olympic) white.svg",
    "Escrime (FEN), Taekwondo (TKW)": "Boxing (Olympic) white.svg",
    "Boxe (BOX), Pentathlon moderne (MDN)": "Boxing (Olympic) white.svg",
    "Tennis (TEN), Boxe (BOX)": "Badminton (Olympic) white.svg",
    "Volley-ball (VVO)": "Beach volleyball (Olympic) white.svg",
    "Surf (SRF)": "Artistic swimming (Olympic) white.svg",
    "Sports équestres - dressage (EQD), Sports équestres - concours complet (EQE), Sports équestres - saut d'obstacles (EQJ), Pentathlon moderne (MPN)":
      "Equestrian dressage (Olympic) white.svg",
    "Sports équestres": "Equestrian dressage (Olympic) white.svg",
    "Canoë-kayak slalom (CSL)": "Canoe sprint (Olympic) white.svg",
    "Natation artistique (SWA)": "Artistic swimming (Olympic) white.svg",
    "Plongeon (DIV)": "Artistic swimming (Olympic) white.svg",
    "Water-polo (WPO)": "Artistic swimming (Olympic) white.svg",
    "Tir (SHO)": "Archery (Olympic) white.svg",
    "Skateboard (SKB)": "BMX freestyle (Olympic) white.svg",
    "Cyclisme VTT (MTB)": "BMX freestyle (Olympic) white.svg",
    "Voile (SAL)": "Canoe sprint (Olympic) white.svg",
    "Basketball 3x3 (BK3)": "3×3 Basketball (Olympic) white.svg",
    "Breaking (BKG)": "Breaking (Olympic) white.svg",
    "BMX freestyle (BMF)": "BMX freestyle (Olympic) white.svg",
    "Athlétisme marche (ATW)": "Athletics (Olympic) white.svg",
    "Cyclisme sur route - Course sur route (CRD)": "Cycling road (Olympic) white.svg",
    "Escalade (CLB)": "Cycling road (Olympic) white.svg",
    "Cyclisme sur piste (CTR)": "Cycling road (Olympic) white.svg",
    "Skateboard (SKB)": "BMX Racing (Olympic) white.svg",
    "Athlétisme (ATH)": "Athletics (Olympic) white.svg",
  };

  let image = sportsImg[sport];
  if (image === undefined) {
    Object.keys(sportsImg).forEach((key) => {
      if (sport.includes(key)) {
        image = sportsImg[key];
      }
    });
  }

  return image ? "../img/sports_logo/" + image : "../img/doubleP24_logo.png";
}

function getFormatedDate(date) {
  const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const [year, month, day] = date.split(" ")[0].split("-");
  const formattedDate = `${daysOfWeek[new Date(date).getDay()]} ${day} ${months[month - 1]} ${year}`;

  return formattedDate;
}

function SportDetails(sport, detail = "informations", data) {
  if (!data) {
    if (detail == "informations") {
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
  let tabs = ["Informations", "Images"].map((tab) => ({
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

  if (detail == "info") {
    console.log("informations");
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
