const express = require('express');
const mongoose = require('mongoose');
//Enabling cookies for passport 
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');


const keys = require('./config/keys');
//Order is important : The Passport service is using User model, so we need to have it before calling passport
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI,{useNewUrlParser: true});

const app = express();

//Chaque requête ayant un body (PUT, POST, etc.) sera parsée et son contenu inséré dans req.body
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge : 30*24*60*60*1000,
        keys : [keys.cookieKey] 
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    //Express will serve up production assets like main.js file or main.css file
    app.use(express.static('client/build'));

    //Express will serve-up index.html file if the route is not recognized
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })

}

//Variable d'environnement nous donnant le port utilisé par Heroku que nous devons "écouter", sinon, nous nous brancherons sur le port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);

