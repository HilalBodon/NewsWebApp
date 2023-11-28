const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', true);

const CONNECTION_URL = process.env.DB;
const PORT = process.env.PORT || 8080;

app.use('/api', postsRouter);
app.use('/api/auth', authRouter);

app.listen (console.log(`Listening on port ${PORT}...`));

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.error(error.message));
