const express = require('express');
const axios = require('axios');
const router = express.Router();

const NASA_API_KEY = process.env.NASA_API_KEY;

router.get('/apod', async (req, res) => {
  const { date } = req.query;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}` +
              (date ? `&date=${date}` : '');

  console.log("Requested date:", date);
  console.log("NASA URL:", url);

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.msg || 'NASA API error';
    console.error(`NASA API Error (${status}):`, message);
    res.status(status).json({ error: message });
  }
});

module.exports = router;