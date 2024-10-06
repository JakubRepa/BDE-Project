import { todos } from './todoModule';
import { addRemoveButtonListener } from './eventListeners';
import { addToggleCompleteButtonListener } from './toggleComplete';

// Function to edit a todo item by its ID
const editTodo = (id: number): void => {
  const todo = todos.find(todo => todo.id === id); // Find the todo item by ID
  if (todo) {
    const text = prompt('Edit todo', todo.text); // Prompt user to edit the todo text
    if (text) {
      todo.text = text; // Update the todo text
      renderTodos(); // Re-render the updated list of todos
    }
  }
};

// Function to get color based on priority level
const getPriorityColor = (priority: 'low' | 'medium' | 'high'): string => {
  switch (priority) {
    case 'low':
      return 'green';  // (Low priority = green)
    case 'medium':
      return 'orange'; // (Medium priority = orange)
    case 'high':
      return 'red';    // (High priority = red)
    default:
      return 'grey';   // (Default color if no valid priority is found)
  }
};

const todoList = document.getElementById('todo-list') as HTMLUListElement;
const filtersContainer = document.getElementById('filters') as HTMLDivElement; // FILTERING - (Container for filter buttons)

// FILTERING - (Filter state object to track which priorities are selected)
const filters = {
  low: false,
  medium: false,
  high: false,
};

// FILTERING - (Function to handle filter change)
const handleFilterChange = (priority: 'low' | 'medium' | 'high', checked: boolean): void => {
  filters[priority] = checked;  // FILTERING - (Update the filter state based on checkbox status)
  renderTodos(); // (Re-render todos with the applied filters)
};

// FILTERING - (Function to create and render filter buttons)
const renderFilters = (): void => {
  filtersContainer.innerHTML = `
    <label><input type="checkbox" id="filter-low"> Low</label>
    <label><input type="checkbox" id="filter-medium"> Medium</label>
    <label><input type="checkbox" id="filter-high"> High</label>
  `;

  // FILTERING - (Add event listeners for each filter checkbox)
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

// Updated: Render todos based on filters
export const renderTodos = (): void => {
  todoList.innerHTML = ''; // (Clear the current list in the DOM)

  // FILTERING - (Apply filters to todos before rendering)
  const filteredTodos = todos.filter(todo => {
    if (filters.low && todo.priority === 'low') return true;      // FILTERING - (Show low priority todos)
    if (filters.medium && todo.priority === 'medium') return true; // FILTERING - (Show medium priority todos)
    if (filters.high && todo.priority === 'high') return true;     // FILTERING - (Show high priority todos)
    return !filters.low && !filters.medium && !filters.high;       // FILTERING - (Show all if no filters are selected)
  });

  // **Sorting todos by priority: High > Medium > Low**
  filteredTodos.sort((a, b) => {
    const priorityOrder = { low: 1, medium: 2, high: 3 }; // Define priority order
    return priorityOrder[b.priority] - priorityOrder[a.priority]; // Sort descending: 'high' (3) > 'medium' (2) > 'low' (1)
  });

  // (Loop through filtered todos array to render each todo item)
  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item'; // (Assign a class for styling)

    // (Apply 'completed' class conditionally if the todo is completed)
    const completedClass = todo.completed ? 'completed' : '';

    const priority = todo.priority || 'low'; // (Fallback to 'low' if priority is undefined)
    const priorityColor = getPriorityColor(priority); // (Get the color based on priority)

    // (Render HTML for each todo)
    li.innerHTML = `
      <input type="checkbox" class="complete-radio" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
      <span class="${completedClass}">${todo.text}</span>
      <!-- (Priority tag with color based on priority) -->
      <span class="priority-tag" style="color: ${priorityColor}; font-weight: bold;">${priority}</span>
      <button class="edit-btn"><i class="fas fa-pen"></i></button>
      <button class="remove-btn"><i class="fas fa-times"></i></button>
    `;

    // (Add event listeners to buttons and radio)
    addRemoveButtonListener(li, todo.id); 
    li.querySelector('.edit-btn')!.addEventListener('click', () => editTodo(todo.id)); // Directly add the edit event listener here
    addToggleCompleteButtonListener(li); 

    todoList.appendChild(li); // (Append each filtered todo item to the DOM)
  });
};

// FILTERING - (Call the renderFilters function to display filter buttons)
renderFilters();
