import { projectButtons } from "../projectButtons";
import { start } from "../start";

export const deleteProjectModal = ({ project, todoApp }) => {
    const deleteProjectModal = document.createElement("dialog");
    deleteProjectModal.setAttribute("class", "delete-modal");

    // Create project modal title element
    const projectModalTitle = document.createElement("h2");
    projectModalTitle.textContent = "Are you sure you want to delete this project?";
    deleteProjectModal.appendChild(projectModalTitle);

    // Create submit and cancel buttons. Submit button should create a new project object if `todoApp` is defined, otherwise
    // it should update the properties of `project`
    const projectButtonsContainer = document.createElement("div");
    projectButtonsContainer.setAttribute("class", "buttons");

    const projectModalCancel = document.createElement("button");
    projectModalCancel.textContent = "No";
    projectModalCancel.setAttribute("type", "reset");
    projectModalCancel.addEventListener("click", () => {
        deleteProjectModal.close();
    });
    projectButtonsContainer.appendChild(projectModalCancel);

    const projectModalSubmit = document.createElement("button");
    projectModalSubmit.textContent = "Yes";
    projectModalSubmit.setAttribute("type", "submit");
    projectModalSubmit.addEventListener("click", () => {
        todoApp.deleteProject(project.id);
        projectButtons({ todoApp }); // update the sidebar buttons
        start(); // switch the .main div to the default page
    });
    projectButtonsContainer.appendChild(projectModalSubmit);
    deleteProjectModal.appendChild(projectButtonsContainer);

    return deleteProjectModal;
};
