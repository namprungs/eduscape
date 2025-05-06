import axios from 'axios';
export default async function userRegister(userName: string, userPassword: string) {
  try {
    // const apiUrl = process.env.BACKEND_URL || "";
    console.log("entry to login ja", userName, userPassword);
    const response = await axios.post("https://escape-room-backend-production.up.railway.app/api/v1/register", {
      username: userName,
      password: userPassword,
    });

    console.log("response is ", response);
    if (response.status !== 201) {
      throw new Error('Network response was not ok');
    }
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log("error in userLogin is ", error);
  }

}