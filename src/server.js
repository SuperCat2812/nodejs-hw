import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

app.get('/notes/:userId', (req, res) => {
  const { id_params } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${id_params}` });
});

app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: err.message,
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
