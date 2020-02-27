import React from 'react'
import './TodoTask.css'

interface IProps {
    text: string
    status: boolean
    onClick: (text: string) => void
}

const TodoTask = React.memo((props: IProps) => {
    return <li data-testid={"list-item"} className={props.status ? "strike" : ""}><span data-testid="list-span" onClick={(event: any) => props.onClick(event.target.innerHTML)}>{props.text}</span></li>
}, (prevProps: IProps, nextProps: IProps) => prevProps.status === nextProps.status)

export default TodoTask;