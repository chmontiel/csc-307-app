import React, { useState, useEffect } from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id) {
    // Make HTTP DELETE request to delete user by ID
    fetch(`http://localhost:8000/users/${id}`, {
      method: 'DELETE'
    })
    .then((response) => {
      if (response.status === 204) {
        // If successful deletion, update frontend state
        setCharacters(characters.filter((character) => character._id !== id)); // Change 'id' to '_id'
      } else if (response.status === 404) {
        // If user not found, show error message or handle it appropriately
        console.log("User not found.");
      } else {
        // Handle other error cases if needed
        console.log("Failed to delete user.");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function updateList(person) { 
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("Failed to add user");
        }
      })
      .then((data) => {
        setCharacters([...characters, data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
