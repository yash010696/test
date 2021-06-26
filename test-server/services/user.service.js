const fs = require('fs');
const config = require('config');
const { v4: uuidv4 } = require('uuid');
const Utils = require('../utils/index');
const User = require('../models/user.model');

exports.getUserList = async function () {
    let users = await User.find();
    return {
        success: true,
        users
    }
}

exports.createUser = async function (obj, file) {
    try {
        if (!obj.firstName) throw Error('FirstName is required');
        if (!obj.lastName) throw Error('LastName is required');
        if (!obj.email) throw Error('Email is required');
        if (!obj.phone) throw Error('Phone is required');
        if (!file) throw Error('Select the file');
        obj = await Utils.trimTextOfObject(obj);
        if (obj.phone.length > 10) throw Error('Phone number should not be greater than 10 digits');
        let user = await User.findOne({ email: obj.email });
        if (user) throw Error('Email exists.Try other email');
        await User.create(
            {
                _id: uuidv4(),
                firstName: obj.firstName,
                lastName: obj.lastName,
                email: obj.email,
                phone: obj.phone,
                profileImage: file.filename
            }
        );
        return {
            success: true,
            message: 'User created successfully'
        };
    } catch (error) {
        if (file) await fs.unlinkSync(`${config.images.upload_path}/${file.filename}`);
        throw Error(error.message);
    }
}

exports.updateUser = async function (obj, file) {
    try {
        if (!obj.userId) throw Error('UserId is required');
        let updateObject = {};
        if (obj.firstName) Object.assign(updateObject, { firstName: obj.firstName });
        if (obj.lastName) Object.assign(updateObject, { lastName: obj.lastName });
        if (obj.email) Object.assign(updateObject, { email: obj.email });
        if (obj.phone) {
            if (obj.phone.length > 10) throw Error('Phone number should not be greater than 10 digits');
            Object.assign(updateObject, { phone: obj.phone });
        }
        if (file && file.filename) Object.assign(updateObject, { profileImage: file.filename });
        let user = await User.findOne({ email: obj.email });
        if (user) throw Error('Email exists.Try other email');
        let previousUser = await User.findByIdAndUpdate(obj.userId,
            {
                $set: updateObject
            }
        );
        if (file && file.filename) await fs.unlinkSync(`${config.images.upload_path}/${previousUser.profileImage}`);
        return {
            success: true,
            message: 'User updated successfully'
        };
    } catch (error) {
        if (file) await fs.unlinkSync(`${config.images.upload_path}/${file.filename}`);
        throw Error(error.message);
    }
}

exports.deleteUser = async function (queryParams) {
    if (!queryParams.userId) throw Error('UserId is required');
    let user = await User.findOneAndDelete(
        {
            _id: queryParams.userId
        }
    );
    await fs.unlinkSync(`${config.images.upload_path}/${user.profileImage}`);
    return {
        success: true,
        message: 'User deleted successfully'
    };
}
