exports.raiseError = (req, res, next, errorcode, httpStatus, message) => {
    const returnMessage = {
        status: 'fail',
    };
    if (message) {
        returnMessage.message = message;
    }
    returnMessage.messageCode = errorcode;
    returnMessage.httpStatus = httpStatus;
    res.status(httpStatus).send(returnMessage);
};