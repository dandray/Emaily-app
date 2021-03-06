//prod.js - To be commited
module.exports = {
    GoogleClientID : process.env.GOOGLE_CLIENT_ID,
    GoogleClientSecret : process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey : process.env.COOKIE_KEY,
    stripePublishableKey : process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey : process.env.STRIPE_SECRET_KEY, 
    sendgridKey : process.env.SENGRID_KEY,
    redirectDomain : process.env.REDIRECT_DOMAIN
};

