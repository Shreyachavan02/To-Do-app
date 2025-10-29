import cors from 'cors'; 
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const TODO_ITEMS = [
  {
    id: 1,
    todoItem: 'Buy groceries',
    priority: 'High',
    emoji: '🛒',
    isDone: false,
    createdAt: '2024-06-01T10:00:00Z',
  },
  {
    id: 2,
    todoItem: 'Attend guest',
    priority: 'High',
    emoji: '🏠',
    isDone: false,
    createdAt: '2024-06-02T12:00:00Z',
  },
  {
    id: 3,
    todoItem: 'Finish project report',
    priority: 'Medium',
    emoji: '📄',
    isDone: false,
    createdAt: '2024-06-03T15:30:00Z',
  },
];

// ✅ HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

// ✅ GET ALL TODOS
app.get('/todos', (req, res) => {
  res.json({
    success: true,
    data: TODO_ITEMS,
    message: 'To-Do items retrieved successfully',
  });
});

// ✅ ADD NEW TODO
app.post("/todos", (req, res) => {
  const { todoItem, priority, emoji } = req.body;

  if (!todoItem || !priority || !emoji) {
    return res.json({
      success: false,
      message: "Missing fields in request body",
    });
  }

  const todoObj = {
    id: TODO_ITEMS.length ? TODO_ITEMS[TODO_ITEMS.length - 1].id + 1 : 1,
    todoItem,
    priority,
    emoji,
    isDone: false,
    createdAt: new Date().toISOString(),
  };

  TODO_ITEMS.push(todoObj);

  res.json({
    success: true,
    data: todoObj,
    message: "Todo item added successfully",
  });
});

// ✅ SEARCH TODOS
app.get("/todos/search", (req, res) => {
  const { item = "", priority = "" } = req.query;

  const filteredItems = TODO_ITEMS.filter((itemObj) => {
    return (
      itemObj.todoItem?.toLowerCase().includes(item.toLowerCase()) &&
      (priority ? itemObj.priority === priority : true)
    );
  });

  res.json({
    success: true,
    data: filteredItems,
    message: "Filtered todo items fetched successfully",
  });
});

// ✅ GET TODO BY ID
app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todoItem = TODO_ITEMS.find((item) => item.id == id);

  if (todoItem) {
    res.json({
      success: true,
      data: todoItem,
      message: "Todo item fetched successfully",
    });
  } else {
    res.json({
      success: false,
      data: null,
      message: "Todo item not found",
    });
  }
});

// ✅ DELETE TODO
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const index = TODO_ITEMS.findIndex((item) => item.id == id);

  if (index === -1) {
    return res.json({
      success: false,
      message: "Todo item not found",
    });
  }

  TODO_ITEMS.splice(index, 1);

  res.json({
    success: true,
    message: "Todo item deleted successfully",
  });
});

// ✅ UPDATE STATUS
app.patch("/todos/:id/status", (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;

  const index = TODO_ITEMS.findIndex((item) => item.id == id);

  if (index === -1) {
    return res.json({
      success: false,
      message: "Todo item not found",
    });
  }

  TODO_ITEMS[index].isDone = isDone;

  res.json({
    success: true,
    data: TODO_ITEMS[index],
    message: "Todo status updated successfully",
  });
});

// ✅ UPDATE ENTIRE TODO
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { todoItem, priority, emoji, isDone } = req.body;

  const index = TODO_ITEMS.findIndex((item) => item.id == id);

  if (index === -1) {
    return res.json({
      success: false,
      message: "Todo item not found",
    });
  }

  const updatedTodo = {
    ...TODO_ITEMS[index],
    todoItem,
    priority,
    emoji,
    isDone,
  };

  TODO_ITEMS[index] = updatedTodo;

  res.json({
    success: true,
    data: updatedTodo,
    message: "Todo item updated successfully",
  });
});

// ✅ START SERVER
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
