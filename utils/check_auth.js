let jwt = require('jsonwebtoken');
let constants = require('./constants')
var userControllers = require('../controllers/users')
module.exports = {
    check_authentication: async function (req, res, next) {
        if (!req.headers || !req.headers.authorization) {
            return next(new Error("ban chua dang nhap"));
        }
        
        if (!req.headers.authorization.startsWith("Bearer")) {
            return next(new Error("ban chua dang nhap"));
        }
        
        try {
            let token = req.headers.authorization.split(" ")[1];
            let result = jwt.verify(token, constants.SECRET_KEY);
            let user_id = result.id;
            let user = await userControllers.getUserById(user_id)
            
            if (result.expireIn > Date.now()) {
                req.user = user;
                next();
            } else {
                return next(new Error("token het han"));
            }
        } catch (error) {
            return next(new Error("token khong hop le"));
        }
    },
    check_authorization: function (roles) {
        return function (req, res, next) {
            let roleOfUser = req.user.role.name;
            let requiredRoles = roles;
            if (requiredRoles.includes(roleOfUser)) {
                next();
            }
            else {
                return next(new Error("ban khong co quyen"));
            }
        }
    }
}