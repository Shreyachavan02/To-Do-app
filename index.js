import express from 'express';

const app = express();

const TODO_ITEMS = [
  { id: 1, task: 'finish icp assignment' },
  { id: 2, task: 'go to college' },
  { id: 3, task: 'Read a book' },
];
 app.get('/todos', (req, res) => {
   res.json(TODO_ITEMS);
 }

app.listen(8080, () => {
  console.log('Server is running on port 3000');
});
