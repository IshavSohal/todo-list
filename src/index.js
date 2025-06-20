import { App } from "./app.js";
import { projectButtons } from "./components/projectButtons.js";
import { compareAsc, format } from "date-fns";
import { todoModal } from "./components/modals/todoModal.js";
import { projectModal } from "./components/modals/projectModal.js";
import { start } from "./components/start.js";
import { filteredTodos } from "./components/filteredTodos.js";
import "./styles.css";

const todoApp = new App();
const appDiv = document.querySelector(".app");
const mainDiv = document.querySelector(".main");

projectButtons({ todoApp });
start();

// Todos sidebar
const addTodoButton = document.querySelector(".add-todo");
const todayTodosButton = document.querySelector("#today-todo");
const upcomingTodosButton = document.querySelector("#upcoming-todo");
const pastTodoButton = document.querySelector("#past-todo");
const completedTodoButton = document.querySelector("#completed-todo");

// Add todo modal
let addTodoModal = todoModal({ todoApp, type: "create" });

// Add project modal
let addProjectModal = projectModal({ todoApp, type: "create" });

// Projects sidebar
const addProjectButton = document.querySelector(".add-project");

// Create event listener for Add Todo button that opens the Todo form modal. Once that form modal
// is submitted, a new todo should be created in the specified project
addTodoButton.addEventListener("click", () => {
    addTodoModal.remove();
    addTodoModal = todoModal({ todoApp, type: "create" });
    appDiv.appendChild(addTodoModal);
    addTodoModal.showModal();
});

// Create event listener for the Add Project button that opens a form modal. Once that form modal
// is submitted, a new project should be created
addProjectButton.addEventListener("click", () => {
    addProjectModal.remove();
    addProjectModal = projectModal({ todoApp, type: "create" });
    appDiv.appendChild(addProjectModal);
    addProjectModal.showModal();
});

// Create event listener for the Today button. This will render in the todo items that are due
// today
todayTodosButton.addEventListener("click", () => {
    const todayTodos = todoApp.getTodayTodos();
    console.log("today todos");
    console.log(todayTodos);
    filteredTodos({ todos: todayTodos, todoApp, type: "Today" });
    mainDiv.dataset.buttonClicked = `today-todo`; // helps keep track of most recently clicked sidebar button
});

// Create event listener for the Upcoming button. This will render in the todo items that are due
// today
upcomingTodosButton.addEventListener("click", () => {
    const upcomingTodos = todoApp.getUpcomingTodos();
    filteredTodos({ todos: upcomingTodos, todoApp, type: "Upcoming" });
    mainDiv.dataset.buttonClicked = `upcoming-todo`; // helps keep track of most recently clicked sidebar button
});

// Create event listener for the Past button. This will render in the todo items that are due
// sometime in the future
pastTodoButton.addEventListener("click", () => {
    const pastTodos = todoApp.getPastTodos();
    filteredTodos({ todos: pastTodos, todoApp, type: "Past" });
    mainDiv.dataset.buttonClicked = `past-todo`; // helps keep track of most recently clicked sidebar button
});

// Create event listener for the Completed button. This will render in the todos whose due dates have
// passed
completedTodoButton.addEventListener("click", () => {
    const completedTodos = todoApp.getCompletedTodos();
    filteredTodos({ todos: completedTodos, todoApp, type: "Completed" });
    mainDiv.dataset.buttonClicked = `completed-todo`; // helps keep track of most recently clicked sidebar button
});
