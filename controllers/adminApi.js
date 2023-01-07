
module.exports = (dbClient) => {

    const hidePassword = require('../passwordUtil/bcryptPassword')
    const exception = require('../util/exception')

    const saveUserData = async (req, res, next) => {
        try {
            const hash = await hidePassword.encryptPassword(req.body.password);
            if (hash) {
                const result = await dbClient.query(`INSERT INTO user (name,email,password) VALUES ('${req.body.name}', '${req.body.email}', '${hash}')`);
                req.payload = await result.data;
            }
            next();
        } catch (err) {
            return exception.raiseError(req, res, next, 505, 505, 'Something went wrong')
        }
    }

    const verifyUser = async (req, res, next) => {
        try {
            const queryResult = await dbClient.query(`select * from user where email = '${req.body.email}'`);
            const result = await hidePassword.decryptPassword(req.body, queryResult[0]);
            if (result) {
                req.queryResult = queryResult[0];
                next();
            }
            else {
                return exception.raiseError(req, res, next, 400, 400, 'Your details not matched')
            }
        }
        catch (err) {
            return exception.raiseError(req, res, next, 505, 505, 'Something went wrong')
        }
    }

    const saveTask = async (req, res, next) => {
        try {
            const result = await dbClient.query(`INSERT INTO task (title,dueDate,attachment,user_id) VALUES ('${req.body.title}', '${req.body.dueDate}', '${req.body.attachment}', ${req.body.user_id})`);
            req.payload = result;
            next();
        } catch (err) {
            return exception.raiseError(req, res, next, 505, 505, 'Something went wrong')
        }
    }

    const fetchTaskList = async (req, res, next) => {
        try {
            const result = await dbClient.query(`select * from task where user_id = ${req.query.userid}`);
            req.payload = result[0];
            next();
        } catch (err) {
            return exception.raiseError(req, res, next, 505, 505, 'Something went wrong')
        }
    }

    const deleteTask = async (req, res, next) => {
        try {
            const result = await dbClient.query(`delete from task where taskid = ${req.query.taskid} and user_id = ${req.query.user_id}`);
            req.payload = result[0];
            next();
        } catch (err) {
            return exception.raiseError(req, res, next, 505, 505, 'Something went wrong')
        }
    }

    const updateTask = async (req, res, next) => {
        try {
            const result = await dbClient.query(`update task set title = '${req.body.title}', dueDate = '${req.body.dueDate}', attachment = '${req.body.attachment}' where taskid = ${req.body.taskid} and user_id = ${req.body.user_id}`);
            req.payload = result[0];
            next();
        } catch (err) {
            return exception.raiseError(req, res, next, 505, 505, 'Something went wrong')
        }
    }

    const uploadFile = async (req, res, next) => {
        try {
            let sampleFile;
            let uploadPath;

            if (!req.files || Object.keys(req.files).length === 0) {
                return exception.raiseError(req, res, next, 400, 400, 'No files were uploaded');
            }
            uploadPath = '/Users/Public/' + req.files.file.name;
            req.files.file.mv(uploadPath, function (err) {
                if (err) {
                    return exception.raiseError(req, res, next, 401, 401, 'File upload failed');
                }
                next();
            });
        } catch (err) {
            return exception.raiseError(req, res, next, 505, 505, 'Something went wrong')
        }
    }


    return {
        saveUserData,
        verifyUser,
        saveTask,
        fetchTaskList,
        deleteTask,
        updateTask,
        uploadFile
    }
}