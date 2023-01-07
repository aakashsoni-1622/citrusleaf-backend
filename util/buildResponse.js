exports.send = (req, res) => {
    const responseObj = {};
    if (req.error) {
        responseObj.status = 'fail';
        responseObj.message = req.error;
        res.status(Number(req.errorCode)).send(responseObj);
    } else {
        responseObj.success = true;
        responseObj.httpStatus = 200;
        if (req.payload) {
            responseObj.data = req.payload;
        }
        res.send(responseObj);
    }
};
