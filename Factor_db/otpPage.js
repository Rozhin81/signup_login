const otpGenerator = require("otp-generator");



function otpCode(){
    const sendOtp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })
    return sendOtp
};


module.exports = {otpCode};