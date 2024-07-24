export default function Spinner() {
  return {
    type: "div",
    props: {
      style: {
        "margin-top": "50px",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        "flex-direction": "column",
        padding: "40px",
        width: "fit-content",
        margin: "0 auto",
      },
    },
    children: [
      {
        type: "div",
        props: {
          class: "spinner",
        },
      },
      {
        type: "p",
        props: {
          class: "inter-italic",
        },
        children: [
          {
            type: "TEXT_NODE",
            content: "chargement...",
          },
        ],
      },
    ],
  };
}
