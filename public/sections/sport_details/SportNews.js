import Spinner from "../../components/Spinner.js";
import DOMPlugin from "../../core/DOMPlugin.js";
import { getSportNewsName } from "../../utils/SportsUtils.js";

export default function SportNews(sport, articles) {
  if (articles == undefined) {
    let sportName = getSportNewsName(sport.sports);

    fetch("https://olympics.com/fr/paris-2024/news-all/" + sportName)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const articles = doc.querySelectorAll('[data-cy="card-m"]');
        let data = [];
        articles.forEach((article) => {
          const title = article.querySelector('[data-cy="title"]').textContent;
          const articleUrl = article.querySelector('[data-cy="link"]').getAttribute("href");
          const imageUrl = article.querySelector("img").getAttribute("src");
          data.push({
            title: title,
            url: articleUrl,
            image: imageUrl,
          });
        });

        DOMPlugin.reRender("sport_news", SportNews(sport, data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return {
    type: "div",
    props: {
      id: "sport_news",
      style: {
        padding: "20px",
        display: "grid",
        "grid-template-columns": "repeat(auto-fill, minmax(340px, 1fr))",
        gap: "10px",
      },
    },
    children:
      articles == undefined
        ? [Spinner()]
        : articles.map((article) => ({
            type: "a",
            props: {
              href: article.url,
              target: "_blank",
              style: {
                display: "flex",
                "flex-direction": "column",
                "max-height": "400px",
                "max-width": "340px",
                "border-radius": "10px",
                "background-color": "#342E46",
                width: "100%",
                height: "100%",
                color: "#fff0da",
                "text-decoration": "none",
              },
            },
            children: [
              {
                type: "img",
                props: {
                  src: article.image,
                  style: {
                    width: "100%",
                    height: "200px",
                    "object-fit": "cover",
                    "border-radius": "10px",
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    padding: "14px",
                    "padding-bottom": "24px",
                  },
                },
                children: [
                  {
                    type: "h3",
                    props: {
                      class: "barlow-bold",
                      style: {
                        margin: "0",
                      },
                    },
                    children: [
                      {
                        type: "TEXT_NODE",
                        content: article.title,
                      },
                    ],
                  },
                ],
              },
            ],
          })),
  };
}
