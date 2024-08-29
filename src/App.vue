<template>
  <todo-layout>
    <b-card class="todo-card shadow">
      <b-card-title class="text-center">To do App</b-card-title>
      <b-card-body
        class="todo-input-group w-75 d-flex flex-nowrap justify-content-around m-auto"
      >
        <b-form-input class="w-50" />
        <b-button variant="primary">SAVE</b-button>
        <b-button variant="warning">GET TODOS</b-button>
      </b-card-body>
      <b-card-body class="d-flex flex-nowrap justify-content-around">
        <b-table-simple>
          <b-thead>
            <b-th> No. </b-th>
            <b-th> Todo Item </b-th>
            <b-th> Status </b-th>
            <b-th> Actions </b-th>
          </b-thead>

          <b-tbody>
            <b-tr v-for="todo in todos" :key="todo.id">
              <b-td>{{ todo.no }}</b-td>
              <b-td>{{ todo.content }}</b-td>
              <b-td>{{ todo.status }}</b-td>
              <b-td class="d-none d-sm-block">
                <b-button class="me-3" variant="danger">DELETE</b-button>
                <b-button class="me-3" variant="dark">EDIT</b-button>
                <b-button variant="success">FINISHED</b-button>
              </b-td>
              <b-td class="d-sm-none">
                <b-dropdown variant="outline-secondary">
                  <b-dropdown-item> DELETE </b-dropdown-item>
                  <b-dropdown-divider />
                  <b-dropdown-item> FINISHED </b-dropdown-item>
                  <b-dropdown-divider />
                  <b-dropdown-item> EDIT </b-dropdown-item>
                </b-dropdown>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-card-body>
    </b-card>
  </todo-layout>
</template>

<script>
import { TodoLayout } from "./views";

export default {
  components: {
    TodoLayout,
  },
  data() {
    return {
      todos: [
        {
          no: 1,
          content: "hello",
          status: "In Progress",
        },
        {
          no: 2,
          content: "hello",
          status: "In Progress",
        },
        {
          no: 3,
          content: "hello",
          status: "In Progress",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.todo-card {
  height: 420px;
}
.todo-input-group {
  min-width: 450px;
}
</style>
