let slideIndex = 1;
showSlides(slideIndex);

//Next & Prev button calback
function p(n) {
  showSlides(slideIndex += n);
}
// To show current image
function currentSlides(n) {
  showSlides(slideIndex = n);
}

function showSlides(n = null) {
  let i;

  //const dots = document.querySelector(".dot");
  const x = document.getElementsByClassName("mySlide");
  const d = document.getElementsByClassName("thumbnail");


  // if num is more than image lenght
  //slideIndex++;
  
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }

  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < d.length; i++) {
    d[i].className = d[i].className.replace("imgActive", "dim");
  }


  x[slideIndex - 1].style.display = "block";
  d[slideIndex - 1].className = d[slideIndex - 1].className.replace("dim","imgActive");

  //setTimeout(showSlides, 3000)
}