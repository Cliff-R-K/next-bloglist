import dbConnect from "./../../../lib/dbConnect";
import Blog from "../../../models/blog";
import jwt from "next-auth/jwt";
import User from "../../../models/user";

export default async (req, res) => {
  await dbConnect();
  const { id } = req.query;
  const secret = process.env.SECRET;
  console.log(secret)

  const token = await jwt.getToken({ req, secret });
  console.log("JSON Web Token", token);

  if (req.method === "GET") {
    const blogs = await Blog.find({});
    const blog = blogs.find((b) => b.id === id);
    if (!blog) {
      res.status(404).json({ error: "id does not exist" });
    }
    res.status(200).json({ Blog: blog });
  } else if (req.method === "DELETE") {

    /* const token = getToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    } */

    //const blogToRemove = await Blog.findById(id);

    /*  if (blogToRemove.user.toString() !== decodedToken.id) {
      return res
        .status(401)
        .json({ error: "not authorized to delete specific blog" });
    } */
    console.log("Delete")
    const blog = await Blog.findById(id)
    console.log(`Blog: ${blog}`)
    const user = await User.findOne({username:token.username})
    console.log(`User: ${user}`)
    //user.blogs = user.blogs.filter(b => b !== blog._id)
    //await user.save()

    console.log("user")
    console.log(user)
    console.log(token.username)
    console.log(user.username)


    //await Blog.findByIdAndRemove(id);
    res.status(200).end();
  } else if (req.method === "PUT") {
    console.log(`PUT id:${id}`);
    const likes = req.body.likes + 1;
    const updatedBlog = await Blog.findByIdAndUpdate(id, { likes });
    res.status(200).json(updatedBlog.toJSON());
  }
};
