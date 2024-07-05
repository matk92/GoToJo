import BrowserRouter from "../components/BrowserRouter.js";

const DOMPlugin = {
  render: function (rootElement, routes) {
    BrowserRouter.bind(this)(routes, rootElement);
  },
  renderStructure: function generateDom(structure) {
    let element;
    if (typeof structure.type === "string") {
      if (structure.type === "TEXT_NODE") {
        return document.createTextNode(structure.content);
      }
      if (structure.type === "HTML_NODE") {
        return document.createRange().createContextualFragment(structure.content);
      } else if (structure.type === "body") {
        element = document.body;
      } else {
        element = document.createElement(structure.type);
      }
    }

    if (structure.props) {
      for (const propName in structure.props) {
        if (propName === "style") {
          Object.assign(element.style, structure.props[propName]);
        } else if (propName.startsWith("data-")) {
          element.dataset[propName.replace("data-", "")] = structure.props[propName];
        }else if (propName.startsWith("on")){
          element[propName.toLowerCase()] = structure.props[propName];
        } else {
          element.setAttribute(propName, structure.props[propName]);
        }
      }
    }

    // Events of element
    if (structure.events) {
      for (const eventName in structure.events) {
        for (const eventListeners of structure.events[eventName]) {
          element.addEventListener(eventName, eventListeners);
        }
      }
    }

    // childrens of element
    if (structure.children) {
      for (const child of structure.children) {
        element.appendChild(this.renderStructure(child));
      }
    }

    // if structure has head then we add it to the head of the document
    if (structure.head) {
      for (const child of structure.head) {
        document.head.insertAdjacentHTML("beforeend", child);
      }
    }

    return element;
  },
};

export default DOMPlugin;
