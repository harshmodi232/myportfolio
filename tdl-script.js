// Select DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const reportBtn = document.getElementById('report-btn');
const reportContainer = document.getElementById('report-container');
const reportContent = document.getElementById('report-content');
const clock = document.getElementById('clock');

// Store task data
let tasks = [];

// Function to update the clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

// Call updateClock every second
setInterval(updateClock, 1000);

// Event listener to add a new task
addTaskBtn.addEventListener('click', addTask);

// Function to create a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskId = Date.now(); // Unique ID based on timestamp
        const task = {
            id: taskId,
            text: taskText,
            addedAt: new Date().toLocaleString(),
            deletedAt: null,
            completedAt: null
        };

        tasks.push(task);
        displayTask(task);
        taskInput.value = ''; // Clear input field
    }
}

// Function to display a task
function displayTask(task) {
    const li = document.createElement('li');
    li.innerHTML = `${task.text} <button class="delete-btn">Delete</button>`;
    taskList.appendChild(li);

    // Mark task as completed when clicked
    li.addEventListener('click', () => {
        if (!task.completedAt) {
            task.completedAt = new Date().toLocaleString();
            li.classList.toggle('completed');
        }
    });

    // Delete task functionality
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        task.deletedAt = new Date().toLocaleString(); // Set deleted time
        li.remove();
        tasks = tasks.filter(t => t.id !== task.id);
    });
}

// Event listener for report button
reportBtn.addEventListener('click', generateReport);

// Function to generate and display the report
function generateReport() {
    console.log("Generate Report clicked"); // Debugging statement

    // Check if tasks array has any data
    console.log("Tasks Array:", tasks); // Debugging statement

    reportContainer.classList.remove('hidden');
    reportContent.innerHTML = ''; // Clear previous report

    tasks.forEach(task => {
        const taskReport = document.createElement('div');
        const taskAddedTime = new Date(task.addedAt);
        const taskDeletedTime = task.deletedAt ? new Date(task.deletedAt) : null;
        const taskCompletedTime = task.completedAt ? new Date(task.completedAt) : null;

        // Calculate time taken for task if completed or deleted
        let timeTaken = '';
        if (taskDeletedTime) {
            const diffInMs = taskDeletedTime - taskAddedTime;
            const diffInMinutes = Math.floor(diffInMs / 60000); // Convert milliseconds to minutes
            const diffInSeconds = Math.floor((diffInMs % 60000) / 1000); // Remaining seconds

            timeTaken = `${diffInMinutes} minutes and ${diffInSeconds} seconds (Deleted)`;
        } else if (taskCompletedTime) {
            const diffInMs = taskCompletedTime - taskAddedTime;
            const diffInMinutes = Math.floor(diffInMs / 60000); // Convert milliseconds to minutes
            const diffInSeconds = Math.floor((diffInMs % 60000) / 1000); // Remaining seconds

            timeTaken = `${diffInMinutes} minutes and ${diffInSeconds} seconds (Completed)`;
        } else {
            timeTaken = 'Not completed or deleted yet';
        }

        taskReport.innerHTML = `
            <strong>Task:</strong> ${task.text} <br>
            <strong>Added At:</strong> ${task.addedAt} <br>
            <strong>Completed At:</strong> ${task.completedAt ? task.completedAt : 'Not completed'} <br>
            <strong>Deleted At:</strong> ${task.deletedAt ? task.deletedAt : 'Not deleted'} <br>
            <strong>Time Taken:</strong> ${timeTaken} <br>
            <hr>
        `;
        reportContent.appendChild(taskReport);
    });
}
