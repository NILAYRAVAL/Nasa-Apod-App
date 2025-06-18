const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const nasaRoutes = require('./routes/nasa');
app.use('/api/nasa', nasaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});