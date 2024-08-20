import "./style.css";
import { createToDo, createProject } from "./app";

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

function createToDoDialog(project) {
  const dialog = document.querySelector("main .dialog");

  const title = document.createElement("input");
  title.setAttribute("type", "text");
  title.setAttribute("placeholder", "Enter title");

  const description = document.createElement("textarea");
  description.setAttribute("type", "text");
  description.setAttribute("placeholder", "Enter description");

  const dueDate = document.createElement("input");
  dueDate.setAttribute("type", "text");
  dueDate.setAttribute("placeholder", "Enter dueDate");

  const priority = document.createElement("input");
  priority.setAttribute("type", "text");
  priority.setAttribute("placeholder", "Enter priority");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const add = document.createElement("button");
  add.textContent = "Add";
  add.classList.add("add");
  add.addEventListener("click", () =>
    handleAddToDoClickEvent(
      title.value,
      description.value,
      dueDate.value,
      priority.value,
      dialog,
      project
    )
  );

  const cancel = document.createElement("button");
  cancel.textContent = "Cancel";
  cancel.classList.add("cancel");
  cancel.addEventListener("click", () => {
    dialog.removeChild(title);
    dialog.removeChild(description);
    dialog.removeChild(dueDate);
    dialog.removeChild(priority);
    dialog.removeChild(buttonContainer);
  });

  buttonContainer.appendChild(add);
  buttonContainer.appendChild(cancel);

  dialog.appendChild(title);
  dialog.appendChild(description);
  dialog.appendChild(dueDate);
  dialog.appendChild(priority);
  dialog.appendChild(buttonContainer);

  title.focus();
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
    populateMainContent(project);
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

function populateMainContent(project) {
  // Get DOM Elements
  const mainTitle = document.querySelector("main .title");
  const todoContainer = document.querySelector("main .container");
  const createToDo = document.querySelector("main .create-todo");

  mainTitle.textContent = project.title;

  // Delete existing todos
  todoContainer.replaceChildren();

  project.todos.forEach((todo) => {
    const div = document.createElement("div");
    div.classList.add("todo-panel");

    //---

    const titleWrapper = document.createElement("div");

    const titleText = document.createElement("div");
    titleText.textContent = "Title:";
    titleText.style.fontWeight = "bold";
    titleText.style.fontSize = "18px";

    const titleValue = document.createElement("div");
    titleValue.textContent = todo.title;

    titleWrapper.appendChild(titleText);
    titleWrapper.appendChild(titleValue);

    //---

    const descriptionWrapper = document.createElement("div");

    const descriptionText = document.createElement("div");
    descriptionText.textContent = "Description:";
    descriptionText.style.fontWeight = "bold";
    descriptionText.style.fontSize = "18px";

    const descriptionValue = document.createElement("div");
    descriptionValue.textContent = todo.description;

    descriptionWrapper.appendChild(descriptionText);
    descriptionWrapper.appendChild(descriptionValue);

    //---

    const dueDateWrapper = document.createElement("div");

    const dueDateText = document.createElement("div");
    dueDateText.textContent = "DueDate:";
    dueDateText.style.fontWeight = "bold";
    dueDateText.style.fontSize = "18px";

    const dueDateValue = document.createElement("div");
    dueDateValue.textContent = todo.dueDate;

    dueDateWrapper.appendChild(dueDateText);
    dueDateWrapper.appendChild(dueDateValue);

    //---

    const priorityWrapper = document.createElement("div");

    const priorityText = document.createElement("div");
    priorityText.textContent = "Priority:";
    priorityText.style.fontWeight = "bold";
    priorityText.style.fontSize = "18px";

    const priorityValue = document.createElement("div");
    priorityValue.textContent = todo.priority;

    priorityWrapper.appendChild(priorityText);
    priorityWrapper.appendChild(priorityValue);

    //---

    div.appendChild(titleWrapper);
    div.appendChild(descriptionWrapper);
    div.appendChild(dueDateWrapper);
    div.appendChild(priorityWrapper);

    todoContainer.appendChild(div);
  });

  // Delete existing todoBtn so no multiple instances
  // get generated when switching between projects
  createToDo.replaceChildren();

  // Create todo button
  const todoBtn = document.createElement("button");
  todoBtn.textContent = "Create ToDo";
  todoBtn.classList.add("create-todo");
  todoBtn.addEventListener("click", () => createToDoDialog(project));

  createToDo.appendChild(todoBtn);
}

// Utility/Helper Functions

function initMainContent() {
  // Get DOM Elements
  const main = document.querySelector("main");

  const mainTitle = document.querySelector("main .title");
  mainTitle.textContent = "No Projects";

  const todoContainer = document.querySelector("main .container");

  const dialog = document.querySelector("main .dialog");
}

function initSideBarContent() {
  const createProjectBtn = document.querySelector(
    ".sidebar .project .create-project"
  );
  createProjectBtn.addEventListener("click", createProjectDialog);
}

function handleAddProjectClickEvent(inputValue, dialog) {
  const project = createProject(inputValue);
  createProjectEntry(project);
  populateMainContent(project);

  // Close dialog
  dialog.replaceChildren();
}

function handleAddToDoClickEvent(
  title,
  description,
  dueDate,
  priority,
  dialog,
  project
) {
  const todo = createToDo(title, description, dueDate, priority);
  project.todos.push(todo);

  // Close dialog
  dialog.replaceChildren();

  // Rerender project to display new changes
  populateMainContent(project);
}

// Programm starts here
initSideBarContent();
initMainContent();
