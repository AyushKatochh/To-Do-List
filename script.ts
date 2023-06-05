// Importing modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Item from './models/Item';
import cors from 'cors';

const app = express();
const port = 8000;

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://ayush2002:ayush2002@cluster0.gvgmwk2.mongodb.net/?retryWrites=true&w=majority', {
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Failed to fetch items:', error);
    res.status(500).send('Failed to fetch items');
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item({
      text: req.body.text,
      done: false,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Failed to add item:', error);
    res.status(500).send('Failed to add item');
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).send('Item not found');
      return;
    }
    item.done = req.body.done;
    await item.save();
    res.sendStatus(200);
  } catch (error) {
    console.error('Failed to update item:', error);
    res.status(500).send('Failed to update item');
  }
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
