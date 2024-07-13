export default function Header() {
  function onScroll() {
    const imgParisBanner = document.getElementById("imgParisBanner");
    const scrollValue = window.scrollY;
    imgParisBanner.style.top = `${scrollValue * 0.2}px`;
    const textBanner = document.getElementById("textBanner");
    textBanner.style.transform = `scale(${1 - scrollValue * 0.001}) translateY(${1 - scrollValue * 0.6}px)`;
  }

  return {
    type: "header",
    windowEvents: {
      scroll: [onScroll],
    },
    props: {
      style: {
        position: "fixed",
        width: "100%",
        top: "-10vh",
        zIndex: "-10",
        height: "45vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    children: [
      {
        type: "img",
        props: {
          id: "imgParisBanner",
          src: "img/banner-image.jpg",
          alt: "Bannière des Jeux Olympiques",
          style: {
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            zIndex: "-10",
            "object-fit": "cover",
            position: "absolute",
          },
        },
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            width: "100%",
            height: "100%",
            width: "100%",
            margin: "20px auto",
            background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.7), rgba(0,0,0,0.5), transparent)",
          },
        },
        children: [
          {
            type: "div",
            props: {
              id: "textBanner",
              style: {
                margin: "20px auto",
                "text-align": "center",
              },
            },
            children: [
              {
                type: "img",
                props: {
                  width: "169.5px", // 226px * 0.75 = 169.5px
                  height: "46.5px", // 62px * 0.75 = 46.5px
                  src: "img/LogoGoToJo.png",
                  alt: "img logo",
                },
              },
              {
                type: "h1",
                props: {
                  class: "barlow-extrabold",
                  style: {
                    fontSize: "48px",
                    margin: "0",
                    "max-width": "650px",
                    background: "linear-gradient(to right, #ffae35, #ffd9a0)",
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": "transparent",
                  },
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
  };
}
