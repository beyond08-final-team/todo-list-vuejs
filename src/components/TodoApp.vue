<template>
    <b-card class="todoBox">
        <b-card-title class="text-center mb-4">To Do App</b-card-title>
        <b-card-body class="d-flex w-75 justify-content-around m-auto mb-4">
            <b-form-input 
                class="w-50 me-2 fixed_input"
                maxlength="20" 
                v-model="newTask" 
                placeholder="Enter a task Here"
                @keyup.enter="saveTask"/>
            <div class="d-flex">
                <b-button variant="primary" class="me-2" @click="saveTask">SAVE</b-button>
                <b-button variant="warning" @click="getTasks">GET TASKS</b-button>
            </div>
        </b-card-body>
        <b-card-body class="d-flex justify-content-around todolist_body">
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
                                class="fixed_input"
                                maxlength="20"
                                @keyup.enter="saveEditTask(todo)"/>
                        </b-td>
                        <b-td v-else>{{ todo.content }}</b-td>
                        <b-td>{{ todo.status }}</b-td>
                        <b-td>
                            <b-button class="me-2" variant="danger" @click="deleteTask(todo.id)">DELETE</b-button><!-- status가 "In Progress"일 때 "Finish" 버튼 표시 -->
                            <b-button
                                :variant="todo.status === 'Done' ? 'warning' : 'success'"
                                @click="toggleStatus(todo)"
                                class="me-2 toggle_button"
                            >
                                {{ todo.status === 'Done' ? 'In Progress' : 'FINISH' }}
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
            todos: [],
        };
    },
    methods: {
        async getTasks() {
            try {
                const response = await axios.get(`/api/todo/list`);
                console.log(response.data);
                this.todos = response.data.result.map((todo, index) => ({
                    ...todo, 
                    index: index + 1,
                    isEdit: false,  // 가져온 데이터에 isEdit 속성 추가
                }));
            } catch(error) {
                console.error("Error get tasks:", error);
            }
        },
        async saveTask() {
            if(this.newTask.trim()){
                try {
                await axios.post(`/api/todo/`, {
                    content: this.newTask,
                    status: "InProgress" ,
                });
            
                this.newTask = '';
                this.getTasks();

                } catch(error) {
                    console.error("Error save task:", error);
                }
            }
        },
        async deleteTask(id) {
            try {
                await axios.delete(`/api/todo/${id}`);
                this.getTasks();
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
                this.getTasks();
            } catch(error) {
                console.error("Error toggle task status:", error);
            }
        },
        editTask(todo) {
            todo.isEdit = true;
        },
        async saveEditTask(todo) {
            try {
                if (todo.content.trim()) {
                    await axios.patch(`/api/todo/${todo.id}`, {
                        content: todo.content,
                        status: todo.status,
                    });

                    todo.isEdit = false;
                    this.getTasks();
            }
            } catch(error) {
                console.error("Error update task content:", error);
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
.fixed_input {
    max-width: 360px;
}
.todolist_body {
    max-height: 360px;
    overflow-y: auto;
}
.toggle_button {
    width: 125px;
}
</style>