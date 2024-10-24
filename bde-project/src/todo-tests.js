// test.js

import { Selector } from 'testcafe';

// Define the URL of the application
const appUrl = 'https://test.jakubrepa.com/todo/'; // Change this to your app's URL if needed

fixture `Todo App Tests`
    .page(appUrl);

// Test to verify that a todo item can be edited
test('Edit Todo Item', async t => {
    // Add a new todo item
    await t
        .typeText('#todo-input', 'Test Todo') // Enter a todo item
        .click('#priority-select') // Click to select the priority
        .click('option[value="medium"]') // Select 'Medium' priority
        .click('button[type="submit"]'); // Click the Add button

    // Wait for the todo item to be rendered in the DOM
    await t
        .expect(Selector('.todo-item').innerText).contains('Test Todo', 'Todo item was added successfully');

    // Click the edit button
    await t
        .click(Selector('.edit-btn').withText('Edit')); // Click on the edit button of the first todo item

    // Simulate entering new text in the prompt (this needs to be handled through a test helper)
    await t
        .setNativeDialogHandler(() => true) // Accept the prompt (you can customize this to enter a specific text)
        .setNativeDialogHandler(() => 'Edited Todo') // Automatically provide the new text for the todo
        .click('OK'); // Click OK to submit the edit

    // Verify that the todo item has been updated
    await t
        .expect(Selector('.todo-item').innerText).contains('Edited Todo', 'Todo item was edited successfully');
});
