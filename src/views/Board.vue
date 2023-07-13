<template>
  <div class="board">
    <div class="flex items-start space-x-2 p-2">
      <BoardColumn
        v-for="column of board.columns"
        :key="column.name"
        :column="column"
        @move="moveTaskOrColumn"
      />

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
import BoardColumn from '../components/BoardColumn.vue'
import defaultBoard from '../default-board.js'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isTaskOpen = computed(() => {
  return route.name === 'task'
})
const close = () => {
  router.push({name: 'board'})
}

// const board = JSON.parse(localStorage.getItem('board')) || defaultBoard
const board = defaultBoard
const newColumnName = ref('')
const createColumn = () => {
  const name = newColumnName.value
  board.columns.push({
    name,
    tasks: []
  })
  newColumnName.value = ''
}

const moveTaskOrColumn = (transferData) => {
  debugger
  if (transferData.type === 'task') {
    moveTask(transferData)
  }

  if (transferData.type === 'column') {
    moveColumn(transferData)
  }
}

const moveTask = ({fromColumnId, fromTaskId}) => {
  const fromTasks = board.value.columns[fromColumnId].tasks

  // this.$store.commit('MOVE_TASK', {
  //   fromTasks,
  //   fromTaskId,
  //   toTasks: this.column.tasks,
  //   toTaskId: this.taskIndex
  // })
}
const moveColumn = ({fromColumnId}) => {
  // this.$store.commit('MOVE_COLUMN', {
  //   fromColumnId,
  //   toColumnId: this.columnIndex
  // })
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
