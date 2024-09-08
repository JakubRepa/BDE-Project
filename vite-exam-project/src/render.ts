// render.ts

import { todos } from './todoModule'; 
import { addRemoveButtonListener, addEditButtonListener } from './eventListeners';
import { addToggleCompleteButtonListener } from './toggleComplete';

const todoList = document.getElementById('todo-list') as HTMLUListElement;

export const renderTodos = (): void => {
  todoList.innerHTML = ''; // Clear the current list in the DOM

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item'; // Assign a class for styling

    const completedClass = todo.completed ? 'completed' : ''; // Conditionally add a class for completed todos
    li.innerHTML = `
      <input type="radio" class="complete-radio" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
      <span class="${completedClass}">${todo.text}</span> 
      <button class="edit-btn"><i class="fas fa-pen"></i></button>
      <button class="remove-btn"><i class="fas fa-times"></i></button>
    `;

    // Add event listeners to the new buttons and radio
    addRemoveButtonListener(li, todo.id); 
    addEditButtonListener(li, todo.id); 
    addToggleCompleteButtonListener(li); // Updated function to handle radio button

    todoList.appendChild(li); // Append the list item to the DOM
  });
};
