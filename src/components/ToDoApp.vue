<template>
    <b-card>
        <b-card-title class="text-center mb-4">To Do App</b-card-title>
        <b-card-body class="d-flex w-75 justify-content-around m-auto mb-4">
            <b-form-input class="w-50 me-2" v-model="newTask" placeholder="Enter a task Here"/>
            <b-button variant="primary" @click="saveTask">SAVE</b-button>
            <b-button variant="warning" @click="getTasks">GET TASKS</b-button>
        </b-card-body>
        <b-card-body class="d-flex justify-content-around todo-list-body">
            <b-table-simple class="mt-4">
                <b-thead head-variant="dark">
                    <b-tr>
                        <b-th>No.</b-th>
                        <b-th>Todo item</b-th>
                        <b-th>Status</b-th>
                        <b-th>Created At</b-th>
                        <b-th>Updated At</b-th>
                        <b-th>Actions</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="(todo, idx) in todos" :key="todo.index">
                        <b-td>{{ todo.index }}</b-td>
                        <b-td>
                            <div v-if="todo.isEditing">
                                <b-form-input 
                                    v-model="todo.content" 
                                    @keyup.enter="saveEdit(todo)"
                                    @blur="saveEdit(todo)"
                                />
                            </div>
                            <div v-else>
                                {{ todo.content }}
                            </div>
                        </b-td>
                        <b-td>{{ todo.status }}</b-td>
                        <b-td>{{ formatDate(todo.createdAt) }}</b-td>
                        <b-td>{{ formatDate(todo.updatedAt) }}</b-td>
                        <b-td>
                            <b-button class="me-2" variant="danger" @click="deleteTask(todo.id)">DELETE</b-button>
                            <b-button 
                                class="me-2" 
                                :variant="todo.status === 'Done' ? 'warning' : 'success'" 
                                @click="toggleStatus(todo)"
                            >
                                {{ todo.status === 'Done' ? 'In Progress' : 'Finished' }}
                            </b-button>
                            <b-button v-if="!todo.isEditing" class="me-2" variant="dark" @click="editTask(todo)">EDIT</b-button>
                            <b-button v-if="todo.isEditing" class="me-2" variant="primary" @click="saveEdit(todo)">SAVE</b-button>
                        </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </b-card-body>
    </b-card>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            newTask: '',
            todos: [],
        };
    },
    methods: {
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
        },
        formatDate(date) {
            return new Date(date).toLocaleString();
        }
    },
    mounted() {
        this.getTasks();
    }
}
</script>

<style scoped>
.todo-list-body {
    height: 300px;
    overflow-y: auto;
}
.todoBox{
    min-width: 720px;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>