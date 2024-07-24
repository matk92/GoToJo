import landing from "../pages/landing.js";
import Home from "../pages/home.js";
import Medals from "../pages/medals.js";
import Calendar from "../pages/calendar.js";
import Page404 from '../pages/Page404.js';
import Sport from "../pages/sport.js";

export default {
  "/": Home,
  "/event/{name}": Sport,
  // "/landing": landing,
  "/calendar": Calendar,
  "/medals": Medals,
  "*": Page404,
};
