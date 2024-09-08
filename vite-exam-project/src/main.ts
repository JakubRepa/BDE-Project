// main.ts

import './style.css'; // Import CSS for styling
import { addTodo } from './todoModule'; // Import the addTodo function
import './colorPicker'; // Import color picker module

const todoInput = document.getElementById('todo-input') as HTMLInputElement; // Reference to the input element
const todoForm = document.querySelector('.todo-form') as HTMLFormElement; // Reference to the form element
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement; // Reference to error message

// Event listener for form submission to add a new todo
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // Prevent default form submission
  const text = todoInput.value.trim(); // Get input value and trim whitespace
  if (text !== '') { // Validate input
    todoInput.classList.remove('input-error'); // Remove error class
    errorMessage.style.display = 'none'; // Hide error message
    addTodo(text); // Add the new todo
    todoInput.value = ''; // Clear input field
  } else {
    console.log("Please enter a todo item"); // Log error
    todoInput.classList.add('input-error'); // Add error class
    errorMessage.style.display = 'block'; // Show error message
  }
});
