import { projectButtons } from "../projectButtons.js";
import { projectTodos } from "../projectTodos.js";

export const projectModal = ({ project, todoApp }) => {
    const projectModal = document.createElement("dialog");

    // Create project modal title element
    const projectModalTitle = document.createElement("h2");
    projectModalTitle.textContent = "Enter Project's details";
    projectModal.appendChild(projectModalTitle);

    // Create project modal error message
    const projectModalError = document.createElement("p");
    projectModalError.setAttribute("class", "dialog-error");
    projectModal.appendChild(projectModalError);

    const clearErrorInput = () => {
        projectModalError.textContent = "";
    };

    // Create project modal form
    const projectModalForm = document.createElement("form");
    projectModalForm.setAttribute("method", "dialog");
    projectModalForm.setAttribute("action", "");

    // Create project modal form title input
    const projectTitleContainer = document.createElement("div");
    projectTitleContainer.setAttribute("class", "form-input");
    const projectTitleInputId = project ? `project-title-${project.id}` : "project-title";
    const projectTitleLabel = document.createElement("label");
    projectTitleLabel.setAttribute("for", projectTitleInputId);
    projectTitleLabel.textContent = "Title";

    const projectTitleInput = document.createElement("input");
    projectTitleInput.setAttribute("type", "text");
    projectTitleInput.setAttribute("id", projectTitleInputId);
    projectTitleInput.setAttribute("name", "project-title");
    projectTitleInput.required = true;
    projectTitleInput.value = project ? project.title : "";
    projectTitleInput.addEventListener("input", clearErrorInput);

    const projectTitleSpan = document.createElement("span");

    projectTitleContainer.appendChild(projectTitleLabel);
    projectTitleContainer.appendChild(projectTitleInput);
    projectTitleContainer.appendChild(projectTitleSpan);
    projectModalForm.appendChild(projectTitleContainer);

    // Create project modal form description input
    const projectDescContainer = document.createElement("div");
    projectDescContainer.setAttribute("class", "form-input");
    const projectDescInputId = project ? `project-desc-${project.id}` : "project-desc";
    const projectDescLabel = document.createElement("label");
    projectDescLabel.setAttribute("for", projectDescInputId);
    projectDescLabel.textContent = "Description";

    const projectDescInput = document.createElement("textarea");
    projectDescInput.setAttribute("id", projectDescInputId);
    projectDescInput.setAttribute("name", "project-desc");
    projectDescInput.required = true;
    projectDescInput.value = project ? project.description : "";
    projectDescInput.addEventListener("input", clearErrorInput);

    const projectDescSpan = document.createElement("span");

    projectDescContainer.appendChild(projectDescLabel);
    projectDescContainer.appendChild(projectDescInput);
    projectDescContainer.appendChild(projectDescSpan);
    projectModalForm.appendChild(projectDescContainer);

    projectModal.appendChild(projectModalForm);

    // Create submit and cancel buttons. Submit button should create a new project object if `todoApp` is defined, otherwise
    // it should update the properties of `project`
    const projectButtonsContainer = document.createElement("div");
    projectButtonsContainer.setAttribute("class", "buttons");

    const projectModalCancel = document.createElement("button");
    projectModalCancel.textContent = "Cancel";
    projectModalCancel.setAttribute("type", "reset");
    projectModalCancel.setAttribute("id", project ? `project-cancel-${project.id}` : "project-cancel");
    projectModalCancel.addEventListener("click", () => {
        projectModal.close();
    });
    projectButtonsContainer.appendChild(projectModalCancel);

    const projectModalSubmit = document.createElement("button");
    projectModalSubmit.textContent = project ? "Update" : "Add";
    projectModalSubmit.setAttribute("type", "submit");
    projectModalSubmit.setAttribute("id", project ? `project-submit-${project.id}` : "project-submit");
    projectModalSubmit.addEventListener("click", () => {
        const formData = Object.fromEntries(new FormData(projectModalForm));
        const formValues = Object.values(formData);
        console.log(formValues);
        console.log(formData);
        if (project) {
            if (formData["project-title"] && formData["project-desc"]) {
                // Update the project with the form data
                project.updateProjectData(...formValues);
                projectModal.close();

                // Rerender the contents of the main div by dispatching a click event on the most recently clicked sidebar
                // button. Also rerender the project buttons in the sidebar, in case the project title changed
                projectTodos({ project, todoApp });
                projectButtons({ todoApp });
            } else {
                projectModalError.textContent = "Do not leave any of the required fields empty!";
            }
        } else if (todoApp) {
            // Get data from inputs, and create a new project item
            if (formData["project-title"] && formData["project-desc"]) {
                todoApp.createProject(...formValues);
                projectModal.close();

                // Rerender the project buttons in the sidebar
                projectButtons({ todoApp });
            } else {
                projectModalError.textContent = "Do not leave any of the required fields empty!";
            }
        }
    });
    projectButtonsContainer.appendChild(projectModalSubmit);
    projectModal.appendChild(projectButtonsContainer);

    // Note: we don't append the modal to an element yet, since this can be used in the .app div or .main div
    return projectModal;
};
