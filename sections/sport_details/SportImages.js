import Spinner from "../../components/Spinner.js";
import DOMPlugin from "../../core/DOMPlugin.js";

export default function SportImages(sport, images) {
  if (images == undefined) {
    const encodedName = encodeURIComponent(sport.nom_site);
    // AIzaSyCHzRzxCzN42920CeHDKr1oLnTKciqDIpU
    // AIzaSyA3PYeK4r1vnaCPqQ7hC4a9XjGmfqg_4_0
    fetch(
      "https://www.googleapis.com/customsearch/v1?key=AIzaSyCHzRzxCzN42920CeHDKr1oLnTKciqDIpU&cx=639a89b0e9e4343b0&q=" +
        encodedName +
        "&searchType=image"
    )
      .then((response) => response.json())
      .then((images) => {
        DOMPlugin.reRender("sport_images", SportImages(sport, images.items));
      });
  }
  return {
    type: "div",
    props: {
      id: "sport_images",
      style: {
        padding: "20px",
        display: "grid",
        "grid-template-columns": "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "10px",
      },
    },
    children:
      images == undefined
        ? [Spinner()]
        : images.map((image) => ({
            type: "img",
            props: {
              src: image.link,
              style: {
                width: "100%",
                height: "100%",
                border: "2px solid #342e46",
                "border-radius": "10px",
                "object-fit": "cover",
                "margin-top": "20px",
              },
            },
          })),
  };
}
