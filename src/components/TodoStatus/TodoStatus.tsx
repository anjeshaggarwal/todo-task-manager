import React from 'react'
import './TodoStatus.css'

interface IProps {
    remaining: number,
    total: number
}

const TodoStatus = (props: IProps) => {
    return <b id='todo-status' data-testid='todo-status'>{`Total todos remaining: ${props.remaining} out of ${props.total}.`}</b>
}

export default TodoStatus