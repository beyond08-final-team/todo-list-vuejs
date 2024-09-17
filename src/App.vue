<template>
  <div class="bg-body-secondary min-vh-100">
    <div class="container p-lg-5 d-flex justify-content-center align-items-center">
      <div class="bg-white w-75 h-100 rounded-2 shadow m-lg-5">
        <p class="fs-3 fw-bold text-center mt-3 mb-4">To Do App</p>
        <InputForm @task-added="addTask" @fetch-tasks="getTasks" />
        <TodoList :tasks="tasks" @task-deleted="deleteTask" @task-edited="editTask" @task-finished="finishTask"
          @task-in-progress="setInProgress" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import InputForm from '@components/InputForm.vue';
import TodoList from '@components/TodoList.vue';
import apiClient from './api';

const tasks = ref([]);

// Task 추가
const addTask = async (task) => {
  try {
    const response = await apiClient.post('', {
      id: task.id,
      content: task.content,
    });

    if (response.status === 201) {
      tasks.value.push(response.data);
    } else {
      console.log('Eroor Status Code: ', response.status);
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

// Task 삭제
const deleteTask = async (taskId) => {
  try {
    await apiClient.delete(`/${taskId}`);
    tasks.value = tasks.value.filter(task => task.id !== taskId);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

// Task 수정
const editTask = async (taskId) => {
  const task = tasks.value.find(task => task.id === taskId);
  if (task) {
    if (task.editStatus) {
      // Edit 버튼 클릭 후, 수정 시
      if (task.editText.trim().length < 6 || task.editText.trim().length > 20) {
        alert('최소 6자 이상 최대 20자 이하여야 합니다.');
        return;
      }

      try {
        const response = await apiClient.patch(`/content/${taskId}`, { content: task.editText });
        if (response.status === 200) {
          const updatedTask = response.data;
          // tasks.value = tasks.value.map(t => t.id === taskId ? { ...t, ...updatedTask } : t);
          tasks.value = tasks.value.map(t => t.id === taskId ? updatedTask : t);
          task.editStatus = false;
        } else {
          console.log('Error status code:', response.status);
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
    } else {
      task.editText = task.content;
      task.editStatus = true;
    }
  }
};

// Status Done
const finishTask = async (taskId) => {
  try {
    const response = await apiClient.patch(`/statusDone/${taskId}`);
    if (response.status === 200) {
      const updatedTask = response.data;
      tasks.value = tasks.value.map(t => t.id === taskId ? { ...t, ...updatedTask } : t);
    } else {
      console.log('Error status code:', response.status);
    }
  } catch (error) {
    console.error('Error finishing task:', error);
  }
};

// Status InProgress
const setInProgress = async (taskId) => {
  try {
    const response = await apiClient.patch(`/statusInProgress/${taskId}`);
    if (response.status === 200) {
      const updatedTask = response.data;
      tasks.value = tasks.value.map(t => t.id === taskId ? { ...t, ...updatedTask } : t);
    } else {
      console.log('Error status code:', response.status);
    }
  } catch (error) {
    console.error('Error setting task in progress:', error);
  }
};

// Task 조회
const getTasks = async () => {
  try {
    const response = await apiClient.get('');
    if (response.status === 200) {
      tasks.value = response.data;
    } else {
      console.log('Eroor status code:', response.status);
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

onMounted(() => {
});
</script>
