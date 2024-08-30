<template>
    <main>
        <div class="TodoBox">
            <BCardTitle class="text-center">To Do App</BCardTitle>
            <BCardBody class="d-flex w-75 justify-content-around m-auto">
                <BFormInput class="w-50" v-model="newTask" placeholder="Enter a task Here"/>
                <BButton variant="primary" @click="saveTask">SAVE</BButton>
                <BButton variant="warning">GET TASKS</BButton>
            </BCardBody>
            <BCardBody class="d-flex justify-content-around">
                <BTableSimple>
                    <BThead head-variant="dark">
                        <BTr>
                            <BTh>No.</BTh>
                            <BTh>Todo item</BTh>
                            <BTh>Status</BTh>
                            <BTh>Actions</BTh>
                        </BTr>
                    </BThead>
                    <BTbody>
                        <BTr v-for="(todo, idx) in todos" :key="todo.index">
                            <BTd>{{ todo.index }}</BTd>
                            <BTd>{{ todo.content }}</BTd>
                            <BTd>{{ todo.status }}</BTd>
                            <BTd>
                                <b-button class="me-2" variant="danger" @click="deleteTask(idx)">DELETE</b-button>
                                <b-button class="me-2" variant="success" @click="finishTask(idx)">FINISHED</b-button>
                                <b-button class="me-2" variant="dark" @click="editTask">EDIT</b-button>
                            </BTd>
                        </BTr>
                    </BTbody>
                </BTableSimple>
            </BCardBody>
        </div>
    </main>
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
.TodoBox{
  background-color: white; /* 박스의 배경색 */
  border: 1px solid #ccc;  /* 박스의 테두리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 박스 그림자 (옵션) */

}
</style>