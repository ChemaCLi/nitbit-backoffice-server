"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const verifyUser = async (email, userRepository, verificationCode, notifier) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    if (!user.verificationCode || user.status !== 'pending_verification') {
        throw new Error('It seems the user has been already verified.');
    }
    if (!user.props.verificationCode ||
        user.props.verificationCode !== verificationCode) {
        throw new Error('Invalid verification code');
    }
    await userRepository.verify(user);
    await notifier.notify(`${user.profile.fullName} te damos la bienvenida a NitBit!`);
    return user;
};
exports.verifyUser = verifyUser;
//# sourceMappingURL=verify-user.js.map