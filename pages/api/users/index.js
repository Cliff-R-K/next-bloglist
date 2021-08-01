import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      const { username, password, name } = req.body;
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const user = new User({ username, name, passwordHash });
      const savedUser = await user.save();
      res.status(200).json(savedUser);
      break;
    case "GET":
        const users = await User.find({}).populate('blogs',{url:1,title:1, author:1,user:1})
        res.status(200).json(users)
        break
    default:
      console.log("boop!!");
      break;
  }
}
