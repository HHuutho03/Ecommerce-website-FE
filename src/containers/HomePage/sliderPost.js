// Hero Carousel
import Glide from "@glidejs/glide";
export const slider1 = document.querySelector("#glide");
if (slider1) {
  new Glide(slider1, {
    type: "carousel",
    perView: 4,
    focusAt: "center",
    breakpoints: {
      800: {
        perView: 2,
      },
      480: {
        perView: 1,
      },
    },
  }).mount();
}
