var btnCreateWarehouse = document.querySelector(".btn--warehouse-create");
var modalCreateWarehouse = document.querySelector(".modal--warehouse-create");
var btnModalClose = modalCreateWarehouse.querySelector(".btn--modal-close");

function modalClose(evt,modal) {
  modal.classList.remove("modal--opened");
}

modalCreateWarehouse.classList.remove("modal--opened");

btnCreateWarehouse.addEventListener("click", function(event){
  event.preventDefault();
  modalCreateWarehouse.classList.add("modal--opened");
});


btnModalClose.addEventListener("click", function(event) {
  modalClose(event, modalCreateWarehouse);
});


window.addEventListener("keydown", function(event) {
   if (event.keyCode == 27) {
    console.log('event.keyCode == 27');
      modalClose(event,modalCreateWarehouse);
  }
});
