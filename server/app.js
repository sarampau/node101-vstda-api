const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

let mockData = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({status: 'ok'});
});

app.get('/api/TodoItems', (req, res) => {
    res.send(mockData);
});

app.get('/api/TodoItems/complete', (req, res) => {
    let complete = [];
    for (let i = 0; i < mockData.length; i++) {
        if (mockData[i].completed == true) {
            complete.push(mockData[i]);
        }
    }
    res.send(complete);
});

app.get('/api/TodoItems/incomplete', (req, res) => {
    let incomplete = [];
    for (let i = 0; i < mockData.length; i++) {
        if (mockData[i].completed == false) {
            incomplete.push(mockData[i]);
            continue;
        }
        res.send(incomplete);
    }
})

app.get('/api/TodoItems/:id', (req, res) => {
    let id = req.params.id;
    for (let i = 0; i < mockData.length; i++) {
        if (mockData[i].todoItemId == id) {
            res.send(mockData[i]);
        }
    }
});

app.post('/api/TodoItems', (req, res) => {
    let newTodo = req.body;
    mockData.push(req.body);
    res.status(201).json(req.body);
});

app.put('/api/TodoItems', (req, res) => {
    let newTodo = req.body;
    for (let i = 0; i < mockData.length; i++) {
        if (newTodo.todoItemId == mockData[i].todoItemId) {
            res.json(mockData.splice(i, 1, newTodo));
        }
    }
});

app.delete('/api/TodoItems/:id', (req, res) => {
    let id = req.params.id;
    for (let i = 0; i < mockData.length; i++) {
        if (mockData[i].todoItemId == id) {
            res.json(mockData.splice(i, 1)[0])
        }
    }
});

module.exports = app;
