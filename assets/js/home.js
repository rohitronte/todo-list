let split ;
var bgcolor = 'white';
var color ;
setTimeout(() => {
    split = Split(['.a', '.b'],{
        gutterSize: 2,
        sizes: [30,70],
        minSize: [300,900],
        // direction: 'vertical',
        cursor: 'col-resize'
    });


}, 4000)

//  for toggle button
function toggle(){
    var classMain = document.querySelector('.main');
    if(classMain.classList.contains('dark')){
        bgcolor = 'black';
        color = "white";
    }else{
        bgcolor = 'white';
        color = 'black';
        // console.log('not dark theme ');
    } 
    document.querySelector('.gutter').style.backgroundColor = bgcolor ;
    // console.log(bgcolor);
    document.querySelector('button').style.backgroundColor = bgcolor;
    document.querySelector('button').style.color = color;
    document.getElementById('add').style.color = bgcolor;
    document.getElementById('delete').style.color = bgcolor;
    document.getElementById('description').style.caretColor = bgcolor;
    document.getElementById('description').style.color = bgcolor;
    document.getElementById('due-date').style.caretColor = bgcolor;
    document.getElementById('due-date').style.color = bgcolor;
    classMain.classList.toggle('dark');
}


// dropdown menu list 

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);


// sending form data via ajax 

function getFormData(){
    var xhr = new XMLHttpRequest();
    obj = {
        category : document.getElementById('category').value ,
        dueDate: document.getElementById('due-date').value,
        description: document.getElementById('description').value
    }
    // console.log(JSON.stringify(obj));
    xhr.onload = function(e){
        let obj = JSON.parse(e.currentTarget.response);
        let html = `<div class="items" id="${obj._id}">
        <span><input type="checkbox" name="task" value="${obj._id}" ></span>
        <div class="description">${obj.description}</div>
        <div class="duedate">${obj.dueDate}</div>
        <div class="category">${obj.category}</div>
    </div>`
        let div = document.querySelector('.b');
        div.insertAdjacentHTML("beforeend" , html);
    }
    if (obj.category == "" || obj.dueDate == ""){
      alert('Fill properly ');
      return ;
    }
    xhr.open('POST','/create-item',true);
    xhr.setRequestHeader('Content-type','application/json');
    xhr.send(JSON.stringify(obj));
}

function sendOptions() {
  var xhr = new XMLHttpRequest();
  var checkedBoxes = document.getElementsByName('task');
  console.log("checkboxes" , checkedBoxes);
  var obj = [];
  for(let checkbox of checkedBoxes){
    if(checkbox.checked){
      obj.push(checkbox.getAttribute('value'));
      // console.log(checkbox);
    }
  }

  xhr.onload = function(e){
    console.log(xhr.responseText);
    let array = JSON.parse( xhr.responseText ).array;
    // for (let id of array ){
    //   console.log(id);
    //   let item = document.getElementById(id);
    //   item.remove();
    // }
    for (let i = 0 ; i < array.length ; i++ ){
      let item  = document.getElementById(array[i]);
      console.log(item);
      item.remove();
    }
  }

  xhr.open('DELETE','/',true);
  xhr.setRequestHeader('Content-type','application/json');
  xhr.send(JSON.stringify(obj));
}