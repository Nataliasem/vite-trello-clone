import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      id: '71b324f1-9293-4e12-a05c-2b045f50443c',
      name: 'todo',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'second task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'and thrid',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      id: '475dbece-4bc3-4e00-a8d8-17d90b640193',
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      id: '1d3462e4-5c4f-43f5-b5a2-3080442f554e',
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    }
  ]
}
