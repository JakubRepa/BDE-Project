// toggleComplete.ts

import { todos } from './todoModule';
import { renderTodos } from './render'; // Import renderTodos function to re-render the list

export const addToggleCompleteButtonListener = (element: HTMLElement): void => {
  const radio = element.querySelector('.complete-radio') as HTMLInputElement;

  radio.addEventListener('click', () => {
    const id = parseInt(radio.getAttribute('data-id') || '0');
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed; // Toggle completed status
      renderTodos(); // Re-render the list to update the UI
    }
  });
};
