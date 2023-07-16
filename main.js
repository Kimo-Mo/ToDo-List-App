let input = document.getElementById("input-box");
let AddBtn = document.getElementById("submit");
let TaskList = document.getElementById("task-container");

let ArrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  ArrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

AddBtn.onclick = () => {
  if (input.value !== "") {
    addTasksToArray(input.value);
    input.value = ""; // empty input field
  }
};
//  Update & Delete
TaskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // delete element from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // delete element from page
    e.target.parentElement.remove();
    if (ArrayOfTasks.length == 0) {
      document.querySelector(".removeAll").remove();
    }
  }
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("checked");
  }
  //delete all Elements from Page
  if (e.target.classList.contains("removeAll")) {
    TaskList.innerHTML = "";
    ArrayOfTasks = [];
    window.localStorage.removeItem("tasks");
  }
});

function addTasksToArray(taskTxt) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskTxt,
    completed: false,
  };
  // Push Task to Array Of Tasks
  ArrayOfTasks.push(task);
  // Add Task To Page
  addElementsToPageFrom(ArrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(ArrayOfTasks);
  // Create or update the "Remove All" button in local storage
  updateRemoveAllButtonInLocalStorage();
}

function updateRemoveAllButtonInLocalStorage() {
  const removeAllBtnExists = document.querySelector(".removeAll") !== null;
  window.localStorage.setItem("removeAllButton", removeAllBtnExists);
}
function addElementsToPageFrom(ArrayOfTasks) {
  // Empty Task List
  TaskList.innerHTML = ``;

  // Looping on Array of Tasks
  ArrayOfTasks.forEach((task) => {
    // Create Li
    let li = document.createElement("li");
    li.className = "task";
    if (task.completed) {
      li.className = "task checked";
    }
    li.setAttribute("data-id", task.id);
    li.appendChild(document.createTextNode(task.title));
    // Create Delete Button
    let spanX = document.createElement("span");
    spanX.className = "del";
    spanX.appendChild(document.createTextNode("x"));
    li.appendChild(spanX);
    // Add Li to Task List
    TaskList.appendChild(li);
  });
  if (ArrayOfTasks.length > 0) {
    // Create Remove All Button
    let removeAllBtn = document.createElement("button");
    removeAllBtn.className = "removeAll";
    removeAllBtn.textContent = "Remove All";
    TaskList.appendChild(removeAllBtn);
  }
}
function addDataToLocalStorageFrom(ArrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(ArrayOfTasks));
}
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  ArrayOfTasks = ArrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(ArrayOfTasks);
}
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < ArrayOfTasks.length; i++) {
    if (ArrayOfTasks[i].id == taskId) {
      ArrayOfTasks[i].completed == false
        ? (ArrayOfTasks[i].completed = true)
        : (ArrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(ArrayOfTasks);
}
