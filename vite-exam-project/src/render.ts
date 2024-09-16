import { todos } from './todoModule'; 
import { addRemoveButtonListener, addEditButtonListener } from './eventListeners';
import { addToggleCompleteButtonListener } from './toggleComplete';

// Function to get color based on priority level
const getPriorityColor = (priority: 'low' | 'medium' | 'high'): string => {
  switch (priority) {
    case 'low':
      return 'green';  // Low priority = green
    case 'medium':
      return 'orange'; // Medium priority = orange
    case 'high':
      return 'red';    // High priority = red
    default:
      return 'grey';   // Default color if no valid priority is found
  }
};

const todoList = document.getElementById('todo-list') as HTMLUListElement;

export const renderTodos = (): void => {
  todoList.innerHTML = ''; // Clear the current list in the DOM

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item'; // Assign a class for styling

    const completedClass = todo.completed ? 'completed' : '';

    // If priority doesn't exist on the todo, default it to 'low'
    const priority = todo.priority || 'low'; // Fallback if priority is undefined
    const priorityColor = getPriorityColor(priority); // Get the color based on priority

    // Render HTML for each todo
    li.innerHTML = `
      <input type="radio" class="complete-radio" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
      <span class="${completedClass}">${todo.text}</span>
      <!-- Priority tag with color based on priority -->
      <span class="priority-tag" style="color: ${priorityColor}; font-weight: bold;">${priority}</span>
      <button class="edit-btn"><i class="fas fa-pen"></i></button>
      <button class="remove-btn"><i class="fas fa-times"></i></button>
    `;

    // Add event listeners to buttons and radio
    addRemoveButtonListener(li, todo.id); 
    addEditButtonListener(li, todo.id); 
    addToggleCompleteButtonListener(li); 

    todoList.appendChild(li);
  });
};
