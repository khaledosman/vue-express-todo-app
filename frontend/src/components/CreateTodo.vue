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
              placeholder="Add Todo"
              type="text"
              ref="title"
              defaultValue
            />
          </div>
          <!-- <div class="button">
            <button class="button" @click="sendForm">Create</button>
            <button class="button" @click="closeForm">Cancel</button>
          </div>-->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoForm: {
        title: ""
      }
    };
  },
  methods: {
    sendForm(e) {
      e.preventDefault();

      if (this.todoForm.title.length) {
        const title = this.todoForm.title;
        this.$emit("create-todo", title);
        this.todoForm = { title: "" };
      }
    }
  }
};
</script>
<style scoped>
</style>
