/**
 * Create HTML layout for a task
 * @param {HTMLCollection, NodeList} rootElement - Root element for tasks
 * @param {Object} todoList – Array of Task class instances
 */

export const generateTaskLayout = function (todoList, rootElement) {
  if (todoList.length === 0) {
    rootElement.innerHTML = '' + createEmptyLayout();
    return
  }
  
  if (todoList || rootElement) {
    let todoListHTML = "";
    // Create HTML layout for tasks list
    todoList.forEach((task) => {
      todoListHTML += createTaskLayout(task);
    });
    // Add a new list of tasks to the page
    rootElement.innerHTML = todoListHTML;
    // Set the last and first tasks
    setPosition(rootElement);
  }
};

// Create HTML layout for task
const createTaskLayout = function (task) {
  let checked = task.checked ? "checked" : "";
  let layout = 
  `<li class="task__item" data-task-id="${task.id}">  
      <input id="${task.id}" type="checkbox" data-task="checkbox" ${checked}>
      <span class="task__checkbox"></span>
      <label class="task__text" for="${task.id}" data-task="text">${task.value}</label>
      <div class="task__button card__button-groupe">   
        <button class="button button--edit" data-task="edit" aria-labe="edit task" title="Edit" ></button>
        <button class="button button--delete" data-task="delete" aria-labe="delete task" title="Delete" ></button> 
      </div>
  </li>`;
  return layout;
};  

const createEmptyLayout = function() {
  return `<li><p class="task__empty">You don't have tasks<p></li>`
}

// Set the position of tasks in the list
let setPosition = function (element) {
  let length = element.children.length;
  if (length) {
    element.children[0].classList.add("first");
    element.children[length - 1].classList.add("last");
  }
};

// Todo list dataset attributes
export const Dataset = {
  DELETE: "delete",
  EDIT: "edit",
  CHECKBOX: "checkbox",
  TEXT: "text",
  SUBMIT: "submit",
  RESET: "reset",
  THEME: "theme",
  TODO_LIST: "todo-list",
  DATA_TODO: "data-todo",
  FILTER: "filter",
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};
