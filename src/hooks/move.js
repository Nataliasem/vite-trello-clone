export function useMove(transferData, columnIndex) {
    function moveTask({ fromColumnId, fromTaskId }) {
        // const fromTasks = this.board.columns[fromColumnId].tasks

        // this.$store.commit('MOVE_TASK', {
        //     fromTasks,
        //     fromTaskId,
        //     toTasks: this.column.tasks,
        //     toTaskId: this.taskIndex
        // })
    }
    function moveColumn({ fromColumnId }) {
        // this.$store.commit('MOVE_COLUMN', {
        //     fromColumnId,
        //     toColumnId: columnIndex
        // })
    }

    if(transferData.type === 'task') {
        this.moveTask(transferData)
    }

    if(transferData.type === 'column') {
        this.moveColumn(transferData)
    }

    // expose managed state as return value
   // return { x, y }
}
