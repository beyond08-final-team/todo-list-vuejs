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
                <b-tr v-for="(task, index) in tasks" :key="task.no">
                    <b-th>{{ index + 1 }}</b-th>
                    <b-td colspan="2" class="text-align">
                        <template v-if="!task.editStatus">
                            {{ task.todoItem }}
                        </template>
                        <template v-if="task.editStatus">
                            <input v-model="task.editText" placeholder="Enter a todoItem here" class="input-task">
                        </template>
                    </b-td>
                    <b-td>{{ task.status }}</b-td>
                    <b-td>
                        <div class="d-flex gap-2">
                            <b-button @click="deleted(task.no)" class="fw-bold text-center fs-6"
                                variant="danger">DELETE</b-button>
                            <b-button @click="edited(task.no)" class="fw-bold text-center fs-6"
                                variant="primary">EDIT</b-button>
                            <template v-if="task.status === 'In Progress'">
                                <b-button @click="finished(task.no)" class="fw-bold text-center fs-6"
                                    variant="success">FINISH</b-button>
                            </template>
                            <template v-if="task.status === 'Done'">
                                <b-button @click="inProgress(task.no)" class="fw-bold text-center fs-6"
                                    variant="warning">In Progress
                                </b-button>
                            </template>
                        </div>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['tasks'])
const emit = defineEmits(['task-deleted', 'task-edited', 'task-finished', 'task-in-progress'])

const deleted = (taskId) => {
    emit('task-deleted', taskId)
}

const edited = (taskId) => {
    emit('task-edited', taskId)
}

const finished = (taskId) => {
    emit('task-finished', taskId)
}

const inProgress = (taskId) => {
    emit('task-in-progress', taskId)
}
</script>