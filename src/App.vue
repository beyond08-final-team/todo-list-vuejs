<template>
  <div class="todo-list-table">
    <InputForm />
  </div>
</template>

<script>
import InputForm from '@components/InputForm.vue';

export default {
  name: 'MainTodoList',
  components: {
    InputForm,
  }
};
</script>

<style lang="scss" scoped>
.todo-list-table {
  background-color: rgb(189, 184, 184);
}
</style>
