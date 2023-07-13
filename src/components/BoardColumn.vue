<template>
  <AppDrop @drop="move">
    <AppDrag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnId: column.id
      }"
    >
      <div class="flex items-center mb-2 font-bold">
        {{ column.name }}
      </div>
      <div class="list-reset">
        <ColumnTask
          v-for="(task) of column.tasks"
          :key="task.id"
          :task="task"
          @move="move"
        />

        <input
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event)"
        />
      </div>
    </AppDrag>
  </AppDrop>
</template>


<script setup>
import ColumnTask from './ColumnTask.vue'
import AppDrag from './AppDrag.vue'
import AppDrop from './AppDrop.vue'

const props = defineProps({
  column: Object
})

const emit = defineEmits(['move'])

const createTask = (eventData) => {
  const data = eventData
  debugger
  // this.$store.commit('CREATE_TASK', {
  //   tasks: props.column.tasks,
  //   name: eventData.target.value
  // })
}

const move = (transferData) => {
  transferData.fromColumnId = props.column.id

  emit('move', transferData)
}
</script>

<style lang="css">
.column {
  @apply bg-gray-200 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
