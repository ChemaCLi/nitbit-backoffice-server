"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenManager = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../shared/application/config");
class JwtTokenManager {
    secret;
    expiresIn;
    constructor() {
        this.secret = config_1.config.jwt.JWT_SECRET;
        this.expiresIn = '24h';
    }
    async generateUserToken(user) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.profile.email.getValue(),
                phone: user.profile.phone.getValue(),
            }, // Personaliza según tu User model
            this.secret, { expiresIn: this.expiresIn }, (err, token) => {
                if (err || !token) {
                    reject(new Error('Error generating JWT token'));
                }
                else {
                    resolve(token);
                }
            });
        });
    }
    async verifyUserToken(token, user) {
        return new Promise((resolve) => {
            jsonwebtoken_1.default.verify(token, this.secret, (err, decoded) => {
                if (err) {
                    resolve(false);
                }
                else {
                    // Check if the token is connected to the
                    resolve(decoded.id === user.id && decoded.email === user.profile.email);
                }
            });
        });
    }
}
exports.JwtTokenManager = JwtTokenManager;
//# sourceMappingURL=jwt-token-manager.js.map