import { projectTodos } from "./projectTodos";

export const projectButtons = (projects) => {
    const projectButtonsDiv = document.querySelector(".project-buttons");
    projectButtonsDiv.innerHTML = "";

    projects.forEach((project) => {
        const projectButton = document.createElement("button");
        projectButton.textContent = project.title;
        projectButton.addEventListener("click", () => {
            projectTodos(project);
        });
        projectButtonsDiv.appendChild(projectButton);
    });
};
