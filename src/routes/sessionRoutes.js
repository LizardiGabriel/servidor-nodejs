const Router = require('express');
const express = require('express');

var session = require('express-session');
var escapeHtml = require('escape-html');

const router = Router();


router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
  
  // middleware to test if authenticated
  function isAuthenticated (req, res, next) {
    if (req.session.user) next()
    else next('route')
  }
  
  router.get('/', isAuthenticated, function (req, res) {
    // this is only called when there is an authentication user due to isAuthenticated
    res.send('hello, ' + escapeHtml(req.session.user) + '!' +
      ' <a href="/prueba/logout">Logout</a>')
  })
  
  router.get('/', function (req, res) {
    res.send('<form action="prueba/login" method="post">' +
      'Username: <input name="user"><br>' +
      'Password: <input name="pass" type="password"><br>' +
      '<input type="submit" text="Login"></form>')
  })
  
  router.post('/login', express.urlencoded({ extended: false }), function (req, res) {
    // login logic to validate req.body.user and req.body.pass
    // would be implemented here. for this example any combo works
  
    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err)
  
      // store user information in session, typically a user id
      req.session.user = req.body.user
  
      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) return next(err)
        res.redirect('/prueba')
      })
    })
  })
  
  router.get('/logout', function (req, res, next) {
    // logout logic
  
    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    req.session.user = null
    req.session.save(function (err) {
      if (err) next(err)
  
      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        if (err) next(err)
        res.redirect('/')
      })
    })
  })

  module.exports = router;
