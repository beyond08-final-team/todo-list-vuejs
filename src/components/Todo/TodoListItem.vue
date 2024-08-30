<template>
  <b-td>{{ todo.no }}</b-td>
  <b-td v-if="isEdit" class="p-1">
    <b-form-input
      :value="content"
      @input="onChangeContent"
      @keypress.enter="handleEdit(todo.no)"
    />
  </b-td>
  <b-td v-else>
    {{ todo.content }}
  </b-td>
  <b-td>{{ todo.status }}</b-td>
  <b-td class="d-none d-sm-block">
    <b-button class="me-3" variant="danger" @click="handleDelete(todo.no)"
      >DELETE</b-button
    >
    <b-button class="me-3" variant="dark" @click="onClickEdit(todo.content)">
      EDIT
    </b-button>
    <b-button
      v-if="todo.status === 'In Progress'"
      variant="success"
      @click="setFinished(todo.no)"
    >
      FINISHED
    </b-button>
    <b-button v-else variant="success" @click="setInProgress(todo.no)">
      In Progress
    </b-button>
  </b-td>
  <b-td class="d-sm-none">
    <b-dropdown variant="outline-secondary">
      <b-dropdown-item @click="handleDelete(todo.no)"> DELETE </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item
        v-if="todo.status === 'In Progress'"
        @click="setFinished(todo.no)"
      >
        FINISHED
      </b-dropdown-item>
      <b-dropdown-item v-else @click="setInProgress(todo.no)">
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
export default {
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
        console.log(no, this.content);

        this.emitter.emit("editTodo", { no, content: this.content });
      }
      this.isEdit = false;
    },
    onClickEdit(content) {
      this.content = content;
      this.isEdit = true;
    },
    handleDelete(no) {
      this.emitter.emit("deleteTodo", no);
    },
    setFinished(no) {
      this.emitter.emit("setFinished", no);
    },
    setInProgress(no) {
      this.emitter.emit("setInProgress", no);
    },
  },
};
</script>

<style lang="scss" scoped></style>
