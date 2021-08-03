export default function tokenExtractor(request) {
  console.log(request)
  const { authorization } = request.headers;
  console.log(`getToken: ${authorization}`);
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    console.log("token found");
    return authorization.substring(7);
  }
  console.log("token not found");
  return null;
}
