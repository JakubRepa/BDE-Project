
// Define the structure of a todo item
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high'; // Add priority level property
  }
  