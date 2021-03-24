module.exports = (req, res, next) => {
    if(req.user.credits < 1){
        return res.status(403).send({error : 'Error ! You don\'t have enough credits !'});
    }
    //If we found a user, we go to the next middleware
    next();
}