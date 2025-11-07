import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Sample To-Do data
const TODO_ITEMS = [
  {
    id: 1,
    todoItem: "Buy groceries",
    priority: "High",
    emoji: "🛒",
    isDone: false,
    createdAt: "2024-06-01T10:00:00Z",
  },
  {
    id: 2,
    todoItem: "Attend guest",
    priority: "High",
    emoji: "🏠",
    isDone: false,
    createdAt: "2024-06-02T12:00:00Z",
  },
  {
    id: 3,
    todoItem: "Finish project report",
    priority: "Medium",
    emoji: "📄",
    isDone: false,
    createdAt: "2024-06-03T15:30:00Z",
  },
];

// ✅ Health route
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

// ✅ Get all todos
app.get("/todos", (req, res) => {
  res.json({
    success: true,
    data: TODO_ITEMS,
    message: "To-Do items retrieved successfully",
  });
});

// ✅ Create a new todo
app.post("/todos", (req, res) => {
  const { todoItem, priority, emoji } = req.body;

  if (!todoItem || !priority || !emoji) {
    return res.json({
      success: false,
      message: "Please provide todoItem, priority, and emoji",
    });
  }

  const todoObj = {
    id: TODO_ITEMS.length > 0 ? TODO_ITEMS[TODO_ITEMS.length - 1].id + 1 : 1,
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
    message: "To-Do item created successfully",
  });
});

// ✅ Search todos by item and priority
app.get("/todos/search", (req, res) => {
  const { item = "", priority = "" } = req.query;

  const filteredItems = TODO_ITEMS.filter(
    (itemObj) =>
      itemObj.todoItem.toLowerCase().includes(item.toLowerCase()) &&
      itemObj.priority.toLowerCase() === priority.toLowerCase()
  );

  res.json({
    success: true,
    data: filteredItems,
    message: "Filtered To-Do items retrieved successfully",
  });
});

// ✅ Get todo by ID
app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todoItem = TODO_ITEMS.find((item) => item.id == id);

  if (!todoItem) {
    return res.json({
      success: false,
      message: "To-Do item not found",
    });
  }

  res.json({
    success: true,
    data: todoItem,
    message: "To-Do item fetched successfully",
  });
});

// ✅ Delete todo by ID
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const index = TODO_ITEMS.findIndex((item) => item.id == id);

  if (index === -1) {
    return res.json({
      success: false,
      message: "To-Do item not found",
    });
  }

  TODO_ITEMS.splice(index, 1);

  res.json({
    success: true,
    message: "To-Do item deleted successfully",
  });
});

// ✅ Update status of a todo (mark done/undone)
app.patch("/todos/:id/status", (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;

  const index = TODO_ITEMS.findIndex((item) => item.id == id);

  if (index === -1) {
    return res.json({
      success: false,
      message: "To-Do item not found",
    });
  }

  TODO_ITEMS[index].isDone = isDone;

  res.json({
    success: true,
    data: TODO_ITEMS[index],
    message: "To-Do item status updated successfully",
  });
});

// ✅ Full update (PUT)
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const index = TODO_ITEMS.findIndex((item) => item.id == id);

  if (index === -1) {
    return res.json({
      success: false,
      message: "To-Do item not found",
    });
  }

  const { todoItem, priority, isDone, emoji } = req.body;

  const newObj = {
    id: TODO_ITEMS[index].id,
    todoItem: todoItem || TODO_ITEMS[index].todoItem,
    priority: priority || TODO_ITEMS[index].priority,
    isDone: isDone ?? TODO_ITEMS[index].isDone,
    emoji: emoji || TODO_ITEMS[index].emoji,
    createdAt: TODO_ITEMS[index].createdAt,
  };

  TODO_ITEMS[index] = newObj;

  res.json({
    success: true,
    data: newObj,
    message: "To-Do item updated successfully",
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
