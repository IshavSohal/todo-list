import { Todo } from "./todo";
import { Project } from "./project";
import "./styles.css";

export class App {
    projects = [new Project("Default", "This is the defaut project!")];

    createProject(title, description) {
        const project = new Project(title, description);
        this.projects.push(project);
        console.log(this.projects);
    }

    deleteProject(projectId) {
        this.projects = this.project.filter((project) => project.id !== projectId);
    }

    // Should project be the project id? or the actual project? this method will be getting
    // called from index.js, which doesn't have access to anything but the DOM. So, for each project
    // button, create a data field that corresponds to the project id
    createTodo(title, description, date, priority, notes, projectId) {
        console.log(" ");
        console.log("createTodo");
        const todo = new Todo(title, description, date, priority, notes);
        console.log("todo created");
        console.log(todo);
        console.log("project id");
        console.log(projectId);
        if (projectId) {
            // check if project exists
            const project = this.projects.find((project) => project.id === projectId);
            project.addTodo(todo);
        } else {
            this.projects[0].addTodo(todo);
        }
    }

    /**
     * List all todo items which are due within the given time range
     */
    timeSensitiveTodos(startDate, endDate) {
        const todos = [];
        const allTodos = getAllTodos();
        allTodos.forEach((todo) => {
            if (todo.dueDate >= startDate && todo.dueDate <= endDate) {
                todos.append(todo);
            }
        });

        return todos;
    }

    getTodayTodos() {
        const today = new Date();
        return this.timeSensitiveTodos(today, today);
    }

    /**
     * Get all todo items from all projects
     */
    getAllTodos() {
        const allTodos = [];

        this.projects.forEach((project) => {
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
    moveTodo(currentProject, newProject, todoItem) {
        if (currentProject.containsTodo(todoItem)) {
            currentProject.removeTodo(todoItem);
            newProject.addTodo(todoItem);
        }
    }
}
