import React from 'react'

interface IProps {
    onAdd: (text: string) => void
}

const TodoInput = React.memo((props: IProps) => {
    console.log('render input')
    const inputRef = React.useRef<HTMLInputElement>(null)
    const onAddHandler = (event: any) => {
        event.preventDefault();
        if (inputRef && inputRef.current) {
            const inputString = inputRef.current.value
            props.onAdd(inputString)
            inputRef.current.value = "";
            inputRef.current.focus();
        }
    }

    return <form>
        <input data-testid="input-text" ref={inputRef} type="text" placeholder={"Enter your Task"} />
        &nbsp;&nbsp;
        <input data-testid="input-submit" type="submit" onClick={onAddHandler} value="Add" />
    </form>
})

export default TodoInput