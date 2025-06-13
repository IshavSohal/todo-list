import { projectTodos } from "./projectTodos";

export const projectButtons = (projects) => {
    const projectButtonsDiv = document.querySelector(".project-buttons");
    projectButtonsDiv.innerHTML = "";

    projects.forEach((project) => {
        const projectButton = document.createElement("button");
        projectButton.setAttribute("id", `project-sidebar-${project.id}`);
        projectButton.textContent = project.title;
        projectButton.addEventListener("click", () => {
            projectTodos(project);
            console.log("all projects");
            console.log(projects);
        });
        projectButtonsDiv.appendChild(projectButton);
    });
};
