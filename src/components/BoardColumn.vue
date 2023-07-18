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
        <slot/>

        <input
          v-model="newTask"
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task"
          @keyup.enter="createTask"
        />
      </div>
    </AppDrag>
  </AppDrop>
</template>


<script setup>
import { ref } from 'vue'
import AppDrag from './AppDrag.vue'
import AppDrop from './AppDrop.vue'
import clonedeep from 'lodash.clonedeep'
import { uuid } from '../utils.js'

const props = defineProps({
  column: Object
})

const emit = defineEmits([ 'move-column', 'create-task', 'move-task-to-column' ])

const move = (fromData, toData) => {
  if (fromData.type === 'task') {
    emit('move-task-to-column', {
      task: fromData,
      toColumn: toData
    })
  }


  if (fromData.type === 'column') {
    emit('move-column', {
      column: fromData,
      toColumn: toData
    })
  }
}

const newTask = ref('')

const createTask = () => {
  if (!newTask.value) {
    return
  }

  const payload = {
    type: 'task',
    description: '',
    name: newTask.value,
    id: uuid(),
    columnId: props.column.id,
    color: 'bg-red-200'
  }

  emit('create-task', payload)
}
</script>

<style lang="css">
.column {
  @apply bg-gray-200 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
