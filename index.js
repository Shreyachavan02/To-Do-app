import express from 'express';

const app = express();

app.use(express.json());

const TODO_ITEMS = [
  {
    id: 1,
    todoItem: 'Buy groceries',
    priority: 'High',
    emoji: '🛒',
    isdone: false,
    createdAt: '2024-06-01T10:00:00Z',
  },
  {
    id: 2,
    todoItem: 'Attend guest',
    priority: 'High',
    emoji: '🏠',
    isdone: false,
    createdAt: '2024-06-02T12:00:00Z',
  },
  {
    id: 3,
    todoItem: 'Finish project report',
    priority: 'Medium',
    emoji: '📄',
    isdone: false,
    createdAt: '2024-06-03T15:30:00Z',
  },
];

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.get('/todos', (req, res) => {
  res.json({
    success: true,
    data: TODO_ITEMS,
    message: 'To-Do items retrieved successfully',
  });
});

app.post('/todos', (req, res) => {
  const { todoItem, priority, emoji } = req.body;


  const todoObj = {
    id: TODO_ITEMS[TODO_ITEMS.length - 1].id + 1,
    todoItem: todoItem,
    priority: priority,
    emoji: emoji,
    isdone: false,
    createdAt: new Date().toISOString(),
  };
  TODO_ITEMS.push(todoItem);


  res.json({
    success: true,
    data: TODO_ITEMS,
    message: 'To-Do item created successfully',
  });
});


app.get('/todos/:id', (req, res) => {

  const { id } = req.params;

  const todoItem = TODO_ITEMS.find((item) => {
    if (item.id == id) return item;
  });
  if (!todoItem) {
    res.json({
      success: true,
      data: todoItem,
      message: 'To-Do item fetched successfully',
    });
  }
  else {
    res.json({
      success: false,
      message: 'To-Do item not found',
    });
  }
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  const index = TODO_ITEMS.findIndex((item) => item.id == id);

  if (index === -1) {
    res.json({
      success: false,
      message: 'To-Do item deleted successfully',
    });
  }
  else {
    TODO_ITEMS.splice(index, 1);
    res.json({
      success: true,
      message: 'To-Do item deleted successfully',
    });
  }
});




app.listen(8080, () => {
  console.log('✅ Server is running on port 8080');
});