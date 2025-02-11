"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinWithEmailPassword = void 0;
const signinWithEmailPassword = async (email, password, userRepository, passwordEncoder, tokenGenerator) => {
    const foundUser = await userRepository.findByEmail(email);
    if (!foundUser) {
        throw new Error('Invalid credentials');
    }
    const passwordMatches = await foundUser.passwordMatches(password, passwordEncoder.compare);
    if (!passwordMatches) {
        throw new Error('Invalid credentials');
    }
    return await tokenGenerator.generateUserToken(foundUser);
};
exports.signinWithEmailPassword = signinWithEmailPassword;
//# sourceMappingURL=signin.js.map