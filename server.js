const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.set('json spaces', 2);

const SECRETKEY = 'I want to pass COMPS381F';

app.use(session({
  name: 'loginSession',
  keys: [SECRETKEY]
}));

app.use(bodyParser.json());
app.set('json spaces', 2); // Format JSON data with two spaces
app.use(bodyParser.urlencoded({ extended: true }));

//mongoose.connect('mongodb+srv://<user>:<password>@cluster0.0902v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
mongoose.connect('mongodb+srv://user:123@cluster0.tqlv0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const todoSchema = new mongoose.Schema({
  task: String,
  description: String,
  completed: Boolean
});
const ToDo = mongoose.model('ToDo', todoSchema);

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.status(200).render('login', {});
});

app.post('/login', (req, res) => {
  const users = [{ name: 'admin', password: '123' }];
  users.forEach((user) => {
    if (user.name === req.body.name && user.password === req.body.password) {
      req.session.authenticated = true;
      req.session.username = req.body.name;
    }
  });
  res.redirect('/loggedAdmin');
});

app.get('/loggedAdmin', (req, res) => {
  if (req.session.authenticated) {
    res.render('loggedAdmin', { name: req.session.username });
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
});

app.post('/logout', (req, res) => {
    // Here you would typically clear the user's session or cookie
    // req.session.destroy(); if you're using express-session
    // res.clearCookie('cookieName'); if you're managing sessions through cookies
    res.redirect('/login'); // Redirect to login page after logout
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await ToDo.find({});
    res.render('todos', { todos });
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
});

app.post('/createTodo', (req, res) => {
  const newTodo = new ToDo({
    task: req.body.task,
    description: req.body.description,
    completed: false
  });
  newTodo.save().then(() => res.redirect('/todos'));
});

app.get('/editTodo/:id', async (req, res) => {
  try {
    const todo = await ToDo.findById(req.params.id);
    res.render('editTodo', { todo });
  } catch (err) {
    console.error(err);
    res.status(500).send('no response');
  }
});

app.post('/updateTodo/:id', async (req, res) => {
  try {
    await ToDo.findByIdAndUpdate(req.params.id, {
      task: req.body.task,
      description: req.body.description,
      completed: req.body.completed === 'on'
    });
    res.redirect('/todos');
  } catch (err) {
    console.error(err);
    res.status(500).send('no response');
  }
});

app.post('/deleteTodo/:id', async (req, res) => {
  try {
    await ToDo.findByIdAndDelete(req.params.id);
    res.redirect('/todos');
  } catch (err) {
    console.error(err);
    res.status(500).send('no response error');
  }
});

app.get('/searchTodos', async (req, res) => {
  const query = {};
  if (req.query.query) query.task = new RegExp(req.query.query, 'i');
  if (req.query.completed) query.completed = req.query.completed === 'true';

  try {
    const todos = await ToDo.find(query);
    res.render('todos', { todos });
  } catch (err) {
    console.error("Can't search error", err);
    res.status(500).send('error');
  }
});

// Create (POST) API
app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new ToDo({
      task: req.body.task,
      description: req.body.description,
      completed: false
    });
    await newTodo.save();
    res.status(201).json(newTodo); // Return created item
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to create task' });
  }
});

// Read (GET) API
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await ToDo.find({});
    res.json(todos); // Return all tasks
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to retrieve tasks' });
  }
});

// Update (PUT) API
app.put('/api/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await ToDo.findByIdAndUpdate(
      req.params.id,
      {
        task: req.body.task,
        description: req.body.description,
        completed: req.body.completed
      },
      { new: true } // Return updated document
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTodo); // Return updated item
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to update task' });
  }
});

// Delete (DELETE) API
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await ToDo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted' }); // Return delete success message
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to delete task' });
  }
});

app.listen(8099, () => {
  console.log('Server is running on port 8099');
});

