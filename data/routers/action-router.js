const express = require('express');

const actionDB = require('../helpers/actionModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
      const action = await actionDB.get();
      res.status(200).json(action);
  } catch (error) {
     // log error to database
      console.log(error);
      res.status(500).json({ error: "The action information could not be retrieved." });
  }
});

module.exports = router;