import axios from 'axios'

const API_URL = `${process.env.VUE_APP_BACKEND_URL}/api`

interface GetTodosOptions {
  limit: number;
  offset: number;
  showCompleted: boolean;
}

interface CreateTodoOptions {
  title: string;
  description?: string;
  isCompleted?: boolean;
}

// TODO maybe make a Todo class with static functions
export function getTodos ({ limit, offset, showCompleted }: GetTodosOptions) {
  return axios.get(`${API_URL}/todos?limit=${limit}&offset=${offset}&showCompleted=${showCompleted}`)
    .then(res => res.data)
}

export function createTodo (todo: CreateTodoOptions) {
  return axios.post(`${API_URL}/todos`, todo)
    .then(res => res.data)
}

export function updateTodo (todoId: string, partialUpdate: Partial<CreateTodoOptions>) {
  return axios.patch(`${API_URL}/todos/${todoId}`, partialUpdate)
    .then(res => res.data)
}

export function deleteTodo (todoId: string) {
  return axios.delete(`${API_URL}/todos/${todoId}`)
    .then(res => res.data)
}
