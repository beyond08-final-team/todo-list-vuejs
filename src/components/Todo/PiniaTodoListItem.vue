<template>
  <b-td>{{ todo.id }}</b-td>
  <b-td v-if="isEdit" class="p-1">
    <b-form-input
      :value="content"
      @input="onChangeContent"
      @keypress.enter="handleEdit(todo.id)"
    />
  </b-td>
  <b-td v-else>
    {{ todo.content }}
  </b-td>
  <b-td>{{ todo.status }}</b-td>
  <b-td class="d-none d-sm-block">
    <b-button class="me-3" variant="danger" @click="handleDelete(todo.id)"
      >DELETE</b-button
    >
    <b-button class="me-3" variant="dark" @click="onClickEdit(todo.content)">
      EDIT
    </b-button>
    <b-button
      v-if="todo.status === 'InProgress'"
      variant="success"
      @click="handleFinished(todo.id)"
    >
      FINISHED
    </b-button>
    <b-button v-else variant="success" @click="handleInProgress(todo.id)">
      In Progress
    </b-button>
  </b-td>
  <b-td class="d-sm-none">
    <b-dropdown variant="outline-secondary">
      <b-dropdown-item @click="handleDelete(todo.id)"> DELETE </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item
        v-if="todo.status === 'InProgress'"
        @click="handleFinished(todo.id)"
      >
        FINISHED
      </b-dropdown-item>
      <b-dropdown-item v-else @click="handleInProgress(todo.id)">
        FINISHED
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item @click="onClickEdit(todo.content)">
        EDIT
      </b-dropdown-item>
    </b-dropdown>
  </b-td>
</template>

<script>
import { useTodoStore } from "@store/Todo/todoStore.js";

export default {
  setup() {
    const todoStore = useTodoStore();

    return {
      addTodo: todoStore.addTodo,
      editTodo: todoStore.editTodo,
      deleteTodo: todoStore.deleteTodo,
      setFinished: todoStore.setFinished,
      setInProgress: todoStore.setInProgress,
      editTodoRefetch: todoStore.editTodoRefetch,
    };
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
      content: "",
    };
  },
  methods: {
    onChangeContent(e) {
      this.content = e.target.value;
    },
    handleEdit(no) {
      if (this.content !== "") {
        // this.editTodo({ id: no, content: this.content });
        this.editTodoRefetch({ id: no, content: this.content });
      }
      this.isEdit = false;
    },
    onClickEdit(content) {
      this.content = content;
      this.isEdit = true;
    },
    handleDelete(no) {
      this.deleteTodo(no);
    },
    handleFinished(no) {
      this.setFinished(no);
    },
    handleInProgress(no) {
      this.setInProgress(no);
    },
  },
};
</script>

<style lang="scss" scoped></style>
