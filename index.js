const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());

let users = [];
let idCounterRef = {value: 1};

// app.post('/users',(req,res) => {
//     const {name,email} = req.body;
//     if(!name || !email){
//         return res.status(400).json({message: "Pls enter name and email"});
//     }
//     const isDuplicate = users.some( user => user.name === name || user.email === email);
//     if(isDuplicate){
//         return res.status(409).json({message: "Name or email already exists"});
//     }
//     const newUser = { id:idCounter++,name,email };
//     users.push(newUser);
//     res.status(201).json(newUser);
// });

// app.get('/all-users', (req,res) => {
//     res.json(users);
// });

// app.put('/users/:id', (req, res) => {
//     const userID = parseInt(req.params.id);
//     const { name, email } = req.body;
//     const user = users.find(u => u.id === userID);
//     if (!user) 
//         return res.status(404).json({ message: "User Not Found" });

//     user.name = name || user.name;
//     user.email = email || user.email;
//     res.json(user);
// });


// app.delete('/users/:id',(req,res) => {
//     const userID = parseInt(req.params.id);
//     users = users.filter(u => u.id !== userID);
//     res.json({ message: "user deleted"});
// });

const postUserRoute = require('./routes/postUser')(users,idCounterRef);
const getAllUsersRoute = require('./routes/getAllUsers')(users);
const updateUserRoute = require('./routes/updateUser')(users);
const deleteUserRoute = require('./routes/deleteUser')(users);

app.use(postUserRoute);
app.use(getAllUsersRoute);
app.use(updateUserRoute);
app.use(deleteUserRoute);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


