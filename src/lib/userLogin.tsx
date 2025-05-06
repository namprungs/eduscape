import axios from 'axios';
export default async function userLogIn(
  username: string,
  userPassword: string
) {
  const apiUrl = process.env.BACKEND_URL || "http://localhost:3000/api/auth/login";
  console.log("entry to login ja", username, userPassword);
  const response = await axios.post(apiUrl+"/login", {
    username: username,
    password: userPassword,
  });
  console.log("response is ", response);
  if (response.status !== 200) {
    throw new Error('Network response was not ok');
  }
  const data = await response.data
  console.log(data);
  return data;
}
