const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const history = require('connect-history-api-fallback')

const app = express();

const staticFile = express.static(path.join(__dirname, 'public', '/'))
//const clientPath = path.join(__dirname, 'public');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: true }))
   .use(staticFile)
   .use(history({
     disableDotRule:true,
     verbose:true
   }))

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


require("./app/routes/router")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
