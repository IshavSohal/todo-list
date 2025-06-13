import { todoModal } from "./todoModal";

export const projectTodos = (project) => {
    // use project object to display all of its todos
    console.log(" ");
    console.log("projectTodos component");
    console.log(project);
    const mainDiv = document.querySelector(".main");
    mainDiv.innerHTML = "";

    // Create project title element
    const projectTitle = document.createElement("h2");
    projectTitle.textContent = `Todos for ${project.title}`;
    projectTitle.style.marginBottom = "5px";
    mainDiv.appendChild(projectTitle);

    // Create a div for each todo
    project.todos.forEach((todo) => {
        const todoEditModal = todoModal(todo, project);
        mainDiv.appendChild(todoEditModal);

        // maybe we handle submit click here?
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

        // Create todo edit button
        const todoEdit = document.createElement("button");
        todoEdit.setAttribute("class", "edit-todo");
        todoEdit.textContent = "Edit";
        todoEdit.addEventListener("click", () => {
            // create a modal for editing the current todo item
            todoEditModal.showModal();
        });
        todoDiv.appendChild(todoEdit);

        mainDiv.appendChild(todoDiv);
    });
};
