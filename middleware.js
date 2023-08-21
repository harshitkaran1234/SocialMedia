const checkLogin = function (req, res, next) {
    const isLogged = false;
    if(!isLogged) {
        res.render('login')
    }
    else{
        console.log('LOGGED')
        next()
    }
  }

module.exports = { checkLogin };

  