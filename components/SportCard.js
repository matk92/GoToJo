// Carte qui affiche un sport, la date, le lieu et un logo
export const SportCard = function (sport) {
  return {
    type: "div",
    props: {
      class: "sport-card",
    },
    children: [
      {
        type: "h3",
        children: [
          {
            type: "TEXT_NODE",
            content: sport.sports.toUpperCase(),
          },
        ],
      },
      {
        type: "h1",
        children: [
          {
            type: "TEXT_NODE",
            content: getFormatedDate(sport.start_date),
          },
        ],
      },
      {
        type: "a",
        props: {
          class: "location",
        },
        children: [
          {
            type: "HTML_NODE",
            content:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"> <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" /> </svg>',
          },
          {
            type: "span",
            children: [
              {
                type: "TEXT_NODE",
                content: sport.nom_site,
              },
            ],
          },
        ],
      },
      {
        type: "svg",
        props: {
          class: "logo-sport",
          src: getSportImage(sport.sports),
          alt: sport.sports,
        },
      },
    ],
  };
};

function getSportImage(sport) {
    console.log(sport)
    const sportsImg = {
        "Football (FBL)": "./img/Cycling road (Olympic).svg",
    };

    return sportsImg[sport.sports] || "./img/football.svg";
}

function getFormatedDate(date) {
  const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const [year, month, day] = date.split(' ')[0].split("-");
  const formattedDate = `${daysOfWeek[new Date(date).getDay()]} ${day} ${months[month - 1]} ${year}`;

  return formattedDate;
}
