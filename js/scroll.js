gsap.set(".main", {
  position: "fixed",
  background: "#fff",
  width: "100%",
  height: "100%",
  top: 0,
  left: "50%",
  x: "-50%",
});
gsap.set(".scrollDist", { width: "100%", height: "200%" });
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scrollDist",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  })
  .fromTo(".sky", { y: 0 }, { y: -200 }, 0)
  .fromTo(".cloud1", { y: 100 }, { y: -800 }, 0)
  .fromTo(".cloud2", { y: -150 }, { y: -500 }, 0)
  .fromTo(".cloud3", { y: -50 }, { y: -650 }, 0)
  .fromTo(".mountBg", { y: -10 }, { y: -100 }, 0)
  .fromTo(".cloud4", { y: -30 }, { y: -250 }, 0);
// scrollTo requires the ScrollTo plugin (not to be confused w/ ScrollTrigger)
