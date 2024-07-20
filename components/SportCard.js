// Carte qui affiche un sport, la date, le lieu et un logo
export const SportCard = function (sport, onClickLocation) {
  function mouseEnter(event) {
    event.target.style.transform = "scale(1.02)";
    event.target.style.boxShadow = "0px 0px 10px 5px #342E46";
  }

  function mouseLeave(event) {
    event.target.style.transform = "";
    event.target.style.boxShadow = "";
  }

  return {
    type: "article",
    events: {
      click: [
        (e) => {
          e.preventDefault();
          let path = `/event/${sport.sports}`;
          history.pushState(null, null, path);
        },
      ],
      mouseenter: [mouseEnter],
      mouseleave: [mouseLeave],
    },
    props: {
      style: {
        transition: "all 0.3s",
        cursor: "pointer",
        height: "100%",
        position: "relative",
        margin: "0 auto",
        "background-color": "#fff0da",
        color: "#342E46",
        overflow: "hidden",
        "text-align": "left",
        "border-radius": "2rem",
        padding: "1.5rem",
        "padding-right": "6rem",
        "max-width": "375px",
      },
    },
    children: [
      {
        type: "div",
        props: {
          style: {
            position: "relative",
            "z-index": "10",
          },
        },
        children: [
          {
            type: "h3",
            props: {
              style: {
                margin: "0",
                "font-size": "14px",
                "font-weight": "800",
                "text-overflow": "ellipsis",
                "white-space": "nowrap",
                overflow: "hidden",
              },
            },
            children: [
              {
                type: "TEXT_NODE",
                content: sport.sports.toUpperCase(),
              },
            ],
          },
          {
            type: "h1",
            class: "barlow-extrabold",
            props: {
              style: {
                "font-size": "32px",
                margin: "10px 0",
              },
            },
            children: [
              {
                type: "TEXT_NODE",
                content: getFormatedDate(sport.start_date),
              },
            ],
          },
          {
            type: "a",
            events: {
              click: [
                (e) => {
                  e.stopPropagation();
                  onClickLocation();
                },
              ],
            },
            children: [
              {
                type: "HTML_NODE",
                content:
                  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" heigh="24px" fill="currentColor"> <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" /> </svg>',
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
        ],
      },
      {
        type: "img",
        props: {
          style: {
            "object-fit": "contain",
            position: "absolute",
            opacity: "0.35",
            right: "-60px",
            bottom: "-80px",
          },
          width: "250px",
          height: "250px",
          src: getSportImage(sport.sports),
          alt: sport.sports,
        },
      },
    ],
  };
};

function getSportImage(sport) {
  const sportsImg = {
    "Football (FBL)": "Beach volleyball (Olympic).svg",
    "Para Triathlon (PTRI)": "Athletics (Olympic).svg",
    "Basketball fauteuil (PWBK)": "Basketball (Olympic).svg",
    "Athlétisme - arrivée Marathon (ATM), Cyclisme sur route - départ Contre-la-montre (CRD), Tir à l'arc (ARC)":
      "Archery (Olympic).svg",
    "Handball (HBL), Haltérophilie (WLF)": "Beach volleyball (Olympic).svg",
    "Volley-ball de plage (VBV)": "Beach volleyball (Olympic).svg",
    "Parc Urbain la Concorde (FCO)": "Artistic Gymnastics (Olympic).svg",
    "Basketball (BKB), Handball (HBL)": "Basketball (Olympic).svg",
    "Tennis de table (TTE)": "Badminton (Olympic).svg",
    "Aviron (ROW), Canoë - course en ligne (CSP)": "Canoe slalom (Olympic).svg",
    "Hockey (HOC)": "Artistic Gymnastics (Olympic).svg",
    "Cyclisme sur route - arrivée Contre-la-montre (CRD), Natation marathon (OWS), Triathlon (TRI)":
      "Cycling road (Olympic).svg",
    "Basketball (BKB), Gymnastique artistique (GAR), Gymnastique trampoline (GTR)": "Basketball (Olympic).svg",
    "Judo (JUD), Lutte (WRE)": "Boxing (Olympic).svg",
    "Badminton (BDM), Gymnastique rythmique (GRY)": "Badminton (Olympic).svg",
    "Escrime (FEN), Taekwondo (TKW)": "Boxing (Olympic).svg",
    "Boxe (BOX), Pentathlon moderne (MDN)": "Boxing (Olympic).svg",
    "Tennis (TEN), Boxe (BOX)": "Badminton (Olympic).svg",
    "Volley-ball (VVO)": "Beach volleyball (Olympic).svg",
    "Surf (SRF)": "Artistic swimming (Olympic).svg",
    "Sports équestres - dressage (EQD), Sports équestres - concours complet (EQE), Sports équestres - saut d'obstacles (EQJ), Pentathlon moderne (MPN)":
      "Equestrian dressage (Olympic).svg",
    "Sports équestres": "Equestrian dressage (Olympic).svg",
    "Canoë-kayak slalom (CSL)": "Canoe sprint (Olympic).svg",
    "Natation artistique (SWA)": "Artistic swimming (Olympic).svg",
    "Plongeon (DIV)": "Artistic swimming (Olympic).svg",
    "Water-polo (WPO)": "Artistic swimming (Olympic).svg",
    "Tir (SHO)": "Archery (Olympic).svg",
    "Skateboard (SKB)": "BMX freestyle (Olympic).svg",
    "Cyclisme VTT (MTB)": "BMX freestyle (Olympic).svg",
    "Voile (SAL)": "Canoe sprint (Olympic).svg",
    "Basketball 3x3 (BK3)": "3×3 Basketball (Olympic).svg",
    "Breaking (BKG)": "Breaking (Olympic).svg",
    "BMX freestyle (BMF)": "BMX freestyle (Olympic).svg",
    "Athlétisme marche (ATW)": "Athletics (Olympic).svg",
    "Cyclisme sur route - Course sur route (CRD)": "Cycling road (Olympic).svg",
    "Escalade (CLB)": "Cycling road (Olympic).svg",
    "Cyclisme sur piste (CTR)": "Cycling road (Olympic).svg",
    "Skateboard (SKB)": "BMX Racing (Olympic).svg",
    "Athlétisme (ATH)": "Athletics (Olympic).svg",
  };

  let image = sportsImg[sport];
  if (image === undefined) {
    Object.keys(sportsImg).forEach((key) => {
      if (sport.includes(key)) {
        image = sportsImg[key];
      }
    });
  }

  return image ? "./img/sports_logo/" + image : "./img/doubleP24_logo.png";
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

  const [year, month, day] = date.split(" ")[0].split("-");
  const formattedDate = `${daysOfWeek[new Date(date).getDay()]} ${day} ${months[month - 1]} ${year}`;

  return formattedDate;
}
