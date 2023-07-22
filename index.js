const express = require('express');
const bodyParser = require('body-parser')

//creating express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


const dbConnection = require('./db.connection')
const mongoose = require('mongoose')



const Note = require('./app/models/note.schema');
// const noteSchema = require('./app/models/note.schema');


const dotenv = require('dotenv')
dotenv.config('.env')

dbConnection();




app.listen(4000, () =>{
    console.log("Server is Listening on Port 5000")
})


// app.get('/',(req,res) =>{
//     res.json({"message : " : "Welcome to the Notes Application.Take notes of things which you can't remember . Organize and keep track of all your notes." })
// })

app.get('/',(req,res) => {
    Note.find().then(data => {
        return res.json(data)
    })
})


app.post('/',(req,res) => {
    return res.send('Post Request Sent')
})


app.post('/:title/:content',(req,res) => {
    let title = req.params.title
    let content = req.params.content
    // console.log(title , content)
    const note =  new Note({"Title" : title , "Content" : content })
    // console.log(note)
    note.save()
    .then(r=>{
        return res.send(r)})
    .catch(err => {
        
        return res.send("error")
    })

})

app.post('/add',async(req,res) => {
    let note = new Note(req.body)
    await note.save().then(r=>{
        return res.send(r)
    })
    
})


app.put('/:id' , (req,res) =>{
    const id = req.params.id;
    Note.findByIdAndUpdate(id,req.body).then(data=>{
        return res.json(data)
    })
})

app.delete('/:id' , (req,res) => {
    const id = req.params.id;
    Note.findByIdAndDelete(id,req.body).then(data=>{
        return res.json(data)
    })
    .catch(e =>{
        console.log(e)
    })

})