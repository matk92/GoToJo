
export default {
  type: "div",
  children: [
    {
      type: "div",
      props: {
        class: "scrollDist",
      },
    },
    {
      type: "div",
      props: {
        class: "main",
      },
      children: [
        {
          type: "svg",
          props: {
            viewBox: "0 0 1200 800",
            xmlns: "http://www.w3.org/2000/svg",
          },
          children: [
            {
              type: "mask",
              props: {
                id: "m",
              },
              children: [
                {
                  type: "g",
                  props: {
                    class: "cloud1",
                  },
                  children: [
                    {
                      type: "rect",
                      props: {
                        fill: "#fff",
                        width: "100%",
                        height: "801",
                        y: "799",
                      },
                    },
                    {
                      type: "image",
                      props: {
                        src: "img/cloud1Mask.jpg",
                        width: "1200",
                        height: "800",
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: "image",
              props: {
                class: "sky",
                src: "img/sky.jpg",
                width: "1200",
                height: "590",
              },
            },
            {
              type: "image",
              props: {
                class: "mountBg",
                href: "img/paris.jpg",
                width: "1200",
                height: "800",
              },
            },
            {
              type: "image",
              props: {
                class: "cloud4",
                href: "img/cloud4.png",
                width: "1200",
                height: "800",
              },
            },
            {
              type: "image",
              props: {
                class: "cloud2",
                href: "img/cloud2.png",
                width: "1200",
                height: "800",
              },
            },
            {
              type: "image",
              props: {
                class: "cloud1",
                href: "img/cloud1.png",
                width: "1200",
                height: "800",
              },
            },
            {
              type: "image",
              props: {
                class: "cloud3",
                href: "img/cloud3.png",
                width: "1200",
                height: "800",
              },
            },
            {
              type: "text",
              props: {
                class: "explore-text",
                fill: "#fff",
                x: "420",
                y: "200",
              },
              children: [
                {
                  type: "TEXT_NODE",
                  content: "GoToJo",
                },
                {
                  type: "polyline",
                  props: {
                    class: "arrow",
                    fill: "#fff",
                    points: "599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250",
                  },
                },
                {
                  type: "g",
                  props: {
                    mask: "url(#m)",
                  },
                  children: [
                    {
                      type: "rect",
                      props: {
                        fill: "#fff",
                        width: "100%",
                        height: "100%",
                      },
                    },
                    {
                      type: "text",
                      props: {
                        x: "300",
                        y: "200",
                        fill: "#162a43",
                      },
                      children: [
                        {
                          type: "TEXT_NODE",
                          content: "BIENVENUE",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "rect",
                  props: {
                    id: "arrowBtn",
                    width: "100",
                    height: "100",
                    opacity: "0",
                    x: "550",
                    y: "220",
                    style: { cursor: "pointer" },
                  },
                },
              ],
            },
          ],
        },
        {
          type: "script",
          props: {
            src: "js/scroll.js",
          },
        },
      ],
    },
  ],
};
