(function() {


var btnCreateWarehouse = document.querySelector(".btn--warehouse-create");
var btnsReserve = document.querySelectorAll(".btn--reserve");

var modalCreateWarehouse = document.querySelector(".modal--warehouse-create");
var modalReserve = document.querySelector(".modal--reserve");

var btnModalClose = modalCreateWarehouse.querySelector(".btn--modal-close");
var btnModalReserveClose = modalReserve.querySelector(".btn--modal-close");

var classes = {
  show: "modal--opened"
}

function modalClose(evt,modal) {
  modal.classList.remove(classes.show);
}

function modalShow(evt,modal) {
  evt.preventDefault();
  if (!modal.classList.contains(classes.show)) {
    modal.classList.add(classes.show);
  }
}

if (btnCreateWarehouse) {
  modalCreateWarehouse.classList.remove(classes.show);

  btnCreateWarehouse.addEventListener("click", function(event){
    modalShow(event,modalCreateWarehouse);
  });

  btnModalClose.addEventListener("click", function(event) {
    modalClose(event, modalCreateWarehouse);
  });

}

if (modalReserve) {
  modalReserve.classList.remove(classes.show);

  for (var i = 0; i < btnsReserve .length; i++) {
   btnsReserve[i].addEventListener("click", function (event) {
    modalShow(event,modalReserve);
   });
  };

  btnModalReserveClose.addEventListener("click", function(event) {
    modalClose(event, modalReserve);
  });

}


window.addEventListener("keydown", function(event) {
   if (event.keyCode == 27) {
    console.log('event.keyCode == 27');
      modalClose(event,modalCreateWarehouse);
      modalClose(event,modalReserve);
  }
});

})();
