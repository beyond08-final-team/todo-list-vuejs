<template>
  <div class="d-flex justify-content-center align-items-center vh-100 background">
    <TodoApp />
  </div>
</template>

<script>
import TodoApp from '@components/TodoApp.vue';
export default {
  components: {
    TodoApp,

  }
};
</script>

<style lang="scss" scoped>
  .background{
    background-color: #EEEEEE;
  }
</style>
