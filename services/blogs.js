import Blog from "../models/blog";
import dbConnect from "./../lib/dbConnect";

const getAll = async () => {
  console.log("getall");
  await dbConnect();
  const response = await Blog.find({});
  const persons = response((r) => r.toJSON());
  console.log(persons)
  return persons;
};

export default { getAll };
