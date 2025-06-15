import { todoModal } from "./modals/todoModal";
import { deleteTodoModal } from "./modals/deleteTodoModal";

export const todoItem = ({ todo, project, todoApp }) => {
    const mainDiv = document.querySelector(".main");

    // Create a modal for editing this todo
    const todoEditModal = todoModal({ todo });
    mainDiv.appendChild(todoEditModal);

    // Create a modal for deleting this todo
    const todoDeleteModal = deleteTodoModal({ todo, project, todoApp });
    mainDiv.appendChild(todoDeleteModal);

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
    todoEdit.setAttribute("class", "edit-button");
    todoEdit.textContent = "Edit";
    todoEdit.addEventListener("click", () => {
        // create a modal for editing the current todo item
        todoEditModal.showModal();
    });
    todoButtonsContainer.appendChild(todoEdit);

    // Create todo delete button
    const todoDelete = document.createElement("button");
    todoDelete.setAttribute("class", "delete-button");
    todoDelete.textContent = "Delete";
    todoDelete.addEventListener("click", () => {
        todoDeleteModal.showModal();
    });
    todoButtonsContainer.appendChild(todoDelete);

    todoDiv.appendChild(todoButtonsContainer);
    mainDiv.appendChild(todoDiv);
};
