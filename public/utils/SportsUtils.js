export default function getSportImage(sport, white = false) {
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
    Badminton: "Badminton (Olympic).svg",
    Handball: "Beach volleyball (Olympic).svg",
    Rowing: "Canoe slalom (Olympic).svg",
    Shooting: "Archery (Olympic).svg",
    Volleyball: "Beach volleyball (Olympic).svg",
    Equestrian: "Equestrian dressage (Olympic).svg",
    Fencing: "Boxing (Olympic).svg",
    Hockey: "Artistic Gymnastics (Olympic).svg",
    Judo: "Boxing (Olympic).svg",
    "Artistic Gymnastic": "Artistic Gymnastics (Olympic).svg",
    Basketball: "Basketball (Olympic).svg",
    Diving: "Artistic swimming (Olympic).svg",
    Swimming: "Artistic swimming (Olympic).svg",
    Skateboarding: "BMX freestyle (Olympic).svg",
    Tennis: "Badminton (Olympic).svg",
    "Beach Volleyball": "Beach volleyball (Olympic).svg",
    "Water Polo": "Artistic swimming (Olympic).svg",
    "Cycling Road": "Cycling road (Olympic).svg",
    "Rugby Sevens": "Beach volleyball (Olympic).svg",
    "Canoe Slalom": "Canoe slalom (Olympic).svg",
    Football: "Beach volleyball (Olympic).svg",
    "Table Tennis": "Badminton (Olympic).svg",
    Boxing: "Boxing (Olympic).svg",
    Surfing: "Artistic swimming (Olympic).svg",
  };
  const sportsImgWhite = {
    "Football (FBL)": "Beach volleyball (Olympic) white.svg",
    "Para Triathlon (PTRI)": "Athletics (Olympic) white.svg",
    "Basketball fauteuil (PWBK)": "Basketball (Olympic) white.svg",
    "Athlétisme - arrivée Marathon (ATM), Cyclisme sur route - départ Contre-la-montre (CRD), Tir à l'arc (ARC)":
      "Archery (Olympic) white.svg",
    "Handball (HBL), Haltérophilie (WLF)": "Beach volleyball (Olympic) white.svg",
    "Volley-ball de plage (VBV)": "Beach volleyball (Olympic) white.svg",
    "Parc Urbain la Concorde (FCO)": "Artistic Gymnastics (Olympic) white.svg",
    "Basketball (BKB), Handball (HBL)": "Basketball (Olympic) white.svg",
    "Tennis de table (TTE)": "Badminton (Olympic) white.svg",
    "Aviron (ROW), Canoë - course en ligne (CSP)": "Canoe slalom (Olympic) white.svg",
    "Hockey (HOC)": "Artistic Gymnastics (Olympic) white.svg",
    "Cyclisme sur route - arrivée Contre-la-montre (CRD), Natation marathon (OWS), Triathlon (TRI)":
      "Cycling road (Olympic) white.svg",
    "Basketball (BKB), Gymnastique artistique (GAR), Gymnastique trampoline (GTR)": "Basketball (Olympic) white.svg",
    "Judo (JUD), Lutte (WRE)": "Boxing (Olympic) white.svg",
    "Badminton (BDM), Gymnastique rythmique (GRY)": "Badminton (Olympic) white.svg",
    "Escrime (FEN), Taekwondo (TKW)": "Boxing (Olympic) white.svg",
    "Boxe (BOX), Pentathlon moderne (MDN)": "Boxing (Olympic) white.svg",
    "Tennis (TEN), Boxe (BOX)": "Badminton (Olympic) white.svg",
    "Volley-ball (VVO)": "Beach volleyball (Olympic) white.svg",
    "Surf (SRF)": "Artistic swimming (Olympic) white.svg",
    "Sports équestres - dressage (EQD), Sports équestres - concours complet (EQE), Sports équestres - saut d'obstacles (EQJ), Pentathlon moderne (MPN)":
      "Equestrian dressage (Olympic) white.svg",
    "Sports équestres": "Equestrian dressage (Olympic) white.svg",
    "Canoë-kayak slalom (CSL)": "Canoe sprint (Olympic) white.svg",
    "Natation artistique (SWA)": "Artistic swimming (Olympic) white.svg",
    "Plongeon (DIV)": "Artistic swimming (Olympic) white.svg",
    "Water-polo (WPO)": "Artistic swimming (Olympic) white.svg",
    "Tir (SHO)": "Archery (Olympic) white.svg",
    "Skateboard (SKB)": "BMX freestyle (Olympic) white.svg",
    "Cyclisme VTT (MTB)": "BMX freestyle (Olympic) white.svg",
    "Voile (SAL)": "Canoe sprint (Olympic) white.svg",
    "Basketball 3x3 (BK3)": "3×3 Basketball (Olympic) white.svg",
    "Breaking (BKG)": "Breaking (Olympic) white.svg",
    "BMX freestyle (BMF)": "BMX freestyle (Olympic) white.svg",
    "Athlétisme marche (ATW)": "Athletics (Olympic) white.svg",
    "Cyclisme sur route - Course sur route (CRD)": "Cycling road (Olympic) white.svg",
    "Escalade (CLB)": "Cycling road (Olympic) white.svg",
    "Cyclisme sur piste (CTR)": "Cycling road (Olympic) white.svg",
    "Skateboard (SKB)": "BMX Racing (Olympic) white.svg",
    "Athlétisme (ATH)": "Athletics (Olympic) white.svg",
    Badminton: "Badminton (Olympic) white.svg",
    Handball: "Beach volleyball (Olympic) white.svg",
    Rowing: "Canoe slalom (Olympic) white.svg",
    Shooting: "Archery (Olympic) white.svg",
    Volleyball: "Beach volleyball (Olympic) white.svg",
    Equestrian: "Equestrian dressage (Olympic) white.svg",
    Fencing: "Boxing (Olympic) white.svg",
    Hockey: "Artistic Gymnastics (Olympic) white.svg",
    Judo: "Boxing (Olympic) white.svg",
    "Artistic Gymnastic": "Artistic Gymnastics (Olympic) white.svg",
    Basketball: "Basketball (Olympic) white.svg",
    Diving: "Artistic swimming (Olympic) white.svg",
    Swimming: "Artistic swimming (Olympic) white.svg",
    Skateboarding: "BMX freestyle (Olympic) white.svg",
    Tennis: "Badminton (Olympic) white.svg",
    "Beach Volleyball": "Beach volleyball (Olympic) white.svg",
    "Water Polo": "Artistic swimming (Olympic) white.svg",
    "Cycling Road": "Cycling road (Olympic) white.svg",
    "Rugby Sevens": "Beach volleyball (Olympic) white.svg",
    "Canoe Slalom": "Canoe slalom (Olympic) white.svg",
    Football: "Beach volleyball (Olympic) white.svg",
    "Table Tennis": "Badminton (Olympic) white.svg",
    Boxing: "Boxing (Olympic) white.svg",
    Surfing: "Artistic swimming (Olympic) white.svg",
  };

  let image = white == true ? sportsImgWhite[sport] : sportsImg[sport];
  if (image === undefined) {
    Object.keys(sportsImg).forEach((key) => {
      if (sport.includes(key) || key.includes(sport)) {
        image = white == true ? sportsImgWhite[key] : sportsImg[key];
      }
    });
  }

  return image ? image : "doubleP24_logo.png";
}

