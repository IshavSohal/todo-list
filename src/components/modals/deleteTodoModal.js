export const deleteTodoModal = ({ todo, project, todoApp }) => {
    const mainDiv = document.querySelector(".main");
    const deleteTodoModal = document.createElement("dialog");
    deleteTodoModal.setAttribute("class", "delete-modal");

    // Create todo modal title element
    const todoModalTitle = document.createElement("h2");
    todoModalTitle.textContent = "Are you sure you want to delete this Todo item?";
    deleteTodoModal.appendChild(todoModalTitle);

    // Create submit and cancel buttons. Submit button should create a new todo object if `todoApp` is defined, otherwise
    // it should update the properties of `todo`
    const todoButtonsContainer = document.createElement("div");
    todoButtonsContainer.setAttribute("class", "buttons");

    const todoModalCancel = document.createElement("button");
    todoModalCancel.textContent = "No";
    todoModalCancel.setAttribute("type", "reset");
    todoModalCancel.addEventListener("click", () => {
        deleteTodoModal.close();
    });
    todoButtonsContainer.appendChild(todoModalCancel);

    const todoModalSubmit = document.createElement("button");
    todoModalSubmit.textContent = "Yes";
    todoModalSubmit.setAttribute("type", "submit");
    todoModalSubmit.addEventListener("click", () => {
        todoApp.deleteTodo(todo, project);
        // Rerender the contents of the main div by dispatching a click event on the most recently clicked sidebar
        // button (very scuffed)
        if (mainDiv.dataset.buttonClicked) {
            const sidebarButton = document.querySelector(`#${mainDiv.dataset.buttonClicked}`);
            const clickEvent = new Event("click");
            sidebarButton?.dispatchEvent(clickEvent);
        }
    });
    todoButtonsContainer.appendChild(todoModalSubmit);
    deleteTodoModal.appendChild(todoButtonsContainer);

    return deleteTodoModal;
};
