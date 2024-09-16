// todoModule.ts

import { Todo } from './interfaces';
import { renderTodos } from './render';

// Define an array to store todos
export let todos: Todo[] = [];

// Updated the Todo interface to include priority
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high'; // New field for priority
}

// Function to add a new todo
// Now includes 'priority' as a parameter to allow setting the priority when a todo is created
export const addTodo = (text: string, priority: 'low' | 'medium' | 'high'): void => {
  const newTodo: Todo = {
    id: Date.now(),  // Generate a unique ID based on the current timestamp
    text: text,
    completed: false, // Initially set as not completed
    priority: priority // Set the priority for the todo (low, medium, or high)
  };

  // Add the new todo to the array
  todos.push(newTodo);
  
  console.log("Todo added: ", todos);
  
  // Render the updated todo list
  renderTodos();
};

// Function to toggle the completed status of a todo by its ID
// No changes here, the logic remains the same
export const toggleCompleted = (id: number): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed; // Toggle the completed status (true/false)
    console.log(`Todo with ID: ${id} completed status is now: `, todo.completed);
    
    // Re-render the list after changing the completed status
    renderTodos(); 
  }
};

// Function to remove a todo by its ID
// No changes to this function, works the same as before
export const removeTodo = (id: number): void => {
  // Filter out the todo with the given ID
  todos = todos.filter(todo => todo.id !== id);

  // Re-render the list after removing the todo
  renderTodos();
};

// NEW: Sorting function for todos by priority (optional but useful for sorting later)
// You can call this function if you need the todos sorted by priority
export const sortTodosByPriority = (): void => {
  todos.sort((a, b) => {
    const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 }; // Define order of priorities
    return priorityOrder[b.priority] - priorityOrder[a.priority]; // Sort by priority in descending order
  });

  renderTodos(); // Re-render the sorted list
};
