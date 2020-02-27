import ReactDOM from 'react-dom'
import TodoStatus from './../TodoStatus'
import { render, cleanup } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer'

afterEach(cleanup)

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TodoStatus remaining={0} total={0} />, div)
})

it('renders correctly', () => {
    const { getByTestId } = render(<TodoStatus remaining={0} total={0} />)
    expect(getByTestId('todo-status')).toBeTruthy()
})

it('match snapshot', () => {
    const element = renderer.create(<TodoStatus remaining={3} total={9} />).toJSON()
    expect(element).toMatchSnapshot()
})