import axios from 'axios';
export default async function userLogIn(
  username: string,
  userPassword: string
) {
  console.log("entry to login ja", username, userPassword);
  const response = await axios.post('http://localhost:5000/api/v1/login', {
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
