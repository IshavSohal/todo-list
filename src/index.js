import { App } from "./app.js";
import { projectButtons } from "./components/projectButtons.js";
import { compareAsc, format } from "date-fns";
import { todoModal } from "./components/todoModal.js";
import { projectModal } from "./components/projectModal.js";
import { start } from "./components/start.js";

const todoApp = new App();
const appDiv = document.querySelector(".app");

todoApp.createTodo("todo 1", "description", format(new Date(), "yyyy-MM-dd"), "high", "na", todoApp.projects[0].id);
todoApp.createTodo("todo 2", "stuff", format(new Date(), "yyyy-MM-dd"), "high", "na", todoApp.projects[0].id);

projectButtons({ todoApp });
start();

// Todos sidebar
const addTodoButton = document.querySelector(".add-todo");
const todayTodosButton = document.querySelector(".today-todo");
const upcomingTodosButton = document.querySelector(".upcoming-todo");
const pastTodoButton = document.querySelector(".past-todo");

// Add todo modal
let addTodoModal = todoModal({ todoApp });

// Add project modal
//TODO: use project modal component
let addProjectModal = projectModal({ todoApp });

// Projects sidebar
const addProjectButton = document.querySelector(".add-project");

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
addProjectButton.addEventListener("click", () => {
    console.log("add project modal");
    console.log(addProjectModal);
    addProjectModal.remove();
    addProjectModal = projectModal({ todoApp });
    appDiv.appendChild(addProjectModal);
    addProjectModal.showModal();
});
