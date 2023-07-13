<template>
  <AppDrop @drop="move">
    <AppDrag
      class="task"
      :transferData="{
        type: 'task',
        fromTaskId: task.id
      }"
      @click.native="goToTask"
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

const props = defineProps({
  task: Object
})

const emit = defineEmits(['move'])

const router = useRouter()
const goToTask = () => {
  router.push({
    name: 'task',
    params: {
      id: props.task.id
    }
  })
}

const move = (transferData) => {
  emit('move', transferData)
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white no-underline;
}
</style>
