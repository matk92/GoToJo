export default function Footer() {
  return {
    type: "footer",
    id: "footer",
    props: {
      style: {
        color: "#f5f5f5",
        "background-color": "#2d2b46",
        "text-align": "center",
        padding: "20px 40px",
      },
    },
    children: [
      {
        type: "hr",
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            "justify-content": "space-between",
            "align-items": "center",
            gap: "10px",
            margin: "20px",
          },
        },
        children: [
          {
            type: "img",
            props: {
              style: {
                "object-fit": "contain",
              },
              width: "200px",
              src: "./img/LogoGoToJo.png",
              alt: "logo",
            },
          },
          {
            type: "p",
            props: {
              style: {
                "font-size": "0.8rem",
              },
            },
            children: [
              {
                type: "TEXT_NODE",
                content: "© 2024 GoToJo. All rights reserved",
              },
            ],
          },
        ],
      },
    ],
  };
}
