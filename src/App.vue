<template>
  <div class="d-flex justify-content-center align-items-center vh-100 c">
    <todoApp />
  </div>
</template>

<script>
import todoApp from '@components/todoApp.vue';
export default {
  components: {
    todoApp,

  }
};
</script>

<style lang="scss" scoped>
  .c{
    background-color: #EEEEEE;
  }
</style>
