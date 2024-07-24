import Spinner from "../../components/Spinner.js";
import { formatDate, formatHours } from "../../core/DatesHelper.js";
import DOMPlugin from "../../core/DOMPlugin.js";

export default function SportMatches(sport, calendar) {
  if (calendar == undefined) {
    let codeSport = sport.sports.split("(")[1].split(")")[0];
    fetch("https://sph-s-api.olympics.com/summer/schedules/api/ENG/schedule/discipline/" + codeSport.toUpperCase())
      .then((response) => response.json())
      .then((calendar) => {
        DOMPlugin.reRender("sport_matches", SportMatches(sport, calendar.units));
      });
  }

  return {
    type: "ul",
    props: {
      id: "sport_matches",
      style: {
        "list-style-type": "none",
        padding: "0",
      },
    },
    children:
      calendar == undefined
        ? [Spinner()]
        : calendar.map((event) => ({
            type: "li",
            props: {
              style: {
                display: "flex",
                "align-items": "center",
                "background-color": "#342E46",
                color: "#fff0da",
                gap: "20px",
                "border-radius": "10px",
                padding: "16px",
                margin: "5px 0",
              },
            },
            children: [
              {
                type: "HTML_NODE",
                content:
                  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24px" heigh="24px" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" /></svg>',
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    "flex-direction": "column",
                    "align-items": "center",
                  },
                },
                children: [
                  {
                    type: "p",
                    props: {
                      class: "inter-light",
                      style: {
                        margin: "0",
                        "font-size": "0.85rem",
                      },
                    },
                    children: [
                      {
                        type: "TEXT_NODE",
                        content: formatDate(event.startDate),
                      },
                    ],
                  },
                  {
                    type: "p",
                    props: {
                      class: "inter-regular",
                      style: {
                        margin: "0",
                        "font-size": "0.9rem",
                      },
                    },
                    children: [
                      {
                        type: "TEXT_NODE",
                        content: formatHours(event.startDate) + " - " + formatHours(event.endDate),
                      },
                    ],
                  },
                ],
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    "border-left": "2px solid #fff0da",
                    "flex-grow": "1",
                    "padding-left": "10px",
                    "flex-direction": "column",
                    gap: "4px",
                  },
                },
                children: [
                  {
                    type: "p",
                    props: {
                      class: event.competitors.length == 0 ? "inter-light-italic" : "barlow-bold",
                      style: {
                        margin: "0",
                        "font-size": "1.5rem",
                      },
                    },
                    children: [
                      {
                        type: "TEXT_NODE",
                        content:
                          event.competitors.length == 0
                            ? "Les competiteurs ne sont pas encore définies"
                            : event.competitors
                                .reduce((acc, competitor) => acc + competitor.name + " vs ", "")
                                .slice(0, -4),
                      },
                    ],
                  },
                  {
                    type: "p",
                    props: {
                      class: "inter-regular",
                      style: {
                        margin: "0",
                        "font-size": "0.9rem",
                      },
                    },
                    children: [
                      {
                        type: "TEXT_NODE",
                        content: event.phaseName,
                      },
                    ],
                  },
                ],
              },
            ],
          })),
  };
}
