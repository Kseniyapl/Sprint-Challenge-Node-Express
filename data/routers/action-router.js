const express = require('express');

const actionDB = require('../helpers/actionModel.js');

const router = express.Router();


const descriptionLengthMiddleware = require("../middleware/descriptionLength");

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

//POST

router.post('/', descriptionLengthMiddleware, async (req, res) => {

  if (!req.body) {
     res.status(400).json({ errorMessage: "Please provide an action." });
 } else {    
     try {
         const action = await actionDB.insert(req.body);
         res.status(201).json(action);
     } catch (err) {
      res.status(500).json({error: "There was an error while saving the action."});
    }
 }


});

//PUT (Update)

router.put('/:id', descriptionLengthMiddleware, async (req, res) => {

  
  try {
      const action = await actionDB.update(req.params.id, req.body);

       if (action) {
          res.status(200).json(action);
      } else {
          res.status(404).json({ message: "The action with the specified ID does not exist." });
      }
  } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({ error: "The action information could not be modified." });
  };
 });


//DELETE

router.delete('/:id', async (req, res) => {
try {
   const action = await actionDB.remove(req.params.id);

    if (action > 0) {
       res.status(200).json({ message: "The action has been removed" });
   } else {
       res.status(404).json({ message: "The action with the specified ID does not exist." });
   }
} catch (error) {
   // log error to database
   console.log(error);
   res.status(500).json({ error: "The action could not be removed" });
}
});


//GET by ID
router.get('/:id', async (req, res) => {
try {

 const action = await actionDB.get(req.params.id);

 if (action) {
   res.status(200).json(action);
} else {
   res.status(404).json({ message: "The action with the specified ID does not exist." });
}
} catch (error) {
// log error to database
console.log(error);
res.status(500).json({ error: "The action could not be retrieved." });
} 
});

module.exports = router;