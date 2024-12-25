const express = require('express');
const app = express();
const PORT = 3000;

// Middleware untuk memparsing JSON
app.use(express.json());

// Penyimpanan data di memori
let tasks = [];
let idCounter = 1;

// Route untuk membuat tugas baru (POST /tasks)
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Judul dan deskripsi harus diisi' });
  }
  const newTask = {
    id: idCounter++,
    title,
    description,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Route untuk mendapatkan semua tugas (GET /tasks)
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Route untuk mendapatkan tugas berdasarkan ID (GET /tasks/:id)
app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(task => task.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ error: 'Tugas tidak ditemukan' });
  }
  res.json(task);
});

// Route untuk mengupdate tugas berdasarkan ID (PUT /tasks/:id)
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tugas tidak ditemukan' });
  }

  const updatedTask = { ...tasks[taskIndex], title, description, completed };
  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// Route untuk menghapus tugas berdasarkan ID (DELETE /tasks/:id)
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tugas tidak ditemukan' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});