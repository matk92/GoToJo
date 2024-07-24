import Footer from "../sections/Footer.js";

export default function Medals() {
  return {
    head: [
      '<meta charset="UTF-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      "<title>Médailles</title>",
      '<link rel="stylesheet" href="../styles/medals.css">',
    ],
    type: "body",
    children: [
      {
        type: "div",
        props: {
          style: {
            width: "100%",
            display: "flex",
            "flex-direction": "column",
            "align-items": "center",
            padding: "0 20px",
            "margin": "0 auto",
            "max-width": "1200px",
            "text-align": "center",
            "margin-top": "20px",
            "min-height": "100vh",
          },
        },
        children: [
          {
            type: "h1",
            children: [
              {
                type: "TEXT_NODE",
                content: "Médailles",
              },
            ],
          },
          {
            type: "div",
            props: {
              style: {
                "font-size": "1.2em",
                color: "#76E1A7",
                "margin-bottom": "20px",
              },
            },
            children: [
              {
                type: "TEXT_NODE",
                content: "Jour 1 29/07",
              },
            ],
          },
          {
            type: "table",
            props: {
              style: {
                width: "100%",
                "border-collapse": "separate",
                "border-spacing": "0 29px",
              },
            },
            children: [
              {
                type: "thead",
                props: {
                  style: {
                    "background-color": "rgba(173, 163, 163, 0.158)",
                  },
                },
                children: [
                  {
                    type: "tr",
                    children: [
                      {
                        type: "th",
                        children: [
                          {
                            type: "TEXT_NODE",
                            content: "Position",
                          },
                        ],
                      },
                      {
                        type: "th",
                        children: [
                          {
                            type: "TEXT_NODE",
                            content: "Pays",
                          },
                        ],
                      },
                      {
                        type: "th",
                        children: [
                          {
                            type: "img",
                            props: {
                              src: "img/gold.png",
                              alt: "Gold",
                            },
                          },
                        ],
                      },
                      {
                        type: "th",
                        children: [
                          {
                            type: "img",
                            props: {
                              src: "img/silver.png",
                              alt: "Silver",
                            },
                          },
                        ],
                      },
                      {
                        type: "th",
                        children: [
                          {
                            type: "img",
                            props: {
                              src: "img/bronze.png",
                              alt: "Bronze",
                            },
                          },
                        ],
                      },
                      {
                        type: "th",
                        children: [
                          {
                            type: "TEXT_NODE",
                            content: "Total",
                          },
                        ],
                      },
                      {
                        type: "th",
                        children: [
                          {
                            type: "TEXT_NODE",
                            content: "Athlètes",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "tbody",
                children: [],
              },
            ],
          },
        ],
      },
      Footer(),
      {
        type: "script",
        props: {
          src: "../js/medals.js",
        },
      },
    ],
  };
}
