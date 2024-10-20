// Listen for the 'DOMContentLoaded' event to ensure the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn'); // Button to add tasks
    const taskInput = document.getElementById('task-input'); // Input field for tasks
    const taskList = document.getElementById('task-list'); // Unordered list to display tasks
    let tasks = []; // Array to hold tasks

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Retrieve tasks
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load tasks into the DOM
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Task creation logic
        taskText = taskText.trim(); // Trim whitespace from task text
        if (taskText === "") return; // Exit if the task text is empty

        // Create a new list item element
        const li = document.createElement('li');
        li.textContent = taskText; // Set the text content to the task text

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set button text
        removeButton.className = 'remove-btn'; // Assign class to button

        // Attach an onclick event to the remove button
        removeButton.onclick = function() {
            taskList.removeChild(li); // Remove the list item from taskList
            tasks = tasks.filter(task => task !== taskText); // Update the tasks array
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Update Local Storage
        };

        // Append the remove button to the list item, then append the list item to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save to Local Storage if indicated
        if (save) {
            tasks.push(taskText); // Add the new task to the tasks array
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Update Local Storage
        }

        // Clear the task input field
        taskInput.value = '';
    }

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Attach event listeners
    addButton.addEventListener('click', () => addTask(taskInput.value)); // Add task on button click

    // Allow adding tasks with the Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value); // Call addTask when Enter is pressed
        }
    });
});
