<template>
  <div>
    <div>
      <div class="content">
        <form class="form" @submit="sendForm">
          <div class="field">
            <!-- <label>Title</label> -->
            <input
              v-model="todoForm.title"
              style="text-align: center"
              placeholder="Add a new todo"
              type="text"
              ref="title"
              defaultValue
            />
          </div>
          <div class="field">
            <input
              v-model="todoForm.description"
              style="text-align: center"
              placeholder="Add todo description"
              type="text"
              ref="description"
              defaultValue
            />
          </div>
          <div class="button">
            <button class="button" @click="sendForm">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data () {
    return {
      todoForm: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    sendForm (e) {
      e.preventDefault()

      if (this.todoForm.title.length) {
        const title = this.todoForm.title
        const description = this.todoForm.description
        this.$emit('create-todo', { title, description })
        this.todoForm = { title: '', description: '' }
      }
    }
  }
}
</script>
<style scoped>
</style>
