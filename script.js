const newTodoinput = document.querySelector(".todo-field");
const allTodos = document.querySelector(".todos-container");
const subContainer = document.querySelector(".sub-container");
const firstCheckbox = document.querySelector(".first-input");
const dragDrop = document.querySelector(".drag-drop");

const sunIcon = document.querySelector(".sun-icon");
const moonIcon = document.querySelector(".moon-icon");

const mobileDark = document.querySelector(".mobile-dark");
const mobileLight = document.querySelector(".mobile-light");
const checkboxContainerLabel = document.querySelector(".checkbox-label");
const newTodoFields = document.querySelector(".new-todo-fields");
const newTodo = document.querySelector(".new-todo");
const todoContainer = document.querySelector(".todo-container");

sunIcon.addEventListener("click", function () {
  moonIcon.classList.remove("hidden");
  sunIcon.classList.add("hidden");
  mobileDark.classList.add("hidden");
  mobileLight.classList.remove("hidden");

  newTodo.style.backgroundColor = "hsl(0, 0%, 98%)";
  newTodoFields.style.backgroundColor = "hsl(0, 0%, 98%)";
  checkboxContainerLabel.style.backgroundColor = "hsl(0, 0%, 98%)";

  newTodoinput.classList.add("light-theme");

  allTodos.style.backgroundColor = "hsl(0, 0%, 98%)";
  document.body.style.backgroundColor = "hsl(236, 33%, 92%)";

  btnsContainer.style.backgroundColor = "hsl(0, 0%, 98%)";

  subContainer.classList.add("light-mode");
  subContainer.classList.remove("dark-mode");
});

moonIcon.addEventListener("click", function () {
  sunIcon.classList.remove("hidden");
  moonIcon.classList.add("hidden");
  mobileLight.classList.add("hidden");
  mobileDark.classList.remove("hidden");

  newTodoinput.classList.remove("light-theme");

  newTodo.style.backgroundColor = "hsl(235, 24%, 19%)";
  newTodoFields.style.backgroundColor = "hsl(235, 24%, 19%)";
  checkboxContainerLabel.style.backgroundColor = "hsl(235, 24%, 19%)";

  allTodos.style.backgroundColor = "hsl(235, 24%, 19%)";
  document.body.style.backgroundColor = "hsl(235, 21%, 11%)";

  btnsContainer.style.backgroundColor = "hsl(235, 24%, 19%)";

  subContainer.classList.remove("light-mode");
  subContainer.classList.add("dark-mode");
});

let todosInfo = document.createElement("div");
todosInfo.classList.add("todo-info");

let btnsContainer = document.createElement("div");
btnsContainer.classList.add("btns-container");

let todos = JSON.parse(localStorage.getItem("todos"));
if (!todos) {
  todos = [];
}

newTodoinput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    let taskContent = newTodoinput.value;
    todos.push({
      id: `a${Date.now()}`,
      taskContent,
      completed: false,
      checked: false,
    });

    addTodo(todos);
    updateArr(todos);

    newTodoinput.value = ``;
  }
});

addTodo(todos);

let draggedTodo;

function dragStart(event) {
  draggedTodo = event.target;
  event.dataTransfer.setData("text/plain", draggedTodo.textContent);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const targetTodo = event.target;
  if (targetTodo.tagName === "DIV") {
    targetTodo.insertAdjacentElement("beforebegin", draggedTodo);
  }
}

