const BrowserRouter = function (routes, rootElement) {
  const generatePage = () => {
    const path = location.pathname;
    const structure = routes[path] ?? routes["*"];

    if (rootElement.childNodes.length) {
      rootElement.replaceChild(this.renderStructure(structure), rootElement.childNodes[0]);
    } else rootElement.appendChild(this.renderStructure(structure));
  };

  generatePage();

  const oldPushState = history.pushState;
  history.pushState = function (state, title, url) {
    oldPushState.call(history, state, title, url);
    window.dispatchEvent(new Event("popstate"));
  };

  window.onpopstate = generatePage;
};

export const BrowserLink = function (props) {
  return {
    type: "a",
    props: {
      href: props.path,
      style: {
        color: "#0078D0",
        "text-decoration": "underline",
        cursor: "pointer",
      },
    },
    events: {
      onclick: [
        function (event) {
          event.preventDefault();
          history.pushState(null, null, props.path);
        },
      ],
    },
    children: [
      {
        type: "TEXT_NODE",
        content: props.title,
      },
    ],
  };
};

export default BrowserRouter;
