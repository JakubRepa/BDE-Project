import './style.css'; // Import CSS for styling

// Define an array to store todos
let todos: Todo[] = [];

// Updated the Todo interface to include priority
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high'; // Option 7: New field for priority
}

// DOM element references
const form = document.querySelector('.todo-form') as HTMLFormElement;
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const prioritySelect = document.getElementById('priority-select') as HTMLSelectElement; // Option 7: Reference to the dropdown for priority selection
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const filtersContainer = document.getElementById('filters') as HTMLDivElement; // (NEW) Container for filter buttons

// Filters State Object - Option 4 & Option 7
const filters = {
  low: false,
  medium: false,
  high: false,
};

// ==========================
// Helper Functions
// ==========================

// Option 7: Helper function to get color based on priority
const getPriorityColor = (priority: 'low' | 'medium' | 'high'): string => {
  switch (priority) {
    case 'low': return 'green';
    case 'medium': return 'orange';
    case 'high': return 'red';
    default: return 'grey';
  }
};

// ==========================
// Core Todo Functions
// ==========================

// Function to add a new todo, including priority selection
const addTodo = (text: string, priority: 'low' | 'medium' | 'high'): void => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false,
    priority: priority // Option 7: Priority value passed from the dropdown
  };

  todos.push(newTodo);
  console.log("Todo added: ", todos);
  renderTodos();
};

// Function to remove a todo by its ID
const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
};

// Function to edit a todo item by its ID
const editTodo = (id: number): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    const text = prompt('Edit todo', todo.text);
    if (text) {
      todo.text = text;
      renderTodos();
    }
  }
};

// Option 1 - Function to toggle the completed status of a todo by its ID
const toggleCompleted = (id: number): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed; // Option 1: Toggles completed status between true/false
    console.log(`Todo with ID: ${id} completed status is now: `, todo.completed);
    renderTodos();
  }
};

// ==========================
// Rendering and Filtering Functions
// ==========================

// (UPDATED) Function to render the todo list
const renderTodos = (): void => {
  todoList.innerHTML = ''; // Clear the current list

  // Option 4: Filter todos based on selected filters
  const filteredTodos = todos.filter(todo => {
    if (filters.low && todo.priority === 'low') return true;
    if (filters.medium && todo.priority === 'medium') return true;
    if (filters.high && todo.priority === 'high') return true;
    return !filters.low && !filters.medium && !filters.high; // Show all if no filters are selected
  });

  // Option 7: Sort todos by priority
  filteredTodos.sort((a, b) => {
    const priorityOrder = { low: 1, medium: 2, high: 3 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  // Render each todo item
  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    const completedClass = todo.completed ? 'completed' : '';
    const priorityColor = getPriorityColor(todo.priority);

    li.innerHTML = `
      <input type="checkbox" class="complete-radio" ${todo.completed ? 'checked' : ''} data-id="${todo.id}"> <!-- Option 1: Add a button to toggle completed status -->
      <span class="${completedClass}">${todo.text}</span>
      <span class="priority-tag" style="color: ${priorityColor}; font-weight: bold;">${todo.priority}</span>
      <button class="edit-btn" id="edit-btn"><i class="fas fa-pen"></i></button>
      <button class="remove-btn"><i class="fas fa-times"></i></button>
    `;

    li.querySelector('.remove-btn')!.addEventListener('click', () => removeTodo(todo.id));
    li.querySelector('.edit-btn')!.addEventListener('click', () => editTodo(todo.id));
    li.querySelector('.complete-radio')!.addEventListener('click', () => toggleCompleted(todo.id));

    todoList.appendChild(li);
  });
};

// Option 4: Function to render filter buttons
const renderFilters = (): void => {
  filtersContainer.innerHTML = `
    <label><input type="checkbox" id="filter-low"> Low</label>
    <label><input type="checkbox" id="filter-medium"> Medium</label>
    <label><input type="checkbox" id="filter-high"> High</label>
  `;

  // Add event listeners for each filter checkbox
  document.getElementById('filter-low')!.addEventListener('change', (event) => {
    handleFilterChange('low', (event.target as HTMLInputElement).checked);
  });
  document.getElementById('filter-medium')!.addEventListener('change', (event) => {
    handleFilterChange('medium', (event.target as HTMLInputElement).checked);
  });
  document.getElementById('filter-high')!.addEventListener('change', (event) => {
    handleFilterChange('high', (event.target as HTMLInputElement).checked);
  });
};

// Option 7: Function to handle filter changes for priority
const handleFilterChange = (priority: 'low' | 'medium' | 'high', checked: boolean): void => {
  filters[priority] = checked;  // Update filter state when checkbox changes
  renderTodos();
};

// ==========================
// Additional BDE Features
// ==========================

// BDE feature 1: Function to clear all completed todos
const clearCompletedTodos = (): void => {
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
};

// BDE feature 2: Toggle between light and dark themes
const toggleTheme = (): void => {
  document.body.classList.toggle('dark-theme'); // Toggle a class on the body for dark theme
};

// ==========================
// Event Listeners and Initial Setup
// ==========================

// Initial setup
renderFilters(); // Render filter buttons on page load

// Event listener for form submission to add a new todo
form.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const text = todoInput.value.trim();
  const priority = prioritySelect.value as 'low' | 'medium' | 'high'; // Option 7: Get selected priority from the dropdown

  if (text !== '') {
    todoInput.classList.remove('input-error');
    errorMessage.style.display = 'none';
    addTodo(text, priority); // Option 7: Pass the priority along with the todo text
    todoInput.value = '';
    prioritySelect.value = 'low'; // Reset the dropdown to default 'low' after adding todo
  } else {
    console.log("Please enter a todo item");
    todoInput.classList.add('input-error');
    errorMessage.style.display = 'block';
  }
});

// BDE feature 1: Event listener for clear completed todos button
document.getElementById('clear-completed-btn')!.addEventListener('click', clearCompletedTodos);

// BDE feature 2: Event listener for theme toggle button
document.getElementById('theme-toggle-btn')!.addEventListener('click', toggleTheme);


// Option 1: Add a button to toggle the completed status of a todo item
// Function to toggle the completed status of a todo + 

// Option 4: Add a button to filter todos by status
// Function to filter todos by status

// Option 7: Add a dropdown to set the priority level (e.g., Low, Medium, High) for each todo item.
// Display the priority level next to each todo item.
// Sort todos by priority.