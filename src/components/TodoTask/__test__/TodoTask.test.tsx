import ReactDOM from 'react-dom'
import TodoTask from './../TodoTask'
import { render, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer'

afterEach(cleanup)

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TodoTask text="Test" status={true} onClick={jest.fn} />, div)
})

it('renders correctly',()=>{
    const {getByTestId} = render(<TodoTask text="Test" status={true} onClick={jest.fn} />)
    expect(getByTestId('list-item')).toBeTruthy()
})

it('match snapshot with striked text',()=>{
    const tree = renderer.create(<TodoTask text="Test" status={true} onClick={jest.fn} />).toJSON()
    expect(tree).toMatchSnapshot()
})

it('match snapshot without striked text',()=>{
    const tree = renderer.create(<TodoTask text="Test" status={false} onClick={jest.fn} />).toJSON()
    expect(tree).toMatchSnapshot()
})

it('function call on click',()=>{
    const clickFunction = jest.fn()
    const {getByTestId} = render(<TodoTask text="Test" status={true} onClick={clickFunction} />)
    const span = getByTestId('list-span')
    expect(span).toBeTruthy()
    fireEvent.click(span)
    expect(clickFunction).toHaveBeenCalled()
})

it('function not called on click of li',()=>{
    const clickFunction = jest.fn()
    const {getByTestId} = render(<TodoTask text="Test" status={true} onClick={clickFunction} />)
    const li = getByTestId('list-item')
    expect(li).toBeTruthy()
    fireEvent.click(li)
    expect(clickFunction).not.toHaveBeenCalled()
})