import Header from "../sections/Header.js";
import SportsList from "../sections/SportsList.js";

export default function Home() {
  return {
    head: [
      "<title>Jeux Olympiques 2024</title>",
      '<link rel="stylesheet" href="styles/test.css" />',
      '<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />',
    ],
    type: "body",
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
            "background-color": "#464158",
            padding: "20px 120px",
          },
        },
        children: [
          {
            type: "div",
            props: {
              class: "filters",
            },
            children: [
              {
                type: "h1",
                children: [
                  {
                    type: "TEXT_NODE",
                    content: "Carte Interactive",
                  },
                ],
              },
              {
                type: "div",
                props: {
                  class: "search-bar",
                },
                children: [
                  {
                    type: "input",
                    props: {
                      type: "text",
                      id: "location",
                      placeholder: "lieux, sports",
                    },
                  },
                  {
                    type: "button",
                    props: {
                      type: "submit",
                    },
                    children: [
                      {
                        type: "img",
                        props: {
                          src: "img/loupe.svg",
                          alt: "Search",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "div",
            props: {
              class: "map-and-iframe-container",
            },
            children: [
              {
                type: "iframe",
                props: {
                  id: "direction",
                  src: "https://citymapper.com",
                },
              },
              {
                type: "div",
                props: {
                  class: "mapholder",
                  id: "mapholder",
                },
              },
              {
                type: "button",
                props: {
                  id: "locateMe",
                  class: "locationButton",
                },
                children: [
                  {
                    type: "HTML_NODE",
                    content:
                      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"> <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" /> </svg>',
                  },
                  {
                    type: "TEXT_NODE",
                    content: "Locate me",
                  },
                ],
              },
            ],
          },
          {
            type: "script",
            props: {
              async: true,
              src: "https://unpkg.com/leaflet/dist/leaflet.js",
              onload: function () {
                let script = document.createElement("script");
                script.src = "js/map.js";
                script.type = "module";
                document.head.appendChild(script);
              },
            },
          },
          {
            type: "section",
            props: {
              class: "events-section",
            },
            children: [
              {
                type: "div",
                props: {
                  class: "events-filters",
                },
                children: [
                  {
                    type: "button",
                    children: [
                      {
                        type: "TEXT_NODE",
                        content: "Basketball",
                      },
                    ],
                  },
                  {
                    type: "button",
                    children: [
                      {
                        type: "TEXT_NODE",
                        content: "Rugby",
                      },
                    ],
                  },
                  {
                    type: "button",
                    children: [
                      {
                        type: "TEXT_NODE",
                        content: "Natation",
                      },
                    ],
                  },
                  {
                    type: "button",
                    children: [
                      {
                        type: "TEXT_NODE",
                        content: "Tennis",
                      },
                    ],
                  },
                  {
                    type: "button",
                    children: [
                      {
                        type: "TEXT_NODE",
                        content: "Athlétisme",
                      },
                    ],
                  },
                  {
                    type: "button",
                    children: [
                      {
                        type: "TEXT_NODE",
                        content: "Volleyball",
                      },
                    ],
                  },
                  {
                    type: "button",
                    children: [
                      {
                        type: "TEXT_NODE",
                        content: "Handball",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          SportsList()
        ],
      },
      {
        type: "footer",
        children: [
          {
            type: "p",
            children: [
              {
                type: "TEXT_NODE",
                content: "Politique des cookies",
              },
            ],
          },
        ],
      },
    ],
  };
}
