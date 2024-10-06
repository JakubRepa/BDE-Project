import { todos } from './todoModule'; // Import the todos array
import { renderTodos } from './render'; // Import the renderTodos function

// Function to edit a todo item by its ID
export const editTodo = (id: number): void => {
  const todo = todos.find(todo => todo.id === id); // Find the todo item by ID
  if (todo) {
    const text = prompt('Edit todo', todo.text); // Prompt user to edit the todo text
    if (text) {
      todo.text = text; // Update the todo text
      renderTodos(); // Re-render the updated list of todos
    }
  }
};