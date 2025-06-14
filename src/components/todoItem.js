import { todoModal } from "./todoModal";

export const todoItem = (todo, project, parentEl) => {
    // Create a modal for editing this todo
    const todoEditModal = todoModal({ todo });
    parentEl.appendChild(todoEditModal);
    const todoModalSubmit = todoEditModal.querySelector('button[type="submit"]');
    console.log(todoModalSubmit);

    const todoDiv = document.createElement("div");
    todoDiv.setAttribute("class", "todo-item");

    // Create checkbox for toggling completion state
    const todoCheckbox = document.createElement("input");
    todoCheckbox.setAttribute("class", "todo-toggle");
    todoCheckbox.setAttribute("type", "checkbox");
    todoCheckbox.addEventListener("change", () => {
        todo.setCompletedStatus(todoCheckbox.checked);
    });
    todoCheckbox.checked = todo.completed;
    todoDiv.appendChild(todoCheckbox);

    // Create todo title element
    const todoTitle = document.createElement("h3");
    todoTitle.textContent = todo.title;
    todoDiv.appendChild(todoTitle);

    // Create todo due date element
    const todoDueDate = document.createElement("p");
    todoDueDate.textContent = todo.dueDate;
    todoDiv.appendChild(todoDueDate);

    const todoButtonsContainer = document.createElement("div");
    todoButtonsContainer.setAttribute("class", "todo-item-buttons");

    // Create todo edit button
    const todoEdit = document.createElement("button");
    todoEdit.setAttribute("class", "edit-todo");
    todoEdit.textContent = "Edit";
    todoEdit.addEventListener("click", () => {
        // create a modal for editing the current todo item
        todoEditModal.showModal();
    });
    todoButtonsContainer.appendChild(todoEdit);

    // Create todo delete button
    const todoDelete = document.createElement("button");
    todoDelete.setAttribute("class", "delete-todo");
    todoDelete.textContent = "Delete";
    todoDelete.addEventListener("click", () => {
        project.removeTodo(todo);
        // Rerender the contents of the main div by dispatching a click event on the most recently clicked sidebar
        // button (very scuffed)
        if (parentEl.dataset.buttonClicked) {
            const sidebarButton = document.querySelector(`#${parentEl.dataset.buttonClicked}`);
            const clickEvent = new Event("click");
            sidebarButton?.dispatchEvent(clickEvent);
        }
    });
    todoButtonsContainer.appendChild(todoDelete);

    todoDiv.appendChild(todoButtonsContainer);
    parentEl.appendChild(todoDiv);
};
