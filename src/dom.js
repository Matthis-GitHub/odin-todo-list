import "./style.css";
import { createToDo, createProject } from "./app";

// DOM Stuff
// Sidebar

// Register EventListeners
// Register create project button
const createProjectButton = document.querySelector(
  ".sidebar .project .create-project"
);
createProjectButton.addEventListener("click", createProjectDialog);

//------------ Display Logic ------------------------

function createProjectDialog() {
  const dialog = document.querySelector(".sidebar .project .dialog");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Enter Project Name");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const add = document.createElement("button");
  add.textContent = "Add";
  add.classList.add("add");
  add.addEventListener("click", () =>
    handleAddProjectClickEvent(input.value, dialog)
  );

  const cancel = document.createElement("button");
  cancel.textContent = "Cancel";
  cancel.classList.add("cancel");
  cancel.addEventListener("click", () => {
    dialog.removeChild(input);
    dialog.removeChild(buttonContainer);
  });

  buttonContainer.appendChild(add);
  buttonContainer.appendChild(cancel);

  dialog.appendChild(input);
  dialog.appendChild(buttonContainer);

  input.focus();
}

function createToDoDialog() {
  const div = document.createElement("div");
  div.textContent = "ToDo Dialog";
  return div;
}

function createProjectEntry(project) {
  // Get DOM Elements
  const container = document.querySelector(".sidebar .project .container");

  // Create project wrapper
  const wrapper = document.createElement("div");
  wrapper.classList.add("project-panel");

  // Create project title
  const projectTitle = document.createElement("div");
  projectTitle.textContent = project.title;
  projectTitle.classList.add("project-title");
  projectTitle.addEventListener("click", () => {
    populateMainContent(project.title, project.todos);
  });

  // Create button
  const projectBtn = document.createElement("button");
  projectBtn.textContent = "Edit";

  // Append elements to wrapper
  wrapper.appendChild(projectTitle);
  wrapper.appendChild(projectBtn);

  // Append wrapper to container
  container.appendChild(wrapper);
}

function populateMainContent(title, todos) {
  // Get DOM Elements
  const mainTitle = document.querySelector("main .title");
  const todoContainer = document.querySelector("main .container");
  const dialog = document.querySelector("main .dialog");
  const createToDo = document.querySelector("main .create-todo");

  mainTitle.textContent = title;

  // Delete existing todos
  todoContainer.replaceChildren();

  todos.forEach((todo) => {
    const div = document.createElement("div");
    div.textContent = `${todo.title} ${todo.description} ${todo.dueDate} ${todo.priority}`;
    todoContainer.appendChild(div);
  });

  // Delete existing todoBtn so no multiple instances
  // get generated when switching between projects
  createToDo.replaceChildren();

  // Create todo button
  const todoBtn = document.createElement("button");
  todoBtn.textContent = "Create ToDo";
  todoBtn.classList.add("create-todo");
  todoBtn.addEventListener("click", () => {
    dialog.appendChild(createToDoDialog());
  });

  createToDo.appendChild(todoBtn);
}

function displayToDo() {
  const todo = createToDo(
    "myFirstToDo ",
    "| Description of my first ToDo |",
    " DatePlaceholder",
    1
  );

  const div = document.createElement("div");
  div.textContent = `${todo.title} ${todo.description} ${todo.dueDate} ${todo.priority}`;

  return div;
}

// Utility/Helper Functions

function initMainContent() {
  // Get DOM Elements
  const main = document.querySelector("main");

  const mainTitle = document.querySelector("main .title");
  mainTitle.textContent = "No Project";

  const todoContainer = document.querySelector("main .container");

  const dialog = document.querySelector("main .dialog");
}

function handleAddProjectClickEvent(inputValue, dialog) {
  const project = createProject(inputValue);
  createProjectEntry(project);
  populateMainContent(project.title, project.todos);

  // Close dialog
  dialog.replaceChildren();
}

// Programm starts here

initMainContent();
