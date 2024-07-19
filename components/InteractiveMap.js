export default function InteractiveMap(map) {
 
  return {
    type: "div",
    props: {
      id: "map-and-iframe-container",
      style: {
        position: "sticky",
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
        type: "div",
        props: {
          style: {
            height: "100%",
            width: "100%",
            "z-index": "0",
          },
          id: "mapholder",
        },
      },
      {
        type: "button",
        props: {
          onclick: map.locateMe,
          id: "locateMe",
          style: {
            position: "absolute",
            right: "20px",
            bottom: "20px",
            border: "2px solid #f29d1d",
            "border-radius": "10px",
            padding: "8px 16px 8px 12px",
            background: "linear-gradient(to right, rgb(255, 174, 53), rgb(255, 217, 160))",
            color: "#543507",
            cursor: "pointer",
            "box-shadow": "0px 0px 10px 2px #736898",
            "font-size": "1rem",
            "font-weight": "bold",
            display: "flex",
            "z-index": "1000",
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
      {
        type: "script",
        props: {
          async: true,
          src: "https://unpkg.com/leaflet/dist/leaflet.js",
          onload: () => map.initMap(),
        },
      },
    ],
  };
}
