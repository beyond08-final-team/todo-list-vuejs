<template>
    <div class="container">
        <div class="todo-list">
            <h3 class="title">To Do App</h3>

            <div class="input-form">
                <BFormInput v-model="selectedText" placeholder="Enter a task here" class="input-task" />
                <BButton @click="saveTask" class="save btn" variant="primary">SAVE</BButton>
                <BButton @click="getTasks" class="get-task btn" variant="warning">GET TASKS</BButton>
            </div>

            <TodoList />
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import TodoList from './TodoList.vue';

    const selectedText = ref('')
    const tasks = ref([])

    const saveTask = () => {
        const taskLength = selectedText.value.length;

        if (taskLength < 6 || taskLength > 20) {
            alert('최소 6자 이상 최대 20자 이하여야 합니다.');
            return;
        }

        const newTask = {
            no: tasks.value.length + 1,
            todoItem: selectedText.value,
            status: 'In Progress',
            editStatus: false,
            editText: ''
        }

        tasks.value.push(newTask)
        selectedText.value = '' 

        console.log('Task saved - ', newTask)
    }


    const getTasks = () => {
        console.log('Get Task - ', selectedText.value);
    }
</script>

<style scoped>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 200px;
        background-color: rgb(189, 184, 184);
    }

    .todo-list {
        width: 800px;
        height: 500px;
        background-color: white;
        border-radius: 10px;
    }

    .title {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    .input-form {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-bottom: 50px;
    }

    .input-task {
        width: 200px;
        min-width: 0;
    }

    .btn {
        border: none;
        padding: 10px 20px;
        font-size: 13px;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    .get-task {
        color: white;
    }
</style>
