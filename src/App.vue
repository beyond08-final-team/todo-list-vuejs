<template>
  <div id="app" class="app-container">
    <todo-list />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 전체 높이 사용 */
  background-color: #e0e0e0; /* 회색 배경색 */
  margin: 0;
}
</style>
