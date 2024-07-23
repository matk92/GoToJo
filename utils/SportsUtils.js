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
  };

  let image = white == true ? sportsImgWhite[sport] : sportsImg[sport];
  if (image === undefined) {
    Object.keys(sportsImg).forEach((key) => {
      if (sport.includes(key)) {
        image = white == true ? sportsImgWhite[key] : sportsImg[key];
      }
    });
  }

  return image ? image : "doubleP24_logo.png";
}
