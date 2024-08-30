<template>
    <tr>
      <td>{{ index + 1 }}</td>
      <td>{{ task.name }}</td>
      <td>{{ task.status }}</td>
      <td class="actions">
        <button @click="deleteTask" class="delete-btn">DELETE</button>
        <button @click="toggleStatus" class="finish-btn">
          {{ task.status === 'In progress' ? 'FINISHED' : 'IN PROGRESS' }}
        </button>
      </td>
    </tr>
  </template>
  
  <script>
  export default {
    name: 'TodoItem',
    props: ['task', 'index'],
    methods: {
      deleteTask() {
        this.$emit('delete-task', this.task.id);
      },
      toggleStatus() {
        this.$emit('toggle-status', this.task);
      }
    }
  }
  </script>
  
  <style scoped>
  .actions {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .delete-btn {
    background-color: #f44336;
    color: white;
  }
  
  .finish-btn {
    background-color: #4CAF50;
    color: white;
  }
  </style>
  