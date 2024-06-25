import page1 from "../pages/page1.js";
import page2 from "../pages/page2.js";
import landing from "../pages/landing.js";
import home from "../pages/home.js";
import medals from "../pages/medals.js";
import calendar from "../pages/calendar.js";
//import Page404 from '../pages/Page404.js';

export default {
  "/": home,
  "/landing": landing,
  "/calendar": calendar,
  "/medals": medals,
  "/page1": page1,
  "/page2": page2,
  //"*": Page404,
};
