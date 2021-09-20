import { files } from './../res/api/photos.js';


const dotsContainer = document.querySelector(".dot-container");
const container = document.querySelector(".slideshow-container");
let container2 = document.querySelector(".sec-container")
dotsContainer.className = "thumbContainer"
let breakLine = document.querySelector("br");
breakLine.remove();


//setting up files into DOM
files.map((v, i, a) => {
  //Create slides for each image
  const mySlide = document.createElement('div');
  mySlide.className = "mySlide fade";

  //Number
  const numberText = document.createElement("div");
  numberText.className = "numberText";
  numberText.append(`${i+1} / ${files.length}`);

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
  const dots = document.createElement("img");
  dots.className = "thumbnail imgActive";
  dots.src = img.src;
  dots.alt = img.alt;
  dots.setAttribute("onclick", `currentSlides(${i + 1})`);
  

  //Adding it all together
  mySlide.append(numberText, img, caption);

  dotsContainer.append(dots);
  container.append(mySlide);
});

 /* //dots
  const dots = document.createElement("span");
  dots.className = "dotIC active";
  dots.setAttribute("onclick", `currentSlides(${i + 1})`);*/