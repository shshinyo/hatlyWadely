const jwt = require('jsonwebtoken')

function generate_access_token(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY_DRIVER, { expiresIn: '30d' })
}

async function extend(req, res, next) {
    // Extend the life of the user session if it is still not expired
    // If the user session is expired it will stop the request propagation 

    authorization = req.headers.authorization
    if (!req.headers.authorization) {
        return res.json({ message: 'Request is not authenticated', status: 5 });
    }
    var headerToken = req.headers.authorization;
    var token = headerToken.split(' ')?.slice(-1)[0];
    if (token == null) {
        return res.json({ message: 'No session detected', status: 5 });
    }
    await jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.json({ message: 'Session is expired', status: 5 });
        }
        req.user = user;

        //req.user.newToken = generate_access_token({ email: user.email, slug: user.slug });
        //----------------------------------------------------------
        //WAEL ALGHOOL | 07 Jul 2021
        //We should make payload fully qualified
        payload = { email: user.email, slug: user.slug, rememberMe: user.rememberMe, user_id: user.user_id };
        req.user.newToken = generate_access_token(payload);

        //We have to define the "Authorization" header in the response!
        // Set access-control-expose-headers because angular can't detect authorization in response header
        res.setHeader("access-control-expose-headers", "authorization")
        res.setHeader("authorization", `Bearer ${req.user.newToken}`);
        //That header should be carefully manipulated on client side to renew X-AUTH in local storage
        //----------------------------------------------------------
        next()
    })
}

async function rescue(req, res, next) {
    // Extend life of the user session if it is still not expired
    // If the user session is expired it will allow the request to continue working 

    // let authorization = JSON.parse(req.headers.authorization)
    if (!req.headers.authorization) {
        return next();
    }
    let headerToken = req.headers.authorization;
    let token = headerToken.split(' ')?.slice(-1)[0];
    if (token == null) {
        return next();
    }
    await jwt.verify(token, process.env.SECRET_KEY_DRIVER, async (err, user) => {
        if (err) {
            return next();
        }
        req.user = user;
        // If there is token in request header , generate new one and set it to response header
        let payload = { email: user.email, userType: user.userType };
        req.user = user;
        let newToken = generate_access_token(payload);
        // Set access-control-expose-headers because angular can't detect authorization in response header
        res.setHeader("access-control-expose-headers", "authorization")
        res.setHeader("authorization", `Bearer ${newToken}`);
        next();
    })
}

function granted(role) {
    return async (req, res, next) => {
        let userController = require('./controllers/userController');
        if (req.user && await userController.isGranted(req.user.user_id, role)) {
            next();
        } else {
            return res.json({ message: 'Request is not authorized', status: 5 });
        }
    }
}

module.exports = {
    extend,
    rescue,
    granted
}

