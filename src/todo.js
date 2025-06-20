export class Todo {
    constructor(title, description, dueDate, priority, notes, projectId) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = false;
        this.projectId = projectId;
    }

    updateTodoData({ title, description, dueDate, priority, notes, completed }) {
        console.log("udpate");
        this.title = title ?? this.title;
        this.description = description ?? this.description;
        this.dueDate = dueDate ?? this.dueDate;
        this.priority = priority ?? this.priority;
        this.notes = notes ?? this.notes;
        this.completed = completed ?? this.completed;
    }
}
