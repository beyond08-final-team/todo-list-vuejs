<template>
    <div>
        <div class="d-flex justify-content-center align-items-center mb-lg-5 gap-2">
            <b-form-input v-model="selectedText" placeholder="Enter a task here" class="w-25" />
            <b-button @click="handleSaveTask" class="save fw-bold text-center fs-6" variant="primary">SAVE</b-button>
            <b-button @click="fetchTasks" class="fw-bold text-center text-white fs-6" variant="warning">GET TASKS</b-button>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const selectedText = ref('')

const emit = defineEmits(['task-added', 'fetch-tasks'])

const handleSaveTask = () => {
    const taskLength = selectedText.value.length

    if (taskLength < 6 || taskLength > 20) {
        alert('최소 6자 이상 최대 20자 이하여야 합니다.')
        return
    }

    emit('task-added', selectedText.value)
    selectedText.value = ''
}

const fetchTasks = () => {
    emit('fetch-tasks')
}
</script>
