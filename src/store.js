import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    UPDATE_TASK (state, { task, key, value }) {
      task[key] = value
    },
    MOVE_TASK (state, { fromTasks, toTasks, fromTaskId, toTaskId }) {
      const taskToMove = fromTasks.splice(fromTaskId, 1)[0]
      toTasks.splice(toTaskId, 0, taskToMove)
    },
    MOVE_COLUMN (state, { fromColumnId, toColumnId }) {
      const columnList = state.board.columns

      const columnToMove = columnList.splice(fromColumnId, 1)[0]
      columnList.splice(toColumnId, 0, columnToMove)
    }
  }
})
