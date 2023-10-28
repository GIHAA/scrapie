const express = require('express');
const multer = require('multer');
const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let model;

async function loadModel() {
  model = await mobilenet.load();
  console.log('Model loaded');
}

app.use(express.json());

app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    if (!model) {
      await loadModel();
    }

    const buffer = req.file.buffer;
    const tfImage = tf.node.decodeImage(buffer);
    const predictions = await model.classify(tfImage);

    res.json(predictions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

app.get('/hi', async (req, res) => {
  res.status(200).json({ res: 'hello' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});