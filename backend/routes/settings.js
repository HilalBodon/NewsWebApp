const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');


router.get('/settings', async (req, res) => {
    try {
      const settings = await Setting.findOne();
      res.json(settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  router.post('/settings', async (req, res) => {
    const { showNewsTicker, showVideo, videoLink } = req.body;
    console.log('Received data:', { showNewsTicker, showVideo, videoLink });
  
    try {
      await Setting.findOneAndUpdate({}, { showNewsTicker, showVideo, videoLink }, { upsert: true });
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating settings:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

  module.exports = router;
