const bcrypt = require('bcrypt');


const encryptPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

const decryptPassword = async (body, data) => {
    const match = await data.map((ele) => {
        if (ele.email === body.email) {
            return ele.password;
        }
        else {
            return false;
        }
    })
    if (match !== false) {
        const result = await bcrypt.compare(body.password, match.toString())
        return result;
    }
}

exports.encryptPassword = encryptPassword;
exports.decryptPassword = decryptPassword;
