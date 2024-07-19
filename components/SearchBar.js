import DOMPlugin from "../core/DOMPlugin.js";

export default function SearchBar(map, eventsList = []) {
  const search = function (event) {
    let search = event.target.value;
    if (search.length < 2) {
      return DOMPlugin.reRender("search_results", searchResults());
    }

    let sports = eventsList.results.filter(
      (event) =>
        event.nom_site.toLowerCase().includes(search.toLowerCase()) ||
        event.sports.toLowerCase().includes(search.toLowerCase())
    );

    DOMPlugin.reRender("search_results", searchResults(sports, onClickSport));
  };

  const onClickSport = function (sport) {
    const element = document.getElementById("map-and-iframe-container");
    const offsetTop = 70; // adjust the offset value as needed
    window.scrollBy({
      top: element.getBoundingClientRect().top - offsetTop,
      behavior: "smooth",
    });
    map.showPosition(sport.point_geo.lat, sport.point_geo.lon, `<b>${sport.nom_site}</b><br>${sport.sports}`);
    // hide search results
    DOMPlugin.reRender("search_results", searchResults());
    document.getElementById("search_input").value = "";
  };

  return {
    type: "div",
    props: {
      id: "search-bar",
      style: {
        display: "flex",
        "z-index": "1000",
        "justify-content": "center",
        "align-items": "center",
        position: "relative",
        border: "1px solid #fff0da",
        "border-radius": "2rem",
        "padding-inline": "1rem",
        "max-width": "375px",
        margin: "0 auto",
      },
    },
    children: [
      {
        type: "input",
        props: {
          id: "search_input",
          oninput: search,
          type: "text",
          placeholder: "lieux, sports, événements...",
          style: {
            border: "none",
            "background-color": "transparent",
            "font-size": "1rem",
            width: "100%",
            padding: "0.75rem",
            color: "#fff0da",
            outlined: "none",
          },
        },
      },
      {
        type: "img",
        props: {
          src: "img/loupe.svg",
          alt: "Search",
        },
      },
      searchResults(),
    ],
  };
}

// Display search results
function searchResults(sports, onClickSport) {
  if (!sports) {
    return {
      type: "ul",
      props: {
        id: "search_results",
        style: {
          position: "absolute",
        },
      },
    };
  }

  return {
    type: "ul",
    props: {
      id: "search_results",
      style: {
        position: "absolute",
        right: "0.5rem",
        top: "100%",
        "background-color": "#fff0da",
        "border-radius": "0.5rem",
        "max-width": "375px",
        "max-height": "400px",
        "overflow-y": "auto",
        padding: "0.5rem",
      },
    },
    children:
      sports.length == 0
        ? [{ type: "li", children: [{ type: "TEXT_NODE", content: "Aucun résultat" }] }]
        : sports.map((sport) => ({
            type: "li",

            props: {
              onclick: (e) => onClickSport(sport),
              style: {
                "border-bottom": "1px solid #464158",
                padding: "0.5rem",
                display: "flex",
                "flex-direction": "column",
                "align-items": "flex-start",
              },
            },
            children: [
              {
                type: "a",
                props: {
                  style: {
                    color: "#464158",
                  },
                },
                children: [
                  {
                    type: "span",
                    props: {
                      class: "barlow-bold",
                      style: {
                        overflow: "hidden",
                        "text-overflow": "ellipsis",
                        "white-space": "nowrap",
                      },
                    },
                    children: [{ type: "TEXT_NODE", content: sport.sports }],
                  },
                ],
              },
              {
                type: "span",
                props: {
                  style: {
                    "margin-top": "4px",
                    color: "#464158",
                    "font-size": "0.8rem",
                    overflow: "hidden",
                    "text-overflow": "ellipsis",
                    "white-space": "nowrap",
                  },
                },
                children: [{ type: "TEXT_NODE", content: sport.start_date + "  " + sport.nom_site }],
              },
            ],
          })),
  };
}
