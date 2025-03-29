
export default async function userLogIn(
  username: string,
  userPassword: string
) {
  console.log("entry to login ja", username, userPassword);
  const response = await fetch('http://localhost:5000/api/v1/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: userPassword,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  console.log("response is ", response);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log(data);
  return data;
}
