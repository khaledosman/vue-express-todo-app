<template>
  <div id="app">
    <TodoList :todos="todos" @complete-todo="completeTodo" @delete-todo="deleteTodo" />
    <CreateTodo @create-todo="createTodo" />
  </div>
</template>

<script>
import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
export default {
  name: "App",
  components: {
    TodoList,
    CreateTodo
  },
  methods: {
    createTodo(title) {
      this.todos.push({
        title,
        done: false
      });
    },
    completeTodo(todo) {
      const todoIndex = this.todos.findIndex(t => t.id === todo.id);
      this.todos[todoIndex].done = !this.todos[todoIndex].done;
    },
    deleteTodo(todo) {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    }
  },
  data() {
    return {
      todos: [
        {
          id: 1,
          title: "Todo A",
          done: false
        },
        {
          id: 2,
          title: "Todo B",
          done: true
        },
        {
          id: 3,
          title: "Todo C",
          done: false
        },
        {
          id: 4,
          title: "Todo D",
          done: false
        }
      ]
    };
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
