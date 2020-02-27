import React from 'react'
import TodoInput from '../components/TodoInput/TodoInput'
import TodoStatus from '../components/TodoStatus/TodoStatus'
import TodoTable from '../components/TodoTable/TodoTable'

const TodoList = () => {
    const defaultState = {
        tasks: {},
        total: 0,
        remaining: 0
    }
    const [state, dispatch] = React.useReducer((state: any, action: any) => {
        switch (action.type) {
            case "SET":
                return {
                    ...action.data
                }
            case "ADD":
                const updatedTasks = {
                    ...state.tasks,
                    ...action.data
                }
                const newState = {
                    ...state,
                    tasks: updatedTasks,
                    remaining: state.remaining + 1,
                    total: state.total + 1,
                }
                localStorage.setItem("Tasks", JSON.stringify(newState))
                return newState
            case "TOGGLE":
                const toggledTasks = {
                    ...state.tasks,
                    [action.data]: !state.tasks[action.data],
                }
                const toggledState = {
                    ...state,
                    tasks: toggledTasks,
                    remaining: state.tasks[action.data] ? state.remaining + 1 : state.remaining - 1,
                }
                localStorage.setItem("Tasks", JSON.stringify(toggledState))
                return toggledState
            default:
                return state
        }
    }, { ...defaultState })
    
    const onAddHandler = (inputString: string) => {
        const newTask = inputString
        if (!newTask) {
            alert("Please enter a task to Add.")
            return;
        }
        if (newTask in state.tasks) {
            alert("Same task already exists.")
            return;
        }
        const stateTask = {
            [newTask]: false
        }
        dispatch({ type: "ADD", data: stateTask })

    }

    const onTaskClickHandler = (task: string) => {
        dispatch({ type: "TOGGLE", data: task })
    }

    React.useEffect(() => {
        const tasksJson = localStorage.getItem("Tasks")
        const t = JSON.parse(tasksJson || JSON.stringify(defaultState))
        dispatch({ type: "SET", data: t })
    }, [])

    return <div>
        <TodoInput onAdd={onAddHandler} />
        <TodoStatus remaining={state.remaining} total={state.total} />
        <TodoTable tasks={state.tasks} onTaskClick={onTaskClickHandler} />
    </div>
}


export default TodoList;