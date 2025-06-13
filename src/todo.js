export class Todo {
    constructor(title, description, dueDate, priority, notes) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = false;
    }

    updateTodoData(title, description, dueDate, priority, notes) {
        console.log("udpate");
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }

    setCompletedStatus(value) {
        console.log("set completerd tpo");
        console.log(value);
        this.completed = value;
    }
}
