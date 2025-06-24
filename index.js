const express = require('express');
// const bodyParser =  require('body-parser');
const app = express();
const port = 3001;

app.use(express.json());

let users = [];
let idCounter = 1;

app.post('/users',(req,res) => {
    const {name,email} = req.body;
    const newUser = { id:idCounter++,name,email};
    users.push(newUser);
    res.status(201).json(newUser);
});

app.get('/users', (req,res) => {
    res.json(users);
});

app.put('/users/:id', (req, res) => {
    const userID = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = users.find(u => u.id === userID);
    if (!user) 
        return res.status(404).json({ message: "User Not Found" });

    user.name = name || user.name;
    user.email = email || user.email;
    res.json(user);
});


app.delete('/users/:id',(req,res) => {
    const userID = parseInt(req.params.id);
    users = users.filter(u => u.id !== userID);
    res.json({ message: "user deleted"});
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})


