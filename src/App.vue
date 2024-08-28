<template>
  <div class="background">
    <div class="main-box">
      <h1>To Do List</h1>
      <div class="input-container">
        <input type="text" placeholder="Enter a task here" />
        <button class="save-button">SAVE</button>
        <button class="get-tasks-button">GET TASKS</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.background {
  background-color: #d9d8d8;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-box {
  width: 70%; 
  height: 70%;
  padding: 40px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 제목 스타일 */
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

/* 입력 필드 및 버튼 컨테이너 */
.input-container {
  display: flex;
  justify-content: center; 
  align-items: center; 
  margin-top: 20px; 
}

/* 입력 필드 스타일 */
input[type="text"] {
  padding: 10px;
  margin-right: 10px;
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* 버튼 스타일 */
button {
  padding: 10px 20px;
  margin-right: 5px;
  border: none;
  border-radius: 5px;
  color: white;
}

/* SAVE 버튼 색상 스타일 */
.save-button {
  background-color: #4a5bdc;
}

/* GET TASKs 버튼 색상 스타일 */
.get-tasks-button {
  background-color: #d5a253;
}
</style>