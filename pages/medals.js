export default {
    head: [
      '<meta charset="UTF-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '<title>Médailles</title>',
      '<link rel="stylesheet" href="../styles/medals.css">',
    ],
    type: "body",
    children: [
      {
        type: "div",
        props: {
          class: "container",
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
              class: "date",
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
            children: [
              {
                type: "thead",
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
      {
        type: "footer",
        children: [
          {
            type: "p",
            children: [
              {
                type: "TEXT_NODE",
                content: "Politique des cookies | Politique des cookies | Politique des cookies | Politique des cookies",
              },
            ],
          },
        ],
      },
      {
        type: "script",
        props: {
          src: "../js/medals.js",
        },
      },
    ],
  };
  