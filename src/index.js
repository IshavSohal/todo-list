import { Todo } from "./todo";
import { Project } from "./project";
import "./styles.css";

const projects = [];
createProject("Default", "This is a default project. Feel free to create a new one! ");

function createProject(title, description) {
    const project = new Project(title, description);
    projects.push(project);
    console.log(projects);
}

/**
 * List all todo items which are due within the given time range
 */
function timeSensitiveTodos(startDate, endDate) {
    const todos = [];
    const allTodos = getAllTodos();
    allTodos.forEach((todo) => {
        if (todo.dueDate >= startDate && todo.dueDate <= endDate) {
            todos.append(todo);
        }
    });

    return todos;
}

function getTodayTodos() {
    const todos = [];
    const allTodos = getAllTodos();
    allTodos.forEach((todo) => {
        if (todo.dueDate === new Date()) {
            todos.append(todo);
        }
    });

    return todos;
}

/**
 * Get all todo items from all projects
 */
function getAllTodos() {
    const allTodos = [];

    projects.forEach((project) => {
        allTodos.concat(project.todos);
    });

    return allTodos;
}

/**
 * Moves an exisiting todo item from one project to another
 *
 * @param {currentProject} Project the project witin which the todo item resides
 * @param {newProject} Project the project within which the todo item will be moved
 * @param {todoItem} Todo the todo item being moved
 */
function moveTodo(currentProject, newProject, todoItem) {
    if (currentProject.containsTodo(todoItem)) {
        currentProject.removeTodo(todoItem);
        newProject.addTodo(todoItem);
    }
}

createProject("test", "this is project s1");
createProject("testagain", "this is project 2");
const todo1 = new Todo("title", "description", new Date(), "high", "na");
const todo2 = new Todo("title", "description", new Date(), "high", "na");

console.log(todo1);
projects[1].addTodo(todo1);
projects[0].addTodo(todo2);
projects[1].removeTodo(todo1.id);
