const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting !');
    });

    //Webhooks testing (video 187) - ngrok 
    app.post('/api/surveys/webhooks', (req, res)=> {

        //We define here a new pathname that will contain 2 variables (used like a regex below)
        const p = new Path('/api/surveys/:surveyId/:choice');

        const events = _.chain(req.body)
        .map( ({email, url})=>{
            //Then we can match this pathname to the path we get from the URL
            const match = p.test(new URL(url).pathname);
            if(match){
                return { email : email, surveyId : match.surveyId, choice : match.choice }
            }
        })
        //Eliminating undefined records
        .compact()
        //Eliminating records that make our list containing duplicate emails/Ids
        .uniqBy( 'email', 'surveyId')
        //Launch the update query for every event (properties surveyId,Email,Choice) of the list 
        .each(({surveyId, email, choice}) => {
            Survey.updateOne({ 
                _id : surveyId,
                recipients : {
                  $elemMatch : {email : email, responded : false }
                }
              }, {
                  $inc : { [choice] : 1 },
                  $set : { 'recipients.$.responded' : true },
                  lastResponded : new Date()
            }).exec();
        })
        .value();

        console.log(events);
        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients : recipients.split(',').map( email => ({email : email.trim() })), //trim enlève les espaces
            _user : req.user.id, //id fourni par mongoose
            dateSent : Date.now() 
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
            await mailer.send();
            await survey.save();
            req.user.credits-=1;
            const user = await req.user.save();

            //On renvoie le model du user updaté pour que le rafraichissement du nombre de crédits soit fait
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};