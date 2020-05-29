<template>
  <div>
    <p>Completed Tasks: {{completedTodos}}</p>
    <p>Pending Tasks: {{pendingTodos}}</p>
    <todo
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @delete-todo="deleteTodo"
      @complete-todo="completeTodo"
    ></todo>
  </div>
</template>

<script type = "text/javascript" >
import Todo from "./Todo";

export default {
  props: ["todos"],
  components: {
    Todo
  },
  methods: {
    deleteTodo(todo) {
      this.$emit("delete-todo", todo);
    },
    completeTodo(todo) {
      this.$emit("complete-todo", todo);
    }
  },
  computed: {
    completedTodos() {
      return this.todos.filter(todo => {
        return todo.done === true;
      }).length;
    },
    pendingTodos() {
      return this.todos.filter(todo => {
        return todo.done === false;
      }).length;
    }
  }
};
</script>
<style>
</style>
