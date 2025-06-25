import { projectTodos } from "./projectTodos";
import { dropdown } from "../../node_modules/dropdown-component-js/index.js";
import { deleteProjectModal } from "./modals/deleteProjectModal";
import { projectModal } from "./modals/projectModal";

export const projectButtons = ({ todoApp }) => {
    const mainDiv = document.querySelector(".main");
    const projectButtonsDiv = document.querySelector(".project-sidebar-buttons");
    projectButtonsDiv.innerHTML = "";

    todoApp.projects?.forEach((project) => {
        const projectButton = document.createElement("div");
        const buttonId = `project-sidebar-${project.id}`;
        projectButton.setAttribute("id", buttonId);
        projectButton.style.border = "1px solid black";
        projectButton.style.padding = "5px";
        projectButton.textContent = project.title;

        // Create modal to edit project
        const projectEditModal = projectModal({ project, todoApp, type: "edit" });
        projectButtonsDiv.appendChild(projectEditModal);

        // Create modal for deleting project
        const projectDeleteModal = deleteProjectModal({ project, todoApp });
        projectButtonsDiv.appendChild(projectDeleteModal);

        // Create dropdown content for editing/deleting the todo
        const dropdownContent = document.createElement("div");
        const dropdownId = `dropdown-component-${project.id}`;
        dropdownContent.setAttribute("class", "dropdown-content");
        dropdownContent.setAttribute("id", dropdownId);
        const dropdownEditButton = document.createElement("div");
        dropdownEditButton.setAttribute("class", "dropdown-item");
        dropdownEditButton.textContent = "Edit";
        dropdownEditButton.addEventListener("click", () => {
            projectEditModal.showModal();
        });
        dropdownContent.appendChild(dropdownEditButton);
        const dropdownDeleteButton = document.createElement("div");
        dropdownDeleteButton.setAttribute("class", "dropdown-item");
        dropdownDeleteButton.textContent = "Delete";
        dropdownDeleteButton.addEventListener("click", () => {
            projectDeleteModal.showModal();
        });
        dropdownContent.appendChild(dropdownDeleteButton);
        projectButton.appendChild(dropdownContent);
        let dropdownButton = null;
        const dropdownInterval = setInterval(() => {
            const dropdownEl = document.querySelector(`#${dropdownId}`);
            if (dropdownEl) {
                clearInterval(dropdownInterval);
                dropdownButton = dropdown({ dropdownId: dropdownId, parentId: buttonId });
            }
        }, 100);

        // Do not open project data when the dropdown is interacted with
        projectButton.addEventListener("click", (e) => {
            if (!dropdownButton?.contains(e.target) && !dropdownContent.contains(e.target)) {
                projectTodos({ project, todoApp });
                mainDiv.dataset.buttonClicked = buttonId; // helps keep track of most recently clicked sidebar button
            }
        });

        projectButtonsDiv.appendChild(projectButton);
    });
};
