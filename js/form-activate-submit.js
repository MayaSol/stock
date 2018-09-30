var form = document.querySelector(".form--warehouse-create");
var checkedInputs = form.querySelectorAll(".field");
var checkedBtn = form.querySelector(".modal__btn-submit");

console.log(checkedInputs);

var result = false;

  for (var i = 0; i < checkedInputs.length; i++) {
    console.log('checkedInputs[' + i + '].value = ' + checkedInputs[i].value);
      //result = result && (checkedInputs[i].length > 0);
  }

