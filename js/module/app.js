import Tasks from "./Tacks.js";
import { Task } from "./Tacks.js";
import { Dataset } from "./layout.js";
import { modalMessage, openModalInput } from "../utils/modal.js";
import generateString from "../utils/random.js";
import sanitizeHTML from "../utils/sanitize.js";
import { dragAndDrop } from "./dragAndDrop.js";

export default class App {
  constructor(element) {
    this.root = element;
    this.input = this.root.querySelector('[data-todo="input"]');
    this.submit = this.root.querySelector('[data-todo="submit"]');
    this.reset = this.root.querySelector('[data-todo="reset"]');
    this.theme = this.root.querySelector('[data-todo="theme"]');
    this.filterGroup = this.root.querySelector('[data-todo="filter"]');
    this.todoListRoot = this.root.querySelector('[data-todo="todo-list"]');

    this.todoList = new Tasks(this.todoListRoot);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onfilter = this.onfilter.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onUpdateTask = this.onUpdateTask.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    // Check null value
    if (!this.input.value.trim()) return;
    // Create a new task template
    const newTask = Object.create(Task);
    newTask.id = generateString();
    newTask.value = sanitizeHTML(this.input.value);
    newTask.checked = false;
    // Add a task to the to-do list
    this.todoList.addTask(newTask);
    this.input.value = "";
    this.onUpdate();
  }

  onReset() {
    this.todoList.clearTodoList();
    this.onUpdate();
  }

  onSwitchTheme(event) {
    let root = document.documentElement;
    root.getAttribute("data-theme") === "dark"
      ? root.setAttribute("data-theme", "light")
      : root.setAttribute("data-theme", "dark");
    setTimeout(
      localStorage.setItem("theme", root.getAttribute("data-theme")),
      0
    );
  }

  onfilter(event) {
    let buttons = this.filterGroup.children;
    let dataset = event.target.dataset.todo;

    switch (dataset) {
      case Dataset.ALL:
        this.todoList.showAllTasks();
        break;
      case Dataset.ACTIVE:
        this.todoList.showActiveTasks();
        break;
      case Dataset.COMPLETED:
        this.todoList.showCompletedTasks();
        break;
    }

    // Set active state to button in a button group
    if (event.target.tagName === 'BUTTON') {    
      for (let btn of buttons) {btn.classList.remove("filter--active")}
      event.target.classList.add("filter--active");
    }

    dragAndDrop(this.todoListRoot, this.todoList);
  }

  resetFilter() {
    // Set default state "All" taks
    let buttons = this.filterGroup.children;
    for (let btn of buttons) {
      btn.classList.remove("filter--active");
    }
    this.filterGroup
      .querySelector('[data-todo="all"]')
      .classList.add("filter--active");
  }

  onInput() {
    this.submit.disabled = !Boolean(this.input.value);
  }

  onEnter(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) this.submit.click();
  }

  // Update app components on change in taks
  onUpdate() {
    this.resetFilter();
    // Start dragAndDrop event for the new list
    dragAndDrop(this.todoListRoot, this.todoList);
  }

  onUpdateTask(event) {
    let task = event.target.closest("[data-task-id]");
    let value = task.querySelector('[data-task="text"]').textContent;
    let id = task.dataset.taskId;
    let dataset = event.target.dataset.task;

    switch (dataset) {
      case Dataset.DELETE:
        this.todoList.removeTask(id);
        break;
      case Dataset.CHECKBOX:
        this.todoList.updateTaskStatus(id, event.target.checked);
        break;
      case Dataset.EDIT:
        this.todoList.updateTaskValue(id, openModalInput(value, modalMessage.rename));
        break;
    }

    dragAndDrop(this.todoListRoot, this.todoList);
  }

  start() {
    this.input.focus();
    this.todoList.loadTodoList();
    this.reset.addEventListener("click", this.onReset);
    this.theme.addEventListener("click", this.onSwitchTheme);
    this.submit.addEventListener("click", this.onSubmit);
    this.filterGroup.addEventListener("click", this.onfilter);
    this.input.addEventListener("input", this.onInput);
    this.input.addEventListener("keyup", this.onEnter);
    this.todoListRoot.addEventListener("click", this.onUpdateTask);
    this.todoListRoot.addEventListener("drop", this.onUpdate);
    this.onUpdate();
  }

  stop() {
    this.reset.removeEventListener("click", this.onReset);
    this.submit.removeEventListener("click", this.onSubmit);
    this.filterGroup.removeEventListener("click", this.onfilter);
    this.input.removeEventListener("input", this.onInput, true);
    this.input.removeEventListener("keyup", this.onEnter);
    this.todoListRoot.removeEventListener("click", this.onUpdateTask);
    this.todoListRoot.addEventListener("drop", this.onUpdate);
  }
}
