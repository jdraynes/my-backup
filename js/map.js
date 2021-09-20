//This file is creating the slides into DOM

import {files} from './../res/api/photos.js';

const dotsContainer = document.querySelector(".dot-container");
const container = document.querySelector(".slideshow-container");
const container2 = document.querySelector(".sec-container")


//setting up files into DOM
files.map((v, i, a) => {
  //Create slides for each image
  const mySlide = document.createElement('div');
  mySlide.className = "mySlide fade";

  //Number
  const numberText = document.createElement("div");
  numberText.className = "numberText";
  numberText.append(`${files.length - i} / ${files.length}`);

  // img
  const img = document.createElement("img");
  img.className = "slideImg";
  img.src = v.path;
  img.alt = v.description;

  //caption
  const caption = document.createElement("div");
  caption.className = "caption";
  caption.append(v.description);

  //dots
  const dots = document.createElement("span");
  dots.className = "dot active";
  dots.setAttribute("onclick", `currentSlides(${i + 1})`);

  //Adding it all together
  mySlide.append(numberText, img, caption);

  dotsContainer.append(dots);
  container.prepend(mySlide);
});