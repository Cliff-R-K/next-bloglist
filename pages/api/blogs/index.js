import Blog from "../../../models/blog";
import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";

/* const getToken = (req) => {
  const {authorization} = req.headers  
  console.log(`getToken: ${authorization}`)
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
}; */

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      const persons = await Blog.find({}).populate('user',{username:1})
      res.status(200).json(persons.map(p => p.toJSON()));
      break;
    case "POST":
      //const token = getToken(req)
      try {
      const { body } = req;

     /*  const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!token || !decodedToken.id) {
        return res.status(401).json({ error: "token missing or invalid" });
      } */
      const user = await User.findOne({username:body.user.username});
      console.log("fetch save")
      console.log(user)
      //console.log(typeof(user._id))
      //console.log(user)
      //console.log(decodedToken.id)
      const blog = new Blog({ title:body.title, author:body.author, url:body.url, likes:0, user: user._id });
      const savedBlog = await blog.save();

      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      res.status(200).json(savedBlog);
      } catch (error) {
        res.status(401).json({error:error.message})
      }
      
      break;

    default:
      console.log("boop!!");
      break;
  }
}
