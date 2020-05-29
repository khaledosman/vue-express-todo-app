<template>
  <div id="app">
    <div>{{count}} Todos available</div>
    <div v-if="count > 0">
      <input type="checkbox" @click="toggleCompleted" :checked="showCompleted" />
      show completed
    </div>
    <TodoList
      :todos="todos"
      @complete-todo="completeTodo"
      @delete-todo="deleteTodo"
      @edit-todo="editTodo"
    />
    <button type="button" @click="fetchTodos">Fetch more todos</button>
    <CreateTodo @create-todo="createTodo" />
  </div>
</template>

<script>
import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from "./helpers/api-helpers";
export default {
  name: "App",
  components: {
    TodoList,
    CreateTodo
  },
  methods: {
    async createTodo(title) {
      const newTodo = await createTodo({
        title,
        isCompleted: false
      });
      this.todos = [...this.todos, newTodo];
    },
    async fetchTodos() {
      const result = await getTodos({
        limit: this.limit,
        offset: this.offset,
        showCompleted: this.showCompleted
      });
      this.count = result.count;
      this.todos =
        this.offset === 0 ? result.rows : [...this.todos, ...result.rows];
      this.offset = this.limit + this.offset;
    },
    async toggleCompleted() {
      this.showCompleted = !this.showCompleted;
      this.offset = 0;
      this.todos = [];
      await this.fetchTodos();
    },
    async completeTodo(todo) {
      const updatedTodo = await updateTodo(todo.id, {
        isCompleted: !todo.isCompleted
      });

      const todoIndex = this.todos.findIndex(t => t.id === updatedTodo.id);
      this.todos = [
        ...this.todos.slice(0, todoIndex),
        updatedTodo,
        ...this.todos.slice(todoIndex + 1, this.todos.length)
      ];
    },
    async deleteTodo(todo) {
      await deleteTodo(todo.id);
      this.todos = this.todos.filter(t => t.id !== todo.id);
    },
    async editTodo({ oldTodo, newTodo }) {
      const updatedTodo = await updateTodo(oldTodo.id, newTodo);
      this.todos = [
        ...this.todos.slice(0, todoIndex - 1),
        updatedTodo,
        ...this.todos.slice(todoIndex + 1, this.todos.length)
      ];
    }
  },
  data() {
    return {
      showCompleted: true,
      offset: 0,
      limit: 3,
      count: 0,
      todos: []
    };
  },
  async mounted() {
    await this.fetchTodos();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
