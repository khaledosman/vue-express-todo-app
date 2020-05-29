<template>
  <div class="card">
    <div class="content" v-show="!isEditing">
      <div
        class="header"
        :class="{'is-completed': todo.done}"
        @click="completeTodo(todo)"
      >{{ todo.title }}</div>
      <div class="extra content">
        <span class="right floated icon" @click="showForm(todo)">
          <i class="icon">edit</i>
        </span>
        <span class="right floated icon" @click="deleteTodo(todo)">
          <i class="icon">x</i>
        </span>
      </div>
    </div>
    <div v-show="isEditing">
      <input type="text" :defaultValue="todo.title" v-model="editForm.title" />
      <button type="button" @click="editTodo(todo)">Confirm</button>
      <button type="button" @click="hideForm">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["todo"],
  data() {
    return {
      isEditing: false,
      editForm: {
        ...this.todo
      }
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
      this.$emit("edit-todo", {
        oldTodo: todo,
        newTodo: this.editForm
      });
      this.hideForm();
    },
    showForm(todo) {
      this.isEditing = true;
    },
    completeTodo(todo) {
      this.$emit("complete-todo", todo);
    },
    onBlur(e) {
      console.log(e, this.editForm);
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
