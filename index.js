import express from 'express';

const app = express();

app.use(express.json());



const TODO_ITEMS = [
  {
    id: 1,
    task: 'Buy groceries',
    priority: 'High',
    emoji: '🛒',
    isdone: false,
    createdAt: '2024-06-01T10:00:00Z',
  },
  {
    id: 2,
    task: 'Attend guest',
    priority: 'high',
    emoji: '🏠',
    isdone: false,
    createdAt: '2024-06-02T12:00:00Z',
  },
  {
    id: 3,
    task: 'Finish project report',
    priority: 'Medium',
    emoji: '📄',
    isdone: false,
    createdAt: '2024-06-03T15:30:00Z',
  },
];

app.get('/todos', (req, res) => {
  res.json({
    success: true,
    data: TODO_ITEMS,
    message: 'To-Do items retrieved successfully',
  });
});
app.post("/todos", (req, res) => {
  const { todoItem, priority, emoji } = req.body;

const todoObj= {
  id: TODO_ITEMS[TODO_ITEMS.length -1].id +1,
  task: todoItem,
  priority: priority,
  emoji: emoji,
  isdone: false,
  createdAt: new Date().toISOString(),
};

  TODO_ITEMS.push(todoObj);

  res.json({
    success: true,
    data: todoObj,
    message: "Todo item added successfully"
  });
});

app.get("/todos/:id", (req, res) => {
  
const { id } = req.params; 

const todoItem = TODO_ITEMS.find((item) => {
 if(item.id == id) return item;
});
if(todoItem){
  res.json({
    success: true,
    data: todoItem,
    message: "Todo item fetched successfully",
  });
}
else {
  res.json({
    success: false,
    data: null, 
    message: "Todo item not found",
});
}
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const index = TODO_ITEMS.findIndex((item) => item.id == id);

  if (index === -1) {
    res.json({
      success: false,
      message: "Todo item not found",
    });
  } 
  else {
    TODO_ITEMS.splice(index, 1);
    res.json({
      success: true,
      message: "Todo item deleted successfully",
    });
  }
});
app.listen(8080, () => {
  console.log('✅ Server is running on port 8080');
});
