<template>
  <AppDrop
    @drop="moveTaskOrColumn"
  >
    <AppDrag
      class="task"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex
      }"
      @click.native="goToTask(task)"
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
</template>

<script>
import AppDrag from './AppDrag.vue'
import AppDrop from './AppDrop.vue'

export default {
  components: { AppDrag, AppDrop },
  props: {
    board: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    moveTaskOrColumn (transferData) {
      if(transferData.type === 'task') {
        this.moveTask(transferData)
      }

      if(transferData.type === 'column') {
        this.moveColumn(transferData)
      }
    },
    moveTask ({ fromColumnIndex, fromTaskIndex }) {
      const fromTasks = this.board.columns[fromColumnIndex].tasks

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTaskIndex,
        toTasks: this.column.tasks,
        toTaskIndex: this.taskIndex
      })
    },
    moveColumn ({ fromColumnIndex }) {
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      })
    },
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white no-underline;
}
</style>