function addTodo(arr) {
  allTodos.innerHTML = "";

  arr.map((task) => {
    let todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    todoContainer.setAttribute("id", task.id);
    todoContainer.setAttribute("draggable", true);
    todoContainer.addEventListener("dragstart", dragStart);
    todoContainer.addEventListener("dragover", dragOver);
    todoContainer.addEventListener("drop", drop);

    todoContainer.innerHTML = `
        <div class="checkbox-field-container" id="checkbox-field-container" >
          <input type="checkbox" class="checkbox-input" id="checkbox-input" ${
            task.checked ? "checked" : ""
          } /> 
          <label for="checkbox" class="checkbox-label"></label>
        </div>
        <h3 contenteditable="true" class="todo-content ${
          task.completed ? "completed" : ""
        }" >${task.taskContent}</h3>
        
        <img
          src="./images/icon-cross.svg"
          alt="a cross icon"
          class="delete-btn"
        />
      
        `;

    let checkBoxLabel = todoContainer.querySelector(".checkbox-label");
    let checkBoxInput = todoContainer.querySelector(".checkbox-input");
    let todoContent = todoContainer.querySelector(".todo-content");

    if (subContainer.classList.contains("light-mode")) {
      checkBoxLabel.style.backgroundColor = "hsl(0, 0%, 98%)";
      todoContent.style.color = "black";
    } else if (subContainer.classList.contains("dark-mode")) {
      checkBoxLabel.style.backgroundColor = "hsl(235, 24%, 19%)";
      todoContent.style.color = "white";
    }

    let allCheckbox = todoContainer.querySelectorAll(".checkbox-label");

    sunIcon.addEventListener("click", function () {
      if (todoContent.classList.contains("completed")) {
        todoContent.style.color = "gray";
      } else {
        todoContent.style.color = "black";
      }
      checkBoxLabel.style.backgroundColor = "hsl(0, 0%, 98%)";

      allCheckbox.forEach((box) => {
        box.style.backgroundColor = "hsl(0, 0%, 98%)";
      });
    });

    moonIcon.addEventListener("click", function () {
      if (todoContent.classList.contains("completed")) {
        todoContent.style.color = "gray";
      } else {
        todoContent.style.color = "white";
      }
      checkBoxLabel.style.backgroundColor = "hsl(235, 24%, 19%)";
      allCheckbox.forEach((box) => {
        box.style.backgroundColor = "hsl(235, 24%, 19%)";
      });
    });

    //cross off a task as completed
    checkBoxLabel.addEventListener("click", function () {
      if (task.completed === true) {
        arr.map((todo) => {
          if (todo.id === task.id) {
            todo.completed = false;
            todo.checked = false;
          }
        });
        updateArr(todos);
        checkBoxInput.removeAttribute("checked");
        if (subContainer.classList.contains("light-mode")) {
          todoContent.style.color = "black";
        } else {
          todoContent.style.color = "hsl(234, 39%, 85%)";
        }
        todoContent.classList.remove("completed");
      } else {
        arr.map((todo) => {
          if (todo.id === task.id) {
            todo.completed = true;
            todo.checked = true;
          }
        });
        updateArr(todos);

        checkBoxInput.setAttribute("checked", true);
        todoContent.style.color = "gray";
        todoContent.classList.add("completed");
      }
      updateArr(todos);
    });

    //edit a task
    todoContent.addEventListener("input", function (e) {
      let newText = e.target.textContent;
      let newTextParentId = e.target.parentElement.id;

      arr.map((todo) => {
        if (todo.id === newTextParentId) {
          todo.taskContent = newText;
        }
      });
      localStorage.setItem("todos", JSON.stringify(todos));
    });

    //Deleting a task
    const deleteBtn = todoContainer.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function (e) {
      let ids = e.target.parentElement.id;
      deleteTodo(ids);
      todoContainer.remove();
      updateArr(todos);
    });

    updateArr(todos);

    allTodos.appendChild(todoContainer);
    allTodos.appendChild(todosInfo);
    subContainer.appendChild(btnsContainer);
  });

  updateArr(todos);
}

function deleteTodo(ids) {
  todos = todos.filter((task) => task.id !== ids);
  localStorage.setItem("todos", JSON.stringify(todos));
  updateArr(todos);
}

//update the todos array
function updateArr(arr) {
  let newArr2 = [];

  if (arr.length >= 1) {
    dragDrop.classList.remove("hidden");
    arr.forEach((todo) => {
      if (!todo.completed) newArr2.push(todo);
    });
    todosInfo.innerHTML = `
          <p class="items-count">${newArr2.length} items left</p>
          <p class="clear-all">Clear Completed</p>
          `;

    btnsContainer.innerHTML = `
          <button class="all-btn btn active">All</button>
          <button class="active-btn btn">Active</button>
          <button class="complete-btn btn">Completed</button>
          `;

    const allTasksBtn = btnsContainer.querySelector(".all-btn");
    const activeBtn = btnsContainer.querySelector(".active-btn");
    const completeBtn = btnsContainer.querySelector(".complete-btn");

    allTasksBtn.addEventListener("click", function () {
      addTodo(todos);
    });

    activeBtn.addEventListener("click", function () {
      let activeArr = todos.filter((task) => task.completed === false);
      addTodo(activeArr);
    });

    completeBtn.addEventListener("click", function () {
      let completeArr = todos.filter((task) => task.completed === true);
      addTodo(completeArr);
    });

    let clearCompleted = todosInfo.querySelector(".clear-all");
    clearCompleted.addEventListener("click", function () {
      clearTasks();
    });

    localStorage.setItem(`todos`, JSON.stringify(todos));
    btnsContainer.classList.remove("hidden");
  } else if (arr.length <= 0) {
    dragDrop.classList.add("hidden");
    todosInfo.remove();
    btnsContainer.remove();
  }
}

function clearTasks() {
  todos.forEach((todo) => {
    if (todo.completed) {
      todos = todos.filter((todo) => !todo.completed);
      let child = allTodos.querySelector(`#${todo.id}`);
      child.remove();
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
