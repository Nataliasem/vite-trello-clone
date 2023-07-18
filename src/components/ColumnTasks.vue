<template>
  <AppDrop
    v-for="task in tasks"
    @drop="move($event, clonedeep(task))"
  >
    <AppDrag
      class="task"
      :class="task.color"
      :transferData="task"
      @click.native="openTask(task)"
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

  <TaskView
    v-if="!!openedTask"
    :task="openedTask"
    @close="closeTask"
  />
</template>

<script setup>
import TaskView from '../components/TaskView.vue'
import AppDrag from './AppDrag.vue'
import AppDrop from './AppDrop.vue'
import { ref } from 'vue'
import clonedeep from 'lodash.clonedeep'

const props = defineProps({
  tasks: Array
})

const emit = defineEmits(['move-task'])

const openedTask = ref(null)
const openTask = (task) => {
  openedTask.value = task
}
const closeTask = () => {
  openedTask.value = null
}

const move = (task, toTask) => {
  if(task.type === 'task') {
    emit('move-task', {
      task,
      toTask
    })
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded no-underline;
}
</style>
