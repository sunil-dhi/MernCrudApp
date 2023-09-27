const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./Models/User')

const app = express()
app.use(cors({
    origin:["https://mern-crud-app-brown.vercel.app"],
    methods:["POST","GET"],
    credentials:true
}))

app.use(express.json())

mongoose.connect('mongodb+srv://crudapp:crudapp@crud1.el02x0i.mongodb.net/?retryWrites=true&w=majority');

app.get('/', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/create', (req, res) => {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        
    }).then(user => res.json(user))
    .catch(err => res.json(err))
})

app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server started");
})
