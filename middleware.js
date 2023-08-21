const checkLogin = function (req, res, next) {
    const isLogged = false;
    if(!isLogged) {
        res.render('login')
    }
    console.log('LOGGED')
    next()
  }

module.exports = { checkLogin };

  