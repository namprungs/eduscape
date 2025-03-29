'use client'
import React, { useEffect } from 'react'

const GamePage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/register', {
          method: 'POST',
          body: JSON.stringify({
            username: 'testUser',
            password: 'testPassword',
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
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }
    , []);

  return (
    <div>GamePage</div>
  )
}

export default GamePage