import { defineStore } from 'pinia';
import axios from 'axios';

export const useTodoStore = defineStore("todo", {
    state: () => ({
        todos: [],
        newTask: '',
    }),
    actions: {
        async getTodos() {
            try {
                const response = await axios.get(`/api/todo/list`);
                this.todos = response.data.result.map(todo => ({
                    ...todo, 
                    isEdit: false,
                }));
            } catch(error) {
                console.error("Error get tasks:", error);
            }
        },
        async createTodo() {
            if(this.newTask.trim()){
                try {
                await axios.post(`/api/todo/`, {
                    content: this.newTask,
                    status: "InProgress" ,
                });
            
                this.newTask = '';
                await this.getTodos();

                } catch(error) {
                    console.error("Error save task:", error);
                }
            }
        },
        async deleteTodo(id) {
            try {
                await axios.delete(`/api/todo/${id}`);
                await this.getTodos();
            } catch(error) {
                console.error("Error delete task:", error);
            }
        },
        async toggleStatus(todo){
            try {
                const newStatus = todo.status === "Done" ? "InProgress" : "Done";
                await axios.patch(`/api/todo/${todo.id}`, {
                    content: todo.content,
                    status: newStatus
                });
                await this.getTodos();
            } catch(error) {
                console.error("Error toggle task status:", error);
            }
        },
        openEditInput(todo) {
            todo.isEdit = true;
        },
        async editTodo(todo) {
            try {
                if (todo.content.trim()) {
                    await axios.patch(`/api/todo/${todo.id}`, {
                        content: todo.content,
                        status: todo.status,
                    });

                    todo.isEdit = false;
            }
            } catch(error) {
                console.error("Error update task content:", error);
            }
        }
    }
    
})