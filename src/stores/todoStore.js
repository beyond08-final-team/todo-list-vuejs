import { defineStore } from 'pinia';
import axios from 'axios';

export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        todos: [],
        newTask: '',
    }),
    actions: {
        async saveTask() {
            if (this.newTask.trim()) {
                try {
                await axios.post("/api/v1/todos", {
                    content: this.newTask,
                    status: "InProgress",
                });
                this.newTask = "";
                this.getTasks();
                } catch (error) {
                    console.error("Error saving task:", error);
                }
            }
        },
        async getTasks() {
            try {
                const response = await axios.get("/api/v1/todos");
                this.todos = response.data.map((todo, index) => ({
                ...todo,
                index: index + 1,
                isEditing: false,
                createdAt: todo.createdDateTime,
                updatedAt: todo.updatedDateTime,
                }));
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        },
        async deleteTask(id) {
            try {
                await axios.delete(`/api/v1/todos/${id}`);
                this.getTasks();
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        },
        async toggleStatus(todo) {
            try {
                const newStatus = todo.status === "Done" ? "InProgress" : "Done";
                await axios.patch(`/api/v1/todos/${todo.id}/status`, {
                    status: newStatus,
                });
                this.getTasks();
            } catch (error) {
                console.error("Error toggling task status:", error);
            }
        },
        editTask(todo) {
            todo.isEditing = true;
        },
        async saveEdit(todo) {
            try {
                await axios.patch(`/api/v1/todos/${todo.id}/content`, {
                    content: todo.content,
                });
                todo.isEditing = false;
                this.getTasks();
            } catch (error) {
                console.error("Error saving task:", error);
            }
        }
    }
})