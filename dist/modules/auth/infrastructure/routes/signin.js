"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinEndpoint = void 0;
const express_1 = __importDefault(require("express"));
const Email_1 = require("../../domain/value-objects/Email");
const signin_1 = require("../../application/services/signin");
const PrismaUserRepository_1 = require("../repositories/PrismaUserRepository");
const bcrypt_password_encoder_1 = require("../collaborators/bcrypt-password-encoder");
const jwt_token_manager_1 = require("../collaborators/jwt-token-manager");
const router = (0, express_1.default)();
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userEmail = new Email_1.Email(email);
        const jwtToken = await (0, signin_1.signinWithEmailPassword)(userEmail, password, new PrismaUserRepository_1.PrismaUserRepository(), new bcrypt_password_encoder_1.BcryptPasswordEncoder(), new jwt_token_manager_1.JwtTokenManager());
        res.status(200).json({
            message: 'User autenticated',
            data: {
                token: jwtToken,
            },
        });
    }
    catch (e) {
        console.error(e);
        const validationErrors = (e.errors || []).join('. ');
        const message = e.errors?.length > 0 ? validationErrors : e.message;
        res.statusCode = 500;
        if (validationErrors) {
            res.statusCode = 400;
        }
        res.json({ error: 'Error while signing in the user', message });
    }
});
exports.signinEndpoint = router;
//# sourceMappingURL=signin.js.map