"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const User_1 = require("../../domain/models/User");
const signup = async (user, userRepository, passwordEncoder, notifier, codeGenerator) => {
    const userWithSameEmail = await userRepository.findByEmail(user.profile.email);
    if (userWithSameEmail) {
        throw new Error('The email is not available. It has been already taken.');
    }
    const hashedPassword = await passwordEncoder.encode(user.password);
    const verificationCode = await codeGenerator.generate();
    const userWithHashedPassword = new User_1.User({
        ...user.props,
        password: hashedPassword,
        verificationCode,
        status: 'pending_verification',
    });
    await userRepository.save(userWithHashedPassword);
    await notifier.notify(verificationCode);
    return userWithHashedPassword;
};
exports.signup = signup;
//# sourceMappingURL=signup.js.map