export function getSportNewsName(sport) {
  let sportName = sport.split("(")[0].trim();

  const list = {
    "Volley-ball de plage": "beach-volley",
    "Parc Urbain la Concorde": "",
    Basketball: "basketball",
    "Tennis de table": "tennis-de-table",
    "Tennis de table para": "tennis-de-table",
    Aviron: "aviron",
    Hockey: "hockey-sur-gazon",
    "Cyclisme sur route - arrivée Contre-la-montre": "cyclisme-sur-route",
    "Cyclisme sur piste": "cyclisme-sur-piste",
    "Cyclisme BMX racing": "cyclisme-bmx-racing",
    "Cyclisme BMX freestyle": "cyclisme-bmx-freestyle",
    "Cyclisme mountain bike": "cyclisme-mountain-bike",
    Judo: "judo",
    Badminton: "badminton",
    Escrime: "escrime",
    Boxe: "boxe",
    Tennis: "tennis",
    "Volley-ball": "voleyball",
    Surf: "surf",
    "Sports équestres - dressage": "sports-equestres",
    "Canoë-kayak slalom": "canoe-slalom",
    "Canoë-sprint": "canoe-sprint",
    "Natation artistique": "natation-synchronisee",
    Tir: "tir",
    Natation: "natation",
    Skateboard: "skateboarding",
    "Athlétisme - arrivée Marathon": "athletisme",
    Handball: "handball",
    Football: "football",
    Athlétisme: "athletisme",
  };

  sportName = list[sportName] ? list[sportName] : sportName;

  if (sportName == undefined) {
    for (let key in list) {
      if (
        sport.toLowerCase().split("(")[0].replace("para ", "").includes(key.toLowerCase()) ||
        key.toLowerCase().includes(sport.toLowerCase().split("(")[0].replace("para ", ""))
      ) {
        sportName = list[key];
        break;
      }
    }
  }

  return sportName;
}
