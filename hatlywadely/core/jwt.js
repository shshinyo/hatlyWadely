const jwt = require('jsonwebtoken')


function generate_access_token(type,payload) {
    if(type == 'general'){
        return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30d' })
    }else if(type == 'owner'){
        return jwt.sign(payload, process.env.SECRET_KEY_OWNER, { expiresIn: '30d' })
    }else if(type == 'driver'){
        return jwt.sign(payload, process.env.SECRET_KEY_DRIVER, { expiresIn: '30d' })
    }
}

module.exports ={
    generate_access_token
}