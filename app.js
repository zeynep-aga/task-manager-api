const express = require('express');
const taskController = require('./src/controllers/taskController');
const validateTask = require('./src/middlewares/validateTask'); // 1. Validation'ı içeri aktardık

const app = express();
const PORT = 3000;

app.use(express.json());

// Temel Logger Middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} isteği geldi -> Endpoint: ${req.url}`);
    next();
});

// Endpoint'ler (Rotalar)
app.get('/tasks', taskController.getAllTasks);
app.get('/tasks/:id', taskController.getTaskById);

// 2. POST ve PUT işlemlerine (veri gelen yerlere) validateTask kalkanını ekledik!
app.post('/tasks', validateTask, taskController.createTask);
app.put('/tasks/:id', validateTask, taskController.updateTask);

app.delete('/tasks/:id', taskController.deleteTask);

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`);
});