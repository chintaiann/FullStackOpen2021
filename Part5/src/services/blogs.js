import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async newBlog => {
  const config = { headers: { Authorization: token } }
  const response = axios.post(baseUrl,newBlog,config)
  return response.data
}

const updateBlog= async Blog => {
  const id = Blog.id
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url,Blog)
  return response.data
}


const deleteBlog = async Blog => {
  const config = { headers: { Authorization: token } }
  const id = Blog.id
  const url = `${baseUrl}/${id}`
  const response = await axios.delete(url,config)
  return response.data
}

export default { getAll,addBlog,setToken,updateBlog,deleteBlog }