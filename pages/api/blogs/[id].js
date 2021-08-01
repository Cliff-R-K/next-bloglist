import dbConnect from "./../../../lib/dbConnect";
import Blog from "../../../models/blog";
import getToken from "../../../utils/tokenextractor";
import jwt from "jsonwebtoken"

export default async (req, res) => {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const blogs = await Blog.find({});
    const blog = blogs.find((b) => b.id === id);
    if (!blog) {
      res.status(404).json({ error: "id does not exist" });
    }
    res.status(200).json({ Blog: blog });
  } else if (req.method === "DELETE") {
    const token = getToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
   
    const blogToRemove = await Blog.findById(id);
 
    if (blogToRemove.user.toString() !== decodedToken.id) {
      return res
        .status(401)
        .json({ error: "not authorized to delete specific blog" });
    }
    await Blog.findByIdAndRemove(id);
    res.status(200).end();
  } else if (req.method === "PUT") {
    console.log(`PUT id:${id}`);
    const { body } = req;
    const updatedBlog = await Blog.findByIdAndUpdate(id, body);
    res.status(200).json(updatedBlog.toJSON());
  }
};
