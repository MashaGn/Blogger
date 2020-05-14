module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();


  router.post("/", tutorials.create)
        .get("/", tutorials.findAll)

  router.get("/published", tutorials.findAllPublished);


  router.get("/:id", tutorials.findOne)
        .put("/:id", tutorials.update)
        .delete("/:id", tutorials.delete);

  app.use("/api/tutorials", router);
};
