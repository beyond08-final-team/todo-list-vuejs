<template>
    <b-card>
        <b-card-title class="text-center mb-4">To Do App</b-card-title>
        <b-card-body class="d-flex w-75 justify-content-around m-auto mb-4">
            <b-form-input class="w-50 me-2" v-model="newTask" placeholder="Enter a task Here"/>
            <b-button variant="primary" @click="saveTask">SAVE</b-button>
            <b-button variant="warning" @click="getTasks">GET TASKS</b-button>
        </b-card-body>
        <b-card-body class="d-flex justify-content-around">
            <b-table-simple class="mt-4">
                <b-thead head-variant="dark">
                    <b-tr>
                        <b-th>No.</b-th>
                        <b-th>Todo item</b-th>
                        <b-th>Status</b-th>
                        <b-th>Actions</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="(todo, idx) in todos" :key="todo.index">
                        <b-td>{{ todo.index }}</b-td>
                        <b-td>{{ todo.content }}</b-td>
                        <b-td>{{ todo.status }}</b-td>
                        <b-td>
                            <b-button class="me-2" variant="danger" @click="deleteTask(todo.id)">DELETE</b-button>
                            <b-button class="me-2" variant="success" @click="finishTask(todo.id)">FINISHED</b-button>
                            <b-button class="me-2" variant="dark" @click="editTask(todo.id)">EDIT</b-button>
                        </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </b-card-body>
    </b-card>
</template>

<script>
import { BTableSimple } from 'bootstrap-vue-next';
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
                await axios.post("/api/v1/todo/register", {
                    content: this.newTask,
                    status: "InProgress", // 기본 상태로 설정
                });
                this.newTask = ""; // 입력 창 초기화
                this.getTasks(); // 저장 후 리스트 갱신
                } catch (error) {
                    console.error("Error saving task:", error);
                }
            }
        },
        async getTasks() {
            try {
                const response = await axios.get("/api/v1/todo/list");
                this.todos = response.data.map((todo, index) => ({
                ...todo,
                index: index + 1,
                }));
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        },
        deleteTask(idx) {
            this.todos.splice(idx, 1);
            this.todos.forEach((todo, i) => {
                todo.index = i + 1;
            })
        },
        finishTask(idx) {
            this.todos[idx].status = 'Done';
        },
        editTask() {

        }
    }
}
</script>

<style scoped>
.todoBox{
    min-width: 720px;
    background-color: white; /* 박스의 배경색 */
    border: 1px solid #ccc;  /* 박스의 테두리 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 박스 그림자 (옵션) */
}
</style>