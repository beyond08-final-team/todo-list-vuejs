<template>
  <div class="d-flex justify-content-center align-items-center vh-100 c">
    <todo-app />
  </div>
</template>

<script>
import TodoApp from './components/ToDoApp.vue';
export default {
  components: {
    TodoApp,

  }
};
</script>

<style lang="scss" scoped>
  .c{
    background-color: #EEEEEE;
  }
</style>
