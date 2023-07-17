<template>
  <AppDrop @drop="move($event, clonedeep(column))">
    <AppDrag
      class="column"
      :transferData="column"
    >
      <div class="flex items-center mb-2 font-bold">
        {{ column.name }}
      </div>
      <div class="list-reset">
        <slot />

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
import AppDrag from './AppDrag.vue'
import AppDrop from './AppDrop.vue'
import clonedeep from 'lodash.clonedeep'

const props = defineProps({
  column: Object
})

const emit = defineEmits(['move-column', 'create-task'])

const move = (fromColumn, toColumn) => {
  if(fromColumn.type === 'column')
  emit('move-column', {
    fromColumn,
    toColumn
  })
}

const createTask = (task) => {
  emit('create-task', task)
}
</script>

<style lang="css">
.column {
  @apply bg-gray-200 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
