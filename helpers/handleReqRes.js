const url = require('url');
const {StringDecoder} = require('string_decoder');
const {notFoundHandler} = require('../handlers/routeHandlers/notFoundHandler');
const routes = require('../routes');


const handler = {}



handler.handleReqRes = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const query = parsedUrl.query
    const method = req.method.toLowerCase();
    const headers = req.headers;
    const decoder = new StringDecoder('utf-8');

    let realDate = '';

    const requestProperties = {
        path,
        trimmedPath,
        query,
        method,
        headers,
    }

    req.on('data', (buffer)=>{
        realDate += decoder.write(buffer);
    })

    req.on('end', ()=>{
        realDate += decoder.end();
        console.log(realDate)
    })

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler
    chosenHandler(requestProperties, (statusCode, payload) =>{
        const status = typeof(statusCode) === 'number'? statusCode : 500;
        const data = typeof(payload) === 'object' ? payload : {}
        const jsonPayload = JSON.stringify(data)

        res.statusCode = status;
        res.setHeader('Content-Type', 'application/json')
        res.end(jsonPayload);
    })
    
    

    

    console.log(query)

    res.end('Hello programmers!');
};


module.exports = handler