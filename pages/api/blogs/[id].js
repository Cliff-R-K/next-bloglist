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

    console.log("Delete")
    const blog = await Blog.findById(id)
    const user = await User.findOne({username:token.username})
    user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())
    await user.save()
    await Blog.findByIdAndRemove(id);
    res.status(200).end();
  } else if (req.method === "PUT") {
    console.log(`PUT id:${id}`);
    const likes = req.body.likes + 1;
    const updatedBlog = await Blog.findByIdAndUpdate(id, { likes });
    res.status(200).json(updatedBlog.toJSON());
  }
};
