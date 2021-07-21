// const listHelper = require('../utils/list_helper')

// test('dummy returns one', () => {
//   const blogs = []

//   const result = listHelper.dummy(blogs)
//   expect(result).toBe(1)
// })

// describe('total likes', () => {
//     const listWithOneBlog = [
//       {
//         _id: '5a422aa71b54a676234d17f8',
//         title: 'Go To Statement Considered Harmful',
//         author: 'Edsger W. Dijkstra',
//         url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//         likes: 5,
//         __v: 0
//       }
//     ]
//     const emptylist = []

//     const multiplelist = [
//         {
//             _id: '5a422aa71b54a676234d17f7',
//             title: 'Go',
//             author: 'Edsger W. Dijkstra',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 10,
//             __v: 0
//           },
//           {
//             _id: '5a422aa71b54a676234d17f8',
//             title: 'Go To',
//             author: 'Edsger W.',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 8,
//             __v: 0
//           },
//           {
//             _id: '5a422aa71b54a676234d17f9',
//             title: 'Go To Statement Considered Harmful',
//             author: 'Edsger',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 2,
//             __v: 0
//           }
//     ]
  
//     test('when list has only one blog, equals the likes of that', () => {
//       const result = listHelper.totalLikes(listWithOneBlog)
//       expect(result).toBe(5)
//     })

//     test('empty list', () => {
//         const result = listHelper.totalLikes(emptylist)
//         expect(result).toBe(0)
//       })

//       test('multiple blog posts', () => {
//         const result = listHelper.totalLikes(multiplelist)
//         expect(result).toBe(20)
//       })
//   })

//   describe('return blog with most likes',()=>{
//     const multiplelist = [
//         {
//             _id: '5a422aa71b54a676234d17f7',
//             title: 'Go',
//             author: 'Edsger W. Dijkstra',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 10,
//             __v: 0
//           },
//           {
//             _id: '5a422aa71b54a676234d17f8',
//             title: 'Go To',
//             author: 'Edsger W.',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 8,
//             __v: 0
//           },
//           {
//             _id: '5a422aa71b54a676234d17f9',
//             title: 'Go To Statement Considered Harmful',
//             author: 'Edsger',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 2,
//             __v: 0
//           }
//     ]
    
//     test('multiple blog posts',()=>{
//         const result = listHelper.favouriteBlog(multiplelist)
//         expect(result).toEqual({
//             _id: '5a422aa71b54a676234d17f7',
//             title: 'Go',
//             author: 'Edsger W. Dijkstra',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 10,
//             __v: 0
//           })
//     })
//   })


//   describe('return author with most likes',() => {
//     const multiplelist = [
//         {
//             _id: '5a422aa71b54a676234d17f7',
//             title: 'Go',
//             author: 'Edsger W. Dijkstra',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 10,
//             __v: 0
//           },
//           {
//             _id: '5a422aa71b54a676234d17f8',
//             title: 'Go To',
//             author: 'Tai',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 9,
//             __v: 0
//           },
//           {
//             _id: '5a422aa71b54a676234d17f9',
//             title: 'Go To Statement Considered Harmful',
//             author: 'Tai',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 2,
//             __v: 0
//           }
//     ]
//       test('return author with most blogs',()=>{
//         const result = listHelper.mostLikes(multiplelist)
//         expect(result).toBe('Tai')
//       })
//   })


//   describe('return author with most blogs',() => {
//     const multiplelist = [
//         {
//             _id: '5a422aa71b54a676234d17f7',
//             title: 'Go',
//             author: 'Edsger W. Dijkstra',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 10,
//             __v: 0
//           },
//           {
//             _id: '5a422aa71b54a676234d17f8',
//             title: 'Go To',
//             author: 'Tai',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 9,
//             __v: 0
//           },
//           {
//             _id: '5a422aa71b54a676234d17f9',
//             title: 'Go To Statement Considered Harmful',
//             author: 'Tai',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 2,
//             __v: 0
//           }
//     ]
//       test('return author with most blogs',()=>{
//         const result = listHelper.mostBlogs(multiplelist)
//         expect(result).toEqual({Author: 'Tai', blogs: 2})
//       })
//   })