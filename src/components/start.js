export const start = () => {
    const mainDiv = document.querySelector(".main");
    mainDiv.innerHTML = "";
    const startTitle = document.createElement("h2");
    startTitle.textContent = "Use the sidebar to create a new project or a new todo item";
    startTitle.style.textAlign = "center";
    mainDiv.appendChild(startTitle);
};
