// Wait for the DOM content to be fully loaded
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
        // Retrieve and trim the value from the task input field
        taskText = taskText ? taskText.trim() : taskInput.value.trim(); // Get task text

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task."); // Alert the user if it's empty
            return; // Exit the function if no task is provided
        }

        // Create a new list item (li) element
        const li = document.createElement('li');
        li.textContent = taskText; // Set the text content to taskText
        li.classList.add('task-item'); // Add a class to the li element for styling

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set button text
        removeButton.classList.add('remove-btn'); // Assign class name to button

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            taskList.removeChild(li); // Remove the li element from taskList
            tasks = tasks.filter(task => task !== taskText); // Update the tasks array
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Update Local Storage
        };

        // Append the remove button to the li element, then append the li to taskList
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
    addButton.addEventListener('click', () => addTask()); // Call addTask when button is clicked

    // Allow adding tasks with the Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(); // Call addTask when Enter is pressed
        }
    });
});
