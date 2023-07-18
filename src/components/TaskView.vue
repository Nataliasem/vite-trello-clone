<template>
  <AppModal @close="$emit('close')">
    <div class="task-view">
      <div class="task-view__name">
        <input
          type="text"
          class="p-2 w-full mr-2 block text-xl font-bold"
          :value="task.name"
        >

        <textarea
          class="task-view__description"
          :value="task.description"
        />
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import AppModal from '../components/AppModal.vue'

const props = defineProps({
  task: Object
})
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white;
  @apply mx-4 m-32 py-4 text-left rounded shadow-md;
}

.task-view .task-view__name {
  @apply flex flex-col flex-grow items-start justify-between px-4
}

.task-view .task-view__description {
  @apply relative w-full bg-transparent px-2 ;
  @apply mt-2 h-64 leading-normal;
}
</style>
