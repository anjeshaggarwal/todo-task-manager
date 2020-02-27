import ReactDOM from 'react-dom'
import TodoInput from './../TodoInput'
import { render, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer'

afterEach(cleanup)

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TodoInput onAdd={jest.fn} />, div)
})

it('renders correctly', () => {
    const { getByTestId, getByPlaceholderText } = render(<TodoInput onAdd={jest.fn} />)
    expect(getByTestId('input-text')).toBeTruthy()
    expect(getByTestId('input-submit')).toBeTruthy()
    expect(getByPlaceholderText('Enter your Task')).toBeTruthy()
})

it('match snapshot', () => {
    const element = renderer.create(<TodoInput onAdd={jest.fn} />).toJSON()
    expect(element).toMatchSnapshot()
})

it('function call on click', ()=>{
    const addFunction = jest.fn()
    const {getByTestId} = render(<TodoInput onAdd={addFunction}/>)
    fireEvent.click(getByTestId('input-submit'))
    expect(addFunction).toHaveBeenCalled()
})