// eventListeners.ts

import { removeTodo } from './todoModule'; // Import the removeTodo function
import { editTodo } from './editModule'; // Import the editTodo function

// Function to add event listener for removing a todo item
export const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('button');
  removeButton?.addEventListener('click', () => removeTodo(id)); // Attach event listener to remove button
};

// Function to add event listener for editing a todo item
export const addEditButtonListener = (li: HTMLLIElement, id: number): void => {
  const editButton = li.querySelector('#editBtn');
  editButton?.addEventListener('click', () => editTodo(id)); // Attach event listener to edit button
};
