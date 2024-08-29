<template>
    <div class="todo-app">
        <h3 class="text-center mb-4">To Do App</h3>
        <div class="input-group mb-3 justify-content-center">
            <input type="text" class="form-control me-2" v-model="newTask" placeholder="Enter a task here">
            <button class="btn btn-primary btn-sm me-2" @click="saveButton">SAVE</button>
            <button class="btn btn-warning btn-sm">GET TASKS</button>
        </div>
        <table class="table table-bordered text-center">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Todo item</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task, index) in tasks" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ task.title }}</td>
                    <td>{{ task.status }}</td>
                    <td>
                        <button class="btn btn-danger btn-sm me-1" @click="deleteButton(index)">DELETE</button>
                        <button class="btn btn-success btn-sm" @click="finishedButton(index)">FINISHED</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newTask: '',
            tasks: [
                { title: 'Buy groceries for next week', status: 'In progress' },
                { title: 'Renew car insurance', status: 'In progress' },
                { title: 'Sign up for online course', status: 'In progress' },
            ]
        };
    },
    methods: {
        saveButton() {
            if (this.newTask.trim()) {
                this.tasks.push({ title: this.newTask, status: 'In progress' });
                this.newTask = '';
            }
        },
        deleteButton(index) {
            this.tasks.splice(index, 1);
        },
        finishedButton(index) {
            this.tasks[index].status = 'Done';
        }
    }
};
</script>

<style scoped>
.todo-app {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.table {
    th, td {
        vertical-align: middle;
    }
    .btn-danger {
        background-color: #ff4d4d;
        border-color: #ff4d4d;
    }
    .btn-success {
        background-color: #28a745;
        border-color: #28a745;
    }
    .btn-warning {
        background-color: #ffc107;
        border-color: #ffc107;
    }
    .btn-warning {
        background-color: #ffc107;
        border-color: #ffc107;
    }
}

.input-group .btn {
    min-width: 120px;
}
.text-center {
    color: #333;
}
</style>