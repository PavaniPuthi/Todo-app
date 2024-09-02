const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const router = express.Router();

router.post('/', (req, res) => {
    const { title, description, status } = req.body;
    const id = uuidv4();
    db.run(
        'INSERT INTO tasks (id, user_id, title, description, status) VALUES (?, ?, ?, ?, ?)',
        [id, req.user.id, title, description, status],
        (err) => {
            if (err) return res.status(500).send('Server error');
            res.status(201).send('Task added');
        }
    );
});

router.get('/', (req, res) => {
    db.all('SELECT * FROM tasks WHERE user_id = ?', [req.user.id], (err, tasks) => {
        if (err) return res.status(500).send('Server error');
        res.json(tasks);
    });
});

router.put('/:id', (req, res) => {
    const { title, description, status } = req.body;
    db.run(
        'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?',
        [title, description, status, req.params.id, req.user.id],
        (err) => {
            if (err) return res.status(500).send('Server error');
            res.send('Task updated');
        }
    );
});

router.delete('/:id', (req, res) => {
    db.run('DELETE FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], (err) => {
        if (err) return res.status(500).send('Server error');
        res.send('Task deleted');
    });
});

module.exports = router;