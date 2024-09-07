<template>
  <div class="bg-body-secondary min-vh-100">
    <div class="container p-lg-5 d-flex justify-content-center align-items-center">
      <div class="bg-white w-75 h-100 rounded-2 shadow m-lg-5">
        <p class="fs-3 fw-bold text-center mt-3 mb-4">To Do App</p>

        <InputForm @task-added="addTask" />
        <TodoList :tasks="tasks" @task-deleted="deleteTask" @task-edited="editTask" @task-finished="finishTask"
          @task-in-progress="setInProgress" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputForm from '@components/InputForm.vue';
import TodoList from '@components/TodoList.vue';

const tasks = ref([
  { no: 1, todoItem: 'Buy groceries for week', status: 'InProgress', editStatus: false, editText: '' },
  { no: 2, todoItem: 'Renew car insurance', status: 'InProgress', editStatus: false, editText: '' },
  { no: 3, todoItem: 'Sign up for online course', status: 'InProgress', editStatus: false, editText: '' }
])

const addTask = (task) => {
  tasks.value.push(task)
}

const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter(task => task.no !== taskId)
}

const editTask = (taskId) => {
  const task = tasks.value.find(task => task.no === taskId)
  if (task) {
    task.editStatus = !task.editStatus
    if (!task.editStatus && task.editText) {
      if (task.editText.length < 6 || task.editText.length > 20) {
        alert('최소 6자 이상 최대 20자 이하여야 합니다.')
        return
      }
      task.todoItem = task.editText
      task.editText = ''
    }
  }
}

const finishTask = (taskId) => {
  const task = tasks.value.find(task => task.no === taskId)
  if (task) {
    task.status = 'Done'
  }
}

const setInProgress = (taskId) => {
  const task = tasks.value.find(task => task.no === taskId)
  if (task) {
    task.status = 'InProgress'
  }
}
</script>
