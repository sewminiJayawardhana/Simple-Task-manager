const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Enables support for DELETE and PUT requests
app.set('view engine', 'ejs');

// In-memory data store
let tasks = [
    { id: 1, title: "Complete project documentation", status: "pending" },
    { id: 2, title: "Set up development environment", status: "completed" }
];

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Home Page - Show Tasks
app.get('/', (req, res) => {
    res.render('index', { tasks: tasks });
});

// View all tasks
app.get('/tasks', (req, res) => {
    res.render('tasks', { tasks: tasks });
});

// Add a new task
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        status: 'pending'
    };
    tasks.push(newTask);
    res.redirect('/');
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.redirect('/');
});

// Toggle task status
app.post('/tasks/:id/toggle', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = task.status === 'pending' ? 'completed' : 'pending';
    }
    res.redirect('/');
});
