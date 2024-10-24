import { Selector } from 'testcafe';

// Define the fixture and the URL of the application
fixture `Todo App Test`
    .page `https://test.jakubrepa.com/todo/?` // Change it to the URL of your application
    .beforeEach(async t => {
        // Arrange: Select necessary elements for adding a todo
        const todoInput = Selector('#todo-input');
        const prioritySelect = Selector('#priority-select');
        const submitButton = Selector('.todo-form button[type="submit"]');

        // Act: Add a new todo item with priority 'medium'
        await t
            .typeText(todoInput, 'Test new todo')
            .click(prioritySelect)
            .click(prioritySelect.find('option[value="medium"]')) // Select 'medium' priority
            .click(submitButton); // Submit the form
    });

// Test to verify that a new todo can be added
test('Add a new todo', async t => {
    // Assert: Check that the new todo is added with the correct text and priority
    const todoList = Selector('.todo-item');
    await t
        .expect(todoList.withText('Test new todo').exists).ok()
        .expect(todoList.withText('medium').exists).ok();
});

// Test to verify that a todo can be edited
test('Edit a todo', async t => {
    // Arrange: Select necessary elements for editing the todo
    const todoItem = Selector('.todo-item').withText('Test new todo');
    const editButton = Selector('#edit-btn'); // Targeting the button by ID

    // Set the native dialog handler before triggering the prompt
    await t
        .setNativeDialogHandler(() => 'Edited todo text') // Handle the prompt dialog and return the new text

        // Act: Click the edit button to trigger the prompt and submit the new text
        .click(editButton)
        .pressKey('enter'); // Submit the prompt with the new text

    // Assert: Check that the todo text has been updated
    const updatedTodoItem = Selector('.todo-item').withText('Edited todo text');
});