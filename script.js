//url = 'https://script.google.com/macros/s/AKfycby6e4ELsEzaOUYuO4E5PAYib5pKDl6H12uiZjNQlwvcX_2svMuv/exec'
var url = 'https://mkform.herokuapp.com/save.php';

(function() {
  window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    init();
});
  
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
  hideAll(pages);
  var smallest = getFirst(pages)
  showPage(pages, smallest);
  document.forms[0].class='visibleform'
}

function getPages() {
  var pgs = [];
  var frm = document.forms[0]
  for(var ei in frm.children) {
    var e = frm.children[ei]
    if (e.nodeName != "DIV")
      continue;
    for (var ai in e.attributes) {
      var a = e.attributes[ai]
      if (a.name=="data-page") {
        pgs.push({ el: e, idx: a.value});
      }
    }
  }
  return pgs;
}

function hideAll(pgs) {
  for(var p in pgs) {
    pgs[p].el.class = 'hiddenpage'
  }
}

function showPage(pgs, idx) {
  for(var p in pgs) {
    if (pgs[p].idx == idx) {
      pgs[p].el.class = 'visiblepage'
      return
    }
  }
}

function getFirst(pgs) {
  var min = null
  for(var p in pgs) {
    if (min == null || min > pgs[p].idx) {
      min = pgs[p].idx
    }
  }
  return min
}