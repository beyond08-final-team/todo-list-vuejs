<template>
  <main
    class="vh-100 bg-secondary-subtle d-flex justify-content-center align-items-center"
  >
    <div class="container">
      <slot></slot>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-width: 524px;
  max-width: 720px;
}
</style>
