import DOMPlugin from "../core/DOMPlugin.js";
import GoogleSearchInfo from "../sections/GoogleSearchInfo.js";

export default function InteractiveMap(map) {
  return {
    type: "div",
    props: {
      id: "map-and-iframe-container",
      style: {
        position: "sticky",
        display: "flex",
        width: "100%",
        height: "40vw",
        "border-radius": "22px",
        border: "4px solid #342E46",
        "background-color": "#342E46",
        overflow: "hidden",
        "box-shadow": "0px 0px 10px 2px #736898",
      },
    },
    children: [
      {
        type: "iframe",
        props: {
          id: "direction",
          style: {
            width: "35%",
            height: "100%",
          },
          src: "https://citymapper.com",
        },
      },
      GoogleSearchInfo(),
      {
        type: "div",
        props: {
          style: {
            height: "100%",
            width: "65%",
            "z-index": "0",
          },
          id: "mapholder",
        },
      },
      {
        type: "div",
        props: {
          style: {
            position: "absolute",
            right: "2%",
            width: "61%",
            bottom: "10px",
            display: "flex",
            "justify-content": "space-between",
            "align-items": "center",
            "z-index": "1000",
            gap: "20px",
          },
        },
        children: [
          Filters(map, map.showPoints),
          {
            type: "button",
            props: {
              onclick: map.locateMe,
              id: "locateMe",
              style: {
                border: "2px solid #f29d1d",
                "border-radius": "10px",
                padding: "8px 16px 8px 12px",
                background: "linear-gradient(to right, rgb(255, 174, 53), rgb(255, 217, 160))",
                color: "#543507",
                cursor: "pointer",
                "box-shadow": "0px 1px 8px 2px rgba(0, 0, 0, 0.3)",
                "font-size": "1rem",
                "font-weight": "bold",
                display: "flex",
                "align-items": "center",
              },
            },
            children: [
              {
                type: "HTML_NODE",
                content:
                  '<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="currentColor"> <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" /> </svg>',
              },
              {
                type: "p",
                props: {
                  style: {
                    "margin-left": "10px",
                    "white-space": "nowrap",
                  },
                },
                children: [
                  {
                    type: "TEXT_NODE",
                    content: "Me localiser",
                  },
                ],
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
          onload: () => {
            map.initMap();
          },
        },
      },
    ],
  };
}

function Filters(map, showPoints) {
  const bulletsItems = {
    Événements: "red_dot.svg",
    Boutiques: "cyan_dot.svg",
    Spots: "green_dot.svg",
  };

  return {
    type: "div",
    props: {
      id: "filters",
      style: {
        display: "flex",
        "flex-direction": "column",
        "background-color": "#fafafa",
        "box-shadow": "0px 1px 8px 2px rgba(0, 0, 0, 0.3)",
        color: "#342E46",
        padding: "10px",
        gap: "5px",
        "border-radius": "10px",
      },
    },
    children: Object.keys(bulletsItems).map((key) => ({
      type: "div",
      events: {
        click: [
          () => {
            showPoints = showPoints.includes(key) ? showPoints.filter((point) => point !== key) : [...showPoints, key];
            map.filterMarkers(showPoints);

            DOMPlugin.reRender("filters", Filters(map, showPoints));
          },
        ],
      },
      props: {
        style: {
          display: "flex",
          "align-items": "center",
          cursor: "pointer",
          gap: "5px",
        },
      },
      children: [
        {
          type: "img",
          props: {
            src: "/img/" + bulletsItems[key],
            style: {
              width: "14px",
              height: "14px",
            },
          },
        },
        {
          type: "p",
          props: {
            style: {
              margin: "0",
              "font-size": "0.75rem",
              "font-weight": showPoints.includes(key) ? "bold" : "normal",
              "text-decoration": showPoints.includes(key) ? "none" : "line-through",
            },
          },
          children: [
            {
              type: "TEXT_NODE",
              content: key,
            },
          ],
        },
      ],
    })),
  };
}
