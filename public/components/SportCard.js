import { formatDate } from "../core/DatesHelper.js";
import getSportImage from "../utils/SportsUtils.js";

// Carte qui affiche un sport, la date, le lieu et un logo
export const SportCard = function (sport, onClickLocation) {
  function mouseEnter(event) {
    event.target.style.transform = "scale(1.02)";
    event.target.style.boxShadow = "0px 0px 10px 5px #342E46";
  }

  function mouseLeave(event) {
    event.target.style.transform = "";
    event.target.style.boxShadow = "";
  }

  return {
    type: "article",
    events: {
      click: [
        (e) => {
          e.preventDefault();
          let path = `/event/${sport.sports}`;
          history.pushState(null, null, path);
        },
      ],
      mouseenter: [mouseEnter],
      mouseleave: [mouseLeave],
    },
    props: {
      style: {
        transition: "all 0.3s",
        cursor: "pointer",
        height: "100%",
        width: "100%",
        position: "relative",
        margin: "0 auto",
        "background-color": "#fff0da",
        color: "#342E46",
        overflow: "hidden",
        "text-align": "left",
        "border-radius": "2rem",
        padding: "1.5rem",
        "padding-right": "4.5rem",
        "max-width": "375px",
      },
    },
    children: [
      {
        type: "div",
        props: {
          style: {
            position: "relative",
            "z-index": "10",
          },
        },
        children: [
          {
            type: "h3",
            props: {
              style: {
                margin: "0",
                "font-size": "14px",
                "font-weight": "600",
                "text-overflow": "ellipsis",
                "white-space": "nowrap",
                overflow: "hidden",
              },
            },
            children: [
              {
                type: "TEXT_NODE",
                content: "du " + formatDate(sport.start_date) + " au " + formatDate(sport.end_date),
              },
            ],
          },
          {
            type: "h1",
            props: {
              class: "barlow-extrabold",
              style: {
                "font-size": "28px",
                margin: "10px 0",
                "text-overflow": "ellipsis",
                overflow: "hidden",
                height: "6.5rem",
              },
            },
            children: [
              {
                type: "TEXT_NODE",
                content: sport.sports.split(",")[0],
              },
            ],
          },
          {
            type: "a",
            events: {
              click: [
                (e) => {
                  e.stopPropagation();
                  onClickLocation();
                },
              ],
            },
            children: [
              {
                type: "HTML_NODE",
                content:
                  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" heigh="24px" fill="currentColor"> <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" /> </svg>',
              },
              {
                type: "span",
                children: [
                  {
                    type: "TEXT_NODE",
                    content: sport.nom_site,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "img",
        props: {
          style: {
            "object-fit": "contain",
            position: "absolute",
            opacity: "0.25",
            right: "-60px",
            bottom: "-80px",
          },
          width: "250px",
          height: "250px",
          src: "./img/sports_logo/" + getSportImage(sport.sports),
          alt: sport.sports,
        },
      },
    ],
  };
};
