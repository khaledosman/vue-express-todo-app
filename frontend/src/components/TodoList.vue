<template>
  <div class="list">
    <!-- <p>Completed Tasks: {{completedTodos}}</p>
    <p>Pending Tasks: {{pendingTodos}}</p>-->
    <todo
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @delete-todo="deleteTodo"
      @complete-todo="completeTodo"
      @edit-todo="editTodo"
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
    },
    editTodo({ oldTodo, newTodo }) {
      this.$emit("edit-todo", { oldTodo, newTodo });
    }
  },
  computed: {
    completedTodos() {
      return this.todos.filter(todo => {
        return todo.isCompleted;
      }).length;
    },
    pendingTodos() {
      return this.todos.filter(todo => {
        return !todo.isCompleted;
      }).length;
    }
  }
};
</script>
<style scoped>
.list {
  margin: 5px;
  padding: 2px;
  width: 100%;
  max-height: 300px;
  overflow: auto;
  border: solid 1px #e3e3e3;
}
</style>
