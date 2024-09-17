<template>
    <div>
        <b-table-simple class="m-lg-4" hover small caption-top responsive table-striped text-center>
            <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
            </colgroup>
            <b-thead head-variant="dark">
                <b-tr>
                    <b-th>No</b-th>
                    <b-th colspan="2">Todo item</b-th>
                    <b-th>Status</b-th>
                    <b-th>Actions</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr v-for="(task, index) in tasks" :key="task.id">
                    <b-th>{{ index + 1 }}</b-th>
                    <b-td colspan="2" class="text-align">
                        <template v-if="task.editStatus">
                            <input v-model="task.editText" placeholder="Enter a todoItem here" class="input-task">
                        </template>
                        <template v-else>
                            {{ task.content }}
                        </template>
                    </b-td>
                    <b-td>{{ task.status }}</b-td>
                    <b-td>
                        <div class="d-flex gap-2">
                            <b-button @click="deleteTask(task.id)" class="fw-bold text-center fs-6"
                                variant="danger">DELETE</b-button>
                            <b-button @click="editTask(task.id)" class="fw-bold text-center fs-6" variant="primary">EDIT</b-button>
                            <template v-if="task.status === 'InProgress'">
                                <b-button @click="finishTask(task.id)" class="fw-bold text-center fs-6" variant="success">FINISH</b-button>
                            </template>
                            <template v-if="task.status === 'Done'">
                                <b-button @click="setInProgress(task.id)" class="fw-bold text-center fs-6" variant="warning">In Progress</b-button>
                            </template>
                        </div>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
    </div>
</template>

<script setup>
const props = defineProps(['tasks']);
const emit = defineEmits(['task-deleted', 'task-edited', 'task-finished', 'task-in-progress']);

const deleteTask = (taskId) => {
    emit('task-deleted', taskId);
};

const editTask = (taskId) => {
    emit('task-edited', taskId);
};

const finishTask = (taskId) => {
    emit('task-finished', taskId);
};

const setInProgress = (taskId) => {
    emit('task-in-progress', taskId);
};
</script>