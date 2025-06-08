export class Project {
    constructor(title, description) {
        this.id = crypto.randomUUID();
        this.todos = [];
        this.title = title;
        this.description = description;
    }

    addTodo(todoItem) {
        // We want to avoid duplicate todo items in the same project
        if (!this.containsTodo(todoItem)) {
            this.todos.push(todoItem);
        }
    }

    // Remove a todo item using its id
    removeTodo(todoItem) {
        this.todos = this.todos.filter((todo) => todo.id !== todoItem.id);
    }

    containsTodo(todoItem) {
        return this.todos.some((todo) => todo.id === todoItem.id);
    }
}
