## Simple form filler in Javascript and light PHP backend
The main idea was to prepare very simple html form skeleton with conditional logic for steps and possibility to save backend data.
Currently its just storing the form of incoming json in data.csv file.

Running on Heroku at [mkform.herokuapp.com](https://mkform.herokuapp.com/)

## Add / Commit / Deploy to your heroku repo
```
git add -A; git commit -m "commit"; git push heroku master
```

## Check result
```
heroku ps:exec

less data.csv
```

### Example of form step
The mandatory fields: form id has to be test-form, under form, divs have to have data-page attributes with numeric number of page.
The number will be used later to determine next form wizard step, provided by function getNextPage.
```
<form id="test-form">
  
<div class="page" data-page="1">
  <div>
    <label>Favorite animal</label>
    <select name="favorite_animal" id='favorite-animal'>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
    </select>
  </div>
  <div>
    <button type="button" onclick="previousPage()">Previous</button>
    <button type="button" onclick="nextPage()">Next</button>
  </div>
</div>

<div class="page" data-page="2">
  <div>
    <label>Favorite kind of dog</label>
    <select name="favorite_dog_kind" id='favorite_dog_kind'>
        <option value="labrador">labrador</option>
        <option value="vizsla">Vizsla</option>
    </select>
  </div>

  <div>
    <button type="button" onclick="previousPage()">Previous</button>
    <button type="button" onclick="submitForm()">Submit</button>
  </div>
  
</div>

<div class="page" data-page="3">
  <div>
    <label>Favorite kind of cat</label>
    <select name="favorite_cat_kind" id='favorite_cat_kind'>
        <option value="british shorthair">British Shorthair</option>
        <option value="bengal cat">Bengal cat</option>
    </select>
  </div>

  <div>
    <button type="button" onclick="previousPage()">Previous</button>
    <button type="button" onclick="submitForm()">Submit</button>
  </div>
  
</div>
```
and the script:
```
function getNextPage(pgs, current) {

  if (current == 1) {
    var choice = getChildByName("favorite_animal")
    if (choice == null) {
      console.log('cannot find favorite_animal')
      return current
    }
    if (choice.value == "dog") {
      // page 2 has more detailed questions related to dog
      return 2
    }
    if (choice.value == "cat") {
      // page 3 needs details about cat
      return 3
    }
  
  }
  // other steps will take sequentially next number
  var nextMin = null
  for(var p in pgs) {
    if ( current < pgs[p].idx && (nextMin == null || pgs[p].idx < nextMin)) {
      nextMin = pgs[p].idx
    }
  }
  return nextMin
}
```