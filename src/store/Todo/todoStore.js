import { apiClient } from "@apis/client.js";
import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => {
    return {
      todos: [],
    };
  },
  actions: {
    async addTodo(content) {
      if (content === "") return;

      const newTodo = {
        content,
      };

      try {
        const response = await apiClient.post("/todo", newTodo);
        this.todos.push(response.data.data);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchTodo() {
      try {
        const response = await apiClient.get("/todos");
        this.todos = response.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    async editTodo(newTodo) {
      try {
        const response = await apiClient.patch(`/todo/${newTodo.id}/content`, {
          content: newTodo.content,
        });

        const result = response.data.data;

        // 방법 1
        // map을 활용해 변경이 된 객체만 서버의 response로 교체
        this.todos = this.todos.map((todo) =>
          todo.id === result.id ? { ...result } : todo
        );

        // 방법 2
        // 변경이 된 객체를 직접 참조해 status 변경
        const targetTodo = this.todos.find((todo) => todo.id === result.id);
        targetTodo.content = result.content;
      } catch (err) {
        console.log(err);
      }
    },
    async editTodoRefetch(newTodo) {
      try {
        const response = await apiClient.patch(`/todo/${newTodo.id}/content`, {
          content: newTodo.content,
        });
        this.fetchTodo();
      } catch (err) {
        console.log(err);
      }
    },
    async deleteTodo(no) {
      try {
        await apiClient.delete(`/todo/${no}`);

        const targetIndex = this.todos.findIndex((todo) => todo.id === no);

        this.todos.splice(targetIndex, 1);
      } catch (err) {
        console.log(err);
      }
    },
    async setFinished(no) {
      try {
        const response = await apiClient.patch(`/todo/${no}/status`, {
          status: "Done",
        });
        const result = response.data.data;

        // 방법1
        this.todos = this.todos.map((todo) =>
          todo.id === result.id ? { ...result } : todo
        );

        // 방법2
        // 변경이 된 객체를 직접 참조해 status 변경
        const target = this.todos.find((todo) => result.id === todo.id);
        target.status = result.status;
      } catch (err) {
        console.log(err);
      }
    },
    async setInProgress(no) {
      try {
        const response = await apiClient.patch(`/todo/${no}/status`, {
          status: "InProgress",
        });
        const result = response.data.data;

        // 방법 1
        this.todos = this.todos.map((todo) =>
          todo.id === result.id ? { ...result } : todo
        );

        // 방법 2
        const targetTodo = this.todos.find((todo) => todo.id === result.id);
        targetTodo.status = result.status;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
