<template>
  <div class="board">
    <div class="flex items-start space-x-2 p-2">
      <AppDrop
        v-for="column of board.columns"
        :key="column.name"
        @drop="onDrop($event, clonedeep(column))"
      >
        <AppDrag
          class="column"
          :transferData="{
          type: 'column',
            ...column
          }"
        >
          <div class="flex items-center mb-2 font-bold">
            {{ column.name }}
          </div>

          <AppDrop
            v-for="task of column.tasks"
            :key="task.id"
            @drop="onDrop($event, clonedeep(column))"
          >
            <AppDrag
              class="task"
              :transferData="{
              type: 'task',
               ...task
            }"
            >
              <span class="w-full shrink-0 font-bold">
                {{ task.name }}
              </span>
              <p
                v-if="task.description"
                class="w-full shrink-0 mt-1 text-sm"
              >
                {{ task.description }}
              </p>
            </AppDrag>
          </AppDrop>
        </AppDrag>
      </AppDrop>

      <div class="column flex">
        <input
          type="text"
          class="p-2 mr-2 flex-grow"
          placeholder="New Column Name"
          v-model="newColumnName"
          @keyup.enter="createColumn"
        >
      </div>
    </div>

    <div
      class="task-bg"
      v-if="isTaskOpen"
      @click.self="close"
    >
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppDrop from '../components/AppDrop.vue'
import AppDrag from '../components/AppDrag.vue'
import BoardColumn from '../components/BoardColumn.vue'
import ColumnTask from '../components/ColumnTask.vue'
import defaultBoard from '../default-board.js'
import { useRouter, useRoute } from 'vue-router'
import { uuid } from '../utils.js'
import clonedeep from 'lodash.clonedeep'

const router = useRouter()
const route = useRoute()
const isTaskOpen = computed(() => {
  return route.name === 'task'
})
const close = () => {
  router.push({name: 'board'})
}

// const board = JSON.parse(localStorage.getItem('board')) || defaultBoard
const board = ref(defaultBoard)
const newColumnName = ref('')
const createColumn = () => {
  const name = newColumnName.value
  board.value.push({
    name,
    tasks: []
  })
  newColumnName.value = ''
}

const fromColumnToColumn = (fromColumn, toColumn) => {
  const columnList = clonedeep(board.value.columns)

  const fromColumnIndex = columnList.findIndex(item => item.id === fromColumn.id)
  const toColumnIndex = columnList.findIndex(item => item.id === toColumn.id)

  columnList.splice(fromColumnIndex, 1)
  columnList.splice(toColumnIndex, 0, fromColumn)

  board.value.columns = columnList
}

const fromTaskToColumn = (fromTask, toColumn) => {
  const columnList = clonedeep(board.value.columns)

  const filteredColumns = columnList.map(column => {
    column.tasks = column.tasks.filter(item => item.id !== fromTask.id)

    if(column.id === toColumn.id) {
      // TODO: order of tasks
      column.tasks.push(fromTask)
    }

    return column
  })

  board.value.columns = clonedeep(filteredColumns)
}

const fromTaskToTask = (fromTask, toTask) => {
  // TODO: move tasks inside and between columns
}

const onDrop = (fromColumnOrTask, toColumn) => {
  if(fromColumnOrTask.type === 'task') {
    fromTaskToColumn(fromColumnOrTask, toColumn)
  }

  if(fromColumnOrTask.type === 'column') {
    fromColumnToColumn(fromColumnOrTask, toColumn)
  }
}

</script>

<style lang="css">
.board {
  @apply bg-blue-900 p-4 h-full overflow-auto;
}

.task-bg {
  @apply absolute;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
