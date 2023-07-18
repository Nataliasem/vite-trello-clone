<template>
  <div class="board">
    <div class="flex items-start space-x-2 p-2">
      <BoardColumn
        v-for="column of columns"
        :key="column.name"
        :column="column"
        @move-column="moveColumn"
        @move-task-to-column="moveTaskToColumn"
        @create-task="createTask"
      >
        <ColumnTasks
          :tasks="column.tasks" @move-task="moveTask" />
      </BoardColumn>

      <div class="column flex">
        <input
          v-model="newColumnName"
          type="text"
          class="p-2 mr-2 flex-grow"
          placeholder="New Column Name"
          @keyup.enter="createColumn"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BoardColumn from '../components/BoardColumn.vue'
import ColumnTasks from '../components/ColumnTasks.vue'
import defaultBoard from '../default-board.js'
import clonedeep from 'lodash.clonedeep'

const board = ref(defaultBoard)
const columns = computed(() => {
  return board.value.columns
})

const newColumnName = ref('')
const createColumn = () => {
  const name = newColumnName.value

  if(!name) {
    return
  }

  board.value.columns.push({
    name,
    tasks: []
  })
  newColumnName.value = ''
}

const moveColumn = ({ column, toColumn }) => {
  const columns = clonedeep(board.value.columns)

  const columnIndex = columns.findIndex(item => item.id === column.id)
  const toColumnIndex = columns.findIndex(item => item.id === toColumn.id)

  columns.splice(columnIndex, 1)
  columns.splice(toColumnIndex, 0, column)

  board.value.columns = columns
}

const moveTask = ({ task, toTask }) => {
  const columns = clonedeep(board.value.columns)

  // const taskColumn = columns.find(column => column.id === task.columnId).tasks || []
  // const taskIndex = taskColumn.findIndex(item => item.id === task.id)

  const toTaskColumn = columns.find(column => column.id === toTask.columnId).tasks || []
  const toTaskIndex = toTaskColumn.findIndex(item => item.id === toTask.id)

  board.value.columns = board.value.columns.map(column => {
    column.tasks = column.tasks.filter(item => item.id !== task.id)

    if(column.id === toTask.columnId) {
      task.columnId = column.id
      column.tasks.splice(toTaskIndex, 0, task)
    }

    return column
  })
}

const moveTaskToColumn = ({ task, toColumn }) => {
  board.value.columns = board.value.columns.map(column => {
    column.tasks = column.tasks.filter(item => item.id !== task.id)

    if(column.id === toColumn.id) {
      task.columnId = column.id
      column.tasks.push(task)
    }

    return column
  })
}

const createTask = (task) => {
  board.value.columns = board.value.columns.map(column => {
    if(column.id === task.columnId) {
      column.tasks.push(task)
    }

    return column
  })
}

</script>

<style lang="css">
.board {
  @apply bg-blue-900 p-4 h-full overflow-auto;
}
</style>
