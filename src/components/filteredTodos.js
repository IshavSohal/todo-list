import { todoItem } from "./todoItem";

export const filteredTodos = ({ todos, todoApp, type }) => {
    console.log(" ");
    console.log("filteredTodos");
    console.log(todos);
    const mainDiv = document.querySelector(".main");
    mainDiv.innerHTML = "";

    const title = document.createElement("h1");
    title.textContent = `${type} Todos`;
    title.style.marginBottom = "20px";
    mainDiv.appendChild(title);

    // for each project display its todos
    Object.entries(todos).forEach(([projectId, projectTodos]) => {
        if (projectTodos.length > 0) {
            const project = todoApp.getProject(projectId);

            const projectContainer = document.createElement("div");
            projectContainer.setAttribute("class", "project-todos");

            const projectTitle = document.createElement("h2");
            projectTitle.textContent = project.title;
            projectTitle.setAttribute("class", "project-subtitle");
            projectContainer.appendChild(projectTitle);

            projectTodos.forEach((todo) => {
                console.log("todo");
                console.log(todo);
                const todoDiv = todoItem({ todo, project, todoApp });
                projectContainer.appendChild(todoDiv);
            });

            mainDiv.appendChild(projectContainer);
        }
    });
};
