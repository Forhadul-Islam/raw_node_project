const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');
const ENVIRONMENT = require('./helpers/environments')
const data = require('./lib/data');

const app = {};

//create a test file
//@todo: remove this section later
// data.update('test', 'newFile', {"name": "Forhadul Islam"}, (err)=>{
//     console.log(err)
// })


// crete a server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(ENVIRONMENT.port, () => {
        console.log(`server is running on port ${ENVIRONMENT.port}`);
    });
};

// handle request response
app.handleReqRes = handleReqRes;

app.createServer();
