const express = require('express');

const projectDB = require('../helpers/projectModel.js');

const router = express.Router();


//GET


router.get('/', async (req, res) => {
  try {
      const project = await projectDB.get();
      res.status(200).json(project);
  } catch (error) {
     // log error to database
      console.log(error);
      res.status(500).json({ error: "The project information could not be retrieved." });
  }
});


//


module.exports = router;