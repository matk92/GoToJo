import { SportCard } from "../components/SportCard.js";

async function SportsList() {
  const url =
    "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?limit=9";

  let data = await fetch(url).then((response) => response.json());

  let eventsList = data.results.map((sport) => {
    return SportCard(sport);
  });

  return eventsList;
}

export default {
  head: [
    "<title>Jeux Olympiques 2024</title>",
    '<link rel="stylesheet" href="styles/test.css" />',
    '<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />',
  ],
  type: "body",
  children: [
    {
      type: "header",
      children: [
        {
          type: "div",
          props: {
            class: "banner",
          },
          children: [
            {
              type: "img",
              props: {
                id: "imgParisBanner",
                src: "img/banner-image.jpg",
                alt: "Bannière des Jeux Olympiques",
              },
            },
            {
              type: "div",
              props: {
                class: "logo-text-container",
              },
              children: [
                {
                  type: "img",
                  props: {
                    width: "113px",
                    height: "31px",
                    src: "img/LogoGoToJo.png",
                    alt: "img logo",
                  },
                },
                {
                  type: "h1",
                  props: {
                    class: "barlow-extrabold",
                  },
                  children: [
                    {
                      type: "TEXT_NODE",
                      content: "Les meilleurs spots pour les jeux olympiques 2024",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "main",
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
        {
          type: "div",
          props: {
            class: "col-center",
          },
          children: [
            {
              type: "h2",
              children: [
                {
                  type: "TEXT_NODE",
                  content: "Prochains événements",
                },
              ],
            },
            {
              type: "p",
              children: [
                {
                  type: "TEXT_NODE",
                  content: "Trouvez les meilleurs événements près de chez vous",
                },
              ],
            },
          ],
        },
        {
          type: "div",
          head: ['<link rel="stylesheet" href="styles/sportCard.css" />'],
          props: {
            class: "events-list",
          },
          children: await SportsList(),
        },
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
