module.exports = (req, res, next) => {
    if(!req.user){
        return res.status(401).send({error : 'Error ! You must log in !'});
    }
    //If we found a user, we go to the next middleware
    next();
}