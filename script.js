let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  const filtered = tasks.filter(task => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "flex items-center justify-between bg-gray-50 px-4 py-2 rounded shadow";

    li.innerHTML = `
      <div class="flex items-center">
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${index})" class="mr-2">
        <span contenteditable="true" onblur="editTask(${index}, this.innerText)" class="flex-1 ${task.completed ? "line-through text-gray-400" : ""}">${task.text}</span>
      </div>
      <button onclick="deleteTask(${index})" class="text-red-500 hover:text-red-700">✕</button>
    `;

    list.appendChild(li);
  });

  updateCounters();
  saveTasks();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    input.value = "";
    renderTasks();
  }
}

function editTask(index, newText) {
  tasks[index].text = newText.trim();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  renderTasks();
}

function updateCounters() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;

  document.getElementById("taskCounters").innerText = 
    `Total: ${total} | Active: ${active} | Completed: ${completed}`;
}

renderTasks();


