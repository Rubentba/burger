const burger = require("../models/burger")
const express = require("express")

var router = express.Router()


router.get("/", function (req,res) {
    burger.all(function(data) {
      console.log(data);
      
        var handlebarsObj = {
            burgers: data
        }
        console.log(handlebarsObj);
        res.render("index", handlebarsObj)
    })
})

router.post("/api/burgers", function(req, res) {
    burger.create([
      "burgers_name", "devoured"
    ], [
      req.body.burgers_name, req.body.devoured
    ], function(result) {
      res.json({ id: result.insertId })
    })
})

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id
  
    console.log("condition", condition)
  
    burger.update({
      devoured: req.body.devoured
    }, condition, function(result) {
      if (result.changedRows == 0) {

        return res.status(404).end()
      } else {
        res.status(200).end()
      }
    })
  })

module.exports = router