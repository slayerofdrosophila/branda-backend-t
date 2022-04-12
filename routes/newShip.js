const express = require("express");
const router = express.Router();
let Ship = require("../models/Ship");

/**
 * tell Express.js that when it receives a POST request at the URL /newShip/, to do this code.
 */
router.post("/newShip/", function(req, res){
  // look up documents in MongoDB by name.
  Ship.findOne({name: req.body.name}, function(error,doc){
    // if there was an error
    if(error){
      console.error("Error finding ship",error);
      res.status(500).send(error);
    }
    // if no document was found
    else if(!doc){
      // create a new instance of the Ship model, using the request body as the data.
      new Ship(req.body).save((err, doc) => {
        /**
         * this error/document fat-arrow function is required.
         * on an error, handle it. else send the newly created document back to the client.
         */
        if(err){
          console.error("Error saving new ship",err);
          res.status(500).send(err);
        }
        else{
          res.send(doc);
        }
      });
    }
    // a document was found, return it instead.
    else{
      res.send(doc);
    }
  });
});

router.get("getShip/:name", function(req, res){
  if(error){
    res.status(500).send(error)
  }
  else{
    let foundShip = await DB.findOne({name:req.params.name})
    if (foundShip != undefined){
      res.json(foundShip)
    } else{
      res.sendStatus(404);
    }
  }
})

router.get("getShip/:secondaryBattery", function(req, res){
  if(error){
    res.status(500).send(error)
  }
  else{
    let foundShips = await DB.find({secondaryBattery:req.params.secondaryBattery})
    if (foundShips != undefined){
      res.json(foundShips)
    } else{
      res.sendStatus(404);
    }
  }
})

router.patch("updateShip", function(req, res){
  if(error){
    res.status(500).send(error)
  }
  else{
    if (req.name === undefined){
      res.status(400)
    }
    let foundShip = await DB.findOne({name:req.body.name})
    if (foundShip != undefined){
      const filter = {name: req.body.name}
      const changes = {}
      for (let key of Object.keys(req.body)){
        changes[key] = req.body.key
      }
      let result = await DB.findOneAndUpdate(filter, changes, {new: true})
      if (result !== req.body){
        res.sendStatus(500)
      }
      res.json(foundShips)
    } else{
      res.sendStatus(404);
    }
  }
})


module.exports = router;