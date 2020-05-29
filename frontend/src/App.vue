<template>
  <div id="app">
    <input type="checkbox" @click="toggleCompleted" :checked="showCompleted" /> show completed
    <TodoList
      :todos="todos"
      @complete-todo="completeTodo"
      @delete-todo="deleteTodo"
      @edit-todo="editTodo"
    />
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
        isCompleted: false
      });
    },
    toggleCompleted() {
      this.showCompleted != this.showCompleted;
      this.todos = this.todos.filter(todo => {
        return this.showCompleted === true || !todo.isCompleted;
      });
      console.log(this.todos);
    },
    completeTodo(todo) {
      const todoIndex = this.todos.findIndex(t => t.id === todo.id);
      this.todos[todoIndex].isCompleted = !this.todos[todoIndex].isCompleted;
    },
    deleteTodo(todo) {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    },
    editTodo({ oldTodo, newTodo }) {
      this.todos = this.todos.map(todo => {
        if (todo.id !== oldTodo.id) {
          return todo;
        } else {
          return { ...oldTodo, ...newTodo };
        }
      });
    }
  },
  data() {
    return {
      showCompleted: true,
      skip: 0,
      count: 10,
      todos: [
        {
          id: 1,
          title: "Todo A",
          isCompleted: false
        },
        {
          id: 2,
          title: "Todo B",
          isCompleted: true
        },
        {
          id: 3,
          title: "Todo C",
          isCompleted: false
        },
        {
          id: 4,
          title: "Todo D",
          isCompleted: false
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
