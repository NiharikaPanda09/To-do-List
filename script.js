
let addTask = document.getElementById("add-task-button");
let input = document.getElementById("input-task");
let taskList = document.getElementById("task-list");


function saveTasks() {
    const tasks = Array.from(taskList.querySelectorAll("li")).map((li) => ({
        value: li.querySelector(".task").textContent,
        completed: li.querySelector(".check").checked,
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = ""; // Clear the task list to avoid duplicates

    storedTasks.forEach((task) => {
        taskList.insertAdjacentHTML(
            "beforeend",
            `<li>
                <input type="checkbox" class="check" ${task.completed ? "checked" : ""}>
                <span class="task" style="text-decoration: ${task.completed ? "line-through" : "none"}">
                    ${task.value}
                </span>
                <button onclick="deleteItem(this)" class="delete-btn"></button>
            </li>`
        );
    });

    addCheckBoxListeners(); // Reattach checkbox listeners
}

// Add a new task
addTask.addEventListener("click", function (event) {
    event.preventDefault();
    const taskVal = input.value.trim();

    if (taskVal !== "") {
        taskList.insertAdjacentHTML(
            "beforeend",
            `<li>
                <input type="checkbox" class="check">
                <span class="task">${taskVal}</span>
                <button onclick="deleteItem(this)" class="delete-btn"></button>
            </li>`
        );
        input.value = "";
        let newCheckBox = taskList.querySelector("li:last-child .check");
        let newTask = taskList.querySelector("li:last-child .task");
        addCheckBoxListener(newCheckBox, newTask);

        saveTasks(); // Save tasks after adding
    }
});


function deleteItem(button) {
    button.parentNode.remove(); // Remove the task from the DOM
    saveTasks(); // Save updated tasks to localStorage
}


function addCheckBoxListeners() {
    document.querySelectorAll(".check").forEach((checkbox, index) => {
        const task = document.querySelectorAll(".task")[index];
        addCheckBoxListener(checkbox, task);
    });
}


function addCheckBoxListener(checkbox, task) {
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            task.style.textDecoration = "line-through";
        } else {
            task.style.textDecoration = "";
        }
        saveTasks(); // Save tasks when status changes
    });
}

document.addEventListener("DOMContentLoaded", loadTasks);
