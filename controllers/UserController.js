'use strict';
var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");
var walk = require('walk'); //Para obtener todos los archivos del folder del usuario
var nodemailer= require('nodemailer');

var userController = {};

userController.profile = function (req, res) {
    User.findOne({
        username: req.user.username
    }, function (err, docs) {
        if (err) next(err);
        res.send(docs);
    });
};

userController.misArchivos = function (req, res) {
    var files = [];
    var walker = walk.walk('../public/cloudQF/'+req.user.username, { followLinks: false });

    walker.on('file', function (root, stat, next) {
    //  files.push(root + '/' + stat.name);    root me devuelve la ruta completa, no lo usaré por "seguridad"
        files.push(stat.name);
        next();
    });

    walker.on('end', function () {
        //console.log(files);
        //console.log(files.length);
        res.render('files/misArchivos', {
            user: req.user,
            files: files
        });
    });
}

userController.descargarArchivo = function (req, res) {

    const msj=`
    <h1>Tu descarga está lista!</h1> 
    <h2>Informacion de peticion</h2> 
    <ul> 
      <li>Usuario : ${req.user.username}</li>
      <li>Correo : ${req.user.email}</li>
    </ul>
    <p>Gracías por usar nuestro servicio </p>
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


  let mailOptions = {
      from: '"'+req.user.username+'" <noReplyQuathFiles@gmail.com>',
      to: req.user.email, 
      subject: 'Tu descarga de QuathFiles esta lista',
      html: msj,
      attachments: [
          {
              filename:req.body.nombreArchivo,
              path: '../public/cloudQF/'+req.user.username+'/'+req.body.nombreArchivo
          }
      ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Archivo enviado'+info);
  });
  res.render('principal',
    {
      message: 'Tu descarga estará lista en un momento checa tu correo',
      user: req.user,
      title: 'QuathFiles'
    });
}
module.exports = userController;