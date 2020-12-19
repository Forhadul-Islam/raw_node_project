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
        if(!err && data){
            callback(err, data)
        }else{
            callback({error: "could not found any data"}, false)
        }
    })
}

lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.basedir}/${dir}/${file}.json`, 'r+', (err, fd)=>{
        if(!err, fd){
            const stringData = JSON.stringify(data);
           fs.ftruncate(fd, err =>{
               if(!err){
                fs.write(fd, stringData, (err) => {
                    if(!err){
                        fs.close(fd, (err) =>{
                            if(!err){
                                callback(false)
                            }else{
                                callback('cannot close file')
                            }
                        })
                    }else{
                        callback('something wrong! file cannot close')
                    }
                })
               }else{
                   callback('could not update file! ')
               }
           })
        }else {
            callback('cannot find file or rewrite')
        }
    })
}

lib.delete = (dir, file, callback) =>{
    fs.unlink(`${lib.basedir}/${dir}/${file}.json`, err=>{
        if(!err){
            callback('deleted file ' + file + '.json' + ' successfully! have fun now')
        }else {
            callback('File could not delete! File may not exist.')
        }
    })
}

module.exports = lib;