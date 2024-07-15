export default function SearchBar(eventsList) {
  function onSearch(event) {
    let search = event.target.value;
    console.log(search);
  }

  return {
    type: "div",
    id: "search-bar",
    props: {
      style: {
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        position: "relative",
        border: "1px solid #fff0da",
        "border-radius": "2rem",
        "padding-inline": "1rem",
        "max-width": "375px",
        margin: "0 auto",
      },
    },
    children: [
      {
        type: "input",
        props: {
          oninput: onSearch,
          type: "text",
          placeholder: "lieux, sports, événements...",
          style: {
            border: "none",
            "background-color": "transparent",
            "font-size": "1rem",
            width: "100%",
            padding: "0.75rem",
            color: "#fff0da",
            outlined: "none",
          },
        },
      },
      {
        type: "img",
        props: {
          src: "img/loupe.svg",
          alt: "Search",
        },
      },
    ],
  };
}
