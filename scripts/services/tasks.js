let taskArray;
let isEdit = false;

onload = async () => {
  if (!localStorage.getItem("jwt")) {
    window.location.href = "index.html";
  } else {
    const user = await findUser();
    userName.innerText = `${user.firstName} ${user.lastName}`;
    taskArray = await getTasks();
    tasksHandle(taskArray);
  }
};

const userName = document.querySelector("#userName");
const taskform = document.querySelector("form");
const taskInput = document.querySelector("#novaTarefa");
const taskDone = document.querySelector("#done");
const pendingTasks = document.querySelector("#pending");
const doneTasks = document.querySelector(".tarefas-terminadas");
const taskEditor = document.querySelector("#taskEditor");
const taskVerify = document.querySelector("#taskVerify");
const modalText = document.querySelector(".modalText");
const taskElement = {
  id: "",
  description: "",
  completed: "",
};
let taskStatus = false;

taskDone.addEventListener("click", (evt) => {
  if (taskDone.checked) {
    taskElement.completed = true;
    console.log("checked");
    taskStatus = true;
  } else {
    taskStatus = false;
  }
});

taskform.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (!isEdit) {
    if (taskInput.value !== "") {
      createTask(taskInput.value, taskStatus);
    } else {
      taskVerify.innerText =
        "Adicione algum texto antes de cadastrar uma tarefa.";
    }
  } else {
    updateTasks(taskElement.id, taskElement.completed, taskInput.value);
    isEdit = false;
  }
});

taskInput.addEventListener("input", () => {
  taskVerify.innerText = "";
});

function tasksHandle(taskList) {
  taskList.forEach((task) => {
    if (task.completed) {
      renderDoneTasks(task);
    } else {
      renderPendingTasks(task);
    }
  });
}

function renderPendingTasks(task) {
  let newLi = document.createElement("li");
  let date = new Date(task.createdAt);
  newLi.className = "tarefa";
  newLi.innerHTML = `<div onclick="updateTasks(${
    task.id
  }, ${true})" class="not-done" id="${task.id}"></div>
  <div class="descricao row row-cols-auto row-home">
  <div class="taskActions">
  <button id="taskEditor" onclick="editTask(${task.id}, '${
    task.description
  }', ${task.completed})">
  <i class="fas fa-pen"></i><button>
  <button onclick="deleteTask(${task.id})"><i id="${
    task.id
  }" class="far fa-trash-alt"></i></button>
  </div>
  <div class="tarefa-pendente col-12 col-md-12">
    <p class="nome">${task.description}</p>
  </div>
  <div class="div-data col-auto">
    <p class="timestamp"><i class="far fa-calendar-alt"></i> Criada em: ${date.toLocaleDateString(
      "pt-br"
    )}</p>
  </div>  
  </div>`;
  pendingTasks.appendChild(newLi);
}

function renderDoneTasks(task) {
  const newLiDone = document.createElement("li");
  newLiDone.className = "tarefa";
  let date = new Date(task.createdAt);
  newLiDone.innerHTML = `<div class="done"></div>
 <div class="descricao row row-cols-auto row-home">
 <div col>
 <button onclick="updateTasks(${task.id})"
 <i" class="fas fa-undo-alt change"> </i> </button>
 <button onclick="deleteTask(${task.id})"><i id="${
    task.id
  }" class="far fa-trash-alt"></i></button>
 </div>
 <div class="tarefa-concluida col-12 col-md-12">
 <p class="nome">${task.description}</p>
 </div>
 <div class="div-data col-auto">
 <p class="timestamp"><i class="far fa-calendar-alt"></i> Concluída em: ${date.toLocaleDateString(
   "pt-br"
 )}</p>
 </div>
 </div>`;
  doneTasks.appendChild(newLiDone);
}

function editTask(id, description, completed) {
  isEdit = true;

  taskElement.id = id;
  taskElement.description = description;
  taskElement.completed = completed;

  taskInput.value = description;
}
