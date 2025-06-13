import { projectTodos } from "./projectTodos";

export const projectButtons = (projects) => {
    const mainDiv = document.querySelector(".main");
    const projectButtonsDiv = document.querySelector(".project-buttons");
    projectButtonsDiv.innerHTML = "";

    projects.forEach((project) => {
        const projectButton = document.createElement("button");
        const buttonId = `project-sidebar-${project.id}`;
        projectButton.setAttribute("id", buttonId);
        projectButton.textContent = project.title;
        projectButton.addEventListener("click", () => {
            projectTodos(project);
            console.log("all projects");
            console.log(projects);
            mainDiv.dataset.buttonClicked = buttonId; // helps keep track of most recently clicked sidebar button
        });
        projectButtonsDiv.appendChild(projectButton);
    });
};
