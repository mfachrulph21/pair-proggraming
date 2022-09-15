const isLoggin = function (req, res, next) {
    // console.log(req.session);
    if(!req.session.userId) {
        const error = 'Please login first!'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
}

const isAdmin = function (req, res, next) {
    // console.log(req.session);
    if(req.session.userId && req.session.role !== 'admin') {
        const error = 'You have no access'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
}

module.exports = { isLoggin, isAdmin }