import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'

describe('<Togglable />',()=>{
    const blogpost = {
        title: "Show this!",
        author: "To be shown",
        likes:50,
        url: "www.hidden.com"
    }

    let component 

    beforeEach( ()=> {
        component = render (
            <Togglable buttonLabel="show" secondLabel="hide">
                <Blog blog={blogpost} />
            </Togglable>
        )
    })

    test('only author and title shown by default', () => {
        expect(
            component.container.querySelector('.default')
        ).toHaveTextContent("Show this! by To be shown")
    })

    test('likes and URL shown after clicking show', () => {
        const button = component.getByText('show')
        fireEvent.click(button)

        expect(
            component.container
        ).toHaveTextContent("Show this! by To be shown has 50 likes! URL: www.hidden.com")
    })
})

test('liking twice', () => {
    const blogpost = {
        title: "Show this!",
        author: "To be shown",
        likes:50,
        url: "www.hidden.com"
    }

    const mockHandler = jest.fn()
    const deleteHandler = jest.fn()

    const component = render(
        <Blog blog={blogpost} deleteBlog={deleteHandler} updateBlog={mockHandler}/>
    )


    const button = component.getByText('Like!')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
})

test ('blog form', () => {
    const blogpost = {
        title: "Show this!",
        author: "To be shown",
        likes:50,
        url: "www.hidden.com"
    }

    const addBlogHandler = jest.fn()

    const component = render(
        <CreateBlog newBlog={addBlogHandler} />
    )

    const author = component.container.querySelector('#authorid')
    const title = component.container.querySelector('#titleid')
    const url = component.container.querySelector('#urlid')

    fireEvent.change(author, { 
        target: { value: 'this is the author' } 
      })
    
      fireEvent.change(title, { 
        target: { value: 'testing of forms could be easier' } 
      })

      fireEvent.change(url, { 
        target: { value: 'www.fullstack.com' } 
      })

      const form = component.container.querySelector('form')
      fireEvent.submit(form)


    expect(addBlogHandler.mock.calls).toHaveLength(1)
    expect(addBlogHandler.mock.calls[0][0].title).toBe('testing of forms could be easier' )
    expect(addBlogHandler.mock.calls[0][0].author).toBe('this is the author' )
    expect(addBlogHandler.mock.calls[0][0].url).toBe('www.fullstack.com' )
})


