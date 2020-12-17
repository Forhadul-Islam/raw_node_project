const handler = {};

handler.sampleHandler = (requestProperties, callback) =>{
    callback(200, {
        message: "hey programmer! something"
    })
}


module.exports = handler;