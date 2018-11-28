'use strict';
var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");
var fs = require("fs");
var path = require('path');
//var upload = require("express-fileupload");

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//app.use(upload());
var expressValidator = require('express-validator');

var nodemailer= require('nodemailer');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname,"..","public","cloudQF",req.user.username,"/"));
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({storage: storage}).single('archivo');


var authController = {};

// Restrict access to root page
authController.home = function (req, res) {
  res.render('principal', {
    user: req.user,
    title: 'QuathFiles'
  });
};

// Go to registration page
authController.register = function (req, res) {
  res.render('auth/register');
};

// Post registration
authController.doRegister = function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var passwordConfirmar = req.body.passwordConfirmar;
  /*
    req.checkBody('username', 'Userame no puede ser vacio').notEmpty();
    req.checkBody('email', 'Email no puede ser vacio').isEmail();
    req.checkBody('passwordConfirmar', 'Las contraseñas deben coincidir').equals(password);
  */
  User.register(new User({
    username: username,
    email: email
  }), password, function (err, user) {
    if (err) {
      //console.log('Error de registro(pass)');
      console.log(err);
      return res.redirect('/register', {
        user: user
      });
    } else {
      fs.mkdir(path.join(__dirname,"..","public","cloudQF",username),{recursive: true},function(err){});

      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
    }
  });

};


// Go to login page
authController.login = function (req, res) {
  res.render('auth/login');
};

// Post login
authController.doLogin = function (req, res) {
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    message: req.flash('Lol esta malo')
  })(req, res, function () {
    res.redirect('/');
  });
};

// logout
authController.logout = function (req, res) {
  req.logout();
  res.clearCookie('sessionid', { path: '/' });
  res.redirect('/');
};

authController.Upload = function (req, res) {
  res.render('subir');
};

authController.doUpload = function (req, res) {
  upload(req, res , function(err){
    if(err){

    }
    else{
      res.json(req.file);
    }
  })

  /*if (req.files) {
    console.log(req.files);
    var file = req.files.archivo;
    var nombreArchivo = file.name;
    file.mv((path.join(__dirname,"..","public","cloudQF",req.user.username,nombreArchivo),{recursive: true},function(err){
      
      if(!err){
        //console.log('Subido con exito');
        res.render('principal', {
          user: req.user,
          message: "Subido con exito!",
          title: 'QuathFiles'
        })
      }
    } ));
  }
  */
};

authController.Contact = function(req,res){
  res.render('contact');
}

authController.DoContact = function(req,res){
    const msj=`
    <p>Nueva consulta</p> 
    <h2>Informacion de contacto</h2> 
    <ul> 
      <li>Usuario : ${req.user.username}</li>
      <li>Correo : ${req.user.email}</li>
    </ul>
    <h3>Mensaje: ${req.body.consulta}</h3>
    `;
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false, // true para 465, false cualquier otro
      port: 587,
      auth: {
          user: 'noReplyQuathFiles@gmail.com',
          clientId: '1065612072443-g2d6egj0l6kd1ulj5g56rhn0r3nggm5g.apps.googleusercontent.com',
          clientSecret: 'mBzpuLr__xocWKRK1fxm4vvb',
          pass: 'Quath69Files420'
      },
      tls:{
          rejectUnauthorized: false
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"'+req.user.username+'" <noReplyQuathFiles@gmail.com>',
      to: 'noReplyQuathFiles@gmail.com',
      subject: 'Consulta QhathFiles',
      text: req.body.consulta,
      html: msj
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent'+info);
  });
  res.render('principal',
    {
      message: 'Mensaje enviado con exito, te responderemos lo más pronto posible, gracias por tu apoyo :D',
      user: req.user,
      title: 'QuathFiles'
    });
}

module.exports = authController;