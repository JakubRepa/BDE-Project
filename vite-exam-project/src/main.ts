/**
 * NOTE to self
 * Make a module and import the functions from the module
 * Seperate the functions into different files
 * Logical grouping of functions - for example, all functions related to adding a todo item can be in one file
 * 
 */


// 1 Import the CSS file: This ensures that the styles are applied to the HTML elements.
import './style.css';

// Step 2: Define the Todo interface
// Define the Todo interface: This interface defines the structure of a todo item.
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Step 3: Initialize an empty array to store todos
// Initialize an empty array: This array will store the list of todos.
let todos: Todo[] = [];

// Step 4: Get references to the HTML elements
// Get references to the HTML elements: These references will be used to interact with the DOM
const todoInput = document.getElementById('todo-input') as HTMLInputElement; // exist in HTML file
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;    // exist in HTML file
const todoList = document.getElementById('todo-list') as HTMLUListElement;   // exist in HTML file






// Step 5: Function to add a new todo
// Function to add a new todo: This function creates a new todo object and adds it to the array.
const addTodo = (text: string): void => {
  const newTodo: Todo = {
    id: Date.now(), // Generate a unique ID based on the current timestamp
    text: text,
    completed: false,
  };
  todos.push(newTodo);
  console.log("Todo added: ", todos); // Log the updated list of todos to the console
  renderTodos(); // Render the updated list of todos => create the function next
};

// Step 6: Function to render the list of todos
// Function to render the list of todos: This function updates the DOM to display the current list of todos.
const renderTodos = (): void => { // void because no return - what we are doing is updating the DOM
  // Clear the current list
  todoList.innerHTML = '';

  // Iterate over the todos array and create list items for each todo
  todos.forEach(todo => { // In this specific case, .forEach is more suitable because we are directly modifying the DOM for each todo item.
    const li = document.createElement('li');
    li.className = 'todo-item'; // Add a class to the list item
    // Use template literals to create the HTML content for each list item
    li.innerHTML = `
      <span>${todo.text}</span>
      <button>Remove</button>
    `;
    // addRemoveButtonListener is further down in the code. We have onclick in the function instead of template literals. More safe to use addEventListener.
    addRemoveButtonListener(li, todo.id); // Add event listener to the remove button. li is the parent element, and todo.id is the ID of the todo. 
    todoList.appendChild(li); // Append the list item to the ul element
  });
};

// Step 6.1: Function to render the list of todos
// Initial render
renderTodos(); // Call the renderTodos function to display the initial list of todos : Should be at the end of the code to ensure that the function is defined before it is called.
// The initial render is important to display the list of todos when the page is first loaded. Without it, the list would be empty until a new todo is added.
// Move it when code is complete ( refactoring ) 


// Step 7: Event listener for the form submission
// Event listener for the form submission: This listener handles the form submission, adds the new todo, and clears the input field.
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const text = todoInput.value.trim(); // Get the value of the input field and remove any leading or trailing whitespace - not needed, but good practice
  if (text !== '') { // Check if the input field is not empty. Sort of a reverse falsey
    addTodo(text);
    todoInput.value = ''; // Clear the input field
  }
});

//Improved code for step 7 - user input validation - move the error message to the top of the Typescript file
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement; // Should be moved to the top + added to the HTML file

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const text = todoInput.value.trim(); // Get the value of the input field and remove any leading or trailing whitespace

  if (text !== '') { // Check if the input field is empty
    todoInput.classList.remove('input-error'); // Remove the error highlight if present
    errorMessage.style.display = 'none'; // Hide the error message
    addTodo(text); // Add the todo item
    todoInput.value = ''; // Clear the input field
  } else {
    console.log("Please enter a todo item"); // Provide feedback to the user
    todoInput.classList.add('input-error'); // Add a class to highlight the error
    errorMessage.style.display = 'block'; // Show the error message
  }
});



// Step 8: Function to removes all a todo by ID
// Function to add event listener to the remove button - this function has an callback function that removes the todo item from the array.
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('button');
  removeButton?.addEventListener('click', () => removeTodo(id)); // We have an optional chaining operator here to avoid errors if the button is not found - for example, if the button is removed from the DOM.
};
/*
example of explicit null checking - without optional chaining operator, but basically the same as above
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('button');
  if (removeButton) {
    removeButton.addEventListener('click', () => removeTodoById(id));
  } else {
    console.error(`Remove button not found for todo item with ID: ${id}`);
  }
};
*/


// Step 8: Function to remove a todo by ID
// Function to remove a todo by ID: This function removes a todo from the array based on its ID.
const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos(); // Re-render the updated list of todos
}; 




// Step 9: Function to toggle the completed status of a todo + 
// Step 10: Add a button to toggle the completed status of a todo item

// Step 11: Add a button to clear all completed todos
// Step 12: Function to clear all completed todos
// Step 13: Add a button to toggle all todos

// Step 14: Edit a todo item and update it
// Step 15: Add an input field to edit a todo item
// Step 16: Save the updated todo item
// Step 17: Cancel the editing of a todo item
// Step 18: Add a button to cancel the editing of a todo item

// Step 19: Add a button to filter todos by status
// Step 20: Function to filter todos by status

// Step 21: Add a button to sort todos by status
// Step 22: Function to sort todos by status

// Step 23: Add a button for color picker for background color (<input type="color" id="colorPicker" />)
// Step 24: Function to change the background color of the todo list based on the color picker value
// hints: use the input event to listen for changes in the color picker value, and set the background color of the todo list based on the value of the color picker.











/**
 * color picker
 */

// Function to change the background color of the page based on the color picker value
const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;
};

// Function to initialize the color picker event listener
const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement; // encapsulate the color picker element to this function
  if (colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value);
    });
  } else {
    console.error('Color picker element not found');
  }
};

// Call the initializeColorPicker function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker();
});