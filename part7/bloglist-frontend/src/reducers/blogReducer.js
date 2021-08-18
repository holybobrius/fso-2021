const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT':
    return state = action.data
  case 'CREATE':
    return state.concat(action.data)
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

export default blogReducer