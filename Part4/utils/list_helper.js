const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (blogs) => { 
    var total = 0
    blogs.forEach(post=> { 
        total += post.likes 
    })
    return total 
}

const favouriteBlog = (blogs) => {
    var maxLikes = 0
    var maxPost = {}
    blogs.forEach(post => {
        if (post.likes > maxLikes) {
            maxPost = post 
            maxLikes = post.likes
        }
    })
    return maxPost;
}

const mostLikes=(blogs) => {
    var dict = {}
    blogs.forEach(post=>{
        
        if (!(dict[post.author])){
            dict[post.author] = post.likes
        }
        else {
            const currentLikes = dict[post.author]
            dict[post.author] = currentLikes + post.likes
        }
    })
    let maxPosts = 0 
    let maxAuthor = ''
    for (var key in dict) {
        posts = dict[key]
        if (posts>maxPosts) {
            maxAuthor = key
            maxPosts = posts
        }
    }

    return maxAuthor
}

const mostBlogs = (blogs) => {
    var dict = {}
    blogs.forEach(post=>{
        
        if (!(dict[post.author])){
            dict[post.author] = 1
        }
        else {
            const currentBlogs = dict[post.author]
            dict[post.author] = currentBlogs + 1
        }
    })
    let maxBlogs = 0
    let maxAuthor = ''
    for (var key in dict) {
        let blog = dict[key]
        if (blog>maxBlogs){
            maxAuthor = key
            maxBlogs = blog
        }
    }

    return {Author: `${maxAuthor}`,blogs: maxBlogs}


}



const blogLength = (blogs) => {
    let length = 0
    blogs.forEach(post => {
        length++
    })

    return length
}

const returnLikes = (blogpost) => {
    return blogpost.likes
}

  

const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostLikes,
    mostBlogs,
    blogLength,
    returnLikes,
    usersInDb

  }



