let ulelements = document.getElementById("ulelement");

function fromlocal() {
  let localget = localStorage.getItem("todolist");
  let parsed = JSON.parse(localget);
  if (parsed === null) {
    return [];
  } else {
    return parsed;
  }
}
let todolist = fromlocal();

function labelonclick(checkboxid, labelid) {
  let checkid = document.getElementById(checkboxid);
  let laid = document.getElementById(labelid);
  laid.classList.toggle("check");
}
let count = todolist.length;

function todoelements(todo) {
  let checkboxid = "checkbox" + todo.unique;
  let labelid = "label" + todo.unique;
  let listid = "listid" + todo.unique;

  let lielement = document.createElement("li");
  lielement.id = listid;
  ulelements.appendChild(lielement);

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = checkboxid;
  checkbox.onclick = function () {
    labelonclick(checkboxid, labelid);
  };
  lielement.appendChild(checkbox);

  let labelcontainer = document.createElement("div");
  labelcontainer.classList.add("labelcontainer");
  lielement.appendChild(labelcontainer);

  let label = document.createElement("label");
  label.setAttribute("for", checkboxid);
  label.id = labelid;

  label.textContent = todo.text;
  labelcontainer.appendChild(label);

  let deletecontainer = document.createElement("div");
  labelcontainer.classList.add("deletecontainer");
  labelcontainer.appendChild(deletecontainer);

  let deleteicon = document.createElement("li");
  deleteicon.classList.add("fa-solid", "fa-trash");
  deleteicon.onclick = function () {
    deletefun(listid);
  };
  deletecontainer.appendChild(deleteicon);
}
function add() {
  let inputvalue = document.getElementById("userinput");
  let valuel = inputvalue.value;
  if (valuel === "") {
    alert("Enter valid input");
    return;
  }
  count = count + 1;
  let array = {
    text: valuel,
    unique: count,
  };
  todoelements(array);
  inputvalue.value = "";
  todolist.push(array);
  console.log(todolist);
}
function save() {
  localStorage.setItem("todolist", JSON.stringify(todolist));
}

function deletefun(listid) {
  let element = document.getElementById(listid);
  ulelements.removeChild(element);
}

for (let todo of todolist) {
  todoelements(todo);
}
