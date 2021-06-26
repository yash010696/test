const config = require('config');
const request = require('request');
const AdminService = require('../services/user.service');

exports.verifyTokenForAdmin = async function (req, res, next) {
    try {
        if (!req.headers['authorization']) {
            res.status(401).send({ success: false, message: 'Header required' });
            return;
        }
        let [scheme, token] = req.headers['authorization'].toString().split(' ');
        if (!scheme || !token) {
            res.status(401).send({ success: false, message: 'Invalid token' });
            return;
        }
        if (scheme.toLowerCase() != 'bearer') {
            res.status(401).send({ success: false, message: 'Invalid token' });
            return;
        }
        let user = await AdminService.getUserByToken(token);
        if (!user) {
            res.status(401).send({ success: false, message: 'Invalid token' });
            return;
        };
        req['user'] = user;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    next();
}
