import App from "./module/app.js";

let todoElements = document.querySelectorAll('[data-todo="app"]');

todoElements.forEach(element => {
    const todoApp = new App(element)
    todoApp.start()
})
