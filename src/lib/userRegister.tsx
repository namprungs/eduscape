
export default async function userRegister(userName:string,userPassword:string) {
  try {
      console.log("entry to register");
      const response = await fetch('http://localhost:5000/api/v1/register', {
        method: 'POST',
        body: JSON.stringify({
          username: userName,
          password: userPassword,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      return data;
  } catch (error) {
      console.log("error in userLogin is ",error);
  }

}