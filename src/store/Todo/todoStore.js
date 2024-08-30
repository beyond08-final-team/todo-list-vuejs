import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => {
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
  actions: {
    addTodo(content) {
      if (content === "") return;

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
});
