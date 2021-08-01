import mongoose from "mongoose";
//import uniqueValidator from "mongoose-unique-validator";

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

//PersonSchema.plugin(uniqueValidator);

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.user = returnedObject.user.toString()
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);