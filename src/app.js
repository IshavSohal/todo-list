import { Todo } from "./todo";
import { Project } from "./project";
import { format } from "date-fns";

export class App {
    constructor() {
        this.projects = this.getLocalStorage();
        console.log("projects");
        console.log(this.projects);
    }

    createProject(title, description) {
        const project = new Project(title, description);
        this.projects.push(project);
        this.setLocalStorage();
    }

    getProject(projectId) {
        return this.projects.find((project) => project.id === projectId);
    }

    deleteProject(projectId) {
        this.projects = this.projects.filter((project) => project.id !== projectId) ?? [];
        this.setLocalStorage();
    }

    updateProject(project, title, description) {
        project.updateProjectData(title, description);
        this.setLocalStorage();
    }

    // Should project be the project id? or the actual project? this method will be getting
    // called from index.js, which doesn't have access to anything but the DOM. So, for each project
    // button, create a data field that corresponds to the project id
    createTodo(title, description, date, priority, notes, projectId) {
        const todo = new Todo(title, description, date, priority, notes, projectId);
        if (projectId) {
            // check if project exists
            const project = this.projects.find((project) => project.id === projectId);
            project.addTodo(todo);
        } else {
            this.projects[0].addTodo(todo);
        }
        this.setLocalStorage();
    }

    deleteTodo(todo, project) {
        project.removeTodo(todo);
        this.setLocalStorage();
    }

    updateTodo(todo, { title, description, dueDate, priority, notes, completed }) {
        todo.updateTodoData({ title, description, dueDate, priority, notes, completed });
        this.setLocalStorage();
    }

    setLocalStorage() {
        localStorage.setItem("projects", JSON.stringify(this.projects));
    }

    getLocalStorage() {
        const projects = JSON.parse(localStorage.getItem("projects"));
        if (projects) {
            projects?.forEach((project) => {
                Object.setPrototypeOf(project, Project.prototype);
                project.todos.forEach((todo) => {
                    Object.setPrototypeOf(todo, Todo.prototype);
                });
            });
            return projects;
        } else {
            return [
                new Project(
                    "Default",
                    "This is the defaut project! Feel free to add a new one using the sidebar button"
                ),
            ];
        }
    }

    /**
     * Get all todo items from all projects
     */
    getAllTodos() {
        const allTodos = {};

        this.projects.forEach((project) => {
            console.log("project");
            console.log(project);
            allTodos[project.id] = project.todos;
        });

        return allTodos;
    }

    /**
     * List all todo items which are due within the given time range
     */
    getTimeSensitiveTodos(startDate, endDate) {
        const allTodos = this.getAllTodos();
        console.log("alltodos");
        console.log(allTodos);

        Object.keys(allTodos).forEach((key) => {
            allTodos[key] = allTodos[key].filter((todo) => {
                const todoDate = new Date(todo.dueDate);
                console.log(todoDate);
                return todoDate >= startDate && todoDate <= endDate;
            });
        });

        return allTodos;
    }

    getTodayTodos() {
        const todayDate = new Date().setHours(0, 0, 0, 0);
        return this.getTimeSensitiveTodos(todayDate, todayDate);
    }

    getUpcomingTodos() {
        const todayDate = new Date().setHours(0, 0, 0, 0);
        return this.getTimeSensitiveTodos(todayDate, Infinity);
    }

    getPastTodos() {
        const todayDate = new Date().setHours(0, 0, 0, 0);
        return this.getTimeSensitiveTodos(-Infinity, todayDate);
    }

    getCompletedTodos() {
        const allTodos = this.getAllTodos();

        Object.keys(allTodos).forEach((key) => {
            allTodos[key] = allTodos[key].filter((todo) => {
                return todo.completed;
            });
        });

        return allTodos;
    }
}
