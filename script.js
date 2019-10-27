//url = 'https://script.google.com/macros/s/AKfycby6e4ELsEzaOUYuO4E5PAYib5pKDl6H12uiZjNQlwvcX_2svMuv/exec'
var url = 'https://mkform.herokuapp.com/save.php';

(function() {
  init();
})();

function submitForm() {
  var d = getFormData()
  //e.preventDefault();
  var jqxhr = $.ajax({
    url: url,
    method: "POST",
    dataType: "json",
    data: {d:JSON.stringify(d)}
  }).success(
    console.log("Success")
    // do something
  );
}

function getFormData() {
  var frm = document.forms[0]
  var d;
  for(var e in frm.elements) {
    d[e.name] = e.value
  }
  return d
}
// array of page objects { el: element, idx: index}
var pages;
function init() {
  pages = getPages();
  hideAll();
  var smallest = getFirst(pages)
  showPage(smallest);

  document.onload = hideAll
}

function getPages() {
  var pgs = [];
  var frm = document.forms[0]
  for(var e in frm.children) {
    if (e.nodeName != "DIV")
      continue;
    for (var a in e.attributes) {
      if (a.name=="data-page") {
        pgs.push({ el: e, idx: a.value});
      }
    }
  }
  return pgs;
}

function hideAll(pgs) {
  for(var e in pgs) {
    p.el.class = 'hiddenpage'
  }
}

function showPage(idx) {
  for(var e in pgs) {
    if (p.idx == idx) {
      p.el.class = 'visiblepage'
      return
    }
  }
}

function getFirst(pgs) {
  var min = null
  for(var e in pgs) {
    if (min == null || min > p.idx) {
      min = p.idx
    }
  }
  return min
}