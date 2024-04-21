// Import necessary modules
import express from "express";
import cors from "cors";

// Create Express app and define port
const app = express();
const port = 8000;

// Define the list of users
const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {    
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {    
            id: "yat999",
            name: "Dee",
            job: "Aspiring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};

app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// Function to find a user by their name
const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

// Function to find a user by their ID
const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

// Endpoint to retrieve a user by their ID
app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

//keep this
app.get("/users", (req, res) => {  
    const name = req.query.name;  
    const job = req.query.job;   
    
    if(name && job)  
    {   
        let result = findUserByNameAndJob(name, job);   
        result = { users_list: result };   
        res.send(result);  
    }  
    else if(name)  
    {   
        let result = findUserByName(name);   
        result = { users_list: result };   
        res.send(result);  
    }  
    else  
    {   
        res.send(users);  
    } 
});

// Endpoint to add a new user
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

// Function to add a user to the list
const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

// Endpoint to delete a user by their ID
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const index = users["users_list"].findIndex(user => user.id === id);
    if (index !== -1) {
        users["users_list"].splice(index, 1);
        res.status(204).send(); // No content response
    } else {
        res.status(404).send("Resource not found.");
    }
});

// Start the server
app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});