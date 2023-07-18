import { moveTask } from './move.js'

const testBoard = [
  {
    id: 'todo',
    tasks: [
      {
        id: 'todo-1',
        columnId: 'todo'
      },
      {
        id: 'todo-2',
        columnId: 'todo'
      },
      {
        id: 'todo-3',
        columnId: 'todo'
      }
    ]
  },
  {
    id: 'in-progress',
    tasks: [
      {
        id: 'in-progress-1',
        columnId: 'in-progress'
      }
    ]
  },
  {
    id: 'done',
    tasks: [
      {
        id: 'done-1',
        columnId: 'done'
      }
    ]
  }
]



describe('moveTask', () => {
  test('', () => {
    expect(moveTask({})).toEqual(undefined)
  })

  test('', () => {
    expect(moveTask({
      fromTask: undefined,
      toTask: undefined
    })).toEqual(undefined)
  })

  test('', () => {
    expect(moveTask({
      fromTask: null,
      toTask: null
    })).toEqual(undefined)
  })

  test('', () => {
    expect(moveTask({
      fromTask: {},
      toTask: {}
    })).toEqual(undefined)
  })

  test('', () => {
    expect(moveTask({
      fromTask: testBoard[0].tasks[1],
      toTask: testBoard[1].tasks[0]
    })).toEqual([
      {
        id: 'todo',
        tasks: [
          {
            id: 'todo-1',
            columnId: 'todo'
          },
          {
            id: 'todo-3',
            columnId: 'todo'
          }
        ]
      },
      {
        id: 'in-progress',
        tasks: [
          {
            id: 'in-progress-1',
            columnId: 'in-progress'
          },
          {
            id: 'todo-2',
            columnId: 'todo'
          }
        ]
      },
      {
        id: 'done',
        tasks: [
          {
            id: 'done-1',
            columnId: 'done'
          }
        ]
      }
    ])
  })
})
