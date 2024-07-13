import landing from "../pages/landing.js";
import Home from "../pages/home.js";
import medals from "../pages/medals.js";
import calendar from "../pages/calendar.js";
import Page404 from '../pages/Page404.js';

export default {
  "/": Home(),
  "/landing": landing,
  "/calendar": calendar,
  "/medals": medals,
  "*": Page404(),
};
