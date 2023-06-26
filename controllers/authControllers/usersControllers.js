const emailValidation = require("../../helpers/emailValidation");
const emailVerification = require("../../helpers/emailVerification");
const otpTemplate = require("../../helpers/otpTemplate");
const User = require("../../model/userModel.js");
const Store = require("../../model/merchantModel.js");
const bcrypt = require('bcrypt');
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

// =========== Registration Part Start ===============

async function registrationController(req, res) {

    const { fullname, email, password, avatar, facebookId, linkedinId } = req.body;

    if (!fullname) {
        return res.json({ error: 'Fullname is required!' });
    } else if (!email) {
        return res.json({ error: 'Email is required!' });
    } else if (!emailValidation(email)) {
        return res.json({ error: 'Invalid email!' });
    }
    else if (!password) {
        return res.json({ error: 'Password is required!' });
    } else {

        const isEmailExist = await User.find({ email });

        if (isEmailExist.length > 0) {
            return res.json({ error: 'Email already exists!' });
        }

        bcrypt.hash(password, 10, async function (err, hash) {

            const user = new User({

                fullname,
                email,
                password: hash,
                avatar,
                facebookId,
                linkedinId

            });

            user.save();

            const generator2 = aleaRNGFactory(Date.now());

            const randomNumber = generator2.uInt32().toString().substring(0, 4);

            await User.findOneAndUpdate({ email }, { $set: { randomOtp: randomNumber } }, { new: true });

            emailVerification(user.email, "Verify your email", randomNumber, otpTemplate);

            // setTimeout(async () => {

            //     console.log('OTP deleted!');

            //     await User.findOneAndUpdate({ email }, { $unset: { randomOtp: '' } }, { new: true });

            // }, 5000);

            res.json({ success: 'Registration completed successfully!' });

        });
    }
}

// =========== Registration Part End ===============

// =========== Login Part Start ===============

async function loginController(req, res) {

    const { email, password } = req.body;

    console.log(email, password)

    if (!email) {
        return res.json({ error: 'Email is required!' });
    } else if (!emailValidation(email)) {
        return res.json({ error: 'Invalid email!' });
    } else if (!password) {
        return res.json({ error: 'Password is required!' });
    } else {

        const isEmailExist = await User.find({ email });

        if (isEmailExist.length > 0) {

            bcrypt.compare(password, isEmailExist[0].password, function (err, result) {

                if (result) {
                    res.json({ error: 'Login successfull!' });
                } else {
                    res.json({ success: 'Password not match!' });
                }

            });

        } else {
            res.json({ error: 'Email not match!' });
        }
    }


}

// =========== Login Part End ===============

// =========== Emailverification OTP Part Start ===============

async function emailVerificationOtpMatch(req, res) {

    const { email, randomOtp } = req.body;

    const checkOtp = await User.find({ email });

    if (checkOtp.length > 0) {

        if (checkOtp[0].randomOtp == randomOtp) {

            await User.findOneAndUpdate({ email }, { $unset: { randomOtp: '' } }, { new: true });

            res.json({ success: 'OTP match!' });
        } else {
            res.json({ error: 'OTP not match!' });
        }

    }
}

// =========== Emailverification OTP Part End ===============

// =========== Become Merchant Part Start ===============

async function becomeMerchantController(req, res) {

    const { storename, officialemail, officialphone, address, owner } = req.body;

    if (!storename) {
        return res.json({ error: 'Storename is required!' });
    } else if (!officialemail) {
        return res.json({ error: 'Officialemail is required!' });
    } else if (!officialphone) {
        return res.json({ error: 'Officialphone is required!' });
    } else if (!address) {
        return res.json({ error: 'Address is required!' });
    } else if (!owner) {
        return res.json({ error: 'Owner is required!' });
    } else {

        const isExistEmail = Store.find({ officialemail });

        if (isExistEmail.length > 0) {
            return res.json({ error: 'Email already exist!' });
        }

        const store = new Store({

            storename,
            officialemail,
            officialphone,
            address,
            owner

        });

        store.save();

        await User.findOneAndUpdate({ _id: store.owner }, { $set: { role: 'merchant', merchant: true } }, { new: true });

        res.json({ success: 'You become merchant successfully!' })
    }
}

// =========== Become Merchant Part End ===============

// =========== Become Merchant Status Part Status ===============

async function becomeMerchantStatusController(req, res) {

    const { owner, status } = req.body;

    if (!owner) {
        return res.json({ error: 'Owner is required!' });
    } else if (!status) {
        return res.json({ error: 'Status is required!' });
    } else {

        if (status == 'pending' || status == 'rejected') {
            await Store.findOneAndUpdate({ owner }, { status });
        } else if (status == 'approved') {
            await Store.findOneAndUpdate({ owner }, { status });
        }

        res.json({ success: 'Merchant status changed successfully!' })
    }
}

// =========== Become Merchant Status Part End ===============


module.exports = { registrationController, loginController, emailVerificationOtpMatch, becomeMerchantController, becomeMerchantStatusController };