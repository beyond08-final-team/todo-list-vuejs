import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5176";

export const useTodoStore = defineStore("store", {
  state: () => ({
    todos: [], // 목록
    newTask: "",
  }),
  // 함수 정의하는 곳
  //   actions: {
  //     async fetchContents() {
  //       try {
  //         const res = await axios.get(baseUrl); // 요청한 데이터를
  //         this.contents = res.data; // 생성한 state에 대입한다.
  //       } catch (err) {
  //         console.error("Fetch ERROR!", err);
  //       }
  //     },
  //   },
  actions: {
    async saveTask() {
      if (this.newTask.trim()) {
        try {
          await axios.post("/api/todos", {
            content: this.newTask,
            status: "InProgress",
          });
          this.newTask = "";
          this.getTasks(); // 작업을 추가한 후 다시 모든 걸 불러옴.
        } catch (err) {
          console.error("Error saving : ", err);
        }
      }
    },
    async getTasks() {
      try {
        const response = await axios.get("/api/todos");
        this.todos = response.data;
      } catch (err) {
        console.error("Error fetching : ", err);
      }
    },
    async updateTask(id, content) {
      try {
        await axios.post(`/api/todos/${id}`, { content });
        this.getTasks(); // 업데이트 후 다시 할 일 목록을 가져옴
      } catch (err) {
        console.error("Error updating task:", err);
      }
    },
    async toggleTaskStatus(todo) {
      try {
        const newstatus =
          todo.status === "In progress" ? "Done" : "In progress";
        await axios.patch(`/api/todos/status/${todo.id}`, {
          status: newstatus,
        });
        this.getTasks();
      } catch (err) {
        console.error("Error toggling status:", err);
      }
    },

    async deleteTask(id) {
      try {
        await axios.delete(`/${id}`);
        // this.getTasks(); // 삭제 후 다시 불러옴
      } catch (err) {
        console.error("Error deleting :", err);
      }
    },
  },
});
