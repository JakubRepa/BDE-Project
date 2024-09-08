export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: string; // Add priority field for future
}

export let todos: Todo[] = [];

// Add Todo
export const addTodo = (text: string, priority: string): void => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false,
    priority: priority
  };
  todos.push(newTodo);
};

// Remove Todo
export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
};
