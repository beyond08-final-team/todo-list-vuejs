<template>
  <tr>
    <td>{{ index + 1 }}</td>  <!-- 할 일의 순번 -->
    <td v-if="!task.isEditing">{{ task.name }}</td>  <!-- 수정 모드가 아닐 때 할 일 내용 표시 -->
    <td v-else>
      <input type="text" v-model="task.editableName" class="form-control" /> <!-- 수정 모드일 때 입력 필드 -->
    </td>
    <td>{{ task.status }}</td>  <!-- 할 일의 상태 -->
    <td>
      <button @click="deleteTask" class="btn btn-danger btn-sm">DELETE</button>
      <button @click="toggleStatus" :class="['btn', 'btn-sm', task.status === 'In progress' ? 'btn-success' : 'btn-secondary']">
        {{ task.status === 'In progress' ? 'FINISHED' : 'IN PROGRESS' }}
      </button>
      <button @click="editTask" class="btn btn-info btn-sm">{{ task.isEditing ? 'SAVE' : 'EDIT' }}</button>  <!-- 수정 버튼 -->
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
    },
    editTask() {
      this.$emit('edit-task', this.task);  // 부모 컴포넌트에 수정 요청
    }
  }
}
</script>

<style scoped>
/* 스타일은 부트스트랩 스타일에 대부분 의존 */
.btn {
  padding: 8px 16px;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 5px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-danger {
  background-color: #f44336; /* 빨간색 */
}

.btn-success {
  background-color: #4CAF50; /* 초록색 */
}

.btn-info {
  background-color: #00bcd4; /* 수정 버튼의 파란색 */
}

.btn:hover {
  opacity: 0.9;
}
</style>
