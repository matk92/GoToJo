import DOMPlugin from "../../core/DOMPlugin.js";
import SportImages from "./SportImages.js";
import SportMatches from "./SportMatches.js";
import SportNews from "./SportNews.js";

export default function SportDetails(sport, detail = "calendrier") {

  return {
    type: "div",
    props: {
      id: "sport_details",
      style: {
        "max-width": "1200px",
        margin: "20px auto",
      },
    },
    children: [
      getDetailsTitles(detail, (tab) => DOMPlugin.reRender("sport_details", SportDetails(sport, tab))),
      {
        type: "hr",
        props: {
          style: {
            width: "100%",
            opacity: "0.5",
            margin: "5px 0",
          },
        },
      },
      getDetailSection(detail, sport),
    ],
  };
}

function getDetailsTitles(detail, onclick) {
  const tabs = ["Calendrier", "Actualités", "Images"].map((tab) => ({
    type: "button",
    props: {
      style: {
        "background-color": "transparent",
        color: "#fff0da",
        border: detail == tab.toLowerCase() ? "2px solid #fff0da" : "none",
        "border-radius": "10px",
        padding: "8px 16px",
        cursor: "pointer",
        opacity: detail == tab.toLowerCase() ? "1" : "0.75",
        "font-size": detail == tab.toLowerCase() ? "1.25rem" : "1rem",
        "font-weight": "bold",
      },
      onclick: (e) => {
        e.stopPropagation();
        onclick(tab.toLocaleLowerCase());
      },
    },
    children: [
      {
        type: "TEXT_NODE",
        content: tab,
      },
    ],
  }));

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        "align-items": "center",
        gap: "10px",
      },
    },
    children: tabs,
  };
}

function getDetailSection(detail, sport) {
  if (sport == undefined) {
    return Spinner();
  }

  // Evenements
  if (detail == "calendrier") {
    return SportMatches(sport);
  }

  if (detail == "actualités") {
    return SportNews(sport);
  }

  if (detail == "images") {
    return SportImages(sport);
  }

  return {
    type: "p",
    props: {
      style: {
        padding: "20px",
        "text-align": "center",
      },
    },
    children: [
      {
        type: "TEXT_NODE",
        content: "Impossible de recuperer les informations",
      },
    ],
  };
}
