const BrowserRouter = function (routes, rootElement) {
  const generatePage = () => {
    const path = location.pathname;
    let structure = routes[path];
    let params = {};

    if (structure == undefined) {
      let match = false;
      Object.keys(routes).forEach((route) => {
        if (!match && route.includes("{") && route.includes("}")) {
          for (const route of Object.keys(routes)) {
            const routeParamsMatch = route.match(/{(.*?)}/g);

            if (routeParamsMatch) {
              const routeParamsKeys = routeParamsMatch.map((param) => param.replace(/[{}]/g, ""));
              const routeRegex = new RegExp(`^${route.replace(/{(.*?)}/g, "(.*?)")}$`);
              const match = path.match(routeRegex);

              if (match) {
                params = routeParamsKeys.reduce((acc, key, index) => {
                  acc[key] = match[index + 1].replaceAll("%20", " ");
                  return acc;
                }, {});

                structure = routes[route];
                break;
              }
            }
          }
        }
      });
    }

    // Si on trouve pas de route correspondante, par default c'est *
    if (structure == undefined) {
      structure = routes["*"];
    }

    if (rootElement.childNodes.length > 0) {
      rootElement.replaceChild(this.renderStructure(structure(params)), rootElement.childNodes[0]);
    } else rootElement.appendChild(this.renderStructure(structure(params)));
  };

  const oldPushState = history.pushState;
  history.pushState = function (state, title, url) {
    oldPushState.call(history, state, title, url);
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo(0, 0);
  };

  window.onpopstate = generatePage;
  generatePage();
};

export const BrowserLink = function (props) {
  return {
    type: "a",
    props: {
      href: props.path,
      style: {
        color: props.color || "#0078D0",
        "text-decoration": "underline",
        cursor: "pointer",
        "margin-left": "10px",
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
