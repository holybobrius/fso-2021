const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT':
    return state = action.data
  case 'CREATE':
    return state.concat(action.data)
  case 'DELETE':
    return state.filter(n => n.id !== action.data)
  case 'UPDATE':
    return state.map(n => n.id === action.data.id ? action.data : n)
  default: return state
  }
}

/*export const initializeBlogs = async () => {
  const response = await blogsService.getAll()
  return {
    type: 'INIT',
    data: response.data.sort((a, b) => b.likes - a.likes)
  }
} */

export const create = blog => {
  return {
    type: 'CREATE',
    data: blog
  }
}

export const deleteBlog = id => {
  return {
    type: 'DELETE',
    data: id
  }
}

export const updateBlog = blog => {
  return {
    type: 'UPDATE',
    data: blog
  }
}

export default blogReducer