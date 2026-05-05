function loadTasks() {
  fetch("/tasks")
    .then(res => res.json())
    .then(data => {
      let html = "";

      data.forEach((t, i) => {
        html += `
          <li>
            <span>${t.task} - ${t.time}</span>

            <div>
              <button class="edit" onclick="editTask(${i})">Edit</button>
              <button class="delete" onclick="deleteTask(${i})">Delete</button>
            </div>
          </li>
        `;
      });

      document.getElementById("list").innerHTML = html;
    });
}

// ADD
function addTask() {
  fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      task: task.value,
      time: time.value
    })
  }).then(loadTasks);
}

// DELETE
function deleteTask(i) {
  fetch("/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index: i })
  }).then(loadTasks);
}

// EDIT
function editTask(i) {
  let newTask = prompt("Enter task:");
  let newTime = prompt("Enter time:");

  fetch("/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      index: i,
      task: newTask,
      time: newTime
    })
  }).then(loadTasks);
}

// INITIAL LOAD
loadTasks();



