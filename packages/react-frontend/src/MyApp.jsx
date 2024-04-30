// src/MyApp.jsx 
import React, { useState, useEffect } from "react";  
import Table from "./Table";
import Form from "./Form";

function MyApp() {   
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {     
	const characterToDelete = characters[index];
	fetch(`http://localhost:8000/users/${characterToDelete._id}`, {
	    method: "DELETE",
	    headers: {
		"Content-Type": "application/json",
	    },
	})
	    .then((response) => {
		if(reponse.status === 204)
		{
		    const updated = characters.filter((_, i) => i !== index);
		    setCharacters(updated);
		}
		else if(response.status === 404)
		{
		    alert("User not found.");
		}
		else
		{
		    throw new Error(`Request failed with status ${response.status}`);
		}
	    })
	    .catch((error) => {
		console.error(error);
	    }); 
    }

    function updateList(person) {
	postUser(person)
	    .then(() => setCharacters([...characters, person]))
	    .catch((error) => {
		console.log(error);
	    })
    }

    function fetchUsers() {
	const promise = fetch("http://localhost:8000/users");
	return promise;
    }

    useEffect(() => {
	fetchUsers()
	   .then((res) => res.json())
	   .then((json) => setCharacters(json))
	   .catch((error) => { console.log(error); });
    }, [] );

    function postUser(person) {
	const promise = fetch("http://localhost:8000/users", {
	    method: "POST",
	    headers: {
		"Content-Type": "application/json",
	    },
	    body: JSON.stringify(person),
	})
	    .then((response) => {
		if(response.status === 201) // get the http status 
		{
		    return response.json(); // parse as json
		}
		else
		{
		    throw new Error(`Request failed with status ${response.status}`);
		}
	    })
	    .then((data) => {
		setCharacters([...characters, data]);
	    })
	    .catch((error) => {
		console.error(error);
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
