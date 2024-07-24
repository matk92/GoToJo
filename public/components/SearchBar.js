import DOMPlugin from "../core/DOMPlugin.js";

export default function SearchBar(map, eventsList = []) {
  const search = function (event) {
    let search = event.target.value;
    if (search.length < 2) {
      return DOMPlugin.reRender("search_results", searchResults());
    }

    let events = eventsList.filter(
      (event) =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.label.toLowerCase().includes(search.toLowerCase())
    );

    DOMPlugin.reRender("search_results", searchResults(events, onClickEvent));
  };

  const onClickEvent = function (event) {
    const element = document.getElementById("map-and-iframe-container");
    const offsetTop = 70; // adjust the offset value as needed
    window.scrollBy({
      top: element.getBoundingClientRect().top - offsetTop,
      behavior: "smooth",
    });
    map.showPosition(event.latitude, event.longitude, event.title, event.label, event.link);
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
        margin: "0 auto",
      },
    },
    children: [
      {
        type: "input",
        events: {
          keydown: [
            (e) => {
              if (e.keyCode === 13) {
                map.onSearch(e.target.value);
                DOMPlugin.reRender("search_results", searchResults());
              }
            },
          ],
        },
        props: {
          id: "search_input",
          oninput: search,
          type: "text",
          placeholder: "lieux, sports, boutiques...",
          style: {
            border: "none",
            "background-color": "transparent",
            "font-size": "1rem",
            width: "275px",
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
function searchResults(events, onClickEvent) {
  if (!events) {
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
      events.length == 0
        ? [
            {
              type: "li",
              props: {
                class: "inter",
                style: {
                  padding: "20px",
                  width: "100%",
                  "text-align": "center",
                  color: "#464158",
                },
              },
              children: [
                { type: "p", children: [{ type: "TEXT_NODE", content: "Aucun propostion trouvée" }] },
                {
                  type: "p",
                  props: {
                    class: "inter-light-italic",
                    style: {
                      opacity: "0.9",
                      "margin-top": "0.5rem",
                      "font-size": "0.8rem",
                    },
                  },
                  children: [{ type: "TEXT_NODE", content: "presser 'entrée' pour rechercher" }],
                },
              ],
            },
          ]
        : events.map((event) => ({
            type: "li",

            props: {
              onclick: (e) => onClickEvent(event),
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
                    children: [{ type: "TEXT_NODE", content: event.title }],
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
                children: [{ type: "TEXT_NODE", content: event.label }],
              },
            ],
          })),
  };
}
