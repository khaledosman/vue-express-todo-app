<template>
  <div id="app">
    <h3>{{count}} Todos available, showing {{filteredTodos.length}}</h3>
    <div>
      <button
        class="fetch-more"
        v-if="count > 0 && filteredTodos.length < count"
        type="button"
        @click="fetchTodos"
      >Fetch more todos</button>
    </div>
    <div class="filter">
      <input type="checkbox" @click="toggleCompleted" :checked="showCompleted" />
      show completed
    </div>
    <TodoList
      :todos="filteredTodos"
      @complete-todo="completeTodo"
      @delete-todo="deleteTodo"
      @edit-todo="editTodo"
    />
    <CreateTodo @create-todo="createTodo" />
  </div>
</template>

<script lang="ts">
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
  data() {
    return {
      showCompleted: true,
      offset: 0,
      limit: 3,
      count: 0,
      todos: []
    };
  },
  computed: {
    filteredTodos() {
      return this.todos.filter(todo =>
        this.showCompleted ? true : !todo.isCompleted
      );
    }
  },
  async mounted() {
    await this.fetchTodos();
  },
  methods: {
    async createTodo(title) {
      const newTodo = await createTodo({
        title,
        isCompleted: false
      });
      this.todos = [...this.todos, newTodo];
      this.count++;
      // this.fetchTodos();
    },
    async fetchTodos() {
      const result = await getTodos({
        limit: this.limit,
        offset: this.offset,
        showCompleted: this.showCompleted
      });
      this.count = result.count;
      // if fetching more data, append to the list, if the filter changed clear the results and only show the new data
      this.todos =
        this.offset === 0 ? result.rows : [...this.todos, ...result.rows];
      // update the offset for loading the next page
      this.offset += this.limit;
    },
    async toggleCompleted() {
      this.showCompleted = !this.showCompleted;
      this.offset = 0;
      this.todos = [];
      await this.fetchTodos();
    },
    async completeTodo(todo) {
      await this.editTodo({
        oldTodo: todo,
        newTodo: { ...todo, isCompleted: !todo.isCompleted }
      });
    },
    async deleteTodo(todo) {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete ${todo.title}?`
      );
      if (!isConfirmed) {
        return;
      }
      await deleteTodo(todo.id);
      this.todos = this.todos.filter(t => t.id !== todo.id);
      this.count--;
      // this.fetchTodos();
    },
    async editTodo({ oldTodo, newTodo }) {
      const updatedTodo = await updateTodo(oldTodo.id, newTodo);
      const todoIndex = this.todos.findIndex(t => t.id === updatedTodo.id);
      this.todos = [
        ...this.todos.slice(0, todoIndex),
        updatedTodo,
        ...this.todos.slice(todoIndex + 1, this.todos.length)
      ];

      // this.fetchTodos();
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  box-sizing: border-box;
}
.filter {
  float: right;
}
.fetch-more {
  float: left;
}
</style>
