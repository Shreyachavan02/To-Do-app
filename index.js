
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


app.get("/todos/search", (req, res) => {
console.log(req.query);

const { item, priority} = req.query;

const filteredItems = TODO_ITEMS.filter((itemObj) => {
if(itemObj.todoItem.toLowerCase().includes(item.toLowerCase()) && itemObj.priority == priority){
  return true;
}
return false;

});
  res.json({
    success: true,
    data: filteredItems,
    message: "Filtered todo items fetched successfully",
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

app.patch("/todos/:id/status", (req, res) => {
const { id } = req.params;
const index = TODO_ITEMS.findIndex((item) => item.id == id);
const { isDone } = req.body;

if(index === -1){
  res.json({
    success: false,
    message: "Todo item not found",
  });
}
else {
  TODO_ITEMS[index].isDone = isDone;
  res.json({
    success: true,
    data: TODO_ITEMS[index],
    message: "Todo item updated successfully",
  });
}
});

app.put("/todos/:id", (req, res) => {
const { id } = req.params;

const index = TODO_ITEMS.findIndex((item) => item.id == id);

if(index == -1){
  return res.json({
    success: false,
    message: "Todo item updated successfully",
  });
}
const { todoItem, priority, emoji, isDone } = req.body;

const newObj={
  todoItem,
  priority,
  isDone,
  emoji,
  id: TODO_ITEMS[index].id,
  createdAt: TODO_ITEMS[index].createdAt,

};
TODO_ITEMS[index] = newObj;
res.json({
  success: true,
  data: newObj,
  message: "Todo item updated successfully",
});

});

const PORT = process.env.PORT || 8080;
app.listen( PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});