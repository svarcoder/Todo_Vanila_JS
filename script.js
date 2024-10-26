// Select elements
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");

// Retrieve todos from localStorage if available
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to save todos to localStorage
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to add a new todo
const addTodo = (todoText) => {
  const todo = {
    text: todoText,
    completed: false,
  };
  todos.push(todo);
  saveTodos();
  renderTodos();
};

// Function to render the todo list
const renderTodos = () => {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.classList.toggle("completed", todo.completed);

    todoItem.innerHTML = `
            <span ${
              todo.completed ? 'style="text-decoration: line-through;"' : ""
            }>${todo.text}</span>
            <div>
                <button onclick="toggleComplete(${index})">✓</button>
                <button onclick="editTodo(${index})">✎</button>
                <button onclick="deleteTodo(${index})">✗</button>
            </div>
        `;
    todoList.appendChild(todoItem);
  });
};

// Function to toggle completion of a todo
const toggleComplete = (index) => {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
};

// Function to delete a todo
const deleteTodo = (index) => {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
};

// Function to edit a todo
const editTodo = (index) => {
  const todoItem = todoList.children[index];
  const currentText = todos[index].text;

  // Replace the text with an input field
  todoItem.innerHTML = `
        <input type="text" value="${currentText}" id="edit-input-${index}" />
        <div>
        <button onclick="saveEdit(${index})">Save</button>
        <button onclick="renderTodos()">Cancel</button>
        </div>
    `;
};

// Function to save the edited todo
const saveEdit = (index) => {
  const editInput = document.getElementById(`edit-input-${index}`);
  const newText = editInput.value.trim();

  if (newText) {
    todos[index].text = newText;
    saveTodos();
    renderTodos();
  }
};

// Event listener for adding a new todo
addTodoBtn.addEventListener("click", () => {
  const todoText = todoInput.value.trim();
  if (todoText) {
    addTodo(todoText);
    todoInput.value = "";
  }
});

// Initial rendering of todos
renderTodos();
