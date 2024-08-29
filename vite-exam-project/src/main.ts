import './style.css'

interface Todo {
  id: number;
  title: string;
  completed: boolean
}

//step 2: initialize the todos array
let todos: Todo[] = []

//step 3: get reference to the HTML elements
const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoList = document.getElementById('todo-list') as HTMLUListElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement

//step 4: create a function to add a new todo
const addTodo = (text:string): void => {
  const newTodo: Todo = {
    id: Date.now(),
    title: text,
    completed: false
  }
  todos.push(newTodo)
  renderTodos() // renders the todos when a new todo is added to the list
}

const renderTodos = (): void => {
  todoList.innerHTML = ''

  todos.forEach(todo => {
    const li = document.createElement('li')
    li.className = 'todo-item'
    li.innerHTML = `
      <span>${todo.title}</span>
      <button>Remove</button>
    `;
    addRemoveButtonListener(li, todo.id)
    todoList.appendChild(li)
  })
}

renderTodos()

todoForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const text = todoInput.value.trim()
  if (text !== '') {
    addTodo(text)
  }
})

const addRemoveButtonListener = (li: HTMLLIElement, id: number) => {
  const removeButton = li.querySelector('button')
  removeButton?.addEventListener('click', () => removeTodo(id))
}

const removeTodo = (id:number) => {
  todos = todos.filter(todo => todo.id !== id)
  renderTodos()
}