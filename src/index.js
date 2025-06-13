import { App } from "./app.js";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { projectButtons } from "./components/projectButtons.js";
import { compareAsc, format } from "date-fns";
import { todoModal } from "./components/todoModal.js";

const todoApp = new App();
const appDiv = document.querySelector(".app");

// todoApp.createProject("test", "this is project s1");
// todoApp.createProject("testagain", "this is project 2");
const todo1 = new Todo("todo 1", "description", format(new Date(), "yyyy-MM-dd"), "high", "na");
const todo2 = new Todo("todo 2", "stuff", format(new Date(), "yyyy-MM-dd"), "high", "na");

// console.log(todo1);
// todoApp.projects[1].addTodo(todo1);
todoApp.projects[0].addTodo(todo1);
todoApp.projects[0].addTodo(todo2);
// todoApp.projects[1].removeTodo(todo1.id);
projectButtons(todoApp.projects);

// Todos sidebar
const addTodoButton = document.querySelector(".add-todo");
const todayTodosButton = document.querySelector(".today-todo");
const upcomingTodosButton = document.querySelector(".upcoming-todo");
const pastTodoButton = document.querySelector(".past-todo");

// Add todo modal
let addTodoModal = todoModal({ todoApp });
appDiv.appendChild(addTodoModal);

// Add project modal
const addProjectModal = document.querySelector("#add-project-modal");
const addProjectForm = document.querySelector("#add-project-modal > form");
const projectTitleInput = document.querySelector("#project-title");
const projectDescInput = document.querySelector("#project-desc");
const projectCancelButton = document.querySelector("#cancel-project-modal");
const projectSubmitButton = document.querySelector("#submit-project-modal");

// Projects sidebar
const addProjectButton = document.querySelector(".add-project");
const projectSidebarButtons = document.querySelectorAll(".project-sidebar");

// Create event listener for Add Todo button that opens the Todo form modal. Once that form modal
// is submitted, a new todo should be created in the specified project
addTodoButton.addEventListener("click", () => {
    console.log("add todo modal");
    console.log(addTodoModal);
    addTodoModal.remove();
    addTodoModal = todoModal({ todoApp });
    appDiv.appendChild(addTodoModal);
    addTodoModal.showModal();
});

// Create event listener for the Today button. This will render in the todo items that are due
// today

// Create event listener for the Today button. This will render in the todo items that are due
// today

// Create event listener for the Upcoming button. This will render in the todo items that are due
// sometime in the future

// Create event listener for the Past button. This will render in the todos whose due dates have
// passed

// Create event listener for the Add Project button that opens a form modal. Once that form modal
// is submitted, a new project should be created
function clearProjectInputs() {
    projectTitleInput.value = "";
    projectDescInput.value = "";
}

addProjectButton.addEventListener("click", () => {
    addProjectModal.showModal();
    clearProjectInputs();
});

// Create event listeners for the Project modal buttons
projectCancelButton.addEventListener("click", () => {
    addProjectModal.close();
});

projectSubmitButton.addEventListener("click", (e) => {
    // Get data from inputs, and create a new Project
    const formData = Object.fromEntries(new FormData(addProjectForm));
    console.log(formData);
    if (formData["project-title"] && formData["project-desc"]) {
        todoApp.createProject(...Object.values(formData));
        projectButtons(todoApp.projects);
        console.log(todoApp.projects);
    }
});

// Create event listeners for each of the Project sidebar buttons. This will render in the todos for
// that specific project
