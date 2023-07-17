<template>
  <AppDrop
    v-for="task in localTasks"
    @drop="move($event, clonedeep(task))"
  >
    <AppDrag
      class="task"
      :class="task.color"
      :transferData="task"
      @click.native="showDetails"
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

<script setup>
import { useRouter } from 'vue-router'
import AppDrag from './AppDrag.vue'
import AppDrop from './AppDrop.vue'
import { ref, onMounted } from 'vue'
import clonedeep from 'lodash.clonedeep'

const props = defineProps({
  tasks: Array
})

const emit = defineEmits(['move-task'])

const router = useRouter()
const showDetails = () => {}

const localTasks = ref(clonedeep(props.tasks))

const move = (fromTask, toTask) => {
  if(fromTask.type === 'task') {
    emit('move-task', {
      fromTask,
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
