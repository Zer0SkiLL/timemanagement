import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Divider, Typography, Box, IconButton, TextField, Button } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import styles from './TasksCard.module.css';

const TaskCard = () => {
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'FIN-1234',
      tasks: [
        { id: 1, name: 'Task 1', completed: false },
        { id: 2, name: 'Task 2', completed: true },
        { id: 3, name: 'Task 3', completed: false },
      ],
    },
    {
      id: 2,
      name: 'FIN-2345',
      tasks: [
        { id: 4, name: 'Task 4', completed: true },
        { id: 5, name: 'Task 5', completed: false },
      ],
    },
  ]);
  const [newTasks, setNewTasks] = useState({});

  const handleTaskCompletion = (categoryId, taskId) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        const updatedTasks = category.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });
        return { ...category, tasks: updatedTasks };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCategoryId = categories.length + 1;
      const newCategoryObj = {
        id: newCategoryId,
        name: newCategory,
        tasks: [],
      };
      setCategories([...categories, newCategoryObj]);
      setNewCategory('');
    }
  };

  const handleAddTask = (categoryId) => {
    if (newTasks[categoryId] && newTasks[categoryId].trim()) {
      const updatedCategories = categories.map((category) => {
        if (category.id === categoryId) {
          const newTaskId = category.tasks.length + 1;
          const newTaskObj = {
            id: newTaskId,
            name: newTasks[categoryId],
            completed: false,
          };
          return { ...category, tasks: [...category.tasks, newTaskObj] };
        }
        return category;
      });
      setCategories(updatedCategories);
      setNewTasks({ ...newTasks, [categoryId]: '' });
    }
  };

  const handleTaskInputChange = (categoryId, value) => {
    setNewTasks({ ...newTasks, [categoryId]: value });
  };

  const handleCategoryKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCategory();
    }
  };

  const handleTaskKeyPress = (e, categoryId) => {
    if (e.key === 'Enter') {
      handleAddTask(categoryId);
    }
  };

  const getTaskInputClass = (categoryId) => {
    const taskContent = newTasks[categoryId] || '';
    return taskContent.length > 20 ? 'task-input-large' : 'task-input';
  };

  return (
    <Card style={{ width: '100%', minHeight: 'auto', display: 'flex', flexDirection: 'column' }}>
        <CardHeader
            title="Tasks"
        />
        <Divider sx={{ my: 1 }} />
      <CardContent style={{ flexGrow: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {categories.map((category) => (
            <Box key={category.id} style={{ marginBottom: '1rem' }}>
              <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                {category.name}
              </Typography>
              {category.tasks.map((task) => (
                <Box key={task.id} style={{ marginLeft: '1rem' }} className={styles['task-name-large']}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleTaskCompletion(category.id, task.id)}
                  />
                  <label style={{ marginLeft: '0.5rem' }}>{task.name}</label>
                </Box>
              ))}
              <Box style={{ marginLeft: '1rem' }}>
                <TextField
                  type="text"
                  placeholder="Task"
                  value={newTasks[category.id] || ''}
                  onChange={(e) => handleTaskInputChange(category.id, e.target.value)}
                  onKeyDown={(e) => handleTaskKeyPress(e, category.id)}
                  className={`${styles[getTaskInputClass(category.id)]}`}
                />
                <IconButton size="small" color="primary" onClick={() => handleAddTask(category.id)}>
                  <AddCircle />
                </IconButton>
              </Box>
            </Box>
          ))}
        </div>
        <Box style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={handleCategoryKeyPress}
          />
          <Button variant="contained" color="primary" onClick={handleAddCategory} style={{ marginTop: '0.5rem' }}>
            Add Category
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
