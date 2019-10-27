var $form = $('form#test-form'),
    url = 'https://script.google.com/macros/s/AKfycby6e4ELsEzaOUYuO4E5PAYib5pKDl6H12uiZjNQlwvcX_2svMuv/exec'

function submitForm() {
  //e.preventDefault();
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: JSON.stringify({"Jmeno":getFormVal('jmeno'), "Vyska":getFormVal('vyska'), "Oblibena barva": getFormVal('oblibena-barva')})
  }).success(
    console.log("Success")
    // do something
  );
}

function getFormVal(f) {
  return document.getElementById("test-form").elements[f]
}