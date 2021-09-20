const modal = document.querySelector(".modal");

function showForm(){
  modal.style.visibility = "visible";
}

function cancelForm() {
  modal.style.visibility = "hidden";
}

window.onclick = function(event) {
  if(event.target == modal){
    cancelForm();
  }
};