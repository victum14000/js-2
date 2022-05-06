const formElem = document.forms[0];
const addTaskBtn = document.getElementById('addBtn');
const descTaskInput = document.getElementById('descTask');
const nameTaskInput = document.getElementById('nameTask');
const cardHolder = document.querySelector('.cardHolder');
const completedCount = document.getElementById('completed');
const deletedCount = document.getElementById('deleted');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

let completedTasks;
!localStorage.completedTasks ? completedTasks = [] : completedTasks = localStorage.completedTasks;
let deletedTasks;
!localStorage.deletedTasks ? deletedTasks = [] : deletedTasks = localStorage.deletedTasks;

formElem.addEventListener('submit', event => {
	event.preventDefault();
});

function Task(name, description) {
    this.name = name;
    this.description = description;
    this.completed = false;
}

function createTemplate(task, index) {
    return `
            <div class="card ${task.completed ? 'checked' : ''}">
            <div class="cardTitle">
                <h2 class="nameCard">${task.name}</h2>
                <h2 class="descCard">${task.description}</h2>
            </div>
                    <div onclick="completeTask(${index})" class="acceptBtn">✔️</div>
                    <div onclick="deleteTask(${index})" class="cancelBtn">❌</div>
                </div>
            </div>
        `;
}


function taskCounter(){
    deletedCount.innerText = ` ` + deletedTasks.length;
    completedCount.innerText = ` ` + completedTasks.length;
}

function updateLocal() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', completedTasks);
    localStorage.setItem('deletedTasks', deletedTasks);
}

function fillHtmlList() {
    cardHolder.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            cardHolder.innerHTML += createTemplate(item, index);
        });
        cardElem = document.querySelectorAll('.card');
    }
}

function updateAll(){
    taskCounter();
    updateLocal();
    fillHtmlList();
}

updateAll();

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(nameTaskInput.value, descTaskInput.value));
    updateAll()
    nameTaskInput.value = '';
    descTaskInput.value = '';
});

function completeTask(index) {
    tasks.splice(index, 1);
    completedTasks = localStorage.completedTasks + '+';
    updateAll()
}

function deleteTask(index) {
    tasks.splice(index, 1);
    deletedTasks = localStorage.deletedTasks + '+';
    updateAll();
}