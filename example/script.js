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
  var d = {}
  for(var ei in frm.elements) {
    var e = frm.elements[ei]
    d[e.name] = e.value
  }
  return d
}
// array of page objects { el: element, idx: index}
var pages;
function init() {
  pages = getPages();
  
  var smallest = getFirst(pages)
  document.forms[0].attributes["data-pages"] = {'pages':pages, 'current':smallest, 'steps': []}
  showPage(smallest);
  var frm = document.forms[0]
  frm.style.display = 'block'
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
    pgs[p].el.style.display = 'none'
  }
}

function showPage(idx) {
  var pgsDt = document.forms[0].attributes["data-pages"]
  var pgs = pgsDt.pages
  for(var p in pgs) {
    if (pgs[p].idx == idx) {
      pgs[p].el.style.display = 'block'
    } else {
      pgs[p].el.style.display = 'none'
    }
  }
  pgsDt.current = idx
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

function getChildByName(name) {
  var frm = document.forms[0]
  for(var ei in frm.elements) {
    var e = frm.elements[ei]
    if (e.name == name) {
      return e
    }
  }
  return null
}

function getNextPage(pgs, current) {

  if (current == 1) {
    var choice = getChildByName("oblibene_zvire")
    if (choice == null) {
      console.log('nemohu najit oblibene_zvire')
      return current
    }
    if (choice.value == "krysa") {
      // stranka 2 je pro detaily o krysach
      return 2
    }
    if (choice.value == "sova") {
      // stranka 3 je pro detaily o sovach
      return 3
    }
  
  }
  
  var nextMin = null
  for(var p in pgs) {
    if ( current < pgs[p].idx && (nextMin == null || pgs[p].idx < nextMin)) {
      nextMin = pgs[p].idx
    }
  }
  return nextMin
}

function nextPage() {
  var pgsDt = document.forms[0].attributes["data-pages"]
  var current = pgsDt.current
  pgsDt.steps.push(current)
  var next = getNextPage(pgsDt.pages, current)
  console.log('next will be ' + next)
  if (next == null) {
    console.log('in the end')
  }
  showPage(next)
}


function previousPage() {
  var pgsDt = document.forms[0].attributes["data-pages"]
  var steps = pgsDt.steps
  
  if (steps == null || steps.length == 0) {
    console.log('in the beginning')
  }
  prev = steps.pop()
  console.log('prev will be ' + prev)
  
  showPage(prev)
}