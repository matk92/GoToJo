import { BrowserLink } from "../core/BrowserRouter.js";

export default function Page404() {
  return {
    head: ["<title>Page non trouvée</title>"],
    type: "div",
    children: [
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          },
        },
        children: [
          {
            type: "img",
            props: {
              width: "169.5px", // 226px * 0.75 = 169.5px
              height: "46.5px", // 62px * 0.75 = 46.5px
              src: "/img/LogoGoToJo.png",
              alt: "img logo",
            },
          },
          {
            type: "h1",
            props: {
              class: "barlow-bold",
              style: {
                "font-size": "3rem",
              },
            },
            children: [
              {
                type: "TEXT_NODE",
                content: "Page non trouvée",
              },
            ],
          },
          {
            type: "br",
          },
          BrowserLink({ title: "Retourner à la page d'accueil", path: "/" }),
        ],
      },
    ],
  };
}
