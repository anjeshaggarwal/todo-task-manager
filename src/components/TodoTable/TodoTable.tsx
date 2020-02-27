import React from 'react'
import TodoTask from '../TodoTask/TodoTask';
import './TodoTable.css'

interface IProps {
    tasks: any
    onTaskClick: (task: string) => void
}

const TodoTable = (props: IProps) => {
    return <div id='todo-table'>
        <ul data-testid="task-list">
            {Object.keys(props.tasks).map((task: string, index: number) => <TodoTask onClick={props.onTaskClick} key={`${task}`} text={task} status={props.tasks[task]} />)}
        </ul>
    </div>
}

export default TodoTable;