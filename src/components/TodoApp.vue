<template>
    <b-card>
        <b-card-title class="text-center mb-4">To Do App</b-card-title>
        <b-card-body class="d-flex w-75 justify-content-around m-auto mb-4">
            <b-form-input class="w-50 me-2" v-model="newTask" placeholder="Enter a task Here"/>
            <b-button variant="primary" @click="saveTask">SAVE</b-button>
            <b-button variant="warning">GET TASKS</b-button>
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
                            <b-button class="me-2" variant="danger" @click="deleteTask(idx)">DELETE</b-button>
                            <b-button class="me-2" variant="success" @click="finishTask(idx)">FINISHED</b-button>
                            <b-button class="me-2" variant="dark" @click="editTask">EDIT</b-button>
                        </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </b-card-body>
    </b-card>
</template>

<script>
import { BTableSimple } from 'bootstrap-vue-next';

export default {
    data() {
        return {
            newTask: '',
            todos: [
                {
                index: 1,
                content: "Buy groceries for next week",
                status: "In Progress",
                },
                {
                index: 2,
                content: "Renew car insurance",
                status: "In Progress",
                },
                {
                index: 3,
                content: "Sign up for online course",
                status: "In Progress",
                },
            ],
        };
    },
    methods: {
        saveTask() {
            if(this.newTask.trim()){
                this.todos.push({
                    index: this.todos.length + 1,
                    content: this.newTask,
                    status: "In Progress" 
                })
                /* 입력 창 초기화 */
                this.newTask = '';
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