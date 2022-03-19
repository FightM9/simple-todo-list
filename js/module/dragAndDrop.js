/**
 * @param {HTMLCollection, NodeList} rootElement - Root element for tasks
 * @param  {Object} todolistClass - Task class instance
 */

export const dragAndDrop = function (rootElement, todolistClass) {
  rootElement.classList.add("slist");  
  let todoList = todolistClass;
  let tasks = rootElement.childNodes;
  let draggableTask = null;

  for (let task of tasks) {
    task.draggable = true;

    task.ondragstart = () => {  
      draggableTask = task;
      tasks.forEach((task) => {
        
        if (task != draggableTask) {
          // Add class for dropzone
          task.classList.add("hint");
        }
      });
    };

    task.ondragenter = () => {
      if (task != draggableTask) {
         // Task over allowed dropzone
        task.classList.add("active");
      }
    };

    task.ondragleave = () => {
      task.classList.remove("active");
    };

    task.ondragend = () => {
      tasks.forEach((task) => {
        task.classList.remove("hint");
        task.classList.remove("active");
      });
    };

    task.ondragover = (evt) => {
      evt.preventDefault();
    };

    task.ondrop = (evt) => {
      evt.preventDefault();
      if (task != draggableTask) {
        todoList.swapTasksById(
          draggableTask.dataset.taskId,
          task.dataset.taskId
        );
      }
    };
  }
};
