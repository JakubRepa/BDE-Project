import { Selector } from 'testcafe';

// Define the fixture and the URL of the application
fixture `Todo App Test`
    .page `http://localhost:5173/todo/` // Ensure this URL is correct for the testing environment
    .beforeEach(async t => {
        // Arrange: Set up elements for adding todos
        const todoInput = Selector('#todo-input');
        const prioritySelect = Selector('#priority-select');
        const submitButton = Selector('.todo-form button[type="submit"]');

        // Act: Add two todo items, one marked as completed
        await t
            .typeText(todoInput, 'First Todo')
            .click(prioritySelect)
            .click(prioritySelect.find('option[value="low"]')) // Select 'low' priority
            .click(submitButton) // Add the first todo
            .typeText(todoInput, 'Second Todo')
            .click(prioritySelect)
            .click(prioritySelect.find('option[value="medium"]'))
            .click(submitButton); // Add the second todo
        
        // Mark the first todo as completed
        const firstTodoCheckbox = Selector('.todo-item').withText('First Todo').find('.complete-radio');
        await t.click(firstTodoCheckbox);
    });

// Test for the "Clear All Completed Todos" feature
test('Clear all completed todos', async t => {
    // Arrange: Select elements needed for the test
    const clearCompletedBtn = Selector('#clear-completed-btn'); // Button to clear completed todos
    const firstTodo = Selector('.todo-item').withText('First Todo');
    const secondTodo = Selector('.todo-item').withText('Second Todo');

    // Act: Click the "Clear Completed Todos" button
    await t.click(clearCompletedBtn);

    // Assert: Verify that the completed todo was removed and the incomplete one remains
    await t
        .expect(firstTodo.exists).notOk('The completed todo should be removed.')
        .expect(secondTodo.exists).ok('The incomplete todo should remain.');
});

// Test for the "Toggle Theme" feature
test('Toggle theme between light and dark modes', async t => {
    // Arrange: Select the theme toggle button and check the initial state
    const themeToggleBtn = Selector('#theme-toggle-btn'); // Button to toggle theme
    const bodyElement = Selector('body'); // Body element to check for dark theme class

    // Act: Click the theme toggle button to apply dark theme
    await t.click(themeToggleBtn);

    // Assert: Verify that the dark theme class is applied to the body
    await t.expect(bodyElement.hasClass('dark-theme')).ok('The dark theme should be applied after the first click.');

    // Act: Click the theme toggle button again to revert to light theme
    await t.click(themeToggleBtn);

    // Assert: Verify that the dark theme class is removed from the body
    await t.expect(bodyElement.hasClass('dark-theme')).notOk('The dark theme should be removed after the second click.');
});