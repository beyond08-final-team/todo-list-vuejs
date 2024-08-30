<template>
  <div class="todo-input-group w-75 d-flex justify-content-around m-auto">
    <b-form-input class="w-50" :value="todo" @input="onChangeTodo" />
    <b-button variant="primary" @click="handleAddTodo">SAVE</b-button>
    <b-button variant="warning">GET TODOS</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: "",
    };
  },
  methods: {
    onChangeTodo(e) {
      this.todo = e.target.value;
    },
    handleAddTodo() {
      if (this.todo === "") return;

      this.emitter.emit("addTodo", this.todo);
      this.todo = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-input-group {
  min-width: 450px;
}
</style>
