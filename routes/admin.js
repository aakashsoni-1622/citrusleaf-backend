const express = require('express');
const router = express.Router();

module.exports = (dbClient) => {

    const adminApi = require("../controllers/adminApi")(dbClient);
    const buildResponse = require("../util/buildResponse");
    const token = require('../util/createJwt');

    router
        .route("/saveUser")
        .post([adminApi.saveUserData, buildResponse.send]);

    router
        .route("/verifyUser")
        .post([adminApi.verifyUser, token.generateToken, buildResponse.send]);

    router
        .route("/saveTask")
        .post([token.verifyToken, adminApi.saveTask, buildResponse.send]);

    router
        .route("/fetchTaskList")
        .get([token.verifyToken, adminApi.fetchTaskList, buildResponse.send]);

    router
        .route("/deleteTask")
        .delete([token.verifyToken, adminApi.deleteTask, buildResponse.send]);

    router
        .route("/updateTask")
        .post([token.verifyToken, adminApi.updateTask, buildResponse.send]);

    router
        .route("/uploadFile")
        .post([token.verifyToken, adminApi.uploadFile, buildResponse.send]);

    return router;

};
