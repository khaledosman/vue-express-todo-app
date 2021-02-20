<template>
  <div class="card">
    <div class="content" v-if="!isEditing">
      <div :class="{'is-completed': todo.isCompleted}">
        <input
          type="checkbox"
          class="header"
          @click="completeTodo(todo)"
          :checked="todo.isCompleted"
        />
        {{ todo.title }}
      </div>
      <div class="content">
        <span class="icon" @click="showForm(todo)">
          <i class="icon">edit</i>
        </span>
        <span class="icon" @click="deleteTodo(todo)">
          <i class="icon">delete</i>
        </span>
      </div>
    </div>
    <div v-if="isEditing">
      <input type="text" :defaultValue="todo.title" v-model="todoForm.title" />
      <button type="button" @click="editTodo(todo)">Confirm</button>
      <button type="button" @click="hideForm">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      todoForm: {
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
        newTodo: this.todoForm
      });
      this.hideForm();
    },
    showForm(todo) {
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

.icon {
  margin: 2px;
  cursor: pointer;
}
</style>
