<template>
    <b-card class="todoBox">
        <b-card-title class="text-center mb-4">To Do App</b-card-title>
        <b-card-body class="d-flex w-75 justify-content-around m-auto mb-4">
            <b-form-input 
                class="w-50 me-2 fixed-input"
                maxlength="20" 
                v-model="newTask" 
                placeholder="Enter a task Here"/>
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
                        <b-td v-if="todo.isEdit" class="p-1">
                            <b-form-input
                                v-model="todo.content"
                                maxlength="20"
                                class="fixed-input" />
                        </b-td>
                        <b-td v-else>{{ todo.content }}</b-td>
                        <b-td>{{ todo.status }}</b-td>
                        <b-td>
                            <b-button class="me-2" variant="danger" @click="deleteTask(idx)">DELETE</b-button><!-- status가 "In Progress"일 때 "Finish" 버튼 표시 -->
                            <b-button
                                v-if="todo.status === 'InProgress'"
                                variant="success"
                                @click="setFinish(idx)"
                                class="me-2"
                            >
                                FINISH
                            </b-button>

                            <!-- status가 "Done"일 때 "In Progress" 버튼 표시 -->
                            <b-button
                                v-else
                                variant="warning"
                                @click="setInProgress(idx)"
                                class="me-2"
                            >
                                IN PROGRESS
                            </b-button>
                            <b-button v-if="!todo.isEdit" class="me-2" variant="dark" @click="editTask(todo)">EDIT</b-button>
                            <b-button v-if="todo.isEdit" class="me-2" variant="primary" @click="saveEditTask(todo)">SAVE</b-button>
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
            isEdit: false,
            todos: [
                // {
                // index: 1,
                // content: "Buy groceries for next week",
                // status: "In Progress",
                // },
                // {
                // index: 2,
                // content: "Renew car insurance",
                // status: "In Progress",
                // },
                // {
                // index: 3,
                // content: "Sign up for online course",
                // status: "In Progress",
                // },
            ],
        };
    },
    methods: {
        async getTasks() {
            try {
                const response = await axios.get('/api/todo/list');
                console.log(response.data);
                this.todos = response.data.result.map((todo, index) => ({
                    ...todo, 
                    index: index + 1,
                    isEdit: false,  // 가져온 데이터에 isEdit 속성 추가
                }));
            } catch(error) {
                console.error("Error fetch tasks:", error);
            }
        },
        saveTask() {
            if(this.newTask.trim()){
                this.todos.push({
                    index: this.todos.length + 1,
                    content: this.newTask,
                    status: "InProgress" ,
                    isEdit: false
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
        setFinish(idx) {
            this.todos[idx].status = 'Done';
        },
        setInProgress(idx) {
            this.todos[idx].status = 'InProgress';
        },
        editTask(todo) {
            todo.isEdit = true;
        },
        saveEditTask(todo) {
            if (todo.content.trim()) {
                todo.isEdit = false;
            }
        }
    }
}
</script>

<style scoped>
.todoBox {
    min-width: 720px;
    background-color: white; /* 박스의 배경색 */
    border: 1px solid #ccc;  /* 박스의 테두리 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 박스 그림자 (옵션) */
}
.fixed-input {
    width: 200px;
    max-width: 200px;
}
</style>