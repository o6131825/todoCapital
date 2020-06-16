const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const account = require('./routes/account');
 
const app = express();

const port = process.env.PORT || 8080;

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.db, { useNewUrlParser: true , useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Вы успешно подключились к БД website');
});

mongoose.connection.on('error', (err) => {
  console.log('Вы не подключились к БД website' + err);
});

app.get('/', (req, res) => {
  res.send('Главная страница');
});

app.use('/account', account);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.listen(port, () => 
console.log(`listening on http://localhost:${port}`)
);


