import { projectModal } from "./modals/projectModal";
import { todoItem } from "./todoItem";
import { deleteProjectModal } from "./modals/deleteProjectModal";

export const projectTodos = ({ project, todoApp }) => {
    const mainDiv = document.querySelector(".main");
    mainDiv.innerHTML = "";

    // Create modal to edit project
    const projectEditModal = projectModal({ project, todoApp, type: "edit" });
    mainDiv.appendChild(projectEditModal);

    // Create modal for deleting project
    const projectDeleteModal = deleteProjectModal({ project, todoApp });
    mainDiv.appendChild(projectDeleteModal);

    // Create project edit/delete buttons
    const projectButtonsContainer = document.createElement("div");
    projectButtonsContainer.setAttribute("class", "project-buttons");

    const projectEdit = document.createElement("button");
    projectEdit.textContent = "Edit Project";
    projectEdit.setAttribute("class", "edit-button");
    projectEdit.addEventListener("click", () => {
        // open modal to edit the project
        projectEditModal.showModal();
    });
    projectButtonsContainer.appendChild(projectEdit);

    const projectDelete = document.createElement("button");
    projectDelete.textContent = "Delete Project";
    projectDelete.setAttribute("class", "delete-button");
    projectDelete.addEventListener("click", () => {
        // display warning modal
        projectDeleteModal.showModal();
    });
    projectButtonsContainer.appendChild(projectDelete);
    mainDiv.appendChild(projectButtonsContainer);

    // Create project title element
    const projectTitle = document.createElement("h1");
    projectTitle.textContent = project.title;
    projectTitle.style.marginBottom = "10px";
    mainDiv.appendChild(projectTitle);

    // Create project description element
    const projectDesc = document.createElement("p");
    projectDesc.textContent = project.description;
    projectDesc.style.textAlign = "center";
    projectDesc.style.marginBottom = "10px";
    mainDiv.appendChild(projectDesc);

    // Create a div for each todo
    project.todos.forEach((todo) => {
        const todoDiv = todoItem({ todo, project, todoApp });
        mainDiv.appendChild(todoDiv);
    });

    // Create a button for adding a todo into this particular project
    const addTodoButton = document.createElement;
};
