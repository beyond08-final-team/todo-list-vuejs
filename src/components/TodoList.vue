<template>
    <div>
      <input v-model="newTask" type="text" placeholder="Enter a task here" />
      <button @click="addTask" class="save-btn">SAVE</button>
      <button @click="getTasks" class="get-tasks-btn">GET TASKS</button>
  
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Todo item</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <todo-item 
            v-for="(task, index) in tasks" 
            :key="task.id"
            :task="task"
            :index="index"
            @delete-task="deleteTask"
            @toggle-status="toggleStatus"
          />
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import TodoItem from './TodoItem.vue';
  
  export default {
    name: 'TodoList',
    components: {
      TodoItem
    },
    data() {
      return {
        newTask: '',
        tasks: [],
        nextId: 1,
      };
    },
    methods: {
      addTask() {
        if (this.newTask.trim().length >= 6 && this.newTask.trim().length <= 20) {
          this.tasks.push({ 
            id: this.nextId++, 
            name: this.newTask, 
            status: 'In progress', 
            createdAt: new Date().toLocaleString() 
          });
          this.newTask = '';
        } else {
          alert('6자부터 20자까지 입력해 주세요!');
        }
      },
      deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
      },
      toggleStatus(task) {
        task.status = task.status === 'In progress' ? 'Finished' : 'In progress';
        // task.createdAt = new Date().toLocaleString(); 
      },
      getTasks() {
        this.tasks = [
          { id: 1, name: 'Vue 공부하기', status: 'In progress', createdAt: new Date().toLocaleString() },
          { id: 2, name: 'Docker 공부하기', status: 'In progress', createdAt: new Date().toLocaleString() },
          { id: 3, name: '인프런 강의보기', status: 'In progress', createdAt: new Date().toLocaleString() }
        ];
        this.nextId = this.tasks.length + 1;
      }
    }
  }
  </script>
  
  <style scoped>
  input[type="text"] {
    width: 60%;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    font-size: 16px;
    box-sizing: border-box;
  }
  
  button {
    padding: 10px 20px;
    margin: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    font-weight: bold;
    font-size: 14px;
  }
  
  button:hover {
    opacity: 0.9;
  }
  
  .save-btn {
    background-color: #2196F3;
  }
  
  .get-tasks-btn {
    background-color: #FF9800;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
    font-size: 16px;
  }
  
  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  </style>
  