<template>
  <div class="card">
    <div class="content" v-show="!isEditing">
      <div
        class="header"
        :class="{'is-completed': todo.done}"
        @click="completeTodo(todo)"
        contenteditable="isEditing"
      >{{ todo.title }}</div>
      <div class="extra content">
        <span class="right floated icon" @click="editTodo(todo)">
          <i class="icon">edit</i>
        </span>
        <span class="right floated icon" @click="deleteTodo(todo)">
          <i class="icon">x</i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["todo"],
  data() {
    return {
      isEditing: false
    };
  },
  methods: {
    hideForm() {
      this.isEditing = false;
    },
    deleteTodo(todo) {
      this.$emit("delete-todo", todo);
    },
    editTodo(todo) {
      this.isEditing = true;
    },
    completeTodo(todo) {
      this.$emit("complete-todo", todo);
    }
  }
};
</script>
<style scoped>
.is-completed {
  text-decoration: line-through;
}
.card {
  border: solid 1px #e3e3e3;
}
</style>
