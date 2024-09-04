document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('task-input');
const taskTimeInput = document.getElementById('task-time');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const notification = document.getElementById('notification');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    const taskTime = taskTimeInput.value;

    if (taskText && taskTime) {
        const taskItem = createTaskElement(taskText, taskTime);
        taskList.appendChild(taskItem);
        updateLocalStorage();
        taskInput.value = '';
        taskTimeInput.value = '';
    }
}

function createTaskElement(taskText, taskTime) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.textContent = `${taskText} - ${new Date(taskTime).toLocaleString()}`;
    li.setAttribute('data-time', taskTime);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', deleteTask);

    li.appendChild(deleteBtn);
    return li;
}

function deleteTask(e) {
    const taskItem = e.target.parentElement;
    taskList.removeChild(taskItem);
    updateLocalStorage();
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(task => {
        tasks.push({
            text: task.textContent.replace('Delete', '').trim(),
            time: task.getAttribute('data-time')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text, task.time);
        taskList.appendChild(taskItem);
    });
    checkTaskTimes();
}

function checkTaskTimes() {
    setInterval(() => {
        const now = new Date().getTime();
        document.querySelectorAll('.task-item').forEach(task => {
            const taskTime = new Date(task.getAttribute('data-time')).getTime();
            if (taskTime <= now) {
                showNotification(task.textContent.split(' - ')[0]);
                taskList.removeChild(task);
                updateLocalStorage();
            }
        });
    }, 1000);
}

function showNotification(task) {
    notification.textContent = `Time's up for: ${task}`;
    notification.classList.add('visible');
    setTimeout(() => {
        notification.classList.remove('visible');
    }, 5000);
}

