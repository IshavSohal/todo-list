import { format } from "date-fns";

export const todoModal = ({ todo, todoApp }) => {
    const mainDiv = document.querySelector(".main");
    const todoModal = document.createElement("dialog");

    // Create todo modal title element
    const todoModalTitle = document.createElement("h2");
    todoModalTitle.textContent = "Enter Todo item's details";
    todoModal.appendChild(todoModalTitle);

    // Create todo modal error message
    const todoModalError = document.createElement("p");
    todoModalError.setAttribute("class", "dialog-error");
    todoModal.appendChild(todoModalError);

    const clearErrorInput = () => {
        todoModalError.textContent = "";
    };

    // Create todo modal form
    const todoModalForm = document.createElement("form");
    todoModalForm.setAttribute("method", "dialog");
    todoModalForm.setAttribute("action", "");

    // Create todo modal form title input
    const todoTitleContainer = document.createElement("div");
    todoTitleContainer.setAttribute("class", "form-input");
    const todoTitleInputId = todo ? `todo-title-${todo.id}` : "todo-title";
    const todoTitleLabel = document.createElement("label");
    todoTitleLabel.setAttribute("for", todoTitleInputId);
    todoTitleLabel.textContent = "Title";

    const todoTitleInput = document.createElement("input");
    todoTitleInput.setAttribute("type", "text");
    todoTitleInput.setAttribute("id", todoTitleInputId);
    todoTitleInput.setAttribute("name", "todo-title");
    todoTitleInput.required = true;
    todoTitleInput.value = todo ? todo.title : "";
    todoTitleInput.addEventListener("input", clearErrorInput);

    todoTitleContainer.appendChild(todoTitleLabel);
    todoTitleContainer.appendChild(todoTitleInput);
    todoModalForm.appendChild(todoTitleContainer);

    // Create todo modal form description input
    const todoDescContainer = document.createElement("div");
    todoDescContainer.setAttribute("class", "form-input");
    const todoDescInputId = todo ? `todo-desc-${todo.id}` : "todo-desc";
    const todoDescLabel = document.createElement("label");
    todoDescLabel.setAttribute("for", todoDescInputId);
    todoDescLabel.textContent = "Description";

    const todoDescInput = document.createElement("textarea");
    todoDescInput.setAttribute("id", todoDescInputId);
    todoDescInput.setAttribute("name", "todo-desc");
    todoDescInput.required = true;
    todoDescInput.value = todo ? todo.description : "";
    todoDescInput.addEventListener("input", clearErrorInput);

    todoDescContainer.appendChild(todoDescLabel);
    todoDescContainer.appendChild(todoDescInput);
    todoModalForm.appendChild(todoDescContainer);

    // Create todo modal form due date input
    const todoDateContainer = document.createElement("div");
    todoDateContainer.setAttribute("class", "form-input");
    const todoDateInputId = todo ? `todo-date-${todo.id}` : "todo-date";
    const todoDateLabel = document.createElement("label");
    todoDateLabel.setAttribute("for", todoDateInputId);
    todoDateLabel.textContent = "Due Date";

    const todoDateInput = document.createElement("input");
    todoDateInput.setAttribute("type", "date");
    todoDateInput.setAttribute("id", todoDateInputId);
    todoDateInput.setAttribute("name", "todo-date");
    todoDateInput.required = true;
    todoDateInput.value = todo ? todo.dueDate : format(new Date(), "yyyy-MM-dd");

    todoDateContainer.appendChild(todoDateLabel);
    todoDateContainer.appendChild(todoDateInput);
    todoModalForm.appendChild(todoDateContainer);

    // Create todo modal form priority input
    const todoPriorityContainer = document.createElement("div");
    todoPriorityContainer.setAttribute("class", "form-input");
    const todoPriorityInputId = todo ? `todo-priority-${todo.id}` : "todo-priority";
    const todoPriorityLabel = document.createElement("label");
    todoPriorityLabel.setAttribute("for", todoPriorityInputId);
    todoPriorityLabel.textContent = "Priority";

    const todoPriorityInput = document.createElement("select");
    todoPriorityInput.setAttribute("id", todoPriorityInputId);
    todoPriorityInput.setAttribute("name", "todo-priority");
    todoPriorityInput.required = true;
    const todoPriorityLow = document.createElement("option");
    todoPriorityLow.setAttribute("value", "low");
    todoPriorityLow.textContent = "Low";
    todoPriorityInput.appendChild(todoPriorityLow);
    const todoPriorityMid = document.createElement("option");
    todoPriorityMid.setAttribute("value", "mid");
    todoPriorityMid.textContent = "Medium";
    todoPriorityInput.appendChild(todoPriorityMid);
    const todoPriorityHigh = document.createElement("option");
    todoPriorityHigh.setAttribute("value", "high");
    todoPriorityHigh.textContent = "High";
    todoPriorityInput.appendChild(todoPriorityHigh);
    todoPriorityInput.value = todo ? todo.priority : "low";

    todoPriorityContainer.appendChild(todoPriorityLabel);
    todoPriorityContainer.appendChild(todoPriorityInput);
    todoModalForm.appendChild(todoPriorityContainer);

    // Create todo modal form notes input
    const todoNotesContainer = document.createElement("div");
    todoNotesContainer.setAttribute("class", "form-input");
    const todoNotesInputId = todo ? `todo-notes-${todo.id}` : "todo-notes";
    const todoNotesLabel = document.createElement("label");
    todoNotesLabel.setAttribute("for", todoNotesInputId);
    todoNotesLabel.textContent = "Notes";

    const todoNotesInput = document.createElement("textarea");
    todoNotesInput.setAttribute("id", todoNotesInputId);
    todoNotesInput.setAttribute("name", "todo-notes");
    todoNotesInput.value = todo ? todo.notes : "";

    todoNotesContainer.appendChild(todoNotesLabel);
    todoNotesContainer.appendChild(todoNotesInput);
    todoModalForm.appendChild(todoNotesContainer);

    // Create todo modal form project selection input, ONLY if this modal is for a new todo item
    if (todoApp) {
        const todoProjectContainer = document.createElement("div");
        todoProjectContainer.setAttribute("class", "form-input");
        const todoProjectInputId = todo ? `todo-project-${todo.id}` : "todo-project";
        const todoProjectLabel = document.createElement("label");
        todoProjectLabel.setAttribute("for", todoProjectInputId);
        todoProjectLabel.textContent = "Project";

        const todoProjectInput = document.createElement("select");
        todoProjectInput.setAttribute("id", todoProjectInputId);
        todoProjectInput.setAttribute("name", "todo-project");
        todoProjectInput.required = true;
        todoApp.projects.forEach((project) => {
            const todoProject = document.createElement("option");
            todoProject.setAttribute("value", project.id);
            todoProject.textContent = project.title;
            todoProjectInput.appendChild(todoProject);
        });

        todoProjectContainer.appendChild(todoProjectLabel);
        todoProjectContainer.appendChild(todoProjectInput);
        todoModalForm.appendChild(todoProjectContainer);
    }

    todoModal.appendChild(todoModalForm);

    // Create submit and cancel buttons. Submit button should create a new todo object if `todoApp` is defined, otherwise
    // it should update the properties of `todo`
    const todoButtonsContainer = document.createElement("div");
    todoButtonsContainer.setAttribute("class", "buttons");

    const todoModalCancel = document.createElement("button");
    todoModalCancel.textContent = "Cancel";
    todoModalCancel.setAttribute("type", "reset");
    todoModalCancel.setAttribute("id", todo ? `todo-cancel-${todo.id}` : "todo-cancel");
    todoModalCancel.addEventListener("click", () => {
        todoModal.close();
    });
    todoButtonsContainer.appendChild(todoModalCancel);

    const todoModalSubmit = document.createElement("button");
    todoModalSubmit.textContent = todo ? "Update" : "Add";
    todoModalSubmit.setAttribute("type", "submit");
    todoModalSubmit.setAttribute("id", todo ? `todo-submit-${todo.id}` : "todo-submit");
    todoModalSubmit.addEventListener("click", () => {
        const formData = Object.fromEntries(new FormData(todoModalForm));
        const formValues = Object.values(formData);
        console.log(formValues);
        console.log(formData);
        if (todo) {
            if (formData["todo-title"] && formData["todo-desc"] && formData["todo-date"] && formData["todo-priority"]) {
                // Update the todo with the form data
                todo.updateTodoData(...formValues);
                console.log("success");
                todoModal.close();
            } else {
                console.log("ERROR");
                todoModalError.textContent = "Do not leave any of the required fields empty!";
            }
        } else if (todoApp) {
            // Get data from inputs, and create a new Todo item
            if (formData["todo-title"] && formData["todo-desc"] && formData["todo-date"] && formData["todo-priority"]) {
                todoApp.createTodo(...formValues);
                todoModal.close();
                console.log("success");
            } else {
                console.log("error");
                todoModalError.textContent = "Do not leave any of the required fields empty!";
            }
        }

        // Rerender the contents of the main div by dispatching a click event on the most recently clicked sidebar
        // button (very scuffed)
        if (mainDiv.dataset.buttonClicked) {
            const sidebarButton = document.querySelector(`#${mainDiv.dataset.buttonClicked}`);
            const clickEvent = new Event("click");
            sidebarButton?.dispatchEvent(clickEvent);
        }
    });
    todoButtonsContainer.appendChild(todoModalSubmit);
    todoModal.appendChild(todoButtonsContainer);

    // Note: we don't append the modal to an element yet, since this can be used in the .app div or .main div
    return todoModal;
};
