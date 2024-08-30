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
          <!-- <b-button class="bg-primary-subtle">hello</b-button> -->
          <!-- <b-button variant="danger">Button</b-button> -->
          <!-- <b-button variant="success">Button</b-button> -->
          <!-- <b-button variant="outline-primary">Button</b-button> -->
          <div class="button-group">
            <b-button class="button-save" variant="primary" @click="addTask"
              >SAVE</b-button
            >
            <b-button class="button-get" variant="warning">GET TASKS</b-button>
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
                  @click="deleteFunction(todo)"
                  type="button"
                  class="btn btn-danger"
                >
                  DELETE
                </button>
              </td>
              <td>
                <button
                  @click="editFunction(todo)"
                  type="button"
                  class="btn btn-info"
                >
                  EDIT
                </button>
              </td>
              <td>
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
export default {
  name: "todo",
  data() {
    return {
      selectedText: "",
      todos: [
        {
          no: 1,
          content: "Buy groceries for next week",
          status: "In progress",
          isEditing: false,
        },
        {
          no: 2,
          content: "Renew car insurance",
          status: "In progress",
          isEditing: false,
        },
        {
          no: 3,
          content: "Sign up for online course",
          status: "In progress",
          isEditing: false,
        },
      ],
    };
  },
  methods: {
    addTask() {
      if (this.selectedText.trim() === "") {
        alert("내용을 입력하세욧!!!");
        return;
      }

      const newTodo = {
        no: this.todos.length + 1,
        content: this.selectedText,
        status: "In progress",
        isEditing: false,
      };

      this.todos.push(newTodo);
      this.selectedText = "";
    },
    editFunction(todo) {
      // 수정
      this.todos.forEach((item) => {
        item.isEditing = false;
      });
      todo.isEditing = true;
    },
    saveEdit(todo) {
      todo.isEditing = false;
    },
    deleteFunction(todo) {
      // indexOf로 todos 배열에서 해당 todo 가져오기
      const index = this.todos.indexOf(todo);

      if (confirm("정말로 삭제하시겠습니까?")) {
        if (index > -1) {
          // todos에서 해당 항목을 배열에서 제거
          this.todos.splice(index, 1);
        }
      }
    },
    toggleStatus(todo) {
      // 상태가 In progress이면 Finshed 버튼 아니면 In progress 버튼
      todo.status = todo.status === "In progress" ? "Done" : "In progress";
    },
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
