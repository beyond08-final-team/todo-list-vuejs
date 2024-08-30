<template>
    <main>
        <div class="TodoBox">
            <BCardTitle class="text-center">To Do App</BCardTitle>
            <BCardBody class="d-flex justify-content-around m-auto">
                <BFormInput class="w-50"/>
                <BButton>SAVE</BButton>
                <BButton>GET TASKS</BButton>
            </BCardBody>
        </div>
    </main>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.TodoBox{
  background-color: white; /* 박스의 배경색 */
  border: 1px solid #ccc;  /* 박스의 테두리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 박스 그림자 (옵션) */
}
</style>