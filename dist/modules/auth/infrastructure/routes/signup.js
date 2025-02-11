"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupEndpoint = void 0;
const express_1 = __importDefault(require("express"));
const Phone_1 = require("../../domain/value-objects/Phone");
const Email_1 = require("../../domain/value-objects/Email");
const config_1 = require("../../../shared/application/config");
const signup_1 = require("../../application/services/signup");
const User_1 = require("../../domain/models/User");
const ID_1 = require("../../../shared/domain/value-objects/ID");
const email_notifier_1 = require("../collaborators/email-notifier");
const validateSignupInput_1 = require("../validators/validateSignupInput");
const random_code_generator_1 = require("../collaborators/random-code-generator");
const PrismaUserRepository_1 = require("../repositories/PrismaUserRepository");
const bcrypt_password_encoder_1 = require("../collaborators/bcrypt-password-encoder");
const router = (0, express_1.default)();
router.post('/signup', async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;
        await (0, validateSignupInput_1.validateSignupInput)({
            fullName,
            email,
            phone,
            password,
        });
        const user = new User_1.User({
            id: new ID_1.ID(),
            password,
            status: 'pending_verification',
            onlineStatus: 'offline',
            friends: [],
            blockedUsers: [],
            profile: new User_1.UserProfile({
                id: new ID_1.ID(),
                fullName,
                email: new Email_1.Email(email),
                phone: new Phone_1.Phone(phone),
            }),
        });
        const emailTemplate = '<p>Hola. Este es tu código de verificación <strong>{{message}}</strong></p>';
        const userRepository = new PrismaUserRepository_1.PrismaUserRepository();
        const passwordEncoder = new bcrypt_password_encoder_1.BcryptPasswordEncoder();
        const notifier = new email_notifier_1.EmailNotifier(new Email_1.Email(config_1.config.mailing.SYSTEM_EMAIL), user.profile.email, 'Código de verificación NitBit', emailTemplate);
        const codeGenerator = new random_code_generator_1.EasyCodeGenerator();
        const createdUser = await (0, signup_1.signup)(user, userRepository, passwordEncoder, notifier, codeGenerator);
        res.json({
            message: 'User signed up successfully',
            data: {
                id: createdUser.id.toString(),
                email: createdUser.profile.email.getValue(),
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
        res.json({ error: 'Error registering the user', message });
    }
});
exports.signupEndpoint = router;
//# sourceMappingURL=signup.js.map