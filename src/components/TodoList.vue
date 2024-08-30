<template>
    <div>
        <BTableSimple class="task-table" hover small caption-top responsive table-striped text-center>
            <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
            </colgroup>
            <BThead head-variant="dark">
                <BTr>
                    <BTh>No</BTh>
                    <BTh colspan="2">Todo item</BTh>
                    <BTh>Status</BTh>
                    <BTh>Actions</BTh>
                </BTr>
            </BThead>
            <BTbody>
                <BTr v-for="(task, index) in tasks" :key="task.no">
                    <BTh>{{ index + 1 }}</BTh>
                    <BTd colspan="2" class="text-align">
                        <template v-if="!task.editStatus">
                            {{ task.todoItem }}
                        </template>
                        <template v-if="task.editStatus">
                            <input v-model="task.editText" placeholder="Enter a todoItem here" class="input-task">
                        </template>
                    </BTd>
                    <BTd>{{ task.status }}</BTd>
                    <BTd>
                        <div class="btns">
                            <BButton @click="deleted(task.no)" class="save btn" variant="danger">DELETE</BButton>
                            <BButton @click="edited(task.no)" class="btn" variant="primary">EDIT</BButton>
                            <template v-if="task.status === 'In Progress'">
                                <BButton @click="finished(task.no)" class="btn" variant="success">FINISH</BButton>
                            </template>
                            <template v-if="task.status === 'Done'">
                                <BButton @click="inProgress(task.no)" class="btn" variant="warning">In Progress
                                </BButton>
                            </template>
                        </div>
                    </BTd>
                </BTr>
            </BTbody>
        </BTableSimple>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const tasks = ref([
        { no: 1, todoItem: 'Buy groceries for week', status: 'In Progress', editStatus: false },
        { no: 2, todoItem: 'Renew car insurance', status: 'In Progress', editStatus: false },
        { no: 3, todoItem: 'Sign up for online course', status: 'In Progress', editStatus: false }
    ])

    const deleted = (taskId) => {
        tasks.value = tasks.value.filter(task => task.no !== taskId);
        console.log('Task 삭제 - ', taskId)
    }

    const edited = (taskId) => {
        const task = tasks.value.find(task => task.no === taskId)

        if (task) {
            if (task.editStatus) {
                if (task.editText.length < 6 || task.editText.length > 20) {
                    alert('최소 6자 이상 최대 20자 이하여야 합니다.');
                    return;
                }
                task.todoItem = task.editText
                task.editText = ''
            }
            task.editStatus = !task.editStatus
        }
        console.log('Task 수정 및 저장 - ', taskId)
    }

    const finished = (taskId) => {
        const task = tasks.value.find(task => task.no === taskId)
        if (task) {
            task.status = 'Done'
        }
        console.log('Task 완료 - ', taskId)
    }

    const inProgress = (taskId) => {
        const task = tasks.value.find(task => task.no === taskId)
        if (task) {
            task.status = 'In Progress'
        }
        console.log('Task 진행 중 - ', taskId)
    }
</script>

<style scoped>
    .task-table {
        border-collapse: separate;
        border-spacing: 20px 20px;
        width: 90%;
        margin: 0 auto;
    }

    .btn {
        border: none;
        padding: 10px 20px;
        font-size: 13px;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    .btns {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>
