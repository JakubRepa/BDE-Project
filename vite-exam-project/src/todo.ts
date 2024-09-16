// Define the Todo type with priority
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high'; // Add priority level
}

// Array to store todos
export const todos: Todo[] = [];

// Function to add a new todo
export const addTodo = (text: string, priority: 'low' | 'medium' | 'high'): void => {
  const newTodo: Todo = {
    id: Date.now(), // Unique ID
    text,
    completed: false,
    priority, // Set priority level
  };
  todos.push(newTodo);
  renderTodos(); // Render updated todo list
};

// Function to remove a todo by ID
export const removeTodo = (id: number): void => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    renderTodos();
  }
};

// Function to edit a todo by ID
export const editTodo = (id: number, newText: string): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.text = newText;
    renderTodos();
  }
};

// Function to toggle the completed status of a todo by ID
export const toggleComplete = (id: number): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}
