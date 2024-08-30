<template>
  <div class="todo-app">
    <!-- 제목 -->
    <h1 class="text-center">To Do App</h1>
    
    <!-- 할 일 입력 영역 -->
    <div class="input-group mb-3 justify-content-center">
      <input v-model="newTask" type="text" class="form-control w-50" placeholder="Enter a task here" />
      <button @click="addTask" class="btn btn-primary mx-2 save-btn">SAVE</button>
      <button @click="getTasks" class="btn btn-warning get-tasks-btn">GET TASKS</button>
    </div>

    <!-- 할 일 목록 테이블 -->
    <div class="table-container">
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th>No.</th>
            <th>Todo item</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- TodoItem 컴포넌트 반복 렌더링 -->
          <todo-item 
            v-for="(task, index) in tasks" 
            :key="task.id"
            :task="task"
            :index="index"
            @delete-task="deleteTask"
            @toggle-status="toggleStatus"
            @edit-task="editTask"
          />
        </tbody>
      </table>
    </div>
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
    // 할 일 추가 메서드
    addTask() {
      if (this.newTask.trim().length >= 6 && this.newTask.trim().length <= 20) {
        this.tasks.push({ 
          id: this.nextId++, 
          name: this.newTask, 
          status: 'In progress', 
          createdAt: new Date().toLocaleString(),
          isEditing: false,  // 수정 모드 플래그 추가
          editableName: this.newTask // 수정 가능 상태 추가
        });
        this.newTask = '';
      } else {
        alert('6자부터 20자까지 입력해 주세요!');
      }
    },
    // 할 일 삭제 메서드
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
    // 할 일 상태 토글 메서드
    toggleStatus(task) {
      task.status = task.status === 'In progress' ? 'Finished' : 'In progress';
      task.createdAt = new Date().toLocaleString(); // 상태가 변경된 시간을 기록
    },
    // 할 일 수정 메서드
    editTask(task) {
      task.isEditing = !task.isEditing;  // 수정 모드 토글
      if (!task.isEditing) {  // 수정 모드 종료 시에만 저장
        task.name = task.editableName.trim();  // 수정된 내용 저장
        task.createdAt = new Date().toLocaleString(); // 수정 시간 업데이트
      }
    },
    // 할 일 목록 불러오기 메서드
    getTasks() {
      this.tasks = [
        { id: this.nextId++, name: 'Buy groceries for next week', status: 'In progress', createdAt: new Date().toLocaleString(), isEditing: false, editableName: 'Buy groceries for next week' },
        { id: this.nextId++, name: 'Renew car insurance', status: 'In progress', createdAt: new Date().toLocaleString(), isEditing: false, editableName: 'Renew car insurance' },
        { id: this.nextId++, name: 'Sign up for online course', status: 'In progress', createdAt: new Date().toLocaleString(), isEditing: false, editableName: 'Sign up for online course' }
      ];
    }
  },
  mounted() {
    // 컴포넌트가 로드될 때 초기 할 일 목록 불러오기
    this.getTasks();
  }
}
</script>

<style scoped>
/* 전체 배경색 설정 */
.todo-app {
  background-color: white; /* 흰색 배경 */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 효과 */
  width: 80%;
  margin: 50px auto; /* 가운데 정렬 */
  text-align: center;
}

/* 버튼 스타일 */
.save-btn {
  background-color: #2196F3; /* 파란색 버튼 */
  color: white;
  font-weight: bold;
}

.get-tasks-btn {
  background-color: #FF9800; /* 주황색 버튼 */
  color: white;
  font-weight: bold;
}

button {
  border: none;
  border-radius: 4px;
  transition: all 0.3s ease;
}

button:hover {
  opacity: 0.9;
}

/* 테이블 스타일 */
.table-container {
  margin-top: 20px;
}

.table {
  margin-top: 20px;
  border-collapse: separate;
  border-spacing: 0 8px;
  background-color: white;
}

.table th {
  background-color: #f2f2f2; /* 테이블 헤더의 배경색 */
}

.table td, .table th {
  text-align: center;
  vertical-align: middle;
}
</style>
