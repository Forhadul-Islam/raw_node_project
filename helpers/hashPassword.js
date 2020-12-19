const crypto = require('crypto');
const ENVIRONMENT = require('./environments');
const hashPassword = (str) => {
    if(typeof(str) == 'string' && str.length > 0){
        const hash = crypto.createHmac('sha256', ENVIRONMENT.secretKey )
                   .update(str)
                   .digest('hex');
                   return hash;
    }
}


module.exports = hashPassword;