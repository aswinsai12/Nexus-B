// src/pages/Board.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button, TextField, Checkbox, Select, MenuItem, FormControl, InputLabel,
  Typography, CircularProgress, Box, Stack, Container, Paper, Grid
} from '@mui/material';
import { api } from './client';

function Board() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTaskText, setNewTaskText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [editedDueDate, setEditedDueDate] = useState('');
  const [editedPriority, setEditedPriority] = useState('medium');
  const [editedCategory, setEditedCategory] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    if (!username) { navigate('/login'); return; }
    const qsUser = encodeURIComponent(username);
    api.get(`/tasks?username=${qsUser}`)
      .then((data) => { setTasks(data); setLoading(false); })
      .catch(() => { toast.error('Failed to load tasks'); setLoading(false); });
  }, [username, navigate]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 1000);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  function handleLogout() {
    localStorage.removeItem('username');
    navigate('/login');
  }

  function validateTaskForm(text, date) {
    if (!text.trim()) { toast.error('Please add task text'); return false; }
    if (text.trim().length < 3) { toast.error('Task text must be at least 3 characters'); return false; }
    if (date && isNaN(Date.parse(date))) { toast.error('Invalid due date'); return false; }
    return true;
  }

  function handleAddTask(e) {
    e.preventDefault();
    if (!validateTaskForm(newTaskText, dueDate)) return;
    const qsUser = encodeURIComponent(username);
    const taskToAdd = { text: newTaskText, completed: false, dueDate: dueDate || null, priority, category };
    api.post(`/tasks?username=${qsUser}`, taskToAdd)
      .then((created) => {
        setTasks((prev) => [...prev, created]);
        setNewTaskText(''); setDueDate(''); setCategory(''); setPriority('medium');
        toast.success('Task added successfully!');
      })
      .catch(() => toast.error('Error adding task'));
  }

  function deleteTask(id) {
    const qsUser = encodeURIComponent(username);
    api.del(`/tasks/${id}?username=${qsUser}`)
      .then(() => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        toast.success('Task deleted successfully!');
      })
      .catch(() => toast.error('Error deleting task'));
  }

  function handleToggleDone(id, completed) {
    const t = tasks.find((x) => x.id === id);
    if (!t) return;
    const qsUser = encodeURIComponent(username);
    api.put(`/tasks/${id}?username=${qsUser}`, {
      text: t.text, completed: !completed, dueDate: t.dueDate || null,
      priority: t.priority || 'medium', category: t.category || ''
    })
      .then((updated) => {
        setTasks((prev) => prev.map((x) => (x.id === id ? updated : x)));
        toast.success(`Task marked as ${!completed ? 'completed' : 'active'}!`);
      })
      .catch(() => toast.error('Error updating task'));
  }

  function startEditing(task) {
    setEditingTaskId(task.id);
    setEditedText(task.text);
    setEditedDueDate(task.dueDate || '');
    setEditedPriority(task.priority || 'medium');
    setEditedCategory(task.category || '');
  }

  function saveEditedTask() {
    if (!validateTaskForm(editedText, editedDueDate)) return;
    const qsUser = encodeURIComponent(username);
    const current = tasks.find((t) => t.id === editingTaskId);
    api.put(`/tasks/${editingTaskId}?username=${qsUser}`, {
      text: editedText,
      completed: current?.completed ?? false,
      dueDate: editedDueDate || null,
      priority: editedPriority,
      category: editedCategory
    })
      .then((updated) => {
        setTasks((prev) => prev.map((t) => (t.id === editingTaskId ? updated : t)));
        setEditingTaskId(null); setEditedText(''); setEditedDueDate(''); setEditedPriority('medium'); setEditedCategory('');
        toast.success('Task updated successfully!');
      })
      .catch(() => toast.error('Error saving edited task'));
  }

  function cancelEditing() {
    setEditingTaskId(null); setEditedText(''); setEditedDueDate(''); setEditedPriority('medium'); setEditedCategory('');
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active' && t.completed) return false;
    if (filter === 'completed' && !t.completed) return false;
    if (!t.text.toLowerCase().includes(debouncedSearch.toLowerCase())) return false;
    return true;
  });

  const getPriorityColor = (p) => (p === 'high' ? '#f44336' : p === 'medium' ? '#ff9800' : p === 'low' ? '#4caf50' : '#9e9e9e');

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">Welcome, {username}</Typography>
        {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>}
        {!loading && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Add New Task</Typography>
                <form onSubmit={handleAddTask}>
                  <TextField label="Task Description" value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} fullWidth required margin="normal" />
                  <TextField label="Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} InputLabelProps={{ shrink: true }} margin="normal" fullWidth />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}><TextField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} margin="normal" fullWidth /></Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Priority</InputLabel>
                        <Select value={priority} label="Priority" onChange={(e) => setPriority(e.target.value)}>
                          <MenuItem value="low">Low</MenuItem>
                          <MenuItem value="medium">Medium</MenuItem>
                          <MenuItem value="high">High</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Add Task</Button>
                </form>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Filter & Search</Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                  <Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={() => setFilter('all')} size="small">All ({tasks.length})</Button>
                  <Button variant={filter === 'active' ? 'contained' : 'outlined'} onClick={() => setFilter('active')} size="small">Active ({tasks.filter(t => !t.completed).length})</Button>
                  <Button variant={filter === 'completed' ? 'contained' : 'outlined'} onClick={() => setFilter('completed')} size="small">Completed ({tasks.filter(t => t.completed).length})</Button>
                </Stack>
                <TextField label="Search tasks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} fullWidth />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Tasks ({filteredTasks.length})</Typography>
                {filteredTasks.length === 0 ? (
                  <Typography color="text.secondary" align="center" sx={{ py: 4 }}>No tasks found. Add your first task above!</Typography>
                ) : (
                  filteredTasks.map((task) => (
                    <Paper key={task.id} elevation={1} sx={{ p: 2, mb: 2, borderLeft: `4px solid ${getPriorityColor(task.priority)}` }}>
                      {editingTaskId === task.id ? (
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={3}><TextField value={editedText} onChange={(e) => setEditedText(e.target.value)} size="small" fullWidth autoFocus required /></Grid>
                          <Grid item xs={12} sm={2}><TextField type="date" value={editedDueDate} onChange={(e) => setEditedDueDate(e.target.value)} size="small" fullWidth InputLabelProps={{ shrink: true }} /></Grid>
                          <Grid item xs={12} sm={2}><FormControl fullWidth size="small"><Select value={editedPriority} onChange={(e) => setEditedPriority(e.target.value)}><MenuItem value="low">Low</MenuItem><MenuItem value="medium">Medium</MenuItem><MenuItem value="high">High</MenuItem></Select></FormControl></Grid>
                          <Grid item xs={12} sm={2}><TextField value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} size="small" fullWidth placeholder="Category" /></Grid>
                          <Grid item xs={12} sm={1}><Stack direction="row" spacing={1}><Button color="primary" onClick={saveEditedTask} size="small" variant="contained">Save</Button><Button color="secondary" onClick={cancelEditing} size="small" variant="outlined">Cancel</Button></Stack></Grid>
                        </Grid>
                      ) : (
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs="auto"><Checkbox checked={task.completed} onChange={() => handleToggleDone(task.id, task.completed)} /></Grid>
                          <Grid item xs>
                            <Typography variant="body1" sx={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'text.secondary' : 'text.primary' }}>{task.text}</Typography>
                            <Typography variant="caption" color="text.secondary">Due: {task.dueDate || 'No date'} | Priority: {task.priority || 'medium'} | Category: {task.category || 'None'}</Typography>
                          </Grid>
                          <Grid item xs="auto"><Stack direction="row" spacing={1}><Button onClick={() => startEditing(task)} size="small" color="primary" variant="text">Edit</Button><Button onClick={() => deleteTask(task.id)} size="small" color="error" variant="text">Delete</Button></Stack></Grid>
                        </Grid>
                      )}
                    </Paper>
                  ))
                )}
              </Paper>
            </Grid>
          </Grid>
        )}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant="outlined" color="secondary" onClick={handleLogout}>Logout</Button>
        </Box>
      </Paper>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Container>
  );
}

export default Board;
