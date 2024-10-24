import './style.css'; // Import CSS for styling

// Define an array to store todos
let todos: Todo[] = [];

// Updated the Todo interface to include priority
// (NEW) Priority field added to the Todo interface to store the priority level (low, medium, high)
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high'; // New field for priority
}

// DOM element references
const form = document.querySelector('.todo-form') as HTMLFormElement;
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const prioritySelect = document.getElementById('priority-select') as HTMLSelectElement; // (NEW) Reference to the dropdown for priority selection
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const filtersContainer = document.getElementById('filters') as HTMLDivElement; // (NEW) Container for filter buttons

// FILTERING - (NEW) State object to track which priorities are selected
const filters = {
  low: false,
  medium: false,
  high: false,
};

// (NEW) Function to add a new todo, including priority selection
const addTodo = (text: string, priority: 'low' | 'medium' | 'high'): void => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false,
    priority: priority // (NEW) Priority value passed from the dropdown
  };

  todos.push(newTodo);
  console.log("Todo added: ", todos);
  renderTodos();
};

// (NEW) Function to toggle the completed status of a todo by its ID
const toggleCompleted = (id: number): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed; // (NEW) Toggles completed status between true/false
    console.log(`Todo with ID: ${id} completed status is now: `, todo.completed);
    renderTodos();
  }
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

// (NEW) Function to handle filter changes for priority
const handleFilterChange = (priority: 'low' | 'medium' | 'high', checked: boolean): void => {
  filters[priority] = checked;  // (NEW) Update filter state when checkbox changes
  renderTodos();
};

// (NEW) Function to create and render filter buttons
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

// (NEW) Helper function to get color based on priority
const getPriorityColor = (priority: 'low' | 'medium' | 'high'): string => {
  switch (priority) {
    case 'low': return 'green';
    case 'medium': return 'orange';
    case 'high': return 'red';
    default: return 'grey';
  }
};

// (UPDATED) Function to render the todo list
const renderTodos = (): void => {
  todoList.innerHTML = ''; // Clear the current list

  // (NEW) Filter todos based on selected filters
  const filteredTodos = todos.filter(todo => {
    if (filters.low && todo.priority === 'low') return true;
    if (filters.medium && todo.priority === 'medium') return true;
    if (filters.high && todo.priority === 'high') return true;
    return !filters.low && !filters.medium && !filters.high; // Show all if no filters are selected
  });

  // (NEW) Sort todos by priority
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
      <input type="checkbox" class="complete-radio" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
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

// Initial setup
renderFilters(); // (NEW) Render filter buttons on page load

// (UPDATED) Event listener for form submission to add a new todo
form.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // Prevent default form submission

  const text = todoInput.value.trim();
  const priority = prioritySelect.value as 'low' | 'medium' | 'high'; // (NEW) Get selected priority from the dropdown

  if (text !== '') {
    todoInput.classList.remove('input-error');
    errorMessage.style.display = 'none';
    addTodo(text, priority); // (UPDATED) Pass the priority along with the todo text
    todoInput.value = '';
    prioritySelect.value = 'low'; // Reset the dropdown to default 'low' after adding
  } else {
    console.log("Please enter a todo item");
    todoInput.classList.add('input-error');
    errorMessage.style.display = 'block';
  }
});



// Option 1: Add a button to toggle the completed status of a todo item
// Function to toggle the completed status of a todo + 
// Add a button to toggle the completed status of a todo item

// Option 4: Add a button to filter todos by status
// Add a button to filter todos by status
// Function to filter todos by status

// Option 7: Add a dropdown to set the priority level (e.g., Low, Medium, High) for each todo item.
// Display the priority level next to each todo item.
// Sort todos by priority.