(function() {

  var btnCreateWarehouse = document.querySelector(".btn--warehouse-create");
  var btnsReserve = document.querySelectorAll(".btn--reserve");
  var modalCreateWarehouse = document.querySelector(".modal--warehouse-create");
  var modalReserve = document.querySelector(".modal--reserve");
  var btnModalClose = modalCreateWarehouse.querySelector(".btn--modal-close");

  function modalClose(evt,modal) {
    modal.classList.remove("modal--opened");
  }

  function modalOpen(evt,modal) {
    if (!modal.classList.contains("modal--opened")) {
      modal.classList.remove("modal--opened");
    }
  }

  modalCreateWarehouse.classList.remove("modal--opened");

  btnCreateWarehouse.addEventListener("click", function(event){
    event.preventDefault();
    modalCreateWarehouse.classList.add("modal--opened");
  });

  for (var i = 0; i < btnsReserve.length; i++) {
       btnsReserve[i].addEventListener("click", function (event) {
           event.preventDefault();
           modalCreateReserve.classList.add("modal--opened");
       });
   };


  btnModalClose.addEventListener("click", function(event) {
    modalClose(event, modalCreateWarehouse);
  });


  window.addEventListener("keydown", function(event) {
     if (event.keyCode == 27) {
        modalClose(event,modalCreateWarehouse);
        modalClose(event,modalReserve);
    }
  });

})();
