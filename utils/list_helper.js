const dummy = (blogs) => {
    return 1
  }
  
 const totalLikes = (blogs) => {
   if(!blogs || blogs.length === 0){
     return 0
   }
   return blogs.reduce((acc,curr) => acc+curr.likes,0)
 } 

 const favoriteBlog  = (blogs) => {
   if(!blogs || blogs.length === 0) return []
   return blogs.reduce((acc,curr) => curr.likes > acc.likes ? curr:acc,{likes:0})
 }

 const mostBlogs = (blogs) => {
  const temp = blogs.reduce((acc,curr)=> (acc[curr.author] ? acc[curr.author]+=1:acc[curr.author]=1,acc),{})
  const author = Object.keys(temp).reduce((a, b) => temp[a] > temp[b] ? a : b);
  return {author, "blogs":temp[author]}
/*   let temp = {}
   blogs.forEach(blog => {
  if(temp[blog.author]){
    console.log("blog.author exists")
    temp[blog.author]+=1
  }else{
    temp[blog.author] =1
  }
}); */
  // console.log({author, "blogs":temp[author]})
  // return blogs.reduce((acc,curr)=> acc[curr.author]?acc[curr.author]+=1:acc[curr.author]=1)
 }

 const mostLikes = (blogs) => {
   const temp = blogs.reduce((acc,curr) => (acc[curr.author]?acc[curr.author]+=curr.likes:acc[curr.author]=curr.likes,acc),{})
   const author = Object.keys(temp).reduce((a,b) => temp[a] > temp[b]?a:b)
   return {author, "likes":temp[author]}
 }



  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]


  module.exports = {dummy, blogs, totalLikes, favoriteBlog, mostBlogs, mostLikes}