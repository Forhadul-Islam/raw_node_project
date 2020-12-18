const parseJson = (data) =>{
    try {
        return JSON.parse(data)
    } catch (err) {
        return {}
    }
}


module.exports = parseJson;