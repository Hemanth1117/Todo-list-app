document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    
    li.innerHTML = `
        <span onclick="toggleTask(this)">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">❌</button>
    `;

    taskList.appendChild(li);
    animateTask(li); // Smooth animation

    saveTasks();
    taskInput.value = "";  // Clear input
    taskInput.focus();  // Auto-focus for faster input
}

// Enter key event for quick task addition
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function toggleTask(taskElement) {
    taskElement.classList.toggle("completed");
    saveTasks();
}

function deleteTask(button) {
    let task = button.parentElement;
    task.classList.add("fade-out"); // Animation before removal
    setTimeout(() => {
        task.remove();
        saveTasks();
    }, 300);
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        tasks.push({
            text: task.querySelector("span").textContent,
            completed: task.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span onclick="toggleTask(this)" class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(this)">❌</button>
        `;
        taskList.appendChild(li);
    });
}

// Smooth fade-in animation when adding tasks
function animateTask(taskElement) {
    taskElement.style.opacity = "0";
    setTimeout(() => {
        taskElement.style.opacity = "1";
        taskElement.style.transition = "opacity 0.3s ease-in-out";
    }, 10);
}
