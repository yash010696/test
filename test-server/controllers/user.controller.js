const UserService = require('../services/user.service');

exports.getUserList = async function (req, res, next) {
    try {
        let result = await UserService.getUserList();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.createUser = async function (req, res, next) {
    try {
        let result = await UserService.createUser(req.body, req.file);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.updateUser = async function (req, res, next) {
    try {
        let result = await UserService.updateUser(req.body, req.file);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.deleteUser = async function (req, res, next) {
    try {
        let result = await UserService.deleteUser(req.query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
