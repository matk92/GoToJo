import BrowserRouter from "./BrowserRouter.js";

const DOMPlugin = {
  render: function (rootElement, routes) {
    BrowserRouter.bind(this)(routes, rootElement);
  },
  validateStructure: function (structure) {
    Object.keys(structure).forEach((key) => {
      if (key === "type" && typeof structure[key] !== "string") {
        throw new Error(`Type of structure must be a string`);
      }
      if (key === "props" && typeof structure[key] !== "object") {
        throw new Error(`Props of structure must be an object`);
      }
      if (key === "children" && !Array.isArray(structure[key])) {
        throw new Error(`Children of structure must be an array`);
      }
      if (key === "events" && typeof structure[key] !== "object") {
        throw new Error(`Events of structure must be an object`);
      }
      if (key === "windowEvents" && typeof structure[key] !== "object") {
        throw new Error(`Window events of structure must be an object`);
      }
      if (key === "head" && !Array.isArray(structure[key])) {
        throw new Error(`Head of structure must be an array`);
      }
      if (key === "content" && typeof structure[key] !== "string") {
        throw new Error(`Content of structure must be a string`);
      }

      if (["children", "type", "props", "events", "windowEvents", "head", "content"].indexOf(key) === -1) {
        throw new Error(`Invalid key ${key} in structure`);
      }
    });
    return true;
  },
  renderStructure: function generateDom(structure) {
    this.validateStructure(structure);

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
          // subscribe to window popstate and remove event
          window.addEventListener("popstate", () => {
            window.removeEventListener(eventName, eventListeners);
          });
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
  reRender: async function (elementId, newStructure) {
    let element = document.getElementById(elementId);

    if (!element) {
      console.error(`Element with id ${elementId} not found`);
    }

    if (newStructure instanceof Promise) {
      newStructure.then((resolvedStructure) => element.replaceWith(this.renderStructure(resolvedStructure)));
    } else element.replaceWith(this.renderStructure(newStructure));
  },
};

export default DOMPlugin;
