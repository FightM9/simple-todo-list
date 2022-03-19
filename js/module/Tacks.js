import * as storage from "../utils/storage.js";
import { generateTaskLayout } from "./layout.js";

/**
 * @const {Object} – Task template
 */  
export const Task = {
  id: "",
  value: "",
  checked: "",
};

/**
 * TodoList Core
 * 
 * @param {HTMLCollection, NodeList} element - Root element for tasks
 */

export default class Tasks {
  constructor(element) {
    // Root element for LI tasks
    this.element = element;
    this.todoList = [];
  }

  loadTodoList() {
    if (storage.includes(storage.key.todoApp)) {
      this.todoList = storage.getItem(storage.key.todoApp);
      this.render();
    }
  }

  saveTodoList() {
    storage.setItem(storage.key.todoApp, this.todoList);
  }

  clearTodoList() {
    this.todoList = [];
    this.render();
  }

  getTaskIndexById(id) {
    return this.todoList.findIndex((task) => task.id === id);
  }

  getTaskById(id) {
    return this.todoList.find((task) => task.id === id);
  }

  showAllTasks() {
    this.render();
  }

  showActiveTasks() {
    this.preRender(this.todoList.filter((task) => task.checked === false));
  }

  showCompletedTasks() {
    this.preRender(this.todoList.filter((task) => task.checked === true));
  }

  addTask(task) {
    this.todoList.unshift(task);
    this.render();
  }

  removeTask(id) {
    this.todoList.splice(this.getTaskIndexById(id), 1);
    this.render();
  }

  updateTaskValue(id, value) {
    this.todoList[this.getTaskIndexById(id)].value = value;
    this.render();
  }

  updateTaskStatus(id, checked) {
    this.todoList[this.getTaskIndexById(id)].checked = checked;
    this.saveTodoList();
  }

  swapTasksById(currentTaskId, targetTaskId) {
    let currentTask = this.getTaskById(currentTaskId);
    let targetTask = this.getTaskById(targetTaskId);
    let currentTaskIndex = this.todoList.indexOf(currentTask);
    let targetTaskIndex = this.todoList.indexOf(targetTask);
    // Moving the current task
    this.todoList.splice(currentTaskIndex, 1);
    this.todoList.splice(targetTaskIndex, 0, currentTask);
    this.render();
  }

  render() {
    this.saveTodoList();
    generateTaskLayout(this.todoList, this.element);
  }

  preRender(customTodoList) {
    generateTaskLayout(customTodoList, this.element);
  }
}
