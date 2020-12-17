const fs = require('fs');
const path = require('path');

const lib = {};

//base directory of data 
lib.basedir = path.join(__dirname, '../.data/');

lib.create = (dir, file, data, callback) => {
    fs.open(lib.basedir + dir + '/' + file + '.json', 'wx', (err, fileDescriptor)=>{
        if(!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.write(fileDescriptor, stringData, (err) =>{
                if(!err) {
                    fs.close(fileDescriptor, err =>{
                        if(!err){
                            callback(false)
                        }else {
                            callback('Error closing the new file!')
                        }
                    })
                }else{
                    callback('Sorry, Error writing file!')
                }
            })
        }else {
            callback('Cannot create new file! It seems the file exists')
        }
    })
}

lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir}/${dir}/${file}.json`, 'utf8', (err, data)=>{
        callback(err, data)
    })
}

module.exports = lib;