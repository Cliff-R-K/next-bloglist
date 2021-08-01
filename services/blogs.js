import Blog from "../models/blog";
import dbConnect from "./../lib/dbConnect";

const getAll = async () => {
  console.log("getall");
  await dbConnect();
  const response = await Blog.find({});
  const persons = response.map(r => r.toJSON())
  return persons;
};

const save = async (body) => {
    
}

export default { getAll, save };
