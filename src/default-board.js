import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      id: 'todo',
      name: 'todo',
      tasks: [
        {
          description: '',
          name: 'first task todo',
          id: uuid(),
          userAssigned: null,
          columnId: 'todo'
        },
        {
          description: '',
          name: 'second task todo',
          id: uuid(),
          userAssigned: null,
          columnId: 'todo'
        },
        {
          description: '',
          name: 'and third todo',
          id: uuid(),
          userAssigned: null,
          columnId: 'todo'
        }
      ]
    },
    {
      id: 'in-progress',
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'first task in-progress',
          id: uuid(),
          userAssigned: null,
          columnId: 'in-progress'
        }
      ]
    },
    {
      id: 'done',
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task done',
          id: uuid(),
          userAssigned: null,
          columnId: 'done'
        }
      ]
    }
  ]
}
