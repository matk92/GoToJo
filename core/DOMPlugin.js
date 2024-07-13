import BrowserRouter from "./BrowserRouter.js";

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
        } else if (propName.startsWith("on")) {
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

    if (structure.windowEvents) {
      for (const eventName in structure.windowEvents) {
        for (const eventListeners of structure.windowEvents[eventName]) {
          window.addEventListener(eventName, eventListeners);
        }
      }
    }

    // childrens of element
    if (structure.children) {
      for (const child of structure.children) {
        if (child instanceof Promise) {
          child.then((resolvedChild) => element.appendChild(this.renderStructure(resolvedChild)));
        } else element.appendChild(this.renderStructure(child));
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
  reRender: async function (element, newStructure) {
    console.log(element, newStructure);
    if (newStructure instanceof Promise) {
      newStructure.then((resolvedStructure) => element.replaceWith(this.renderStructure(resolvedStructure)));
    } else element.replaceWith(this.renderStructure(newStructure));
  },
};

export default DOMPlugin;
