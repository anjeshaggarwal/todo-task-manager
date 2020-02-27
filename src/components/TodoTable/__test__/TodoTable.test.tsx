import ReactDOM from 'react-dom'
import TodoTable from './../TodoTable'
import { render, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer'

afterEach(cleanup)

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TodoTable tasks={{}} onTaskClick={jest.fn} />, div)
})

it('renders correctly', () => {
    const { getByTestId } = render(<TodoTable tasks={{}} onTaskClick={jest.fn} />)
    expect(getByTestId('task-list')).toBeTruthy()
})

it('match snapshot', () => {
    const tree = renderer.create(<TodoTable tasks={{ Task1: false, Task2: true }} onTaskClick={jest.fn} />).toJSON()
    expect(tree).toMatchSnapshot()
})

it('have correct length', () => {
    const { getAllByTestId } = render(<TodoTable tasks={{ Task1: false, Task2: true }} onTaskClick={jest.fn} />)
    expect(getAllByTestId('list-item')).toHaveLength(2)
})

it('function called', () => {
    const taskClicked = jest.fn()
    const { getAllByTestId } = render(<TodoTable tasks={{ Task1: false, Task2: true }} onTaskClick={taskClicked} />)
    fireEvent.click(getAllByTestId('list-span')[0])
    expect(taskClicked).toHaveBeenCalled()
})