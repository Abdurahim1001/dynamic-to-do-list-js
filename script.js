// Listen for the 'DOMContentLoaded' event to ensure the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn'); // Button to add tasks
    const taskInput = document.getElementById('task-input'); // Input field for tasks
    const taskList = document.getElementById('task-list'); // Unordered list to display tasks

    // Function to add a new task
    function addTask() {
        // Get the value from the task input and trim whitespace
        const taskText = taskInput.value.trim();

        // Check if the task input is empty
        if (taskText === "") {
            alert("Please enter a task."); // Alert user to enter a task
            return; // Exit the function if empty
        }

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
        };

        // Append the remove button to the list item, then append the list item to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = '';
    }

    // Attach event listeners
    addButton.addEventListener('click', addTask); // Add task on button click

    // Allow adding tasks with the Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(); // Call addTask when Enter is pressed
        }
    });
});
