import { projectModal } from "./projectModal";
import { todoItem } from "./todoItem";
import { deleteProjectModal } from "./deleteProjectModal";

export const projectTodos = ({ project, todoApp }) => {
    // use project object to display all of its todos
    console.log(" ");
    console.log("projectTodos component");
    console.log(project);
    const mainDiv = document.querySelector(".main");
    mainDiv.innerHTML = "";

    // Create modal to edit project
    const projectEditModal = projectModal({ project, todoApp });
    mainDiv.appendChild(projectEditModal);

    // Create modal for deleting project
    const projectDeleteModal = deleteProjectModal({ project, todoApp });
    console.log("delete project modal");
    console.log(projectDeleteModal);
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
        todoItem(todo, project);
    });
};
