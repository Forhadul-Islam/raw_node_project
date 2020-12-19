const {create, read, update} = require('../../lib/data');
const hashPassword = require('../../helpers/hashPassword');
const parseJson = require('../../helpers/parseJson');

// module scaffolding
const handler = {};

handler.userHandler = (request, callback) => {
    const acceptableMethod = ['get', 'post', 'put', 'delete'];
 
    if (acceptableMethod.indexOf(request.method) > -1) {
        
        handler._users[request.method](request, callback);
    } else {
        callback(405, `${request.method} is not allowed!`);
    }
};





// crud functions for userHandler
handler._users = {};

//get method
handler._users.get = (request, callback) => {
    const phone = typeof request.body.phone === 'string' 
        && request.body.phone.length === 11 
        ? request.body.phone 
        : false;

        if(phone){
            read('users', phone, (err, user)=>{
                if(!err && user){
                    //return the user
                   
                    const userObject = parseJson(user)
                    delete userObject.password;// you can also set the value null of password
                    // userObject.password = null
                    callback(200, userObject)
                }else{
                    callback(404, {
                        message: 'User not found!'
                    })
                }
            })
        }else{
            callback(400, {
                message: "The phone number is invalid! try again"
            })
        }




};


//post method
handler._users.post = (request, callback) => {
    const firstName = typeof request.body.firstName === 'string' 
    && request.body.firstName.length > 0 
    ? request.body.firstName 
    : false;

    const lastName = typeof request.body.lastName === 'string' 
        && request.body.lastName.length > 0 
        ? request.body.lastName 
        : false;

    const phone = typeof request.body.phone === 'string' 
        && request.body.phone.length === 11 
        ? request.body.phone 
        : false;

    const password = typeof request.body.password === 'string' 
        && request.body.password.length > 4
        ? request.body.password 
        : false;

    const userObj = {
        firstName, 
        lastName,
        phone,
        password: hashPassword(password)
    }
    if(firstName && lastName && phone && password){
        //make sure the user does not exists
                read('users', phone, (err, data)=>{
                    if(err){
                        create('users', phone, userObj, (err) =>{
                            if(!err){
                                callback(false)
                            }else{
                                callback(400, {
                                    message: 'something wrong!'
                                })
                            }
                        })
                    }else{
                        callback(400, {
                            message: "The user already exists"
                        })
                    }
                })
            }     
};


//put method
handler._users.put = (request, callback) => {
    const firstName = typeof request.body.firstName === 'string' 
    && request.body.firstName.length > 0 
    ? request.body.firstName 
    : false;

    const lastName = typeof request.body.lastName === 'string' 
        && request.body.lastName.length > 0 
        ? request.body.lastName 
        : false;

    const phone = typeof request.body.phone === 'string' 
        && request.body.phone.length === 11 
        ? request.body.phone 
        : false;

    const password = typeof request.body.password === 'string' 
        && request.body.password.length > 4
        ? request.body.password 
        : false;


};


//delete method
handler._users.delete = (requestProperties, callback) => {
    callback(200, { message: 'hey i am from user post' });
};

module.exports = handler;
