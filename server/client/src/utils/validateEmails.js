const reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default(emails) => {
    //La fonction trim supprime les espaces que l'utilisateur pourrait avoir saisi, pour se retrouver uniquement avec les emails
    const invalidEmails = emails.split(',').map(email => email.trim())
    //On garde uniquement les emails invalides dans notre liste en les testant avec la regex
    .filter(email => reg.test(email) === false);

    if(invalidEmails.length){
        return `These emails are invalid : ${invalidEmails}`;
    }

    return;
};