'use strict';
var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");
var fs = require("fs");
var upload = require("express-fileupload");

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(upload());
var expressValidator = require('express-validator');

var nodemailer= require('nodemailer');
var xoauth2= require('xoauth2');

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
      return res.render('auth/register', {
        user: user
      });
    } else {

      passport.authenticate('local')(req, res, function () {
        fs.mkdirSync('../public/cloudQF/' + username);
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

  if (req.files) {
    console.log(req.files);
    var file = req.files.archivo;
    var nombreArchivo = file.name;
    file.mv("../public/cloudQF/" + req.user.username + "/" + nombreArchivo, function (err) {
      if (err) {
        res.send('error ocurred');
        throw err;
      }
      console.log('Subido con exito');
    })
  }
  res.render('principal',
    {
      message: 'Archivo subido con exito',
      user: req.user,
      title: 'QuathFiles'
    });
};

authController.Contact = function(req,res){
  res.render('contact');
}

authController.DoContact = function(req,res){
  var transporter= nodemailer.createTransport({
    service: 'gmail',
    auth:{
      xoauth2: xoauth2.createXOAuth2Generator({
        user: 'noReplyQuathFiles@gmail.com',
        clientId:'1065612072443-luev8gsig1ck2u80o73b4lofiktv5pso.apps.googleusercontent.com',
        clientSecret:'uiRxiZd_UMCtQSZB_eERTbzS',
        refreshToken:''
      })
    }
  })
  var mailOptions = {
    from: req.user.username+' <foo@example.com>', // sender address
    to: 'noReplyQuathFiles@gmail.com', // list of receivers
    subject: 'Consulta', // Subject line
    text: req.body.consulta, // plain text body
    html: '<b>'+req.body.consulta+'</b>' // html body
  };
  transporter.sendMail(mailOptions, (error, res) => {
    if (error) {
        return console.log(error);
    }
    console.log('Mensaje enviado');
  
  res.render('principal',
    {
      message: 'Comentario subido con exito',
      user: req.user,
      title: 'QuathFiles'
  });
});
}

module.exports = authController;