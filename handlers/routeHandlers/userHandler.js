
//module scaffolding
const handler = {}

handler.userHandler = (request, callback) =>{
    const acceptableMethod = ['get', 'post', 'put', 'delete'];
    if(acceptableMethod.indexOf(request.method) > -1){
        
    }else{
        callback(405, `${request.method} is not allowed!`)
    }
}

//crud functions for userHandler
handler._users = {}

handler._users.get = (requestProperties, callback) =>{}
    
handler._users.post = (requestProperties, callback) =>{}

handler._users.put = (requestProperties, callback) =>{}

handler._users.delete = (requestProperties, callback) =>{}


module.exports = handler;