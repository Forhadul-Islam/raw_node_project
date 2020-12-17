const handler = {}

handler.notFoundHandler = (requestProperties, callback) =>{
    callback(400, {
        message: "Error!!"
    })
}


module.exports = handler;