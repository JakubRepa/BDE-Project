// main.ts

import './style.css'; // Import CSS for styling
import { addTodo } from './todoModule'; // Import the addTodo function
import './colorPicker'; // Import color picker module

const form = document.querySelector('.todo-form') as HTMLFormElement; // Reference to the form element
const todoInput = document.getElementById('todo-input') as HTMLInputElement; // Reference to the input element
const prioritySelect = document.getElementById('priority-select') as HTMLSelectElement; // Reference to the priority select dropdown
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement; // Reference to the error message

// Event listener for form submission to add a new todo
form.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // Prevent default form submission

  const text = todoInput.value.trim(); // Get the input value and trim whitespace
  const priority = prioritySelect.value as 'low' | 'medium' | 'high'; // Get the selected priority from the dropdown

  if (text !== '') {
    todoInput.classList.remove('input-error'); // Remove error styling from input
    errorMessage.style.display = 'none'; // Hide error message

    // Call addTodo with the text and selected priority
    addTodo(text, priority); // Pass the text and priority to the addTodo function
    
    todoInput.value = ''; // Clear the input field after submission
    prioritySelect.value = 'low'; // Reset priority to default (low)
  } else {
    console.log("Please enter a todo item"); // Log the error
    todoInput.classList.add('input-error'); // Add error class to input field
    errorMessage.style.display = 'block'; // Show the error message
  }
});



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
