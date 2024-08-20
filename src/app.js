//---------------- Application Logic--------------------

export function createToDo(title, description, dueDate, priority) {
  return { title, description, dueDate, priority };
}

export function createProject(title) {
  let todos = [];

  return { title, todos };
}
