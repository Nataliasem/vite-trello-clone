import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      id: 'todo',
      name: 'todo',
      type: 'column',
      tasks: [
        {
          type: 'task',
          description: '',
          name: '1 todo',
          id: uuid(),
          columnId: 'todo',
          color: 'bg-green-200'
        },
        {
          type: 'task',
          description: '',
          name: '2 todo',
          id: uuid(),
          columnId: 'todo',
          color: 'bg-green-200'
        },
        {
          type: 'task',
          description: '',
          name: '3 todo',
          id: uuid(),
          columnId: 'todo',
          color: 'bg-green-200'
        }
      ]
    },
    {
      id: 'in-progress',
      name: 'in-progress',
      type: 'column',
      tasks: [
        {
          type: 'task',
          description: '',
          name: '1 in-progress',
          id: uuid(),
          columnId: 'in-progress',
          color: 'bg-purple-200'
        }
      ]
    },
    {
      id: 'done',
      name: 'done',
      type: 'column',
      tasks: [
        {
          type: 'task',
          description: '',
          name: '1 done',
          id: uuid(),
          columnId: 'done',
          color: 'bg-sky-300'
        }
      ]
    }
  ]
}
