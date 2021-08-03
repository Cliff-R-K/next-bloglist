//Fixa till lite snyggare
const baseUrl = process.env.SERVER_DEV;
const headers = { "Content-Type": "application/json" };

const getAll = async () => {
  console.log("getall");

  const response = await fetch(`${baseUrl}/api/blogs`);
  /* const response = await Blog.find({});
  const persons = response.map(r => r.toJSON()) */
  return response.json();
};

const save = async (blog) => {
  console.log("save");
  console.log(blog);
  console.log(`${baseUrl}`);
  const response = await fetch(`${baseUrl}/api/blogs`, {
    method: "POST",
    headers,
    body: JSON.stringify(blog),
  });
  return response.json(response);
};

const like = async (blog) => {
  const response = await fetch(`${baseUrl}/api/blogs/${blog.id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ likes: blog.likes }),
  });
  return response.json();
};

const remove = async (id) => {
  await fetch(`${baseUrl}/api/blogs/${id}`, { method: "DELETE"});
  
};

export default { getAll, save, like, remove };
