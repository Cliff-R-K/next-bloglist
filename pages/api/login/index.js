import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  switch (method) {
    case "POST":
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      const correctPassword =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);
      if (!(user && correctPassword)) {
        return res.status(401).json({
          error: "invalid username or password",
        });
      }
      /* const userForToken = {
        username: user.username,
        id: user._id,
      }; */
      //const token = jwt.sign(userForToken, process.env.SECRET);

      res.status(200).send({ username: user.username, name: user.name });
      break;

    default:
      console.log("login error");
      break;
  }
}
