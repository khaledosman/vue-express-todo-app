<template>
  <div>
    <button class="button icon" @click="openForm" v-show="!isCreating">
      <i class="icon">Create Todo</i>
    </button>
    <div v-show="isCreating">
      <div class="content">
        <div class="form">
          <div class="field">
            <label>Title</label>
            <input v-model="titleText" type="text" ref="title" defaultValue />
          </div>
          <div class="button">
            <button class="button" @click="sendForm">Create</button>
            <button class="button" @click="closeForm">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleText: "",
      isCreating: false
    };
  },
  methods: {
    openForm() {
      this.isCreating = true;
    },
    closeForm() {
      this.isCreating = false;
    },
    sendForm() {
      if (this.titleText.length) {
        const title = this.titleText;
        this.$emit("create-todo", title);
        this.titleText = "";
      }
      this.isCreating = false;
    }
  }
};
</script>
<style scoped>
</style>
