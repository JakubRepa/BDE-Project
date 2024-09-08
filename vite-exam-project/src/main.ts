// main.ts

import './style.css'; // Import CSS for styling
import { addTodo } from './todoModule'; // Import the addTodo function
import './colorPicker'; // Import color picker module

const form = document.querySelector('.todo-form') as HTMLFormElement;
const prioritySelect = document.getElementById('priority-select') as HTMLSelectElement;


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

// Option 7: Add a dropdown to set the priority level (e.g., Low, Medium, High) for each todo item.
// Display the priority level next to each todo item.
// Sort todos by priority.
// Search Functionality:


// Handle form submission
form.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  const priority = prioritySelect.value; // Get the selected priority level

  if (text) {
    addTodo(text, priority); // Pass the priority level to the addTodo function
    todoInput.value = '';
    prioritySelect.value = 'low'; // Reset to default priority
  } else {
    document.getElementById('error-message')!.style.display = 'block';
  }
});

/**
 * NOTE to self
 * Make a module and import the functions from the module
 * Seperate the functions into different files
 * Logical grouping of functions - for example, all functions related to adding a todo item can be in one file
 * 
 */


/**
 * REDO it. More streqamlined and better structure - 
 */


/** 
 * Kristian: 6th of September 2024, BDE
 * 
 * This is the list of optional features that can be added to the todo list application:
 * You must make at least one of these features to complete the project. The more the merrier.
 * In your submission video, please mention which feature you have implemented and demonstrate how it works. Go through the code and explain how you implemented the feature and how it works.
 * IF, you want to implement something not on list, you can do that as well.
*/


//Optional features list: 

// Option 1: Add a button to toggle the completed status of a todo item
// Function to toggle the completed status of a todo + 
// Add a button to toggle the completed status of a todo item

// Priority Levels:
// Option 7: Add a dropdown to set the priority level (e.g., Low, Medium, High) for each todo item.
// Display the priority level next to each todo item.
// Sort todos by priority.

// Dark Mode Toggle:
// Option 11: Add a button to toggle between light and dark modes.
// Change the app's theme based on the selected mode.
