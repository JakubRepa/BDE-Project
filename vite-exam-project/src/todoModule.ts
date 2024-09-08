// todoModule.ts

import { Todo } from './interfaces';
import { renderTodos } from './render';

// Initialize an empty array to store todos
export let todos: Todo[] = [];

// Function to add a new todo
export const addTodo = (text: string): void => {
  const newTodo: Todo = {
    id: Date.now(), 
    text: text,
    completed: false, // Initially not completed
  };
  todos.push(newTodo);
  console.log("Todo added: ", todos);
  renderTodos();
};

// Function to toggle the completed status of a todo by ID
export const toggleCompleted = (id: number): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed; // Toggle the completed status
    console.log(`Todo with ID: ${id} completed status is now: `, todo.completed);
    renderTodos(); // Re-render the updated list of todos
  }
};

// Function to remove a todo by ID
export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
};
