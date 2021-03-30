const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
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
            recipients.user.credits-=1;
            const user = await req.user.save();

            //On renvoie le model du user updaté pour que le rafraichissement du nombre de crédits soit fait
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};