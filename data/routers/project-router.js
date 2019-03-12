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
      res.status(500).json({error: "There was an error while saving the project."});
    }
 }


});

//PUT (Update)

router.put('/:id', async (req, res) => {

  
     try {
         const project = await projectDB.update(req.params.id, req.body);

          if (project) {
             res.status(200).json(project);
         } else {
             res.status(404).json({ message: "The project with the specified ID does not exist." });
         }
     } catch (error) {
         // log error to database
         console.log(error);
         res.status(500).json({ error: "The project information could not be modified." });
     };
    });


 //DELETE

 router.delete('/:id', async (req, res) => {
  try {
      const project = await projectDB.remove(req.params.id);

       if (project > 0) {
          res.status(200).json({ message: "The project has been removed" });
      } else {
          res.status(404).json({ message: "The project with the specified ID does not exist." });
      }
  } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({ error: "The project could not be removed" });
  }
});


//GET by ID
router.get('/:id', async (req, res) => {
  try {

    const project = await projectDB.get(req.params.id);

    if (project) {
      res.status(200).json(project);
  } else {
      res.status(404).json({ message: "The project with the specified ID does not exist." });
  }
} catch (error) {
  // log error to database
  console.log(error);
  res.status(500).json({ error: "The project could not be retrieved." });
} 
});

//Get Projects Actions 

router.get("/:id/actions", async (req, res) => {
    const id= req.params.id;
    try {
        if (id) {
            const projectActions = await projectDB.getProjectActions(id);
            if (projectActions) {
                res.status(200).json(projectActions);
            }
        }
        else {
            res.status(404).json('There is no project with that ID.')
        }
    } catch (err) {
      res.status(500).json({ message: "Could not retrieve the project actions." });
    }
  });

module.exports = router;