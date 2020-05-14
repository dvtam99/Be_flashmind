require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const router = require('./api');
const app = express();

mongoose.connect(
  `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log('DB connected!');
    } else {
      console.error(err);
    }
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(morgan('common'));

app.use(router);
app.listen(process.env.PORT, () => {
  console.log('App is running ' + process.env.PORT);
});
