import Blog from "../../../models/blog";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";
import getToken from "../../../utils/tokenextractor";

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
      res.status(200).json(persons);
      break;
    case "POST":
      const { title, author, likes, url } = req.body;
      const token = getToken(req)
      try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!token || !decodedToken.id) {
        return res.status(401).json({ error: "token missing or invalid" });
      }
      const user = await User.findById(decodedToken.id);
      console.log(typeof(user._id))
      console.log(user)
      console.log(decodedToken.id)
      const blog = new Blog({ title, author, url, likes, user: user._id });
      const savedBlog = await blog.save();

      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      res.status(200).json(savedBlog);
      } catch (error) {
        res.status(401).json({error})
      }
      
      break;

    default:
      console.log("boop!!");
      break;
  }
}
