import "./style.css";

// DOM Stuff
const projectContainer = document.querySelector(".project-container");
const projectDialog = document.querySelector(".create-project-dialog");

const projectBtn = document.querySelector("#create-project");
projectBtn.addEventListener("click", createProjectDialog);

const todoBtn = document.querySelector("#create-todo");
todoBtn.addEventListener("click", displayToDo);

//---------------- Application Logic--------------------

function createToDo(title, description, dueDate, priority) {
  return { title, description, dueDate, priority };
}

function createProject(title) {
  let todos = [];

  return { title, todos };
}

//------------ Display Logic ------------------------

function displayToDo() {
  const todo = createToDo(
    "myFirstToDo",
    "Description of my first ToDo",
    "DatePlaceholder",
    1
  );

  const div = document.createElement("div");
  div.textContent = `${todo.title} ${todo.description} ${todo.dueDate} ${todo.priority}`;

  document.body.appendChild(div);
}

function createProjectDialog() {
  const div = document.createElement("div");
  div.classList.add("project-dialog");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Enter Project Name");

  const buttonRow = document.createElement("div");

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add";
  // Register eventlistener for click with createProject function

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  // Register eventlistener for click with function to cancel action e.g. delete the project dialog div

  buttonRow.appendChild(addBtn);
  buttonRow.appendChild(cancelBtn);

  div.appendChild(input);
  div.appendChild(buttonRow);

  projectDialog.appendChild(div);
}
