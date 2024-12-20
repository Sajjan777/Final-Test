const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

window.addEventListener('load', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
});
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
    createTaskElement(taskText);
        taskInput.value = '';
        saveTasks();
    }
});
function createTaskElement(taskText, isCompleted = false) {
const li = document.createElement('li');
    li.textContent = taskText;
    if (isCompleted) {
        li.classList.add('completed');
    }
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(removeButton);

    taskList.appendChild(li);
}
function saveTasks() {
    const tasks = [];
    taskList.childNodes.forEach(li => {
    tasks.push({
            text: li.firstChild.textContent, 
            completed: li.classList.contains('completed') 
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
