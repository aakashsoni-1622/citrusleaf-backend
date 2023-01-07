const jwt = require('jsonwebtoken');
const secretkey = "secretkey";
const exception = require('../util/exception')
const generateToken = async (req, res, next) => {
    const data = req.queryResult;
    const body = data.splice(data.findIndex((ele) => {
        delete ele.password;
    }), 1);
    jwt.sign(req.body, secretkey, { expiresIn: '3000s' }, (err, token) => {
        const removeObject = body.map((ele) => {
            return Object.assign(ele, { 'token': token })
        })
        const finalRes = Object.assign({}, ...removeObject);
        req.payload = finalRes;
        next();
    })
}

const verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== undefined) {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        jwt.verify(token, secretkey, (err, data) => {
            if (err) {
                return exception.raiseError(req, res, next, 501, 501, 'Token is expired')
            }
            else {
                next();
            }
        })
    }

}

exports.generateToken = generateToken;
exports.verifyToken = verifyToken;