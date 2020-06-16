const express = require('express');
const router = express.Router();
const User = require ('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

let ObjectID = require('mongoose').Types.ObjectID;





router.post('/reg', (req, res) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    login: req.body.login,
    password: req.body.password
  });

User.addUser(newUser, (err, user) =>{
  if(err)
  res.json({success: false, msg:"Пользователь не был добавлен"});
  else
  res.json({success: true, msg:"Пользователь был добавлен!"});
});
});

router.post('/auth', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  User.getUserByLogin(login, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({ success: false, msg: "Пользователь не найден" });

    User.comparePass(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 3600 * 24
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            login: user.login,
            email: user.email
          }
        });
      } else
        return res.json({ success: false, msg: "Пароль не совпадает" });

    })

  });
});

router.get('/dashboard', passport.authenticate('jwt',{session: false}), (req, res) => {
  res.send('Кабинет пользователя');
});




//////////////////////

const Task = require ('../models/task');

router.post('/task', (req, res) => {
  let newTask = new Task({
    name: req.body.name,
    descr: req.body.descr,
    toUser: req.body.toUser,
    taskDonne: false
  });

Task.addTask(newTask, (err, task) =>{
  if(err)
  res.json({success: false, msg:"Task не был добавлен"});
  else
  res.json({success: true, msg:"Task был добавлен!"});
});
});

//////////////////////////




// router.get('/tasklist', function(req, res) {
//   Task.find(function (err, task) {
//       if (err) return next(err);
//       res.json(task);
//   });
// });


// get data by id
router.get('/tasklist/:id', function(req, res, next) {
  Task.findById(req.params.id, function (err, task) {
      if (err) return next(err);
      res.json(task);
  });
});

// put data


// router.put('/tasklist/:id', function(req, res, next) {



//   Task.findById(req.params.id, function (err, task) {
//     if (err) return next(err);
    
//     res.json ({
//       _id: task._id,
//       name: task.name,
//       descr: task.descr,
//       toUser: task.toUser,
//       taskDonne: !task.taskDonne,
//       __v: 0
//   })
// });
// });


router.put('/tasklist/:id', function (req, res, next) {
  Task.findById(req.params.id, function (err, task) {
    if (err) return next(err);



    const note = {
            _id: task._id,
            name: task.name,
            descr: task.descr,
            toUser: task.toUser,
            taskDonne: !task.taskDonne,
            __v: 0
        };
    Task.update({_id: task._id}, note, (err, result) => {
      if (err) return next(err);
      res.send(note);

    });




  });

  
});




router.get('/tasklist', function(req, res) {
  
  Task.find({})
  .then(function(task){
    res.json(task);
  })
  .catch(function(error){
    console.log("There was error retrieving task" + error);
  });
});


//выбрать пользователей
router.get('/task', function(req, res) {
  User.find(
    function (err, user) {
      if (err) return next(err);
      res.json(user);
  });
});

/////////////////////////

module.exports = router;
