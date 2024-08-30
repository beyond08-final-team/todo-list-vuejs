<template>
  <b-table-simple>
    <b-thead>
      <b-th> No. </b-th>
      <b-th> Todo Item </b-th>
      <b-th> Status </b-th>
      <b-th> Actions </b-th>
    </b-thead>

    <b-tbody>
      <b-tr v-for="todo in todos" :key="todo.id">
        <pinia-todo-list-item :todo="todo" />
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { PiniaTodoListItem } from "..";
import { useTodoStore } from "@store/Todo/todoStore.js";

export default {
  setup() {
    const todoStore = useTodoStore();

    return { todos: todoStore.todos };
  },
  components: {
    PiniaTodoListItem,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
