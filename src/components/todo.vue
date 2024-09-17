<template>
  <div
    class="main d-flex justify-content-center align-items-center w-100 vh-100"
  >
    <div class="container">
      <div class="form-container">
        <h1 class="text-center">To Do App</h1>
        <div class="header">
          <b-form-input
            v-model="selectedText"
            placeholder=" Enter a task here"
          />
          <div class="button-group">
            <b-button
              class="button-save"
              variant="primary"
              @click="store.saveTask"
              >SAVE</b-button
            >
            <b-button
              class="button-get"
              variant="warning"
              @click="store.getTasks"
              >GET TASKS</b-button
            >
          </div>
        </div>
        <table>
          <!-- 테이블 생성 -->
          <thead>
            <tr>
              <th>No</th>
              <th>Todo item</th>
              <th>Status</th>
              <th>Actions</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in todos" :key="todo.no">
              <td>{{ todo.no }}</td>
              <td>
                <div v-if="!todo.isEditing">
                  {{ todo.content }}
                </div>
                <div v-else>
                  <input
                    v-model="todo.content"
                    @keydown.enter="saveEdit(todo)"
                    class="edit-input"
                  />
                </div>
              </td>
              <td>{{ todo.status }}</td>
              <td>
                <button
                  @click="store.deleteTask(todo)"
                  type="button"
                  class="btn btn-danger"
                >
                  DELETE
                </button>

                <button
                  @click="editTask(todo)"
                  type="button"
                  class="btn btn-info"
                >
                  EDIT
                </button>

                <button
                  @click="toggleStatus(todo)"
                  type="button"
                  :class="
                    todo.status === 'In progress'
                      ? 'btn btn-success'
                      : 'btn btn-dark'
                  "
                >
                  {{
                    todo.status === "In progress" ? "FINISHED" : "IN PROGRESS"
                  }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useTodoStore } from "../stores/store";

export default {
  name: "todo",
  //
  data() {
    return {
      store: useTodoStore(),
    };
  },
  computed: {
    todos() {
      return this.store.todos;
    },
  },
  methods: {
    saveTask() {
      return this.store.saveTask();
    },
    getTasks() {
      return this.store.getTasks();
    },
    updateTask(id, content) {
      return this.store.updateTask(id, content);
    },
    toggleTaskStatus(todo) {
      return this.store.toggleTaskStatus(todo);
    },
    deleteTask(id) {
      return this.store.deleteTask(id);
    },
  },
  mounted() {
    this.getTasks();
  },
};
</script>

<style lang="scss" scoped>
.main {
  background-color: #ccc;
}
.container {
  max-width: 800px;
}
.form-container {
  max-width: 800px;
  //   margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.input-section {
  margin-top: 20px;
}
.form-group {
  margin-bottom: 15px;
}
input[type="text"] {
  width: 30%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}
.edit-input {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}
.header {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  flex-direction: row;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}
thead th {
  padding: 20px;
  border-bottom: 2px solid #ccc;
}
tbody td {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
.button-group {
  display: flex;
  align-items: center;
}
.button-save,
.button-get {
  margin-left: 10px;
}
.btn {
  color: #f9f9f9;
  margin-right: 10px;
}
</style>
