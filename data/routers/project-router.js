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


//POST

router.post('/', async (req, res) => {

  if (!req.body.name) {
     res.status(400).json({ errorMessage: "Please provide a project" });
 } else {    
     try {
         const project = await projectDB.insert(req.body);
         res.status(201).json(project);
     } catch (err) {
      res.status(500).json({error: "There was an error while saving the post to the database."});
    }
 }


});



module.exports = router;