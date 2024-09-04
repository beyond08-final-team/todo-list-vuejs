<template>
    <b-card class="todoBox">
        <b-card-title class="text-center mb-4">To Do App</b-card-title>
        <b-card-body class="d-flex w-75 justify-content-around m-auto mb-4">
            <b-form-input 
                class="w-50 me-2 fixed_input"
                maxlength="24" 
                v-model="newTask" 
                placeholder="Enter a task Here"
                @keyup.enter="createTodo"/>
            <div class="d-flex">
                <b-button variant="primary" class="me-2" @click="createTodo">SAVE</b-button>
                <b-button variant="warning" @click="getTodos">GET TASKS</b-button>
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
                    <b-tr v-for="todo in todos" :key="todo.id">
                        <b-td>{{ todo.index }}</b-td>
                        <b-td v-if="todo.isEdit" class="p-1">
                            <b-form-input
                                v-model="todo.content"
                                class="fixed_input"
                                maxlength="24"
                                @keyup.enter="editTodo(todo)"/>
                        </b-td>
                        <b-td v-else>{{ todo.content }}</b-td>
                        <b-td>{{ todo.status }}</b-td>
                        <b-td>
                            <b-button class="me-2" variant="danger" @click="deleteTodo(todo.id)">DELETE</b-button>
                            <b-button
                                :variant="todo.status === 'Done' ? 'warning' : 'success'"
                                @click="toggleStatus(todo)"
                                class="me-2 toggle_button"
                            >
                                {{ todo.status === 'Done' ? 'In Progress' : 'FINISH' }}
                            </b-button>

                            <b-button v-if="!todo.isEdit" class="me-2" variant="dark" @click="openEditInput(todo)">EDIT</b-button>
                            <b-button v-if="todo.isEdit" class="me-2" variant="primary" @click="editTodo(todo)">SAVE</b-button>
                        </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </b-card-body>
    </b-card>
</template>


<script setup>
import { useTodoStore } from '../store/todoStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const todoStore = useTodoStore();

const { todos, newTask } = storeToRefs(todoStore);
const { getTodos, createTodo, deleteTodo, editTodo, toggleStatus, openEditInput } = todoStore;

// 컴포넌트가 마운트될 때 자동으로 할 일 목록을 가져옵니다.
onMounted(() => {
    getTodos();
});

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