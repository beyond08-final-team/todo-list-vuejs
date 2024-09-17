<template>
  <todo-layout>
    <b-card class="todo-card shadow">
      <b-card-title class="text-center">To do App</b-card-title>

      <b-card-body>
        <todo-input-form />
      </b-card-body>

      <b-card-body class="todo-list">
        <todo-list :todos="todos" />
      </b-card-body>
    </b-card>
  </todo-layout>

  <!-- with pinia -->
  <todo-layout>
    <b-card class="todo-card shadow">
      <b-card-title class="text-center">To do App</b-card-title>

      <b-card-body>
        <pinia-todo-input-form />
      </b-card-body>

      <b-card-body class="todo-list overflow-y-scroll">
        <pinia-todo-list />
      </b-card-body>
    </b-card>
  </todo-layout>
</template>

<script>
import { TodoLayout } from "./views";
import {
  TodoInputForm,
  TodoList,
  PiniaTodoInputForm,
  PiniaTodoList,
} from "@components/index";
export default {
  components: {
    TodoLayout,
    TodoInputForm,
    TodoList,
    PiniaTodoInputForm,
    PiniaTodoList,
  },
  created() {
    this.emitter.on("addTodo", this.addTodo);
    this.emitter.on("editTodo", this.editTodo);
    this.emitter.on("deleteTodo", this.deleteTodo);
    this.emitter.on("setFinished", this.setFinished);
    this.emitter.on("setInProgress", this.setInProgress);
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
          status: "Done",
        },
        {
          no: 3,
          content: "hello",
          status: "In Progress",
        },
      ],
    };
  },
  methods: {
    addTodo(content) {
      // 마지막으로 저장된 todo의 no 받아오기
      const lastTodo = this.todos[this.todos.length - 1];

      const newTodo = {
        no: lastTodo.no + 1,
        content,
        status: "In Progress",
      };

      this.todos.push(newTodo);
    },
    editTodo(newTodo) {
      const targetTodo = this.todos.find((todo) => todo.no === newTodo.no);
      targetTodo.content = newTodo.content;
    },
    deleteTodo(no) {
      const targetIndex = this.todos.findIndex((todo) => todo.no === no);
      this.todos.splice(targetIndex, 1);
    },
    setFinished(no) {
      const targetTodo = this.todos.find((todo) => todo.no === no);
      targetTodo.status = "Done";
    },
    setInProgress(no) {
      const targetTodo = this.todos.find((todo) => todo.no === no);
      targetTodo.status = "In Progress";
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-card {
  height: 500px;
}
.todo-list {
  max-height: 320px;
}
</style>
