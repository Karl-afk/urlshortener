const express = require('express')
const router = express.Router()
const Todos = require('../models/todos')



router.get('/', async (req, res) => {
    const todos = await Todos.find()
    console.log(todos)
    res.render('todos', {todos: todos})
})

router.post('/newTodo', async (req, res) => {
    try {
        await Todos.create({todo: req.body.todo})
        res.redirect('/todos')
    } catch (error) {
        console.log(error)
        res.redirect('/todos')
    }   
})

router.post('/editTodo/:id', async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.params.id)
        const todo = await Todos.findById({_id: req.params.id}).exec()
        todo.todo = req.body.todo
        await todo.save()
        res.redirect('/todos')
    } catch (error) {
        console.log(error)
        res.redirect('/todos')
    }
})

router.post('/deleteTodo/:id', async (req, res) => {
    try {
        await Todos.findByIdAndRemove({_id: req.params.id})
        res.redirect('/todos')
    } catch (error) {
        console.log(error)
        res.redirect('/todos')
    }
})

module.exports = router;
// ...

// app.delete("/food/:id", async (request, response) => {
//     try {
//       const food = await foodModel.findByIdAndDelete(request.params.id);
  
//       if (!food) response.status(404).send("No item found");
//       response.status(200).send();
//     } catch (error) {
//       response.status(500).send(error);
//     }
//   });
  
  // ...
  