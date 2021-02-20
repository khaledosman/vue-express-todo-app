import axios from 'axios'

const API_URL = `${process.env.VUE_APP_BACKEND_URL}/api`

// TODO maybe make a Todo class with static functions
export function getTodos ({ limit, offset, showCompleted }) {
  return axios.get(`${API_URL}/todos?limit=${limit}&offset=${offset}&showCompleted=${showCompleted}`)
    .then(res => res.data)
}

export function createTodo (todo) {
  return axios.post(`${API_URL}/todos`, todo)
    .then(res => res.data)
}

export function updateTodo (todoId, partialUpdate) {
  return axios.patch(`${API_URL}/todos/${todoId}`, partialUpdate)
    .then(res => res.data)
}

export function deleteTodo (todoId) {
  return axios.delete(`${API_URL}/todos/${todoId}`)
    .then(res => res.data)
}
