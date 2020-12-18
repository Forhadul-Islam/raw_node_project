const data = require('../../lib/data');

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
    callback(200, { message: 'hey i am from user get' });
};


//post method
handler._users.post = (request, callback) => {
    console.log(request.body)
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
        password
    }
    // const userObjString = JSON.stringify(userObj);
    data.create('users', userObj.phone, userObj, (err) =>{
        if(!err){
            callback(false)
        }else{
            callback('something wrong!')
        }
    } )
};


//put method
handler._users.put = (requestProperties, callback) => {
    callback(200, { message: 'hey i am from user post' });
};


//delete method
handler._users.delete = (requestProperties, callback) => {
    callback(200, { message: 'hey i am from user post' });
};

module.exports = handler;
