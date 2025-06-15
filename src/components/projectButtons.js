import { projectTodos } from "./projectTodos";

export const projectButtons = ({ todoApp }) => {
    const mainDiv = document.querySelector(".main");
    const projectButtonsDiv = document.querySelector(".project-sidebar-buttons");
    projectButtonsDiv.innerHTML = "";

    todoApp.projects?.forEach((project) => {
        const projectButton = document.createElement("button");
        const buttonId = `project-sidebar-${project.id}`;
        projectButton.setAttribute("id", buttonId);
        projectButton.textContent = project.title;
        projectButton.addEventListener("click", () => {
            projectTodos({ project, todoApp });
            mainDiv.dataset.buttonClicked = buttonId; // helps keep track of most recently clicked sidebar button
        });
        projectButtonsDiv.appendChild(projectButton);
    });
};
