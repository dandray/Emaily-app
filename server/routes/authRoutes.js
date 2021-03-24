//Authentication routes
const passport = require('passport');

//Function that takes the app variable as parameter, and returns the object containing the 2 routes 
module.exports = (app) => {
    app.get(
        '/auth/google', passport.authenticate('google', {
            //No need for the 2 scopes below for our app, it's examples of scopes we can ask from google
            scope : ['profile', 'email']
        })
    );
    
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'), 
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
        //Renvoyer le résultat afin d'afficher la déconnexion effectuée
        //res.send(req.user);
    });

    app.get(
        '/api/current_user', (req, res) => {
            res.send(req.user);
        }
    );
    
};