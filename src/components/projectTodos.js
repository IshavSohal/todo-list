import { todoModal } from "./todoModal";
import { todoItem } from "./todoItem";

export const projectTodos = (project) => {
    // use project object to display all of its todos
    console.log(" ");
    console.log("projectTodos component");
    console.log(project);
    const mainDiv = document.querySelector(".main");
    mainDiv.innerHTML = "";

    // Create project title element
    const projectTitle = document.createElement("h1");
    projectTitle.textContent = project.title;
    projectTitle.style.marginBottom = "10px";
    mainDiv.appendChild(projectTitle);

    // Create project description element
    const projectDesc = document.createElement("p");
    projectDesc.textContent = project.description;
    mainDiv.appendChild(projectDesc);

    // Create project edit button

    // Create project delete button

    // Create a div for each todo
    project.todos.forEach((todo) => {
        todoItem(todo, project, mainDiv);
    });
};
