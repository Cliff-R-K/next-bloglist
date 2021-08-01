//import listHelper from '../utils/list_helper'
const listHelper = require('../utils/list_helper')
const blogs = listHelper.blogs

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Number of blogs', () => {

test('in empty blogarray should return 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
})

test('of array of one blog should return correct number of likes', () => {
  const result = listHelper.totalLikes([blogs[0]])
  expect(result).toBe(7)
})

test('of array of blogs should return correct number of likes', () => {
  const result = listHelper.totalLikes(blogs)
  expect(result).toBe(36)
})

})

describe('Favorite blog ', () => {
  test('of empty list should return empty array', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual([])
  })
  test('of one blog should return that blog', () => {
    const result = listHelper.favoriteBlog([blogs[0]])
    expect(result).toEqual(blogs[0])
  })
  test('all blogs should return correct blog', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('Author with most blogs', () => {
  test('should return the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({author:"Robert C. Martin", blogs:3})
  })
  
})

describe('Author with most likes', () => {
  test('should return the author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
  
})


