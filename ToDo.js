var tasks = [];
var taskList = document.getElementById('taskList');
var addBtn = document.getElementById('addBtn');
var taskInput = document.getElementById('taskInput');

window.addEventListener('load', loadTasks);

addBtn.addEventListener('click', addTask);

function addTask() {
  var taskText = taskInput.value.trim();

  if (taskText !== '') {
    var task = {
      text: taskText,
      completed: false
    };
    tasks.push(task);
    taskInput.value = '';
    displayTask(task);
    saveTasks(); 
  }
}

function displayTask(task) {
  var listItem = document.createElement('li');
  listItem.classList.add('task-item');

  var taskText = document.createElement('span');
  taskText.classList.add('task-text');
  taskText.textContent = task.text;

  var completeBtn = document.createElement('button');
  completeBtn.innerHTML = '&#10003;';
  completeBtn.classList.add('complete-btn');
  completeBtn.addEventListener('click', function() {
    toggleComplete(task, listItem);
    saveTasks(); 
  });

  var removeBtn = document.createElement('button');
  removeBtn.innerHTML = '&#10007;';
  removeBtn.classList.add('remove-btn');
  removeBtn.addEventListener('click', function() {
    removeTask(task, listItem);
    saveTasks(); 
  });

  listItem.appendChild(taskText);
  listItem.appendChild(completeBtn);
  listItem.appendChild(removeBtn);

  taskList.appendChild(listItem);
}

function toggleComplete(task, listItem) {
  task.completed = !task.completed;
  listItem.querySelector('.task-text').classList.toggle('completed');
}

function removeTask(task, listItem) {
  var index = tasks.indexOf(task);
  if (index !== -1) {
    tasks.splice(index, 1);
    listItem.remove();
  }
}

function saveTasks() {
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  
  var storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach(function(task) {
      displayTask(task);
    });
  }
}
